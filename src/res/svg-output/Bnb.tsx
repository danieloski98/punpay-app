import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
const SvgBnb = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={24} cy={24} r={24} fill="#F3BA2F" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.174 21.606 24 15.78l5.829 5.829 3.39-3.39L24 9l-9.216 9.216 3.39 3.39ZM9 24l3.39-3.39L15.78 24l-3.39 3.39L9 24Zm15 8.22-5.826-5.826-3.394 3.386.004.004L24 39l9.219-9.22-3.39-3.389L24 32.22ZM32.22 24l3.39-3.39L39 24l-3.39 3.39L32.22 24Zm-4.779-.003h-.003L24 20.559 21.457 23.1l-.292.292-.601.604-.006.004.006.006L24 27.441 27.441 24v-.003Z"
      fill="#fff"
    />
  </Svg>
);
export default SvgBnb;
