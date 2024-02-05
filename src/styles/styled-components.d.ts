import 'styled-components';
import { Colors, Devices } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors;
    devices: Devices;
  }
}
