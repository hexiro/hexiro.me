import { styled } from "@/theme";

const Paragraph = styled("p", {
    color: "$text-secondary",
    fontSize: 20,
    fontFamily: "$text",
    fontWeight: 600,
    lineHeight: 1.5,

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

export default Paragraph;
