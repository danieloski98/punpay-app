import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgEx = (props: SvgProps) => (
  <Svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M16.006 3v18M16.006 21l4-4M8.007 21V3M8.007 3l-4 4"
      stroke="#1B279C"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgEx;
