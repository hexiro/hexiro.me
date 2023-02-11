import { styled } from "@/theme";

import { useState } from "react";

import type { ProjectData } from "@/commons/graphql/projects";
import { StarIcon, ExternalLinkIcon, PackageIcon } from "@/commons/icons";

import { AnchorList, Heading, BrandedBox, Link, Paragraph } from "@/components/ui";

import LanguageIcon from "@/components/projects/LanguageIcon";

import ipaddr from "ipaddr.js";

interface ProjectProps {
    data: ProjectData;
}

export default function Project({ data }: ProjectProps) {
    const [animationComplete, setAnimationComplete] = useState<boolean>(false);
    const { name, description, stars, languages, topics, url, packageUrl } = data;

    const descriptionSections = extractLinks(description);

    return (
        <ProjectContainer
            enableHoverAnimation={animationComplete}
            onAnimationComplete={() => setAnimationComplete(true)}
        >
            <ProjectHeader>
                <Heading ellipsis as="h3" css={{ paddingRight: "$1" }}>
                    <ProjectLink newTab noNextLink href={url}>
                        {name}
                    </ProjectLink>
                </Heading>
                <ProjectInformation>
                    <ProjectDetail>
                        <StarIcon size="sm" />
                        <Paragraph>{stars}</Paragraph>
                    </ProjectDetail>
                    <VerticalDivider />
                    <AnchorList css={{ gap: "$1", zIndex: 1 }}>
                        {packageUrl !== null ? (
                            <li>
                                <Link newTab href={packageUrl} animation="pop" lineHeight="single">
                                    <PackageIcon size="md" />
                                </Link>
                            </li>
                        ) : null}
                        <li>
                            <Link newTab href={url} animation="pop" lineHeight="single">
                                <ExternalLinkIcon size="md" />
                            </Link>
                        </li>
                    </AnchorList>
                </ProjectInformation>
            </ProjectHeader>
            <ProjectTopics>
                {languages.map((name) => (
                    <Topic key={name}>
                        <LanguageIcon name={name} css={{ height: "20px", width: "auto" }} />
                        <LanguageTextSpan>{name}</LanguageTextSpan>
                    </Topic>
                ))}
                {topics.map((name) => (
                    <Topic key={name}>{name}</Topic>
                ))}
            </ProjectTopics>
            <ProjectDescription>
                {descriptionSections.map(({ value, type }) =>
                    type === "link" ? (
                        <DescriptionLink
                            key={value}
                            newTab
                            href={value}
                            animation="pop"
                            color="brand-primary"
                        >
                            {value}
                        </DescriptionLink>
                    ) : (
                        <span key={value}>{value}</span>
                    )
                )}
            </ProjectDescription>
        </ProjectContainer>
    );
}

const ProjectDescription = styled(Paragraph, {
    minHeight: 90,
});

const ProjectLink = styled(Link, {
    "&::before": {
        content: "''",
        cursor: "inherit",
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
    },
});

const DescriptionLink = styled(Link, {
    zIndex: 1,
});

const ProjectTopics = styled("ul", {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "$2",
    lineHeight: "$single",
    height: "32px",
    overflow: "hidden",
    marginBottom: "$3",
});

const Topic = styled("li", {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    position: "relative",
    backgroundColor: "$brand-tertiary",
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: "$xl",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.075)",
});

const LanguageTextSpan = styled("span", {
    marginLeft: "$1",
});

// should this semantically be a header tag?
const ProjectHeader = styled("div", {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "40px",
    paddingBottom: "$1",
});

// star count, links
const ProjectInformation = styled("div", {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    height: "100%",
});

const ProjectDetail = styled("div", {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "$1",
});

const VerticalDivider = styled("hr", {
    height: "100%",
    borderLeft: "2px solid $lighten-10",
    marginX: "12px",
    borderRadius: "$max",
});

const ProjectContainer = styled(BrandedBox, {
    aspectRatio: "20 / 7",
    width: "100%",
    height: "auto",
    borderRadius: "$xxl",
    willTransition: "transform",
    flexDirection: "column",

    "@xl": {
        width: "48%",
    },

    variants: {
        enableHoverAnimation: {
            true: {
                transitionDuration: "$fast",
                transitionTimingFunction: "$ease-in-out",

                "&:hover": {
                    transform: "translateY(-6px)!important",
                },
            },
        },
    },
});

const URL_REGEX =
    /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)/gm;

interface ExtractedSection {
    type: "text" | "link";
    value: string;
}

function extractLinks(description: string): ExtractedSection[] {
    const isPublicUrl = (match: RegExpMatchArray): boolean => {
        let url: URL;
        try {
            url = new URL(match[0]);
        } catch (e: unknown) {
            // not valid url -- bad
            return false;
        }

        let ip: ReturnType<typeof ipaddr.process>;
        try {
            ip = ipaddr.process(url.hostname);
        } catch (e: unknown) {
            // not ip -- good
            return true;
        }

        if (ip.kind() === "ipv6") return false;
        if (ip.range() === "private") return false;

        return true;
    };

    let linkMatches: RegExpMatchArray[];
    linkMatches = Array.from(description.matchAll(URL_REGEX));
    linkMatches = linkMatches.filter(isPublicUrl);

    if (linkMatches.length === 0) return [{ type: "text", value: description }];

    const sections: ExtractedSection[] = [];
    let start = 0;

    for (const linkMatch of linkMatches) {
        const link = linkMatch[0];
        const { index } = linkMatch;

        if (index === undefined) continue;

        sections.push({ value: description.slice(start, index), type: "text" });
        sections.push({ value: link, type: "link" });

        start = index + link.length;
    }

    return sections;
}
