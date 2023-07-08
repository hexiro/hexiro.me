import Image from "next/image";
import type { ComponentProps, PropsWithChildren } from "react";

import { SOCIALS_MAP } from "@/commons/config";

import { Card } from "@/components/ui/Cards";
import { H1, H3, H4 } from "@/components/ui/Headings";

import { SocialCard } from "@/components/cards/SocialCard";

import introSrc from "@/images/intro.png";

import { twMerge } from "tailwind-merge";

const INTRO =
    "Hey, I'm Nathan Lodge :p. I'm an 18-year-old software engineer based in the United States. Thank you for checking out my website :), I've been a passionate programmer since being 13 years old in middle school, and since then I've developed my skills and created a catalog of projects. Instead of repeating myself, I'm here to tell you about my life outside of software development.";

const MAIN_HOBBIES =
    "While programming is my primary hobby, I of course do other human things like hanging out with my friends, watching movies, and listening to music. My favorite genres of movies are psychological thrillers, drama, and crime. I also, naturally, love listening to music. My favorite genres are rap and r&b, and to be a little more specific, I like plugg, pluggnb, cloud rap, and trap.";

const VIDEO_GAMES =
    "My last primary hobby is playing video games :o. My main game for the past 5 or so years has been Counter-Strike: Global Offensive, which I play when I'm feeling competitive. I'm Master Guaridan 2 as of writing this, which is a little above average so I'm pretty solid. Minecraft is another game that I play, usually just single-player when I'm just trying to chill. When trying to play with friends Fortnite is a game that we usually lean towards. I'm also a fan of story-style games, but I haven't explored the genre too much (open to recommendations). The main ones I've enjoyed are GTA 5, GTA 4, GTA San Andreas, Saints Row 2, and a few Call of Duty campaigns.";

export default function AboutPage() {
    return (
        <>
            <div className="mb-12">
                <H1>About</H1>
                <H3 className="text-subtitle">My life beyond the IDE.</H3>
            </div>
            <div className="flex max-w-6xl flex-col gap-y-24">
                <AboutSection text={INTRO}>
                    <ImageCard
                        caption="Me"
                        alt="repping my 2023 hacktoberfest shirt."
                        src={introSrc}
                    />
                </AboutSection>
                <AboutSection text={MAIN_HOBBIES} childrenClassName="flex flex-col gap-y-4">
                    <SocialCard social={SOCIALS_MAP.IMDb} />
                    <SocialCard social={SOCIALS_MAP.Spotify} />
                    <SocialCard social={SOCIALS_MAP["Last.fm"]} />
                </AboutSection>
                <AboutSection text={VIDEO_GAMES} childrenClassName="flex flex-col gap-y-4">
                    <SocialCard social={SOCIALS_MAP.Steam} />
                    <SocialCard social={SOCIALS_MAP["Epic Games"]} />
                </AboutSection>
            </div>
        </>
    );
}

interface IAboutSectionProps extends PropsWithChildren {
    text: string;
    className?: string;
    childrenClassName?: string;
}

const AboutSection = ({ text, className, children, childrenClassName }: IAboutSectionProps) => (
    <div
        className={twMerge(
            "flex flex-col items-center gap-x-[5%] gap-y-6 xl:flex-row xl:even:flex-row-reverse",
            className
        )}
    >
        <p className="text-[18px] font-bold leading-relaxed">{text}</p>
        <div className={twMerge("w-full", childrenClassName)}>{children}</div>
    </div>
);

interface IImageCardProps extends ComponentProps<typeof Image> {
    caption: string;
    className?: string;
}

const ImageCard = ({ className, caption, alt, ...props }: IImageCardProps) => (
    <Card
        className={twMerge(
            "grow-1 ml-auto flex flex-col items-center justify-center gap-4 self-start px-6 py-5 sm:flex-row sm:py-6 xl:flex-col xl:py-5",
            className
        )}
    >
        <div className="max-w-xs self-start  xl:mt-0">
            <H4 green className="text-base md:text-[28px]">
                {caption}
            </H4>
            <p className="sm:text-base">{alt}</p>
        </div>
        <Image
            alt={`${caption}, ${alt}`}
            className="max-h-xs max-w-xs rounded-md border-2 border-solid border-white/10 drop-shadow-md"
            {...props}
        />
    </Card>
);
