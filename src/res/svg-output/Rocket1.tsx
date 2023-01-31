import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
const SvgRocket1 = (props: SvgProps) => (
  <Svg
    width={336}
    height={428}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Path
      transform="matrix(-1 0 0 1 336 0)"
      fill="url(#rocket_1_svg__a)"
      d="M0 0h336v428H0z"
    />
    <Defs>
      <Pattern
        id="rocket_1_svg__a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use
          xlinkHref="#rocket_1_svg__b"
          transform="matrix(.00064 0 0 .0005 -.137 0)"
        />
      </Pattern>
      <Image
        id="rocket_1_svg__b"
        width={2000}
        height={2000}
      />
    </Defs>
  </Svg>
);
export default SvgRocket1;