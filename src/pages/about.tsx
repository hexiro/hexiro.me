import type { PropsWithChildren } from "react";

import { currentAge, SOCIALS_MAP } from "@/commons/config";

import { H1, H3 } from "@/components/ui/Headings";

import { ContactCard } from "@/components/cards/ContactCard";
import { ImageCard } from "@/components/cards/ImageCard";

import introSrc from "@/images/intro.png";
import { Seo } from "@/layout/Seo";

import { twMerge } from "tailwind-merge";

const NAME = "About";
const DESCRIPTION = "My life beyond the IDE.";

const INTRO = `Hey, I'm Nathan Lodge! I'm a ${currentAge()}-year-old software engineer based in the United States. Thanks for checking out my website. I've been a passionate programmer for over 5 years now, primarily specializing in Python and TypeScript. If you'd like to learn more about my technical skills, please feel free to check out the rest of my website and connect with me! With that being said, I'm here to tell you a little more about my life beyond the code editor.`;

const MAIN_HOBBIES =
    "For fun, I like to hang out with my friends, watch movies and TV shows, listen to music, and play video games. My favorite movie genres are psychological thrillers, drama, and crime, but I'm a big fan of all kinds of films, new and old. I also like listening to music, primarily trap and cloud rap.";

const VIDEO_GAMES =
    "My favorite video game genres are first-person shooters, and single-player games. My favorite first-person shooter is Counter-Strike 2, which I play when I'm feeling competitive. My premier rank is ~13,000 as of writing this, and I'm FACEIT level 6. When I'm relaxing or on the go, I like to play Minecraft, Satisfactory, Bloons TD6, Stardew Valley, and other single-player games. I've been also playing some story-style games recently and I've enjoyed playing GTA 5, GTA 4, GTA San Andreas, Saints Row 2, Portal, and Portal 2.";

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

interface AboutSectionProps {
    readonly text: string;
    readonly className?: string;
}

function AboutSection({ text, className, children }: PropsWithChildren<AboutSectionProps>) {
    return (
        <div
            className={twMerge(
                "flex flex-col items-center gap-x-[5%] gap-y-6 xl:flex-row xl:even:flex-row-reverse",
                className
            )}
        >
            <p className="text-[18px] font-bold leading-relaxed">{text}</p>
            <ul className="flex w-full flex-col gap-y-4">{children}</ul>
        </div>
    );
}
