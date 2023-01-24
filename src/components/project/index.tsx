import { styled } from "@/theme";

import type { ProjectData } from "@/commons/graphql/projects";
import { StarIcon, ExternalLinkIcon, PackageIcon } from "@/commons/icons";
import { AnchorList, Heading, Paragraph } from "@/components/ui";

interface ProjectProps {
    data: ProjectData;
}

export default function Project({ data }: ProjectProps) {
    const { name, descriptionHTML, url, packageUrl } = data;

    return (
        <ProjectContainer>
            <ProjectHeader>
                <Heading as="h3">{name}</Heading>
                <ProjectInformation>
                    <ProjectDetail>
                        <StarIcon size="sm" />
                        <Paragraph>20</Paragraph>
                    </ProjectDetail>
                    <VerticalDivider />
                    <AnchorList.List css={{ gap: "$1" }}>
                        {packageUrl ? (
                            <AnchorList.Item newTab href={packageUrl}>
                                <PackageIcon size="auto-height" />
                            </AnchorList.Item>
                        ) : null}
                        <AnchorList.Item newTab href={url}>
                            <ExternalLinkIcon size="auto-height" />
                        </AnchorList.Item>
                    </AnchorList.List>
                </ProjectInformation>
            </ProjectHeader>
        </ProjectContainer>
    );
}

// should this semantically be a header tag?
const ProjectHeader = styled("div", {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    lineHeight: 1,
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
    aspectRatio: "800 / 280",
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
