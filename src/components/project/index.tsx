import { styled } from "@/theme";

import type { ProjectData } from "@/commons/graphql/projects";
import { StarIcon, ExternalLinkIcon, PackageIcon } from "@/commons/icons";
import { AnchorList, Heading, Paragraph } from "@/components/ui";

import LanguageIcon from "components/project/LanguageIcon";

interface ProjectProps {
    data: ProjectData;
}

export default function Project({ data }: ProjectProps) {
    const { name, descriptionHTML, url, packageUrl, languages, topics } = data;

    return (
        <ProjectContainer>
            <ProjectHeader>
                <Heading ellipsis as="h3" css={{ paddingRight: "$1" }}>
                    {name}
                </Heading>
                <ProjectInformation>
                    <ProjectDetail>
                        <StarIcon size="sm" />
                        <Paragraph>20</Paragraph>
                    </ProjectDetail>
                    <VerticalDivider />
                    <AnchorList.List css={{ gap: "$1" }}>
                        {packageUrl ? (
                            <AnchorList.Item newTab href={packageUrl}>
                                <PackageIcon size="md" />
                            </AnchorList.Item>
                        ) : null}
                        <AnchorList.Item newTab href={url}>
                            <ExternalLinkIcon size="md" />
                        </AnchorList.Item>
                    </AnchorList.List>
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
    lineHeight: 5,
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

const ProjectContainer = styled("div", {
    aspectRatio: "20 / 7",
    width: "100%",
    height: "auto",
    backgroundColor: "$background-secondary",
    borderRadius: "$xxl",
    border: "2px solid $lighten-10",
    boxShadow: "$md",
    padding: "$4",
    display: "flex",
    flexDirection: "column",

    willTransition: "transform",
    transitionDuration: "$fast",
    transitionTimingFunction: "$ease-in-out",

    "@xl": {
        width: "48%",
    },
});
