import * as React from "react";
import Svg, { SvgProps, Rect, Path } from "react-native-svg";
const SvgXrp = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={48} height={48} rx={24} fill="#414141" />
    <Path
      d="M34.605 11.308h4.338l-9.026 9.127a8.302 8.302 0 0 1-11.834 0l-9.028-9.127h4.338l6.86 6.935a5.258 5.258 0 0 0 7.494 0l6.858-6.935ZM13.338 36.692H9l9.083-9.184a8.302 8.302 0 0 1 11.834 0L39 36.691h-4.339l-6.914-6.99a5.258 5.258 0 0 0-7.494 0l-6.915 6.99Z"
      fill="#fff"
    />
  </Svg>
);
export default SvgXrp;
