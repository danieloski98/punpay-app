import * as React from "react";
import Svg, { SvgProps, Circle, Path } from "react-native-svg";
const SvgEth = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={24} cy={24} r={24} fill="#627EEA" />
    <Path
      d="M24.747 6v13.305l11.245 5.025L24.748 6Z"
      fill="#fff"
      fillOpacity={0.602}
    />
    <Path d="M24.747 6 13.5 24.33l11.247-5.025V6Z" fill="#fff" />
    <Path
      d="M24.747 32.952v9.04L36 26.425l-11.253 6.528Z"
      fill="#fff"
      fillOpacity={0.602}
    />
    <Path d="M24.747 41.993V32.95L13.5 26.424l11.247 15.569Z" fill="#fff" />
    <Path
      d="m24.747 30.86 11.245-6.53-11.245-5.022V30.86Z"
      fill="#fff"
      fillOpacity={0.2}
    />
    <Path
      d="m13.5 24.33 11.247 6.53V19.308L13.5 24.33Z"
      fill="#fff"
      fillOpacity={0.602}
    />
  </Svg>
);
export default SvgEth;
