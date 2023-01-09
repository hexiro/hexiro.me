import { styled } from "theme";

const Heading = styled("h1", {
    color: "$brand-primary",
    fontFamily: "$heading",
    variants: {
        as: {
            h1: {
                fontSize: 64,
                fontWeight: 800,
            },
            h2: {
                fontSize: 40,
                fontWeight: 700,
            },
            h3: {
                fontSize: 24,
                fontWeight: 600,
            },
        },
    },
});
export default Heading;
