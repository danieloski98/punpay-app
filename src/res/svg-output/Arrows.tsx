import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const SvgArrows = (props: SvgProps) => (
  <Svg
    width={props.width}
    height={props.height}
    fill="none"
    {...props}
  >
    <G clipPath="url(#arrows_svg__a)">
      <Path
        d="M10.31.163a.984.984 0 0 0-.41 1.06l.678 2.714h-23.476a.984.984 0 0 0-.985.984v3.937c0 .544.44.985.985.985h23.476L9.9 12.557c-.1.402.063.827.41 1.06a.986.986 0 0 0 1.135-.033l7.874-5.906a.986.986 0 0 0 0-1.576L11.445.196a.986.986 0 0 0-1.134-.033Z"
        fill="#5149F7"
      />
    </G>
    <G clipPath="url(#arrows_svg__b)">
      <Path
        d="M9.49 29.837a.984.984 0 0 0 .411-1.06l-.678-2.714H32.7c.544 0 .984-.44.984-.984v-3.937a.984.984 0 0 0-.984-.985H9.223l.678-2.714a.987.987 0 0 0-.41-1.06.986.986 0 0 0-1.135.033L.482 22.322a.986.986 0 0 0 0 1.576l7.874 5.906a.986.986 0 0 0 1.135.033Z"
        fill="#31CBD1"
      />
    </G>
    <Defs>
      <ClipPath id="arrows_svg__a">
        <Path
          fill="#fff"
          transform="rotate(-90 7.221 6.559)"
          d="M0 0h13.78v19.139H0z"
        />
      </ClipPath>
      <ClipPath id="arrows_svg__b">
        <Path
          fill="#fff"
          transform="rotate(90 1.46 17.68)"
          d="M0 0h13.78v19.139H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgArrows;
