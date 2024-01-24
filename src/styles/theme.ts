const colors = {
  black: '',
  white: '#FFF',
};

const devices = {
  mobile: `(min-width: 640px)`,
  tablet: `(min-width: 992px)`,
  desktop: `(min-width: 1024px)`,
};

const theme = {
  colors,
  devices,
};

export type Colors = typeof colors;
export type Devices = typeof devices;

export default theme;
