import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgUsero = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    {...props}
  >
    <Path
      opacity={0.4}
      d="M21.08 8.58v6.84c0 1.12-.6 2.16-1.57 2.73l-5.94 3.43c-.97.56-2.17.56-3.15 0l-5.94-3.43a3.15 3.15 0 0 1-1.57-2.73V8.58c0-1.12.6-2.16 1.57-2.73l5.94-3.43c.97-.56 2.17-.56 3.15 0l5.94 3.43c.97.57 1.57 1.6 1.57 2.73Z"
      fill="#5149F7"
    />
    <Path
      d="M12 12a2.33 2.33 0 1 0 0-4.66A2.33 2.33 0 0 0 12 12ZM14.68 16.66c.81 0 1.28-.9.83-1.57-.68-1.01-2-1.69-3.51-1.69-1.51 0-2.83.68-3.51 1.69-.45.67.02 1.57.83 1.57h5.36Z"
      fill="#5149F7"
    />
  </Svg>
);
export default SvgUsero;
