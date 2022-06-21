import type { Theme as ChakraTheme } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import colors from "theme/colors";
import components from "theme/components";
import config from "theme/config";
import fonts from "theme/fonts";
import shadows from "theme/shadows";
import styles from "theme/styles";

const theme = {
    colors,
    config,
    fonts,
    shadows,
    styles,
    components,
};

type ChakraColors = ChakraTheme["colors"];

interface Colors extends ChakraColors {
    brand: {
        primary: string;
        text: string;
        subtext: string;
        scrollbar: string;
    };
    background: {
        primary: string;
        secondary: string;
    };
}

interface Theme extends ChakraTheme {
    colors: Colors;
}

export default extendTheme(theme) as Theme;
