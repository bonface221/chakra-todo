import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
export const theme = extendTheme({
  config,
  fonts: {
    body: "'Nunito Variable', sans-serif",
    heading: "'Nunito Variable', sans-serif",
  },
});
