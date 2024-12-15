import {img,range} from "../../utils/helper";
import {Colors} from "../../utils/config/constants";

const bgNumArr = range(10).map((v) => {
    return img(`bgNum/${v}.png`);
});

const bgNumLowArr = range(10).map((v) => {
    return img(`bgNumLow/${v}.png`);
});

const bgNumHighArr = range(10).map((v) => {
    return img(`bgNumHigh/${v}.png`);
});

const bigNumArr = range(10).map((v) => {
    return img(`bigNum/${v}.png`);
});

const bigNumAODArr = range(10).map((v) => {
    return img(`bigNumAOD/${v}.png`);
});

// also used for bg value in AOD
const bgNumAODArr = range(10).map((v) => {
    return img(`bgNumAOD/${v}.png`);
});

// also used for bg value in AOD
const bgNumAODLowArr = range(10).map((v) => {
    return img(`bgNumAODLow/${v}.png`);
});

// also used for bg value in AOD
const bgNumAODHighArr = range(10).map((v) => {
    return img(`bgNumAODHigh/${v}.png`);
});



// also used for bg value in AOD
const bgNumStandAODArr = range(10).map((v) => {
    return img(`bgNumStandAOD/${v}.png`);
});

// also used for bg value in AOD
const bgNumStandAODLowArr = range(10).map((v) => {
    return img(`bgNumStandAODLow/${v}.png`);
});

// also used for bg value in AOD
const bgNumStandAODHighArr = range(10).map((v) => {
    return img(`bgNumStandAODHigh/${v}.png`);
});




const bgBigNumArr = range(10).map((v) => {
    return img(`bgBigNum/${v}.png`);
});

const bgBigNumLowArr = range(10).map((v) => {
    return img(`bgBigNumLow/${v}.png`);
});

const bgBigNumHighArr = range(10).map((v) => {
    return img(`bgBigNumHigh/${v}.png`);
});

// also used for bg value in AOD
const bgBigNumAODArr = range(10).map((v) => {
    return img(`bgBigNumAOD/${v}.png`);
});

// also used for bg value in AOD
const bgBigNumAODLowArr = range(10).map((v) => {
    return img(`bgBigNumAODLow/${v}.png`);
});

// also used for bg value in AOD
const bgBigNumAODHighArr = range(10).map((v) => {
    return img(`bgBigNumAODHigh/${v}.png`);
});


const smallNumArr = range(10).map((v) => {
    return img(`smallNum/${v}.png`);
});

const timeNums = range(10).map((v) => {
    return img(`time_numbers/${v}.png`);
});

const timeNumsAOD = range(10).map((v) => {
    return img(`time_numbers_aod/${v}.png`);
});

const DW = 194;
const DH = 368;
const T_WIDTH = 50;
const T_HEIGHT = 94;
const T_SPACE = 10;

const dateline = DH/2+T_HEIGHT+T_SPACE/2+12;
const statNums = range(0, 10).map((v) => {
    return img(`status_numbers/s${v}.png`);
});

export const DIGITAL_TIME_H = {
    hour_startX: px(18-5),
    hour_startY: px(25+110-50),
    hour_zero: true,
    hour_space: 2,
    hour_align: hmUI.align.CENTER_H,
    hour_array: bigNumArr,
    hour_unit_sc: img('bigNum/sp.png'), // colon
    hour_unit_tc: img('bigNum/sp.png'),
    hour_unit_en: img('bigNum/sp.png'),
    minute_zero: true,
    minute_space: 2,
    minute_align: hmUI.align.CENTER_H,
    minute_array: bigNumArr,
    minute_follow: 1,
    am_x: px(137-5),
    am_y: px(40+110-50),
    am_sc_path: img('bigNum/am.png'),
    am_en_path: img('bigNum/am.png'),
    pm_x: px(137-5),
    pm_y: px(40+110-50),
    pm_sc_path: img('bigNum/pm.png'),
    pm_en_path: img('bigNum/pm.png'),
    second_zero: true,
    second_startX: 30,
    second_startY: dateline,
    second_align: hmUI.align.CENTER_H,
    second_array: statNums,
    second_space: 3,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const DIGITAL_TIME_H_BIG = {
    hour_startX: px(18-5),
    hour_startY: px(225),
    hour_zero: true,
    hour_space: 2,
    hour_align: hmUI.align.CENTER_H,
    hour_array: bigNumArr,
    hour_unit_sc: img('bigNum/sp.png'), // colon
    hour_unit_tc: img('bigNum/sp.png'),
    hour_unit_en: img('bigNum/sp.png'),
    minute_zero: true,
    minute_space: 2,
    minute_align: hmUI.align.CENTER_H,
    minute_array: bigNumArr,
    minute_follow: 1,
    am_x: px(137-5),
    am_y: px(225),
    am_sc_path: img('bigNum/am.png'),
    am_en_path: img('bigNum/am.png'),
    pm_x: px(137-5),
    pm_y: px(225),
    pm_sc_path: img('bigNum/pm.png'),
    pm_en_path: img('bigNum/pm.png'),
    second_zero: true,
    second_startX: 30,
    second_startY: dateline,
    second_align: hmUI.align.CENTER_H,
    second_array: statNums,
    second_space: 3,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const DIGITAL_TIME_V = {
	hour_zero: true,
    hour_startX: (DW-T_SPACE)/2-T_WIDTH,
    hour_startY: (DH-T_SPACE)/2-T_HEIGHT,
    hour_align: hmUI.align.CENTER_H,
    hour_array: timeNums,
    hour_space: T_SPACE,
    hour_unit_sc: null, // colon
    hour_unit_tc: null,
    hour_unit_en: null,

    minute_follow: false,
    minute_zero: true,
    minute_startX: (DW-T_SPACE)/2-T_WIDTH,
    minute_startY: ((DH+T_SPACE-9)/2)-30-6+12,
    minute_align: hmUI.align.CENTER_H,
    minute_array: timeNums,
    minute_space: T_SPACE,

    second_zero: true,
    second_startX: 30,
    second_startY: dateline,
    second_align: hmUI.align.CENTER_H,
    second_array: statNums,
    second_space: 3,
	
    am_sc_path: null,
    am_en_path: null,
    pm_sc_path: null,
    pm_en_path: null,

    show_level: hmUI.show_level.ONLY_NORMAL	
};

export const DIGITAL_TIME_AOD_V = {
	hour_zero: true,
    hour_startX: (DW-T_SPACE)/2-T_WIDTH,
    hour_startY: (DH-T_SPACE)/2-T_HEIGHT-32-20-10-15,
    hour_align: hmUI.align.CENTER_H,
    hour_array: timeNumsAOD,
    hour_space: T_SPACE,
    hour_unit_sc: null, // colon
    hour_unit_tc: null,
    hour_unit_en: null,
	
    minute_follow: false,
    minute_zero: true,
    minute_startX: (DW-T_SPACE)/2-T_WIDTH,
    minute_startY: ((DH+T_SPACE-9)/2)-50-6-20-20,
    minute_align: hmUI.align.CENTER_H,
    minute_array: timeNumsAOD,
    minute_space: T_SPACE,
	
    am_sc_path: null,
    am_en_path: null,
    pm_sc_path: null,
    pm_en_path: null,
	
    second_array: null,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_AOD = {
    x: px(2),
    y: px(210+20),
//    y: px(164+50),
    w: px(190),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNumAOD/d.png'),
    font_array: bgNumAODArr,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_LOW_AOD = {
    x: px(2),
    y: px(210+20),
//    y: px(164+50),
    w: px(190),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNumAODLow/d.png'),
    font_array: bgNumAODLowArr,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_HIGH_AOD = {
    x: px(2),
    y: px(210+20),
//    y: px(164+50),
    w: px(190),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNumAODHigh/d.png'),
    font_array: bgNumAODHighArr,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_AOD_STAND = {
    pos_x: px(7),
    pos_y: px(0),
	w: px(320),
    h: px(180),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    dot_image: img('bgNumStandAOD/d.png'),
    font_array: bgNumStandAODArr,
    center_x: 160,
    center_y: 90,	
	angle: 90,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_LOW_AOD_STAND = {
    pos_x: 7,
    pos_y: 0,
	w: 320,
    h: 180,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    dot_image: img('bgNumStandAODLow/d.png'),
    font_array: bgNumStandAODLowArr,
    center_x: 160,
    center_y: 90,	
	angle: 90,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_HIGH_AOD_STAND = {
    pos_x: 7,
    pos_y: 0,
	w: 320,
    h: 180,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    dot_image: img('bgNumStandAODHigh/d.png'),
    font_array: bgNumStandAODHighArr,
    center_x: 160,
    center_y: 90,	
	angle: 90,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_NO_DATA_TEXT = {
    x: px(3),
    y: px(115-10+180-55),
    w: px(59),
    h: px(46),
    color: Colors.white,
    text_size: px(34),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: 'No data',
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_NO_DATA_TEXT_BIG = {
    x: px(11),
    y: px(150-60),
    w: px(150),
    h: px(80),
    color: Colors.white,
    text_size: px(40),
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    text_style: hmUI.text_style.NONE,
    text: 'No data',
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG = {
    x: px(46-44),
    y: px(115-10+180-55),
    w: px(113),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNum/d.png'),
    font_array: bgNumArr,
    visible: false,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_LOW = {
    x: px(46-44-2),
    y: px(115-10+180-55),
    w: px(113),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNumLow/d.png'),
    font_array: bgNumLowArr,
    visible: false,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_HIGH = {
    x: px(46-44-2),
    y: px(115-10+180-55),
    w: px(113),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgNumHigh/d.png'),
    font_array: bgNumHighArr,
    visible: false,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL
};


export const BG_VALUE_TEXT_IMG_BIG = {
    x: px(11),
    y: px(150-55),
    w: px(150),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgBigNum/d.png'),
    font_array: bgBigNumArr,
    visible: false,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_LOW_BIG = {
    x: px(11),
    y: px(150-55),
    w: px(150),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgBigNumLow/d.png'),
    font_array: bgBigNumLowArr,
    visible: false,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_HIGH_BIG = {
    x: px(11),
    y: px(150-55),
    w: px(150),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgBigNumHigh/d.png'),
    font_array: bgBigNumHighArr,
    visible: false,
    h_space:1,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_VALUE_TEXT_IMG_BIG_AOD = {
    x: px(11),
    y: px(150),
    w: px(150),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgBigNumAOD/d.png'),
    font_array: bgBigNumAODArr,
    visible: false,
    h_space:1,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_LOW_BIG_AOD = {
    x: px(11),
    y: px(150),
    w: px(150),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgBigNumAODLow/d.png'),
    font_array: bgBigNumAODLowArr,
    visible: false,
    h_space:1,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_VALUE_TEXT_IMG_HIGH_BIG_AOD = {
    x: px(11),
    y: px(150),
    w: px(150),
    align_h: hmUI.align.CENTER_H,
    dot_image: img('bgBigNumAODHigh/d.png'),
    font_array: bgBigNumAODHighArr,
    visible: false,
    h_space:1,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_TIME_TEXT = {
    x: px(100+5),
    y: px(300+15-55),
    w: px(80),
    h: px(30),
    color: Colors.defaultTransparent,
    text_size: px(23),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_DELTA_TEXT = {
    x: px(90+5+2),
    y: px(225+55-55),
    w: px(56),
    h: px(41),
    color: Colors.defaultTransparent,
    text_size: px(27),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_TIME_TEXT_BIG = {
    x: px(71),
    y: px(235-60),
    w: px(120),
    h: px(40),
    color: Colors.defaultTransparent,
    text_size: px(35),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_DELTA_TEXT_BIG = {
    x: px(1),
    y: px(235-60),
    w: px(70),
    h: px(40),
    color: Colors.defaultTransparent,
    text_size: px(35),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONLY_NORMAL
};


export const BG_TREND_IMAGE = {
    src: 'watchdrip/arrows/None.png',
    x: px(101+30+5+5+5),
    y: px(225+55-55),
    w: px(60),
    h: px(41),
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_DELTA_TEXT_AOD = {
    x: px(1),
    y: px(147),
    w: px(192),
    h: px(60),
    color: Colors.defaultTransparent,
    text_size: px(35),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_TIME_TEXT_AOD = {
    x: px(1),
    y: px(180),
    w: px(192),
    h: px(60),
    color: Colors.defaultTransparent,
    text_size: px(35),
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.TOP,
    text_style: hmUI.text_style.NONE,
    show_level: hmUI.show_level.ONAL_AOD
};


export const BG_TREND_IMAGE_AOD = {
    src: 'watchdrip/arrowsAOD/None.png',
    x: px(77),
    y: px(320+5),
    w: px(60),
    h: px(41),
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_TREND_IMAGE_AOD_STAND = {
    src: 'watchdrip/arrowsAOD/None.png',
    x: px(60),
    y: px(295),
    w: px(68),
    h: px(68),
    center_x: 34,
    center_y: 34,
	angle: 90,
    show_level: hmUI.show_level.ONAL_AOD
};


export const BG_TREND_IMAGE_BIG = {
    src: 'watchdrip/arrows/None.png',
    x: px(150),
    y: px(145-50),
    w: px(40),
    h: px(40),
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_TREND_IMAGE_BIG_AOD = {
    src: 'watchdrip/arrowsAOD/None.png',
    x: px(150),
    y: px(145),
    w: px(40),
    h: px(40),
    show_level: hmUI.show_level.ONAL_AOD
};

export const BG_STALE_IMG = {
//    x: px(69-45),
//    y: px(135-10),
    x: px(64-50-2),
    y: px(105+30+180-55),
    src: 'watchdrip/stale.png',
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const BG_STALE_IMG_BIG = {
//    x: px(69-45),
//    y: px(135-10),
    x: px(20),
    y: px(200-55),
	w: px(150),
    src: 'watchdrip/stale.png',
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const IMG_LOADING_PROGRESS = {
    x: px(76),
    y: px(285+10-55),
    src: 'watchdrip/progress.png',
    angle: 0,
    center_x: 20,
    center_y: 20,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const IMG_LOADING_PROGRESS_BIG = {
    x: px(61),
    y: px(160-55),
    src: 'watchdrip/progress_big.png',
    angle: 0,
    center_x: 35,
    center_y: 35,
    visible: false,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const IMG_STATUS_BT_DISCONNECTED = {
    x: px(5),
    y: px(200),
    src: img('status/bt_disconnect.png'),
    type: hmUI.system_status.DISCONNECT,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const CUSTOM_WIDGETS = {
    NONE: 100001,
    GRAPH: 100011,
    GRAPH_LOW_HIGH_LINES: 100012,
    BIG_BG: 100015
};
// END edit group treatments aaps/xdrip data


// BEGIN edit group default styles
const editWidgetW = 68;
const editWidgetH = 60;
const editWidgetIconHeight = 30;
const editWidgetIconWidth = 30;
const editWidgetIconMargin = 7;
const editWidgetArcRadius = 12;
const editWidgetArcLineWidth = 8;
const editWidgetArcMarginX = 1;
const editWidgetArcMarginTop = -1;

const editGroupTypes = [
    {
        type: CUSTOM_WIDGETS.NONE,
        title_sc: 'None',
        title_tc: 'None',
        title_en: 'None',
        preview: img('widgets/empty.png')
    }
];

const editGroupTypesLarge = editGroupTypes.concat(
    [
        {
            type: CUSTOM_WIDGETS.GRAPH_LOW_HIGH_LINES,
            title_sc: 'xDrip graph low/high lines',
            title_tc: 'xDrip graph low/high lines',
            title_en: 'xDrip graph low/high lines',
            preview: img('widgets/GRAPH_LOW_HIGH_LINES.png')
        },
        {
            type: CUSTOM_WIDGETS.GRAPH,
            title_sc: 'xDrip graph',
            title_tc: 'xDrip graph',
            title_en: 'xDrip graph',
            preview: img('widgets/GRAPH.png')
        },
        {
            type: CUSTOM_WIDGETS.BIG_BG,
            title_sc: 'Big BG values',
            title_tc: 'Big BG values',
            title_en: 'Big BG values',
            preview: img('widgets/BIG.png')
        }		
    ]
);

export const EDIT_GROUP_W_DEFAULTS = {
    x: px(5),
    w: px(184),
    h: px(36),
    select_image: img('mask/select-wide.png'),
    un_select_image: img('mask/un_select-wide.png'),
    optional_types: editGroupTypes,
    count: editGroupTypes.length,
    tips_BG: img('mask/text_tag-wide.png'),
    tips_width: 148,
    tips_margin: 2, // optional, default value: 0
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT,
    tips_x: 0,
    tips_y: -45
};

// Default styles for all IMG widgets 
export const EDIT_DEFAULT_IMG = {
    // TODO: make images full width and remove this
    w: px(editWidgetW), // full width to center
    show_level: hmUI.show_level.ONLY_NORMAL
};

// Default styles for all ARC_PROGRESS Left widgets
const EDIT_DEFAULT_ARC_PROGRESS_LEFT = {
    radius: px(editWidgetArcRadius),
    start_angle: 180,
    end_angle: 360,
    color: Colors.accent,
    line_width: editWidgetArcLineWidth,
    show_level: hmUI.show_level.ONLY_NORMAL
};
// Default styles for all ARC_PROGRESS RIGHT widgets
const EDIT_DEFAULT_ARC_PROGRESS_RIGHT = {
    radius: px(editWidgetArcRadius),
    start_angle: 180,
    end_angle: 0,
    color: Colors.accent,
    line_width: editWidgetArcLineWidth,
    show_level: hmUI.show_level.ONLY_NORMAL
};

export const EDIT_DEFAULT_ARC_PROGRESS = {
    left: EDIT_DEFAULT_ARC_PROGRESS_LEFT,
    right: EDIT_DEFAULT_ARC_PROGRESS_RIGHT

};

// Default styles for all TEXT_IMG widgets
export const EDIT_DEFAULT_TEXT_IMG = {
    w: px(editWidgetW),
    padding: false,
    h_space: 1,
    align_h: hmUI.align.CENTER_H,
    show_level: hmUI.show_level.ONLY_NORMAL,
    font_array: smallNumArr,
    dot_image: img('smallNum/d.png'),
    negative_image: img('smallNum/negative_image.png')
};
// END edit group default styles


// BEGIN Top Edit Widgets
const topX = 124;
const topY = 110;

export const EDIT_TOP_GROUP = {
    edit_id: 101,
    x: px(topX),
    y: px(topY),
    default_type: hmUI.edit_type.HEART
}; 

// Styles for all Top IMG widgets
export const EDIT_TOP_IMG = {
    x: px(topX),
    y: px(topY)
};

// Styles for all Top ARC_PROGRESS widgets
const EDIT_TOP_ARC_PROGRESS_LEFT = {
    center_x: px(topX + editWidgetArcRadius + editWidgetArcMarginX + (editWidgetArcLineWidth / 2)),
    center_y: px(topY + editWidgetArcRadius + editWidgetArcMarginTop + (editWidgetArcLineWidth / 2))
};
// Styles for all Top ARC_PROGRESS Right widgets
const EDIT_TOP_ARC_PROGRESS_RIGHT = {
    center_x: px(topX + editWidgetArcRadius + (2 * editWidgetArcMarginX) + editWidgetIconWidth + (editWidgetArcLineWidth / 2) + 1),
    center_y: px(topY + editWidgetArcRadius + editWidgetArcMarginTop + (editWidgetArcLineWidth / 2))
};
export const EDIT_TOP_ARC_PROGRESS = {
    left: EDIT_TOP_ARC_PROGRESS_LEFT,
    right: EDIT_TOP_ARC_PROGRESS_RIGHT
};

// Styles for all Top TEXT_IMG widgets
export const EDIT_TOP_TEXT_IMG = {
    x: px(topX),
    y: px(topY + editWidgetIconHeight + editWidgetIconMargin)
};
// END Top Left Edit Widgets


// BEGIN Wide Edit Widgets
const largeX = 65;
const largeY = 340-55;

export const EDIT_GROUP_DEFAULTS = {
    w: px(editWidgetW),
    h: px(editWidgetH),
    select_image: img('mask/select.png'),
    un_select_image: img('mask/un_select.png'),
    optional_types: editGroupTypes,
    count: editGroupTypes.length,
    tips_BG: img('mask/text_tag.png'),
    tips_x: -35,
    tips_y: -45,
    tips_width: 88,
    tips_margin: 1, // optional, default value: 0
    show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT
};

export const EDIT_LARGE_GROUP = {
    edit_id: 112,
    select_image: img('mask/select-large.png'),
    un_select_image: img('mask/un_select-large.png'),
    x: px(0),
    y: px(225-55),
    w: px(194),
    h: px(72),
    optional_types: editGroupTypesLarge,
    count: editGroupTypesLarge.length,
    default_type: CUSTOM_WIDGETS.BIG_BG,
};

// Default styles for all Wide IMG widgets
const LARGE_IMAGE_Y_SHIFT = 30;

export const EDIT_LARGE_IMG = {
    x: px(largeX),
    y: px(largeY + LARGE_IMAGE_Y_SHIFT)
};

// Styles for all Wide ARC_PROGRESS widgets
const EDIT_LARGE_ARC_PROGRESS_LEFT = {
    center_x: px(largeX + editWidgetArcRadius + editWidgetArcMarginX + (editWidgetArcLineWidth / 2)),
    center_y: px(largeY + LARGE_IMAGE_Y_SHIFT + editWidgetArcRadius + editWidgetArcMarginTop + (editWidgetArcLineWidth / 2))
};
// Styles for all Wide ARC_PROGRESS Right widgets
const EDIT_LARGE_ARC_PROGRESS_RIGHT = {
    center_x: px(largeX + editWidgetArcRadius + (2 * editWidgetArcMarginX) + editWidgetIconWidth + (editWidgetArcLineWidth / 2) + 1),
    center_y: px(largeY + LARGE_IMAGE_Y_SHIFT + editWidgetArcRadius + editWidgetArcMarginTop + (editWidgetArcLineWidth / 2))
};
export const EDIT_LARGE_ARC_PROGRESS = {
    left: EDIT_LARGE_ARC_PROGRESS_LEFT,
    right: EDIT_LARGE_ARC_PROGRESS_RIGHT
};

// Styles for all Wide TEXT_IMG widgets
export const EDIT_LARGE_TEXT_IMG = {
    x: px(largeX),
    y: px(largeY)
};
// END Wide Edit Widgets


export const GRAPH_SETTINGS = {
    x: 5,
    y: 100,
    w: 184,
    h: 140,
    point_size: 5,
    treatment_point_size: 9,
    line_size: 1
};

// END Edit Widgets

