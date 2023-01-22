import { styled } from "@/theme";

const Subtext = styled("p", {
    color: "$text-secondary",
    fontFamily: "$text",
    fontSize: 26,
    fontWeight: 600,
    lineHeight: 1.4,
    maxWidth: 600,

    variants: {
        align: {
            center: {
                textAlign: "center",
            },
            left: {
                textAlign: "left",
            },
            right: {
                textAlign: "right",
            },
        },
    },
});

export default Subtext;
