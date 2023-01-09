import { styled } from "theme";

const ListItem = styled("li", {
    color: "$text-primary",
    fontFamily: "$heading",
    fontSize: 28,
    fontWeight: 500,
    listStyle: "none",

    willChange: "transform",
    transition: "transform 0.2s ease-in-out",

    "&:hover": {
        transform: "translateY(-2px)",
    },
});

export default ListItem;
