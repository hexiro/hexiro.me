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
            <Heading as="h3">Language Activity</Heading>
            <Paragraph size="sm" css={{ maxWidth: 300 }}>
                {"The programming languages I've used the most."}
            </Paragraph>
            <Divider />
            <BarContainer>
                <List>
                    {languages.map((language) => (
                        <ListItem key={language.name} position="end">
                            <Heading as="h4" css={{ color: "$brand-accent" }}>
                                {language.name}
                            </Heading>
                        </ListItem>
                    ))}
                </List>
                <List css={{ width: "100%" }}>
                    {languages.map((language, index) => (
                        <ListItem key={language.decimal} position="start">
                            <Bar
                                index={index as 0 | 1 | 2}
                                css={{ width: `${language.percent}%` }}
                            />
                            <BarPercent>{`${language.percent}%`}</BarPercent>
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
    paddingY: "$2",
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
    display: "flex",
    lineHeight: "$single",
    justifyContent: "$$position",

    variants: {
        position: {
            start: {
                $$position: "flex-start",
            },
            end: {
                $$position: "flex-end",
            },
        },
    },
});

const Bar = styled("div", {
    position: "relative",
    height: 18,
    backgroundColor: "$$bgColor",

    borderLeftRadius: "$sm",
    borderRightRadius: "$md",

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
    marginLeft: "$2",
    color: "$text-secondary",
    textAlign: "left",
    fontSize: 14,
    letterSpacing: -0.2,
    fontWeight: 600,
});
