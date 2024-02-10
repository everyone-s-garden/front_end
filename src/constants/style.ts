// 색상
interface ICOLOR {
  GREEN: string;
  BLACK: string;
  ORNAGE: string;
  YELLOW: string;
  BACKGROUND: string;
}

export const COLOR: ICOLOR = {
  GREEN: '#9ACE79',
  BLACK: '#414C38',
  ORNAGE: '#F77800',
  YELLOW: '#FFD764',
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
  MEDIUM: '400',
  SEMIBOLD: '500',
  BOLD: '600',
};

// 미디어 쿼리 브레이크 포인트
interface IBREAK_POINT {
  MOBILE: string;
  TABLET: string;
  LABTOP: string;
  MOBILE_NUMBER: number;
  TABLET_NUMBER: number;
  LABTOP_NUMBER: number;
}

export const BREAK_POINT: IBREAK_POINT = {
  MOBILE: '640px',
  TABLET: '992px',
  LABTOP: '1024px',
  MOBILE_NUMBER: 640,
  TABLET_NUMBER: 992,
  LABTOP_NUMBER: 1024,
};
