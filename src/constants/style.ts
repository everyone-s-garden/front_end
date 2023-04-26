// 색상
interface IPALETTE {
  0: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

interface ICOLOR {
  GREEN: IPALETTE;
  BLACK: IPALETTE;
  ORANGE: IPALETTE;
  YELLOW: IPALETTE;
  BACKGROUND: string;
}

export const COLOR: ICOLOR = {
  GREEN: {
    0: '#F1F7E8',
    100: '#DCEAC8',
    200: '#C6DDA5',
    300: '#AFD082',
    400: '#9FC668',
    500: '#8FBC52',
    600: '#80AC49',
    700: '#6D993E',
    800: '#5A8534',
    900: '#296512',
  },
  BLACK: {
    0: '#F4FFE9',
    100: '#F0FBE4',
    200: '#EBF6DF',
    300: '#E0EBD4',
    400: '#BEC8B3',
    500: '#A0AA95',
    600: '#76806C',
    700: '#626C58',
    800: '#434C3A',
    900: '#222A1A',
  },
  ORANGE: {
    0: '#FDF3E2',
    100: '#FAE0B7',
    200: '#F7CC8A',
    300: '#F4B75F',
    400: '#F2A745',
    500: '#F09937',
    600: '#EE8E34',
    700: '#E77E30',
    800: '#E06F2C',
    900: '#D75726',
  },
  YELLOW: {
    0: '#FEF9E6',
    100: '#FCEEC0',
    200: '#FAE399',
    300: '#F9D976',
    400: '#F7D062',
    500: '#F6C857',
    600: '#F3BB51',
    700: '#F0AA4B',
    800: '#EE9B46',
    900: '#EA803D',
  },
  BACKGROUND: '#ffffff',
};

// 폰트 굵기
interface IFONT_WEIGHT {
  REGULAR: string;
  MEDIUM: string;
  SEMIBOLD: string;
  BOLD: string;
}

export const FONT_WEIGHT: IFONT_WEIGHT = {
  REGULAR: '300',
  MEDIUM: '500',
  SEMIBOLD: '600',
  BOLD: '700',
};

// 미디어 쿼리 브레이크 포인트
interface IBREAK_POINT {
  MOBILE: string;
  TABLET: string;
  LABTOP: string;
}

export const BREAK_POINT: IBREAK_POINT = {
  MOBILE: '640px',
  TABLET: '992px',
  LABTOP: '1024px',
};
