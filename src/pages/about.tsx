import Image from "next/image";
import type { ComponentProps, PropsWithChildren } from "react";

import { currentAge, SOCIALS_MAP } from "@/commons/config";

import { Card } from "@/components/ui/Cards";
import { H1, H3, H4 } from "@/components/ui/Headings";

import { ContactCard } from "@/components/cards/ContactCard";

import introSrc from "@/images/intro.png";
import { Seo } from "@/layout/Seo";

import { twMerge } from "tailwind-merge";

const NAME = "About";
const DESCRIPTION = "My life beyond the IDE.";

const INTRO = `Hey, I'm Nathan Lodge! An ${currentAge()}-year-old software engineer based in the United States. Thanks for checking out my website :), I've been a passionate programmer for over 5 years now, primarily specializing in Python and TypeScript. If you'd like to learn more about my technical skills, please feel free to check out the rest of my website and connect with me! With that being said, I'm here to tell you a little more about my life beyond the code editor.
`;

const MAIN_HOBBIES =
    "For fun, I like to hang out with my friends, watch movies and TV shows, listen to music, and play video games. My favorite movie genres are psychological thrillers, drama, and crime, but I'm a big fan of all kinds of films, new and old. I also like listening to music, primarily chill modern rap and r&b.";

const VIDEO_GAMES =
    "As for the video games I play, I enjoy the first-person shooter genre. My favorite and most played video game is Counter-Strike: Global Offensive, which I play when I'm feeling competitive. My competitive rank is Distinguished Master Guardian as of writing this, which is rank number 14/18, so I'm pretty solid. When I'm not feeling competitive, you can find me playing Minecraft, Satisfactory, Terraria, and other single-player games. I've been exploring some story-style games as of late and have enjoyed playing GTA 5, GTA 4, GTA San Andreas, Saints Row 2, and a few Call of Duty campaigns.";

export default function AboutPage() {
    return (
        <>
            <Seo name={NAME} description={DESCRIPTION} />
            <div className="mb-12">
                <H1>{NAME}</H1>
                <H3 className="text-subtitle">{DESCRIPTION}</H3>
            </div>
            <div className="flex max-w-6xl flex-col gap-y-24">
                <AboutSection text={INTRO}>
                    <ImageCard
                        caption="Me"
                        alt="repping my 2023 hacktoberfest shirt."
                        src={introSrc}
                    />
                </AboutSection>
                <AboutSection text={MAIN_HOBBIES}>
                    <ContactCard isSingle social={SOCIALS_MAP.IMDb} />
                    <ContactCard isSingle social={SOCIALS_MAP.Spotify} />
                    <ContactCard isSingle social={SOCIALS_MAP["Last.fm"]} />
                </AboutSection>
                <AboutSection text={VIDEO_GAMES}>
                    <ContactCard isSingle social={SOCIALS_MAP.Steam} />
                    <ContactCard isSingle social={SOCIALS_MAP["Epic Games"]} />
                </AboutSection>
            </div>
        </>
    );
}

interface IAboutSectionProps {
    text: string;
    className?: string;
}

const AboutSection = ({ text, className, children }: PropsWithChildren<IAboutSectionProps>) => (
    <div
        className={twMerge(
            "flex flex-col items-center gap-x-[5%] gap-y-6 xl:flex-row xl:even:flex-row-reverse",
            className
        )}
    >
        <p className="text-[18px] font-bold leading-relaxed">{text}</p>
        <div className="flex w-full flex-col gap-y-4">{children}</div>
    </div>
);

interface IImageCardProps extends ComponentProps<typeof Image> {
    caption: string;
}

const ImageCard = ({ caption, alt, ...props }: IImageCardProps) => (
    <Card className="w-full px-8 py-6 sm:px-10 sm:py-6 xl:px-6 xl:py-5">
        <div className="mx-auto flex w-fit flex-col items-start justify-between gap-y-8 sm:w-auto sm:flex-row sm:items-center sm:gap-x-6 xl:flex-col">
            <div className="sm:self-start xl:mt-0 xl:max-w-xs">
                <H4 green className="text-base md:text-[28px]">
                    {caption}
                </H4>
                <p className="sm:text-base">{alt}</p>
            </div>
            <Image
                priority
                alt={`${caption}, ${alt}`}
                className="max-h-xs h-full w-full max-w-xs rounded-md border-2 border-solid border-white/10 drop-shadow-md sm:max-h-[16rem] sm:max-w-[16rem] md:h-auto md:w-auto"
                {...props}
            />
        </div>
    </Card>
);
