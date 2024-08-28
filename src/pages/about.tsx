import Image from "next/image";
import type { ComponentProps, PropsWithChildren } from "react";

import { currentAge, SOCIALS_MAP } from "@/commons/config";

import { H1, H2, H3 } from "@/components/ui/Headings";

import { ContactCard } from "@/components/cards/ContactCard";
import { ImageCard } from "@/components/cards/ImageCard";

import bedSelfieSrc from "@/images/bed_selfie.jpg";
import codeSelfieSrc from "@/images/code_selfie.jpg";
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
                <H2 className="text-subtitle">{DESCRIPTION}</H2>
            </div>
            <div className="flex w-full flex-col gap-24">
                <AboutSection isSingle heading="whoami" text={INTRO}>
                    <ImageCard className="relative justify-around gap-6 xl:w-full xl:flex-col-reverse">
                        <AboutImage
                            src={bedSelfieSrc}
                            alt="me (Nathan Lodge) laying in bed smirking"
                            className="hidden w-1/2 shrink-0 sm:block xl:w-full"
                        />
                        <AboutImage
                            priority
                            src={codeSelfieSrc}
                            alt="a reflection of me (Nathan Lodge) holding up a peace sign in front of a laptop with Visual Studio Code open"
                            className="w-full sm:w-1/2 xl:w-full"
                        />
                    </ImageCard>
                </AboutSection>
                <AboutSection heading="My Hobbies" text={MAIN_HOBBIES}>
                    <ContactCard isSingle social={SOCIALS_MAP.IMDb} />
                    <ContactCard isSingle social={SOCIALS_MAP.Spotify} />
                    <ContactCard isSingle social={SOCIALS_MAP["Last.fm"]} />
                </AboutSection>
                <AboutSection heading="Video Games" text={VIDEO_GAMES}>
                    <ContactCard isSingle social={SOCIALS_MAP.Steam} />
                    <ContactCard isSingle social={SOCIALS_MAP["Epic Games"]} />
                </AboutSection>
            </div>
        </>
    );
}

interface AboutSectionProps {
    readonly heading: string;
    readonly text: string;
    readonly isSingle?: boolean;
    readonly className?: string;
}

function AboutSection({
    heading,
    text,
    isSingle,
    children,
    className,
}: PropsWithChildren<AboutSectionProps>) {
    const Component = isSingle ? "div" : "ul";
    return (
        <div
            className={twMerge(
                "flex flex-col items-center gap-x-[min(5%,96px)] gap-y-6 xl:flex-row xl:gap-x-[min(10%,192px)] xl:even:flex-row-reverse",
                className
            )}
        >
            <div className="space-y-2 xl:basis-2/3">
                <H3 className="text-subtitle">{heading}</H3>
                <p className="w-full text-pretty break-normal text-[18px] font-bold leading-relaxed 2xl:text-base">
                    {text}
                </p>
            </div>
            <Component className="flex w-full flex-col gap-y-4 xl:basis-1/3">{children}</Component>
        </div>
    );
}

function AboutImage({ src, alt, className, ...props }: ComponentProps<typeof Image>) {
    return (
        <Image
            priority
            src={src}
            alt={alt}
            className={twMerge(
                "shrink-1 w-full grow basis-0 rounded-md border-2 border-solid border-white/10 drop-shadow-md",
                className
            )}
            {...props}
        />
    );
}
