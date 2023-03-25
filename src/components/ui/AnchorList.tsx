import { styled } from "@/theme";

const AnchorList = styled("ul", {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "$2",
    width: "100%",
    height: "100%",

    "@md": {
        gap: "$3",
    },
});

export default AnchorList;
