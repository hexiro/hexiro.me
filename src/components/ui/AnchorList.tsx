import { styled } from "@/theme";

import type { PropsWithChildren } from "react";

import Link from "@/components/ui/Link";
import ListItem from "@/components/ui/ListItem";
import Span from "@/components/ui/Span";

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

    variants: {
        gap: {},
    },
});

type AnchorListItemProps = PropsWithChildren<{ href: string; newTab?: boolean }>;

const AnchorListItemInner = ({ href, newTab, children }: AnchorListItemProps) => (
    <Link newTab={newTab} href={href} css={{ lineHeight: "$single" }}>
        <Span animation="pop">{children}</Span>
    </Link>
);

const AnchorListTextItem = (props: AnchorListItemProps) => (
    <AnchorListTextItemWrapper>
        <AnchorListItemInner {...props} />
    </AnchorListTextItemWrapper>
);

const AnchorListItem = (props: AnchorListItemProps) => (
    <DefaultListItem>
        <AnchorListItemInner {...props} />
    </DefaultListItem>
);

const AnchorListItemNoAnimation = ({ href, newTab, children }: AnchorListItemProps) => (
    <DefaultListItem>
        <Link newTab href={href}>
            {children}
        </Link>
    </DefaultListItem>
);

const AnchorListTextItemWrapper = styled(ListItem, {
    fontSize: 20,
    textTransform: "capitalize",
    position: "relative",

    "@lg": {
        fontSize: 24,
    },
    "@xl": {
        fontSize: 28,
    },
});

const DefaultListItem = styled("li", {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export default {
    List: AnchorList,
    TextItem: AnchorListTextItem,
    Item: AnchorListItem,
    ItemNoAnimation: AnchorListItemNoAnimation,
};
