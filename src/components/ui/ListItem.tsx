import { styled } from "@/theme";

const ListItem = styled("li", {
    color: "$text-primary",
    fontSize: 20,
    fontFamily: "$heading",
    fontWeight: 600,
    listStyle: "none",
    textTransform: "capitalize",

    "@lg": {
        fontSize: 24,
    },
    "@xl": {
        fontSize: 26,
    },
});

export default ListItem;
