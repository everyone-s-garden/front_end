import 'styled-components';
import { Colors, Devices, FontWeight } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    devices: Devices;
    fontWeight: FontWeight;
  }
}
