import {Watchdrip} from "../../utils/watchdrip/watchdrip";
import {WatchdripV3} from "../../utils/watchdrip/watchdripV3";
import {WatchdripData} from "../../utils/watchdrip/watchdrip-data";
import {getGlobal} from "../../shared/global";
import {PointStyle} from "../../utils/watchdrip/graph/pointStyle";

import {
    BG_DELTA_TEXT,
    BG_DELTA_TEXT_BIG,
    BG_STALE_IMG,
	BG_STALE_IMG_BIG,
    BG_TIME_TEXT,
    BG_TIME_TEXT_BIG,
    BG_TREND_IMAGE,
	BG_TREND_IMAGE_AOD,
	BG_TREND_IMAGE_AOD_STAND,
	BG_TREND_IMAGE_BIG,
	BG_TREND_IMAGE_BIG_AOD,
    BG_VALUE_NO_DATA_TEXT,
	BG_VALUE_NO_DATA_TEXT_BIG,
    BG_VALUE_TEXT_IMG,
    BG_VALUE_TEXT_IMG_LOW,
    BG_VALUE_TEXT_IMG_HIGH,
    BG_VALUE_TEXT_IMG_AOD,
	BG_VALUE_TEXT_IMG_LOW_AOD,
	BG_VALUE_TEXT_IMG_HIGH_AOD,
	BG_VALUE_TEXT_IMG_BIG,
	BG_VALUE_TEXT_IMG_LOW_BIG,
	BG_VALUE_TEXT_IMG_HIGH_BIG,	
	BG_VALUE_TEXT_IMG_BIG_AOD,
	BG_VALUE_TEXT_IMG_LOW_BIG_AOD,
	BG_VALUE_TEXT_IMG_HIGH_BIG_AOD,	
    BG_VALUE_TEXT_IMG_AOD_STAND,
	BG_VALUE_TEXT_IMG_LOW_AOD_STAND,
	BG_VALUE_TEXT_IMG_HIGH_AOD_STAND,
	BG_TIME_TEXT_AOD,
	BG_DELTA_TEXT_AOD,
    DIGITAL_TIME_H,
	DIGITAL_TIME_H_BIG,
    DIGITAL_TIME_V,
    DIGITAL_TIME_AOD_V,
    IMG_LOADING_PROGRESS,
    IMG_LOADING_PROGRESS_BIG,
    IMG_STATUS_BT_DISCONNECTED,
    CUSTOM_WIDGETS,
    // Default edit group styles
    EDIT_GROUP_W_DEFAULTS,
	EDIT_LARGE_GROUP,
    GRAPH_SETTINGS
} from "./styles";
import {Colors, PROGRESS_ANGLE_INC, PROGRESS_UPDATE_INTERVAL_MS} from "../../utils/config/constants";

let bgValNoDataTextWidget, bgValTextImgWidget, bgValTextImgLowWidget, bgValTextImgHighWidget, bgValTimeTextWidget, bgDeltaTextWidget, bgTrendImageWidget, bgStaleLine, 
    progress, editGroupLarge, watchdrip, globalNS, progressTimer, progressAngle, digitalClock;

// Phone battery widget arrays
const phoneBatteryWidgets = [];
const phoneBatteryArcs = [];

let valorBG = "0";
let tipoColorBG = 0;
let trendBGAOD="";
let trendBGAODStand="";
// Add value caching
let lastBgValue = null;
let lastPhoneBattery = null;
let lastTrendImage = null;
let lastDelta = null;
//let {graphEnabled} = getApp()._options.globalData;

const screenType = hmSetting.getScreenType();
//let lastWatchdripData=null;

const IMG = 'images/';
const DW = 416;
const DH = 416;
const T_WIDTH = 61;
const T_HEIGHT = 115;
const T_SPACE = 12;

const S_WIDTH = 86;
const S_HEIGHT = 21;
const S_SPACE = 8;
const PROGRESS_TH = 25;
const PROGRESS_R = (DW-PROGRESS_TH)/2;
const P_START = 110;
const P_END = 20;
const P_DISABLED = 0.3;
const PROGRESSES = [
    [(DW/2)+2, (DW/2)+2, -P_START+40, -P_END, 0],
    [(DW/2)+2, DW/2, P_START-40, P_END, 1],
    [(DW/2)+2, DH-DW/2, -P_START, P_END-180, 3],
    [(DW/2)+2, DH-DW/2, P_START, 180-P_END, 4]
];

const EDIT_TYPES = [
    hmUI.data_type.STEP,
    hmUI.data_type.CAL,
    hmUI.data_type.HEART,
    hmUI.data_type.PAI_WEEKLY,
    hmUI.data_type.BATTERY,
    10006  // Phone Battery - custom type
];
const DEFAULTS_ORDER = [0, 1, 3, 4];

const I_DIR = IMG+'icons/';
const IL_DIR = IMG+'icons_l/';
const EDITS = [
    ['step.png', 0xffd801],
    ['cal.png',  0xff8a00],
    ['heart.png', 0xf82010],
    ['pai.png', 0x5252ff],
    ['battery.png', 0x02fa7a],
    ['phoneBattery.png', 0x528eff]  // Phone battery icon
];
const I_SIZE = 25;
const IL_SIZE = 31;
//const I_SPACE_H = 4;
const I_SPACE_H = 10; // Fix clipping of icons
const I_SPACE_V = 14;

const EDIT_GROUP_PROP = {
    tips_BG: IMG+'nothing.png',
    tips_x: 0,
    tips_y: 0,
    tips_width: 134
};

const C_SIZE = 50;
const C1_DEFAULT = hmUI.data_type.HEART;
const C2_DEFAULT = hmUI.data_type.WEATHER;
const C_POS = [DH-C_SIZE+20, PROGRESS_TH+25];

const W_SIZE = 37;

const S_I_SIZE = 20;
const S_I_SPACE = 12;

const timeNums = [];
for (let i = 0; i < 10; i++) {
    timeNums.push(`${IMG}time_numbers/${i}.png`);
}
const dayNames = [];
for (let i = 1; i <= 7; i++) {
    dayNames.push(`${IMG}days/${i}.png`);
}
const statNums = [];
for (let i = 0; i < 10; i++) {
    statNums.push(`${IMG}status_numbers/s${i}.png`);
}
const statSlash = IMG+'status_numbers/slash.png';
const statInvalid = IMG+'status_numbers/dashes.png';

const wNums = [];
for (let i = 0; i < 10; i++) {
    wNums.push(`${IMG}weather_numbers/w${i}.png`);
}
const wMinus = IMG+'weather_numbers/minus.png';
const wDegree = IMG+'weather_numbers/degree.png';

const weathers = [];
let lastTimeValue="";

for (let i = 0; i < 29; i++) {
    weathers.push(`${IMG}weather/${i}.png`);
}
/*for (let i = 0; i < 4; i++) {
    weathers.push(IMG+'nothing.png');
}*/

function setBrightness(c, b) {
    let blue = c % 256;
    let green = Math.floor(c/256) % 256;
    let red = Math.floor(c/256/256) % 256;
    return Math.floor(red*b)*256*256 + Math.floor(green*b)*256 + Math.floor(blue*b);
}

function startLoader() {
	if (screenType === hmSetting.screen_type.WATCHFACE)	
	{
		progress.setProperty(hmUI.prop.VISIBLE, true);
		progressAngle = 0;
		progress.setProperty(hmUI.prop.MORE, {angle: progressAngle});
		if(progressTimer==null)
		{
			progressTimer = globalNS.setInterval(() => {
				updateLoader();
			}, PROGRESS_UPDATE_INTERVAL_MS);
		}
	}

}

function updateLoader() {
	if (screenType === hmSetting.screen_type.WATCHFACE)
	{
		progressAngle = progressAngle + PROGRESS_ANGLE_INC;
		if (progressAngle >= 360) progressAngle = 0;
		progress.setProperty(hmUI.prop.MORE, {angle: progressAngle});
	}
}

function stopLoader() {
	if (screenType === hmSetting.screen_type.WATCHFACE)
	{
		if (progressTimer !== null) {
			globalNS.clearInterval(progressTimer);
			//delete progressTimer;
			progressTimer = null;
		}
		progress.setProperty(hmUI.prop.VISIBLE, false);
	}
}

function mergeStyles(styleObj1, styleObj2, styleObj3 = {}) {
    return Object.assign({}, styleObj1, styleObj2, styleObj3);
}

WatchFace({
    // Init View
    initView() {
		
		if(screenType!=hmSetting.screen_type.AOD)
		{
			function makeEditGroup(props) {
				let widget=hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, props);
				return widget;
			}
		
			let opt_types = [];
			for (let [i, t] of EDIT_TYPES.entries()) {
				opt_types.push({
					type: t,
					preview: IL_DIR+EDITS[i][0]
				});
			}
		
			let c_opt_types = [
				...opt_types,
				{
					type: hmUI.data_type.WEATHER,
					preview: IL_DIR+'weather.png'
				}
			];
		
			let groups = [];
			for (let i of PROGRESSES.keys()) {
				groups.push(makeEditGroup({
					edit_id: 101+i,
					x: [DW/8, 5*DW/8][i % 2],
					y: [DW/8, 5*DW/8][Math.floor(i/2) % 2],
					w: DW/4,
					h: DW/4,
					select_image: IMG+'masks/select.png',
					un_select_image: IMG+'masks/unselect.png',
					default_type: EDIT_TYPES[DEFAULTS_ORDER[i]],
					optional_types: opt_types,
					count: opt_types.length,
					...EDIT_GROUP_PROP
				}));	
			}
		
			const centerInfo = {
				x: (DW-C_SIZE)/2,
				w: C_SIZE,
				h: C_SIZE,
				select_image: IMG+'masks/select-c.png',
				un_select_image: IMG+'masks/unselect-c.png',
				optional_types: c_opt_types,
				count: c_opt_types.length,
				...EDIT_GROUP_PROP
			};
		
			let centerGroup1 = makeEditGroup({
				edit_id: 110,
				y: C_POS[0]-C_SIZE,
				default_type: C1_DEFAULT,
				...centerInfo
			});
		
			let centerGroup2 = makeEditGroup({
				edit_id: 111,
				y: C_POS[1]+C_SIZE,
				default_type: C2_DEFAULT,
				...centerInfo
			});	
		
			editGroupLarge = hmUI.createWidget(hmUI.widget.WATCHFACE_EDIT_GROUP, mergeStyles(EDIT_GROUP_W_DEFAULTS, EDIT_LARGE_GROUP));

			const dateline = DH/2+T_HEIGHT+T_SPACE/2+25-19+5;
			let largeGroupType = editGroupLarge.getProperty(hmUI.prop.CURRENT_TYPE);

			function makeWeather(current_y) {
				// Weather
				let widget = hmUI.createWidget(hmUI.widget.IMG_LEVEL, { // icon
					x: DW/2-37-10,//(DW-W_SIZE-W_SIZE)/2,
					y: current_y-10,
					w: 37,//-I_SPACE_V,
					align_h: hmUI.align.RIGHT,
					image_array: weathers,
					image_length: weathers.length,
					type: hmUI.data_type.WEATHER,
					show_level: hmUI.show_level.ONLY_NORMAL
				});

				widget=hmUI.createWidget(hmUI.widget.TEXT_IMG, { // temperature
					x: DW/2+10,//(DW-W_SIZE+W_SIZE)/2,
					y: current_y+8-10,//current_y+W_SIZE+I_SPACE_V,
					w: DW/2,
					align_h: hmUI.align.LEFT,
					h_space: 2,
					font_array: wNums,
					negative_image: wMinus,
					unit_sc: wDegree,
					unit_en: wDegree,
					unit_tc: wDegree,
					type: hmUI.data_type.WEATHER_CURRENT,
					show_level: hmUI.show_level.ONLY_NORMAL
				});
				widget = hmUI.createWidget(hmUI.widget.IMG_CLICK, {
					x: (DW-W_SIZE)/2,
					y: current_y,
					w: W_SIZE,
					h: W_SIZE+I_SPACE_V+15-5,
					type: hmUI.data_type.WEATHER
				});
			}

			// Progress bars
			function makeProgress(i, typei) {
				p = PROGRESSES[i];
				let props = {
					center_x: p[0],
					center_y: p[1],
					radius: PROGRESS_R,
					start_angle: p[2],
					end_angle: p[3],
					show_level: hmUI.show_level.ONLY_NORMAL
				};
				let widget=hmUI.createWidget(hmUI.widget.ARC_PROGRESS, { // background
					...props,
					line_width: PROGRESS_TH-2,
					color: setBrightness(EDITS[typei][1], P_DISABLED),
					level: 100
				});

				widget = hmUI.createWidget(hmUI.widget.IMG, { // icon
					x: [I_SPACE_H, DW-I_SIZE-I_SPACE_H][i % 2],
					y: [DW/2+I_SPACE_V-80, DH-DW/2-I_SIZE-I_SPACE_V+80][Math.floor(i/2) % 2],
					src: I_DIR+EDITS[typei][0],
					show_level: hmUI.show_level.ONLY_NORMAL
				});

				if (EDIT_TYPES[typei] !== 10006) {
					// Regular widget with data binding
					widget = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, { // progress
						...props,
						line_width: PROGRESS_TH,
						color: EDITS[typei][1],
						type: EDIT_TYPES[typei],
					});

					widget = hmUI.createWidget(hmUI.widget.TEXT_IMG, { // text
						x: [I_SPACE_H, DW-S_WIDTH-I_SPACE_H][i % 2],
						y: [DW/2+2*I_SPACE_V+I_SIZE-85, DH-DW/2-2*I_SPACE_V-I_SIZE-S_HEIGHT+85][Math.floor(i/2) % 2],
						w: S_WIDTH,
						h: I_SIZE,
						font_array: statNums,
						h_space: 2,
						align_h: [hmUI.align.LEFT, hmUI.align.RIGHT][i % 2],
						type: EDIT_TYPES[typei],
						invalid_image: statInvalid,
						show_level: hmUI.show_level.ONLY_NORMAL
					});
				} else {
					// Phone battery widget - manual control
					widget = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, { // progress
						...props,
						line_width: PROGRESS_TH,
						color: EDITS[typei][1],
						level: 0,
					});
					phoneBatteryArcs.push(widget);

					widget = hmUI.createWidget(hmUI.widget.TEXT_IMG, { // text
						x: [I_SPACE_H, DW-S_WIDTH-I_SPACE_H][i % 2],
						y: [DW/2+2*I_SPACE_V+I_SIZE-85, DH-DW/2-2*I_SPACE_V-I_SIZE-S_HEIGHT+85][Math.floor(i/2) % 2],
						w: S_WIDTH,
						h: I_SIZE,
						font_array: statNums,
						h_space: 2,
						align_h: [hmUI.align.LEFT, hmUI.align.RIGHT][i % 2],
						invalid_image: statInvalid,
						show_level: hmUI.show_level.ONLY_NORMAL
					});
					phoneBatteryWidgets.push(widget);
				}
			}
			
			// Center widgets
			function makeWidget(cType, current_y) {
				// Center widget
				let widget=hmUI.createWidget(hmUI.widget.IMG, { // icon
					x: DW/2-IL_SIZE-5,
					y: current_y,
					align_h: hmUI.align.RIGHT,
					src: IL_DIR+EDITS[EDIT_TYPES.indexOf(cType)][0],
					show_level: hmUI.show_level.ONLY_NORMAL
				});

				if (cType !== 10006) {
					widget=hmUI.createWidget(hmUI.widget.TEXT_IMG, {
						x: DW/2+10,
						y: current_y+5,
						w: DW/2,
						align_h: hmUI.align.LEFT,
						h_space: 2,
						font_array: wNums,
						type: cType,
						show_level: hmUI.show_level.ONLY_NORMAL
					});

					widget=hmUI.createWidget(hmUI.widget.IMG_CLICK, {
						x: DW/2-IL_SIZE-2,
						y: current_y,
						w: 2*IL_SIZE+4,
						h: IL_SIZE,
						type: cType
					});
				} else {
					// Phone battery center widget
					widget=hmUI.createWidget(hmUI.widget.TEXT_IMG, {
						x: DW/2+10,
						y: current_y+5,
						w: DW/2,
						align_h: hmUI.align.LEFT,
						h_space: 2,
						font_array: wNums,
						show_level: hmUI.show_level.ONLY_NORMAL
					});
					phoneBatteryWidgets.push(widget);
				}
			}
			
			if (largeGroupType === CUSTOM_WIDGETS.NONE) 
			{
				digitalClock = hmUI.createWidget(hmUI.widget.IMG_TIME, DIGITAL_TIME_V);
			}		
			else if(largeGroupType === CUSTOM_WIDGETS.BIG_BG)
			{
				digitalClock = hmUI.createWidget(hmUI.widget.IMG_TIME, DIGITAL_TIME_H_BIG);
			}
			else
			{
				digitalClock = hmUI.createWidget(hmUI.widget.IMG_TIME, DIGITAL_TIME_H);
			}
			const btDisconnected = hmUI.createWidget(hmUI.widget.IMG_STATUS, IMG_STATUS_BT_DISCONNECTED);

			let weekW = hmUI.createWidget(hmUI.widget.IMG_WEEK, {
				//x: 76+80+32-19,
                x: px(DW/2-63),                   // Center the week display
				y: dateline,
				week_en: dayNames,
				week_tc: dayNames,
				week_sc: dayNames,
				show_level: hmUI.show_level.ONLY_NORMAL
			});

			// Date
			let dateW=hmUI.createWidget(hmUI.widget.IMG_DATE, {
				//day_startX: 133+80+32-19,
                day_startX: px(DW/2-8),          // Center the day
				day_startY: dateline,
				day_zero: 1,
				day_space: 1,
				day_en_array: statNums,
				day_sc_array: statNums,
				day_tc_array: statNums,
				day_unit_sc: statSlash,
				day_unit_tc: statSlash,
				day_unit_en: statSlash,

				//month_startX: 176+80+32-19,
                month_startX: px(DW/2+37),        // Center the month next to day
				month_startY: dateline,
				month_zero: 1,
				month_space: 1,
				month_en_array: statNums,
				month_sc_array: statNums,
				month_tc_array: statNums,
				show_level: hmUI.show_level.ONLY_NORMAL
			});
		
			for (let i of PROGRESSES.keys()) {
				makeProgress(i, EDIT_TYPES.indexOf(groups[i].getProperty(hmUI.prop.CURRENT_TYPE)));
			}
			for (let i of PROGRESSES.keys()) {
				let groupType = groups[i].getProperty(hmUI.prop.CURRENT_TYPE);
				if (groupType === hmUI.data_type.PAI_WEEKLY) {
					let widget=hmUI.createWidget(hmUI.widget.IMG, {
						x: [0, DW / 2][i % 2],
						y: [0, DH - DW / 2 - I_SIZE - I_SPACE_V][Math.floor(i / 2) % 2],
						w: DW / 2,
						h: DW / 2 + I_SIZE + I_SPACE_V,
					}).addEventListener(hmUI.event.CLICK_UP, function (info) {
						hmApp.startApp({ url: 'pai_app_Screen', native: true });
					});
				} else if (groupType !== 10006) {
					let widget=hmUI.createWidget(hmUI.widget.IMG_CLICK, {
						x: [0, DW / 2][i % 2],
						y: [0, DH - DW / 2 - I_SIZE - I_SPACE_V][Math.floor(i / 2) % 2],
						w: DW / 2,
						h: DW / 2 + I_SIZE + I_SPACE_V,
						type: groupType
					});
				}
				// Phone battery widgets don't need click handlers as they're display-only
			}

			let cTypes = [
				centerGroup1.getProperty(hmUI.prop.CURRENT_TYPE),
				centerGroup2.getProperty(hmUI.prop.CURRENT_TYPE)
			];
			for (let i in cTypes) {
				if (cTypes[i] === hmUI.data_type.WEATHER) {
					makeWeather(C_POS[i]);
				} else {
					makeWidget(cTypes[i], C_POS[i]);
				}
			}
			
		
			if (screenType === hmSetting.screen_type.WATCHFACE) 
			{
				let lightWidget=hmUI.createWidget(hmUI.widget.IMG, { 
					x: (DW-55)/2,
					y: -10,
					src: IMG+'bright.png',
					show_level: hmUI.show_level.ONLY_NORMAL
				}).addEventListener(hmUI.event.CLICK_UP, function (info) {
					hmApp.startApp({url: "Settings_lightAdjustScreen", native: true});
				});
				
				if(largeGroupType === CUSTOM_WIDGETS.BIG_BG)
				{
					bgValTextImgWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG_BIG);
					bgValTextImgLowWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG_LOW_BIG);
					bgValTextImgHighWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG_HIGH_BIG);
					bgValNoDataTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_VALUE_NO_DATA_TEXT_BIG);
					bgValTimeTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_TIME_TEXT_BIG);
					bgDeltaTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT_BIG);
					bgTrendImageWidget = hmUI.createWidget(hmUI.widget.IMG, BG_TREND_IMAGE_BIG);
					bgStaleLine = hmUI.createWidget(hmUI.widget.IMG, BG_STALE_IMG_BIG);
					progress = hmUI.createWidget(hmUI.widget.IMG, IMG_LOADING_PROGRESS_BIG);
				}
				else
				{
					bgValTextImgWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG);
					bgValTextImgLowWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG_LOW);
					bgValTextImgHighWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG_HIGH);
					bgValNoDataTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_VALUE_NO_DATA_TEXT);
					bgValTimeTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_TIME_TEXT);
					bgDeltaTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT);
					bgTrendImageWidget = hmUI.createWidget(hmUI.widget.IMG, BG_TREND_IMAGE);
					bgStaleLine = hmUI.createWidget(hmUI.widget.IMG, BG_STALE_IMG);
					progress = hmUI.createWidget(hmUI.widget.IMG, IMG_LOADING_PROGRESS);
				}
				stopLoader();
			}
		}
		else if (screenType === hmSetting.screen_type.AOD)
		{
			digitalClock = hmUI.createWidget(hmUI.widget.IMG_TIME, DIGITAL_TIME_AOD_V);
			digitalClock.setProperty(hmUI.prop.VISIBLE, true);
			bgValTextImgWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG_AOD);
			bgValTextImgLowWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG_LOW_AOD);
			bgValTextImgHighWidget = hmUI.createWidget(hmUI.widget.TEXT_IMG, BG_VALUE_TEXT_IMG_HIGH_AOD);
			bgTrendImageWidget = hmUI.createWidget(hmUI.widget.IMG, BG_TREND_IMAGE_AOD);
			bgValTimeTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_TIME_TEXT_AOD);
			bgDeltaTextWidget = hmUI.createWidget(hmUI.widget.TEXT, BG_DELTA_TEXT_AOD);
		}
	},
	

    updateStart() {
		if (screenType === hmSetting.screen_type.WATCHFACE)
		{
            //Less annoying to keep everything displayed during updates
			//bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, false);
			//bgDeltaTextWidget.setProperty(hmUI.prop.VISIBLE, false);
			//bgTrendImageWidget.setProperty(hmUI.prop.VISIBLE, false);
			//bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, false);
			//bgValTextImgLowWidget.setProperty(hmUI.prop.VISIBLE, false);
			//bgValTextImgHighWidget.setProperty(hmUI.prop.VISIBLE, false);
			//bgValNoDataTextWidget.setProperty(hmUI.prop.VISIBLE, false);
			//bgStaleLine.setProperty(hmUI.prop.VISIBLE, false);
			startLoader();
		}
    },
    updateFinish(isSuccess) {
		if (screenType === hmSetting.screen_type.WATCHFACE)
		{
			stopLoader();
            // Only update widgets that actually changed
            if (isSuccess) {
                bgValTimeTextWidget.setProperty(hmUI.prop.VISIBLE, true);
                bgDeltaTextWidget.setProperty(hmUI.prop.VISIBLE, true);
                bgTrendImageWidget.setProperty(hmUI.prop.VISIBLE, true);
            }
		}
    },

    /**
     * @param {WatchdripData} watchdripData The watchdrip data info
     */
    updateValuesWidget(watchdripData) {
        if (watchdripData===null || watchdripData === undefined) 
        {
            return;
        }
        const bgObj = watchdripData.getBg();

        // Update phone battery silently (no progress indicator)
        if (screenType === hmSetting.screen_type.WATCHFACE) {
            const status = watchdripData.getStatus();
            if (status) {
                const batValue = status.getBatVal();
                if (batValue !== undefined && batValue !== null && batValue !== lastPhoneBattery) {
                    lastPhoneBattery = batValue;
                    // Update all phone battery text widgets silently
                    for (let i = 0; i < phoneBatteryWidgets.length; i++) {
                        phoneBatteryWidgets[i].setProperty(hmUI.prop.TEXT, batValue.toString());
                    }
                    
                    // Update all phone battery progress arcs silently
                    const batPercentage = parseInt(batValue) || 0;
                    for (let i = 0; i < phoneBatteryArcs.length; i++) {
                        phoneBatteryArcs[i].setProperty(hmUI.prop.LEVEL, batPercentage);
                    }
                }
            }
        }

        // Check if glucose data actually changed before showing progress
        const currentBgValue = bgObj.getBGVal();
        const currentTrend = bgObj.getArrowResource ? bgObj.getArrowResource() : null;
        const currentDelta = bgObj.delta;
        
        const bgDataChanged = (currentBgValue !== lastBgValue) || 
                             (currentTrend !== lastTrendImage) || 
                             (currentDelta !== lastDelta);

        if (bgObj.isHasData()) {
            valorBG = bgObj.getBGVal();
            if (bgObj.isLow)
                tipoColorBG = 1;
            else if (bgObj.isHigh)
                tipoColorBG = 2;
            else
                tipoColorBG = 0;

            // Only update glucose widgets if data actually changed
            if (bgDataChanged) {
                lastBgValue = currentBgValue;

                if (bgObj.isHigh || bgObj.isLow) {
                    if (bgObj.isHigh) {
                        bgValTextImgHighWidget.setProperty(hmUI.prop.TEXT, bgObj.getBGVal());
                        bgValTextImgHighWidget.setProperty(hmUI.prop.VISIBLE, true);
                        bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, false);
                        bgValTextImgLowWidget.setProperty(hmUI.prop.VISIBLE, false);
                    }
                    if (bgObj.isLow) {
                        bgValTextImgLowWidget.setProperty(hmUI.prop.TEXT, bgObj.getBGVal());
                        bgValTextImgLowWidget.setProperty(hmUI.prop.VISIBLE, true);
                        bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, false);
                        bgValTextImgHighWidget.setProperty(hmUI.prop.VISIBLE, false);
                    }
                } else {
                    bgValTextImgWidget.setProperty(hmUI.prop.TEXT, bgObj.getBGVal());
                    bgValTextImgWidget.setProperty(hmUI.prop.VISIBLE, true);
                    bgValTextImgLowWidget.setProperty(hmUI.prop.VISIBLE, false);
                    bgValTextImgHighWidget.setProperty(hmUI.prop.VISIBLE, false);
                }
            }

            if (screenType === hmSetting.screen_type.WATCHFACE) {
                bgValNoDataTextWidget.setProperty(hmUI.prop.VISIBLE, false);
            }
        } else {
            if (screenType === hmSetting.screen_type.WATCHFACE) {
                bgValNoDataTextWidget.setProperty(hmUI.prop.VISIBLE, true);
            }
        }

        // Always update delta and trend (not just when data changes)
        bgDeltaTextWidget.setProperty(hmUI.prop.TEXT, bgObj.delta);
        
        if (screenType === hmSetting.screen_type.AOD) {
            bgTrendImageWidget.setProperty(hmUI.prop.SRC, bgObj.getArrowAODResource());
        } else {
            bgTrendImageWidget.setProperty(hmUI.prop.SRC, bgObj.getArrowResource());
        }
        
        // Update the cached values for next comparison
        lastDelta = currentDelta;
        lastTrendImage = currentTrend;
    },
    /**
     * @param {WatchdripData} watchdripData The watchdrip data info
     */
    updateTimesWidget(watchdripData) {
		if (watchdripData===null || watchdripData === undefined) return;
		const bgObj = watchdripData.getBg();
		let actualValue=watchdripData.getTimeAgo(bgObj.time);
		if(lastTimeValue!=actualValue)
		{
			bgValTimeTextWidget.setProperty(hmUI.prop.TEXT, actualValue);
			lastTimeValue=actualValue;
		}
		else
			return;
		if (screenType === hmSetting.screen_type.WATCHFACE)
		{
			bgStaleLine.setProperty(hmUI.prop.VISIBLE, watchdripData.isBgStale());
		}
    },
	
    onInit() {
    },

    build() {
                try{
                    globalNS = getGlobal();
                    this.initView();
					try
					{
						const systemInfo = hmSetting.getSystemInfo();
						if(Number(systemInfo.osVersion)>=3)
							globalNS.watchdrip = new WatchdripV3();
						else
							globalNS.watchdrip = new Watchdrip();
					}catch(e)
					{
						globalNS.watchdrip = new Watchdrip();
					}
                    watchdrip = globalNS.watchdrip;
                    watchdrip.prepare();
					//watchdrip=new Watchdrip();
                    watchdrip.setUpdateValueWidgetCallback(this.updateValuesWidget);
                    watchdrip.setUpdateTimesWidgetCallback(this.updateTimesWidget);
                    watchdrip.setOnUpdateStartCallback(this.updateStart);
                    watchdrip.setOnUpdateFinishCallback(this.updateFinish);
					//watchdrip.graph=null;
					

                    //graph configuration
					if(screenType === hmSetting.screen_type.WATCHFACE && editGroupLarge != null && editGroupLarge != undefined)
					{
						let largeGroupType = editGroupLarge.getProperty(hmUI.prop.CURRENT_TYPE);
						if(largeGroupType != CUSTOM_WIDGETS.NONE && largeGroupType != CUSTOM_WIDGETS.BIG_BG)
						{
							let lineStyles = {};
							const POINT_SIZE = GRAPH_SETTINGS.point_size
							const TREATMENT_POINT_SIZE = GRAPH_SETTINGS.treatment_point_size
							const LINE_SIZE = GRAPH_SETTINGS.line_size
							lineStyles['predict'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
							lineStyles['high'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
							lineStyles['low'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
							lineStyles['inRange'] = new PointStyle(POINT_SIZE, POINT_SIZE, POINT_SIZE);
							if (largeGroupType === CUSTOM_WIDGETS.GRAPH_LOW_HIGH_LINES) {
								lineStyles['lineLow'] = new PointStyle("", LINE_SIZE);
								lineStyles['lineHigh'] = new PointStyle("", LINE_SIZE);
							}
							lineStyles['treatment'] = new PointStyle(TREATMENT_POINT_SIZE, TREATMENT_POINT_SIZE);

							let RECT = {
								x: GRAPH_SETTINGS.x,
								y: GRAPH_SETTINGS.y,
								w: GRAPH_SETTINGS.w,
								h: GRAPH_SETTINGS.h,
								color: Colors.accent,
							};
							watchdrip.createGraph(GRAPH_SETTINGS.x,GRAPH_SETTINGS.y,GRAPH_SETTINGS.w,GRAPH_SETTINGS.h, lineStyles);
							//graphEnabled=true;
						}
					}
                    watchdrip.start();
                }
                catch (e) {
					//console.log("ERROR "+e);
                }
    },
       onDestroy() {
           watchdrip.destroy();
		   //delete watchdrip;
		   watchdrip=null;
           stopLoader();
       },

       onShow() {
       },

       onHide() {
       },
});
