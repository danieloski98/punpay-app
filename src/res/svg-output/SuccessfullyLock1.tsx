import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg";
const SvgSuccessfullyLock1 = (props: SvgProps) => (
  <Svg
    width={396}
    height={396}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Path fill="url(#successfully-lock_1_svg__a)" d="M0 0h396v396H0z" />
    <Defs>
      <Pattern
        id="successfully-lock_1_svg__a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#successfully-lock_1_svg__b" transform="scale(.0004)" />
      </Pattern>
      <Image
        id="successfully-lock_1_svg__b"
        width={2501}
        height={2500}
      />
    </Defs>
  </Svg>
);
export default SvgSuccessfullyLock1;