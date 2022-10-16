import { createTheme } from "@shopify/restyle";

const palette = {
  black: "#0B0B0B",
  white: "#FFFFFF",
  brandColor: "#5149F7",
  lightInput: '#F4F4FB',
  darkInput: '#2f2e2ea5',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.white,
    primaryColor: palette.brandColor,
    whiteText: palette.white,
    blackText: palette.black,
    iconColor: palette.black,
    text: palette.black,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  button: {
    height: 56
  },
  textInput: {
    height: 56,
    backgroundColor: palette.lightInput,
  },
  textVariants: {
    defaults: {
      fontFamily: "Jakarta-Sans",
      fontSize: 14,
      lineHeight: 24,
      color: 'blackText',
      fontWeight: "400",
    },
    header: {
      fontFamily: "Axiforma-Bold",
      fontWeight: "bold",
      fontSize: 34,
      lineHeight: 42.5,
      color: 'blackText',
    },
    subheader: {
      fontFamily: "Axiforma-Bold",
      fontWeight: "600",
      fontSize: 28,
      lineHeight: 36,
      color: 'blackText',
    },
    body: {
      fontFamily: "Jakarta-Sans",
      fontSize: 15,
      lineHeight: 24,
      color: 'blackText',
      fontWeight: "700",
    },
    bodylight: {
      fontFamily: "Jakarta-Sans",
      fontSize: 15,
      lineHeight: 24,
      color: 'blackText',
      fontWeight: "400",
    },
    xs: {
      fontFamily: "Jakarta-Sans",
      fontSize: 13,
      lineHeight: 24,
      color: 'blackText',
      fontWeight: "400",
    },
  },
});

export const darkTheme: Theme = createTheme({
  ...theme,
  colors: {
    mainBackground: palette.black,
    cardPrimaryBackground: palette.black,
    primaryColor: palette.brandColor,
    whiteText: palette.white,
    blackText: palette.black,
    iconColor: palette.white,
    text: palette.white,
  },
  textInput: {
    height: 56,
    backgroundColor: palette.darkInput,
  },
  textVariants: {
    defaults: {
      fontFamily: "Jakarta-Sans",
      fontSize: 14,
      lineHeight: 24,
      color: 'whiteText',
      fontWeight: "400",
    },
    header: {
      fontFamily: "Axiforma-Bold",
      fontWeight: "bold",
      fontSize: 34,
      lineHeight: 42.5,
      color: 'whiteText',
    },
    subheader: {
      fontFamily: "Axiforma-Bold",
      fontWeight: "600",
      fontSize: 28,
      lineHeight: 36,
      color: 'whiteText',
    },
    body: {
      fontFamily: "Jakarta-Sans",
      fontSize: 15,
      lineHeight: 24,
      color: 'whiteText',
      fontWeight: "700",
    },
    bodylight: {
      fontFamily: "Jakarta-Sans",
      fontSize: 15,
      lineHeight: 24,
      color: 'whiteText',
      fontWeight: "400",
    },
    xs: {
      fontFamily: "Jakarta-Sans",
      fontSize: 13,
      lineHeight: 24,
      color: 'whiteText',
      fontWeight: "400",
    },
  },
});

export type Theme = typeof theme;
export default theme;
