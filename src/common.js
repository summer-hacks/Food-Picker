import { Dimensions } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Colors
export const COLOR_PRIMARY = '#FF8364'; // orange
export const COLOR_PRIMARY_LIGHT = '#ffb7a4';
export const COLOR_SECONDARY = '#FFEBC2'; // yellow
export const COLOR_TERTIARY = '#EDEDED'; // grey
export const COLOR_TERTIARY_DARK = '#5F5F5F';

// Typography
export const FONT_NORMAL = 'karla-regular';
export const FONT_BOLD = 'karla-bold';
export const FONT_ITALIC = 'karla-italic';
export const FONT_BOLD_ITALIC = 'karla-bolditalic';

// -----SIZING AND SPACING-----
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

// Sign-Up / Login
export const CONTAINER_PADDING_LEFT = '15%';
export const CONTAINER_PADDING_RIGHT = '15%';

export const SECTION_HEIGHT = hp('20%');
export const STEP_HEIGHT = hp('7%');

export const HEADING_PADDING_TOP = hp('1%');

export const HEADING_BOTTOM = hp('3.5%');
export const BODY_BOTTOM = hp('5%');
export const NEXT_BUTTON_LEFT = wp('7%');
export const NEXT_BUTTON_BOTTOM = hp('3%');

export const BODY_FONT_SIZE = hp('4%');
export const HEADING_FONT_SIZE = hp('5%');
export const STEP_FONT_SIZE = 24;
export const STEP_SUBSCRIPT_FONT_SIZE = 16;

export const ICON_BORDER_RADIUS = 50;
export const ICON_BORDER_WIDTH = 3;
export const TEXTINPUT_BOTTOM_BORDER_WIDTH = 3;
