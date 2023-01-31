import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgKeyboard = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    {...props}
  >
    <Path
      opacity={0.4}
      d="M18.27 3.35c-.47-.07-1.01-.1-1.77-.1h-9c-.75 0-1.3.03-1.74.09C2.41 3.71 1.75 5.7 1.75 9v6c0 3.3.66 5.29 3.98 5.65.47.07 1.01.1 1.77.1h9c.75 0 1.3-.03 1.74-.09 3.35-.37 4.01-2.35 4.01-5.66V9c0-3.3-.66-5.29-3.98-5.65Z"
      fill="#5149F7"
    />
    <Path
      d="M17 10.75h-3.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H17c.41 0 .75.34.75.75s-.34.75-.75.75ZM10.1 11c-.55 0-1-.45-1-1s.44-1 1-1h.01c.55 0 1 .45 1 1s-.45 1-1.01 1ZM7.1 11c-.55 0-1-.45-1-1s.44-1 1-1c.55 0 1 .45 1 1s-.44 1-1 1ZM17 16.25H7.02c-.41 0-.76-.34-.76-.75s.33-.75.74-.75h10c.41 0 .75.34.75.75s-.34.75-.75.75Z"
      fill="#5149F7"
    />
  </Svg>
);
export default SvgKeyboard;