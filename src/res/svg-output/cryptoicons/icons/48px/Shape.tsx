import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const SvgShape = (props: SvgProps) => (
  <Svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.174 12.606 15 6.78l5.829 5.829 3.39-3.39L15 0 5.784 9.216l3.39 3.39ZM0 15l3.39-3.39L6.78 15l-3.39 3.39L0 15Zm15 8.22-5.826-5.826L5.78 20.78l.004.004L15 30l9.219-9.22-3.39-3.389L15 23.22ZM23.22 15l3.39-3.39L30 15l-3.39 3.39L23.22 15Zm-4.779-.003h-.003L15 11.559 12.457 14.1l-.292.293-.601.602-.007.005.006.006L15 18.441 18.441 15v-.003Z"
      fill="#fff"
    />
  </Svg>
);
export default SvgShape;
