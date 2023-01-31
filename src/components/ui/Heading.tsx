import { styled } from "@/theme";

const Heading = styled("h1", {
    color: "$brand-primary",
    fontFamily: "$heading",
    variants: {
        as: {
            h1: {
                fontSize: 54,
                fontWeight: 800,

                "@lg": {
                    fontSize: 64,
                },
            },
            h2: {
                fontSize: 36,
                fontWeight: 700,

                "@lg": {
                    fontSize: 40,
                },
            },
            h3: {
                fontSize: 22,
                fontWeight: 600,

                "@lg": {
                    fontSize: 24,
                },
            },
            h4: {
                fontSize: 18,
                fontWeight: 600,

                "@lg": {
                    fontSize: 20,
                },
            },
        },
        ellipsis: {
            true: {
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
            },
        },
    },
});
export default Heading;
