import * as React from "react";
import Svg, {
  SvgProps,
  G,
  Path,
  Defs,
  ClipPath,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
const SvgHour = (props: SvgProps) => (
  <Svg
    width={414}
    height={415}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <G clipPath="url(#hour_svg__a)">
      <Path fill="url(#hour_svg__b)" d="M-121 0h623v415h-623z" />
    </G>
    <Defs>
      <ClipPath id="hour_svg__a">
        <Path fill="#fff" d="M0 0h414v415H0z" />
      </ClipPath>
      <Pattern
        id="hour_svg__b"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use
          xlinkHref="#hour_svg__c"
          transform="matrix(.00033 0 0 .0005 0 0)"
        />
      </Pattern>
      <Image
        id="hour_svg__c"
        width={3000}
        height={2000}
      />
    </Defs>
  </Svg>
);
export default SvgHour;