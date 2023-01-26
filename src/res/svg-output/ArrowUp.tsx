import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const SvgArrowUp = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    {...props}
  >
    <G clipPath="url(#arrow-up_svg__a)">
      <Path
        d="M.21 11.142c.26.391.737.575 1.192.462l3.054-.763v26.421c0 .613.496 1.108 1.108 1.108h4.431c.612 0 1.108-.495 1.108-1.108V10.841l3.055.763c.452.113.93-.07 1.192-.462a1.11 1.11 0 0 0-.037-1.277L8.667 1.003a1.11 1.11 0 0 0-1.774 0L.246 9.865a1.11 1.11 0 0 0-.037 1.277Z"
        fill="#31CBD1"
      />
    </G>
    <Defs>
      <ClipPath id="arrow-up_svg__a">
        <Path
          fill="#fff"
          transform="rotate(-180 7.767 11)"
          d="M0 0h15.508v21.54H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgArrowUp;
