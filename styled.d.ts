import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        core: {
            main: string;
            background: string;
            text: string;
            scrollbar: string;
        };
        accent: {
            main: string;
            background: string;
        };
    }
}
