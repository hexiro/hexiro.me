// import { styled } from "@/theme";
import Link from "next/link";

import { VerticalDivider } from "@/components/layout/Divider";
import { LinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";
import { H4 } from "@/components/ui/Headings";
import { ExternalLinkIcon, PackageIcon, StarsIcon } from "@/components/ui/Icons";

import type { IProject } from "@/data/projects";

import { twMerge } from "tailwind-merge";

// import { StarIcon, ExternalLinkIcon, PackageIcon } from "@/commons/icons";

// import { Divider } from "@/components/layout";
// import { AnchorList, Heading, Link, Paragraph, LinkOverlay } from "@/components/ui";

// import { Box } from "@/components/brand";
// import LanguageIcon from "@/components/projects/LanguageIcon";

// import type { ProjectData } from "@/data/projects";

// import ipaddr from "ipaddr.js";

// interface ProjectProps {
//     data: ProjectData;
// }

// export default function Project({ data }: ProjectProps) {
//     const { name, description, stars, languages, topics, url, packageUrl } = data;

//     const descriptionSections = extractLinks(description);

//     return (
//         <ProjectContainer hoverable>
//             <ProjectHeader>
//                 <Heading ellipsis as="h3">
//                     <LinkOverlay newTab href={url}>
//                         {name}
//                     </LinkOverlay>
//                 </Heading>
//                 <ProjectInformation>
//                     <ProjectDetail>
//                         <StarIcon size="sm" />
//                         <Paragraph css={{ lineHeight: "$single" }}>{stars}</Paragraph>
//                     </ProjectDetail>
//                     <Divider orientation="vertical" size={2} margin={12} />
//                     <IconList>
//                         {packageUrl !== null ? (
//                             <IconListItem>
//                                 <Link newTab href={packageUrl} animation="pop" lineHeight="single">
//                                     <PackageIcon size="md" />
//                                 </Link>
//                             </IconListItem>
//                         ) : null}
//                         <IconListItem>
//                             <Link newTab href={url} animation="pop" lineHeight="single">
//                                 <ExternalLinkIcon size="md" />
//                             </Link>
//                         </IconListItem>
//                     </IconList>
//                 </ProjectInformation>
//             </ProjectHeader>
//             <ProjectTopics>
//                 {languages.map((name) => (
//                     <Topic key={name}>
//                         <LanguageIcon name={name} css={{ height: "20px", width: "auto" }} />
//                         <LanguageTextSpan>{name}</LanguageTextSpan>
//                     </Topic>
//                 ))}
//                 {topics.map((name) => (
//                     <Topic key={name}>{name}</Topic>
//                 ))}
//             </ProjectTopics>
//             <ProjectDescription>
//                 {descriptionSections.map(({ value, type }) =>
//                     type === "link" ? (
//                         <DescriptionLink
//                             key={value}
//                             newTab
//                             href={value}
//                             animation="pop"
//                             color="brand-primary"
//                         >
//                             {value}
//                         </DescriptionLink>
//                     ) : (
//                         <span key={value}>{value}</span>
//                     )
//                 )}
//             </ProjectDescription>
//         </ProjectContainer>
//     );
// }

// const ProjectDescription = styled(Paragraph, {
//     minHeight: 90,
// });

// const DescriptionLink = styled(Link, {
//     zIndex: 1,
// });

// const ProjectTopics = styled("ul", {
//     display: "flex",
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: "$2",
//     lineHeight: "$single",
//     height: "32px",
//     overflow: "hidden",
//     marginBottom: "$3",
// });

// const Topic = styled("li", {
//     listStyle: "none",
//     display: "flex",
//     alignItems: "center",
//     flexDirection: "row",
//     position: "relative",
//     backgroundColor: "$brand-tertiary",
//     fontWeight: 600,
//     padding: "4px 12px",
//     borderRadius: "$xl",
//     borderWidth: 2,
//     borderStyle: "solid",
//     borderColor: "rgba(255, 255, 255, 0.075)",
// });

// const LanguageTextSpan = styled("span", {
//     marginLeft: "$1",
// });

// // should this semantically be a header tag?
// const ProjectHeader = styled("div", {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     height: "40px",
//     paddingBottom: "$1",
// });

// // star count, links
// const ProjectInformation = styled("div", {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: "auto",
//     paddingLeft: "$2",
//     height: "100%",
// });

// const ProjectDetail = styled("div", {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: "$1",
//     height: "100%",
// });

// const IconListItem = styled("li", {
//     display: "flex",
//     alignItems: "center",
// });

// const IconList = styled(AnchorList, {
//     gap: "$1",
//     zIndex: 1,
//     // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//     [`& ${IconListItem}, & ${IconListItem} > span`]: {
//         height: "24px",
//     },
// });

// const ProjectContainer = styled(Box, {
//     aspectRatio: "20 / 7",
//     width: "100%",
//     height: "auto",
//     borderRadius: "$xxl",
//     willTransition: "transform",
//     flexDirection: "column",

//     "@xl": {
//         width: "48%",
//     },
// });

interface ProjectCardProps {
    className?: string;
    project: IProject;
}

export function ProjectCard({ className, project }: ProjectCardProps) {
    const { name, url, description, stars, packageUrl } = project;

    // const IconListItem = styled("li", {
    //     display: "flex",
    //     alignItems: "center",
    // });

    return (
        <Card isHoverable className={twMerge("w-[calc(50%-1rem)] pr-4", className)}>
            <div className="flex flex-row align-center h-10 pb-1 gap-x-2">
                <H4 green className="truncate basis-2/3">
                    <LinkOverlay href={url}>{name}</LinkOverlay>
                </H4>
                <span className="basis-1/3 flex flex-row items-center justify-end h-full gap-x-3">
                    {stars > 0 ? (
                        <>
                            <div className="flex flex-row items-center gap-x-[1px]">
                                <StarsIcon />
                                <p className="leading-none text-off-white">{stars}</p>
                            </div>
                            <VerticalDivider className="h-2/3" />
                        </>
                    ) : null}
                    <ul className="flex gap-x-1 z-10">
                        {packageUrl !== null ? (
                            <li className="flex items-center transition-transform hover:translate-y-[-2px]">
                                <Link href={packageUrl}>
                                    <PackageIcon />
                                </Link>
                            </li>
                        ) : null}
                        <li className="flex items-center transition-transform hover:translate-y-[-2px]">
                            <Link href={url}>
                                <ExternalLinkIcon />
                            </Link>
                        </li>
                    </ul>
                </span>
            </div>
            <div className="pr-4">
                <p className="line-clamp-3">
                    {description.map(({ value, type }) =>
                        type === "link" ? (
                            <Link key={value} className="z-10" href={value}>
                                {value}
                            </Link>
                        ) : (
                            <span key={value}>{value}</span>
                        )
                    )}
                </p>
                <div className="flex flex-row flex-wrap gap-2 leading-none line-clamp-1 overflow-hidden" />
            </div>
        </Card>
    );
}
