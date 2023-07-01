import { createTheme } from "@shopify/restyle";

const palette = {
  black: "#0B0B0B",
  white: "#FFFFFF",
  brandColor: "#66009A",
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
    modalBg: 'white',
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
    },
    header: {
      fontFamily: "Axiforma-Bold",
      fontSize: 34,
      lineHeight: 42.5,
      color: 'blackText',
    },
    subheader: {
      fontFamily: "Axiforma-Bold",
      fontSize: 28,
      lineHeight: 36,
      color: 'blackText',
    },
    body: {
      fontFamily: "Jakarta-Sans",
      fontSize: 15,
      lineHeight: 24,
      color: 'blackText',
    },
    bodylight: {
      fontFamily: "Jakarta-Sans",
      fontSize: 15,
      lineHeight: 24,
      color: 'blackText',
    },
    xs: {
      fontFamily: "Jakarta-Sans",
      fontSize: 13,
      lineHeight: 24,
      color: 'blackText',
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
    modalBg: '#242424',
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
    },
    header: {
      fontFamily: "Axiforma-Bold",
      fontSize: 34,
      lineHeight: 42.5,
      color: 'whiteText',
    },
    subheader: {
      fontFamily: "Axiforma-Bold",
      fontSize: 28,
      lineHeight: 36,
      color: 'whiteText',
    },
    body: {
      fontFamily: "Jakarta-Sans",
      fontSize: 15,
      lineHeight: 24,
      color: 'whiteText',
    },
    bodylight: {
      fontFamily: "Jakarta-Sans",
      fontSize: 15,
      lineHeight: 24,
      color: 'whiteText',
    },
    xs: {
      fontFamily: "Jakarta-Sans",
      fontSize: 13,
      lineHeight: 24,
      color: 'whiteText',
    },
  },
});

export type Theme = typeof theme;
export default theme;
