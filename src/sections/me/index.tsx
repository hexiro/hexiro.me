import Image from "next/image";
import { forwardRef } from "react";

import { fade, fadeChildren, pop } from "commons/animations";
import { GITHUB } from "commons/config";
import theme from "commons/theme";
import { useScrollAnimation } from "hooks/useScrollAnimation";
import type { SectionProps } from "sections";
import Lanyard from "sections/me/lanyard";
import SocialMedia from "sections/me/socials";

import { AnimatePresence, motion } from "framer-motion";
import { useMedia } from "react-use";
import styled from "styled-components";

interface MeProps extends SectionProps {
    description: string;
}

export const Me = forwardRef<HTMLElement, MeProps>(({ inView, description }, ref) => {
    const animate = useScrollAnimation(inView);
    const shouldAvatarFadeOut = useMedia("(max-width: 600px)");

    return (
        <MeSection
            ref={ref}
            id="me"
            initial="start"
            animate={animate}
            exit="start"
            variants={fadeChildren}
        >
            <Left variants={fadeChildren}>
                <Introduction variants={fade}>
                    Hi! I&apos;m <Hexiro whileHover={pop}>Hexiro</Hexiro>,
                </Introduction>
                <Description variants={fade}>{description}</Description>
                <motion.ul variants={fadeChildren}>
                    <SocialMedia type="twitter" />
                    <SocialMedia type="github" />
                    <SocialMedia type="steam" />
                </motion.ul>
                <Lanyard />
            </Left>
            <Right variants={fadeChildren}>
                <AnimatePresence>
                    {!shouldAvatarFadeOut && (
                        <Avatar initial="start" animate="complete" exit="start" variants={fade}>
                            <Image
                                priority
                                src={`https://avatars.githubusercontent.com/${GITHUB}`}
                                alt="Hexiro Avatar"
                                height={500}
                                width={500}
                                quality={100}
                                draggable={false}
                            />
                        </Avatar>
                    )}
                </AnimatePresence>
            </Right>
        </MeSection>
    );
});

const MeSection = styled(motion.section)`
    position: relative;
    display: flex;
    width: 100%;
    min-height: 750px;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 1275px) {
        flex-direction: column-reverse;
        justify-content: flex-end;
    }

    @media only screen and (max-width: 600px) {
        min-height: unset;
    }
`;

const Left = styled(motion.div)`
    align-items: center;
    width: 75%;
    max-width: 500px;
    padding: 0 10px;

    @media only screen and (max-width: 1275px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        margin-top: 20px;
        width: 100%;
    }
`;

const Right = styled(motion.div)`
    padding: 0 10px;
`;

const Introduction = styled(motion.h1)`
    line-height: 1;
`;

const Hexiro = styled(motion.span)`
    display: inline-block;
    color: ${theme.accent.main};
    will-change: transform;
    font-weight: 400;
`;

const Description = styled(motion.p)`
    min-width: 200px;
    margin-bottom: 20px;
`;

const Avatar = styled(motion.div)`
    width: 400px;
    height: 400px;

    @media only screen and (max-width: 1275px) {
        width: 350px;
        height: 350px;
    }

    & > span {
        filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.25));
    }
    & > span > img,
    & > span > noscript > img {
        border-radius: 12%;
    }
`;
