import { styled } from "@/theme";

const Subheading = styled("span", {
    color: "$text-primary",
    fontFamily: "$heading",
    fontSize: 40,
    fontWeight: 600,

    "@lg": {
        fontSize: 48,
    }
});

export default Subheading;