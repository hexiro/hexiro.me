import { styled } from "@/theme";

import { Divider } from "@/components/layout";
import { Heading, BrandedBox, Paragraph } from "@/components/ui";

import type { MultiInfo } from "@/data/wakatimeStats";

interface TopLanguagesProps {
    languages: MultiInfo;
}

export default function TopLanguages({ languages }: TopLanguagesProps) {
    return (
        <TopLanguagesContainer>
            <Heading as="h3">Top Languages</Heading>
            <Paragraph css={{ maxWidth: 300 }}>
                {"The programming languages I've used the most."}
            </Paragraph>
            <Divider />
            <BarContainer>
                <List>
                    {languages.map((language) => (
                        <ListItem key={language.name}>
                            <Heading as="h4" css={{ color: "$brand-accent" }}>
                                {language.name}
                            </Heading>
                        </ListItem>
                    ))}
                </List>
                <List css={{ width: "100%" }}>
                    {languages.map((language, index) => (
                        <ListItem key={language.decimal}>
                            <Bar index={index as 0 | 1 | 2} css={{ width: `${language.percent}%` }}>
                                <BarPercent>{language.percent}</BarPercent>
                            </Bar>
                        </ListItem>
                    ))}
                </List>
            </BarContainer>
        </TopLanguagesContainer>
    );
}

const TopLanguagesContainer = styled(BrandedBox, {
    flexDirection: "column",
});

const BarContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    gap: "$2",
});

const List = styled("ul", {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    width: "min-content",
    gap: "$2",
});

const ListItem = styled("li", {
    lineHeight: "$single",
});

const Bar = styled("div", {
    position: "relative",
    height: 18,
    backgroundColor: "$$bgColor",

    variants: {
        index: {
            0: {
                $$bgColor: "$colors$brand-primary",
            },
            1: {
                $$bgColor: "rgba($colors$brand-primary-rgb, 0.75)",
            },
            2: {
                $$bgColor: "rgba($colors$brand-primary-rgb, 0.5)",
            },
        },
    },
});

const BarPercent = styled("span", {
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: "$2",
    right: 0,
    textAlign: "left",
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.7)",
    mixBlendMode: "difference",
});
