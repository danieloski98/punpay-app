import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
const SvgSadf = (props: SvgProps) => (
  <Svg
    width={279}
    height={203}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Path fill="url(#sadf_svg__a)" d="M0 0h279v203H0z" />
    <Defs>
      <Pattern
        id="sadf_svg__a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#sadf_svg__b" transform="scale(.00024 .00034)" />
      </Pattern>
      <Image
        id="sadf_svg__b"
        width={4096}
        height={2979}
      />
    </Defs>
  </Svg>
);
export default SvgSadf;