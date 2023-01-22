import { styled } from "@/theme";

const Heading = styled("h1", {
    color: "$brand-primary",
    fontFamily: "$heading",
    variants: {
        as: {
            h1: {
                fontSize: 64,
                fontWeight: 800,

                // "@lg": {
                //     fontSize: 54,
                // },
                // "@xl": {
                //     fontSize: 64,
                // },
            },
            h2: {
                fontSize: 36,
                fontWeight: 700,

                "@lg": {
                    fontSize: 40,
                },
            },
            h3: {
                fontSize: 24,
                fontWeight: 600,
            },
        },
    },
});
export default Heading;