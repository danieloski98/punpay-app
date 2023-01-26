import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const SvgArrowDown = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    // xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#arrow-down_svg__a)">
      <Path
        d="M15.81 11.203a1.143 1.143 0 0 0-1.23-.477l-3.152.787v-27.259c0-.632-.51-1.143-1.142-1.143H5.714c-.631 0-1.142.511-1.142 1.143v27.259l-3.152-.787a1.146 1.146 0 0 0-1.23.477c-.266.403-.252.93.038 1.317l6.857 9.142c.458.61 1.372.61 1.83 0l6.857-9.142c.29-.386.304-.914.038-1.317Z"
        fill="#FF8860"
      />
    </G>
    <Defs>
      <ClipPath id="arrow-down_svg__a">
        <Path fill="#fff" d="M0 0h16v22.222H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgArrowDown;
