import { styled } from "@/theme";

import { Divider } from "@/components/layout";
import { Heading } from "@/components/ui";

export default function Footer() {
    return (
        <FooterContainer>
            <Divider />
            <FooterContent>
                <Heading as="h2" css={{ color: "$brand-primary-alpha-75" }}>
                    Nathan Lodge
                </Heading>
                <Heading as="h3" css={{ color: "$text-secondary" }}>
                    Software Engineer
                </Heading>
            </FooterContent>
        </FooterContainer>
    );
}

const FooterContainer = styled("footer", {
    display: "flex",
    flexDirection: "column",
    marginTop: "$9",
    paddingBottom: "100px",
    paddingX: "$main-x-padding",

    "@lg": {
        paddingX: "$main-x-padding-lg",
    },
});

const FooterContent = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    marginTop: "$4",
});
