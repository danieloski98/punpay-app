import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
const SvgWallet = (props: SvgProps) => (
  <Svg
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.624 5.685c0 1.345 18.246 15.43 18.694 15.43h.813a3.252 3.252 0 0 0 3.252-3.248V6.497a3.25 3.25 0 0 0-3.252-3.249H4.063a2.438 2.438 0 0 0-2.439 2.437c0 .448 0 0 0 0Z"
      fill="url(#wallet_svg__a)"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.505 4.063a2.437 2.437 0 0 0-2.438-2.438h-8.94A2.438 2.438 0 0 0 5.69 4.063v3.25c0 .448.365.812.813.812h12.19a.812.812 0 0 0 .813-.813v-3.25Z"
      fill="url(#wallet_svg__b)"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.625 5.686v15.431a3.25 3.25 0 0 0 3.252 3.249h14.63a3.25 3.25 0 0 0 3.251-3.249V9.747a3.25 3.25 0 0 0-3.251-3.25H4.064a.812.812 0 0 1-.813-.811.813.813 0 0 0-1.626 0Z"
      fill="url(#wallet_svg__c)"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.875 20.313a2.438 2.438 0 0 0 2.437-2.438v-3.25a2.436 2.436 0 0 0-2.437-2.438h-3.25a4.064 4.064 0 0 0 0 8.126h3.25Z"
      fill="#000"
      fillOpacity={0.1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.687 19.5a2.438 2.438 0 0 0 2.437-2.438v-3.25a2.436 2.436 0 0 0-2.437-2.437h-3.25a4.064 4.064 0 0 0 0 8.125h3.25Z"
      fill="url(#wallet_svg__d)"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.166 16.236a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0Z"
      fill="#000"
      fillOpacity={0.1}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.978 15.423a1.625 1.625 0 1 1-3.25 0 1.625 1.625 0 0 1 3.25 0Z"
      fill="url(#wallet_svg__e)"
    />
    <Defs>
      <LinearGradient
        id="wallet_svg__a"
        x1={22.757}
        y1={4.872}
        x2={15.45}
        y2={16.248}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF8860" />
        <Stop offset={1} stopColor="#FF3B5B" />
      </LinearGradient>
      <LinearGradient
        id="wallet_svg__b"
        x1={12.191}
        y1={7.313}
        x2={12.191}
        y2={2.438}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#51E1A3" />
        <Stop offset={1} stopColor="#99FED4" />
      </LinearGradient>
      <LinearGradient
        id="wallet_svg__c"
        x1={5.69}
        y1={23.554}
        x2={18.684}
        y2={8.925}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFAB21" />
        <Stop offset={1} stopColor="#FBDE30" />
      </LinearGradient>
      <LinearGradient
        id="wallet_svg__d"
        x1={19.5}
        y1={12.188}
        x2={13.813}
        y2={19.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FFF3E0" />
        <Stop offset={1} stopColor="#FFB742" />
      </LinearGradient>
      <LinearGradient
        id="wallet_svg__e"
        x1={15.353}
        y1={17.048}
        x2={16.166}
        y2={13.799}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF3B5B" />
        <Stop offset={1} stopColor="#FF8860" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgWallet;
