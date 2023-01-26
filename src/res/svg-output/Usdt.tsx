import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const SvgUsdt = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#usdt_svg__a)">
      <Path
        d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
        fill="#26A17B"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.441 13.037v-.001c-.082.006-.507.031-1.456.031a31.6 31.6 0 0 1-1.478-.031v.002c-2.916-.128-5.093-.636-5.093-1.244 0-.606 2.177-1.114 5.093-1.245v1.984c.19.013.736.045 1.49.045.906 0 1.36-.037 1.444-.045v-1.982c2.91.13 5.082.637 5.082 1.243 0 .608-2.171 1.114-5.082 1.243Zm0-2.692V8.57h4.061V5.864H6.446V8.57h4.06v1.774c-3.3.152-5.781.806-5.781 1.588 0 .784 2.482 1.437 5.782 1.589v5.686h2.934V13.52c3.295-.151 5.771-.804 5.771-1.587 0-.782-2.476-1.435-5.77-1.587Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="usdt_svg__a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgUsdt;
