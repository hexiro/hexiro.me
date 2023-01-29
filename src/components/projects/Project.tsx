import { styled } from "@/theme";

import { useRef, useState } from "react";

import { childStaggerAnimation, extraBounce } from "@/commons/animations";
import type { ProjectData } from "@/commons/graphql/projects";
import { StarIcon, ExternalLinkIcon, PackageIcon } from "@/commons/icons";

import ParseHTML from "@/components/projects/ParseHTML";
import { AnchorList, Heading, ImportantContainer, Link, Paragraph } from "@/components/ui";

import LanguageIcon from "@/components/projects/LanguageIcon";
import replace from "@/components/projects/replace";

interface ProjectProps {
    data: ProjectData;
}

export default function Project({ data }: ProjectProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [animationComplete, setAnimationComplete] = useState<boolean>(false);
    const { name, descriptionHTML, stars, languages, topics, url, packageUrl } = data;

    return (
        <ProjectContainer
            ref={ref}
            variants={childStaggerAnimation}
            transition={extraBounce}
            enableHoverAnimation={animationComplete}
            onAnimationComplete={() => setAnimationComplete(true)}
        >
            <ProjectHeader>
                <Heading ellipsis as="h3" css={{ paddingRight: "$1" }}>
                    <Link
                        newTab
                        href={url}
                        css={{
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
                        }}
                    >
                        {name}
                    </Link>
                </Heading>
                <ProjectInformation>
                    <ProjectDetail>
                        <StarIcon size="sm" />
                        <Paragraph>{stars}</Paragraph>
                    </ProjectDetail>
                    <VerticalDivider />
                    <AnchorList css={{ gap: "$1", zIndex: 1 }}>
                        {packageUrl ? (
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
                        <LanguageIcon name={name} css={{ height: "1em", width: "auto" }} />
                        <LanguageTextSpan>{name}</LanguageTextSpan>
                    </Topic>
                ))}
                {topics.map((name) => (
                    <Topic key={name}>{name}</Topic>
                ))}
            </ProjectTopics>
            <ParseHTML html={descriptionHTML} replace={replace} />
        </ProjectContainer>
    );
}

const ProjectTopics = styled("ul", {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "$2",
    lineHeight: "$single",
    height: "28px",
    overflow: "hidden",
    marginBottom: "$3",
});

const Topic = styled("li", {
    listStyle: "none",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    backgroundColor: "$brand-tertiary",
    fontWeight: 600,
    padding: "6px 12px",
    borderRadius: "$xl",
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

const ProjectContainer = styled(ImportantContainer, {
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
                    transform: "translateY(-4px)!important",
                },
            },
        },
    },
});
