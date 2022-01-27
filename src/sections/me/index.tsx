import Image from "next/image";
import { forwardRef } from "react";

import { fade, fadeChildren } from "commons/animations";
import { GITHUB } from "commons/config";
import { Header } from "components/common";
import Lanyard from "sections/me/lanyard";
import Socials from "sections/me/socials";

import { motion } from "framer-motion";
import styled from "styled-components";

export const Me = forwardRef<HTMLElement>((_, ref) => (
    <MeSection ref={ref} id="me">
        <Left initial="fading" animate="faded" variants={fadeChildren}>
            <Intro variants={fade}>
                Hi! I'm <Header pop>Hexiro</Header>,
            </Intro>
            <TextFooter variants={fade}>
                A self-taught software engineer who enjoys problem solving, technology, building
                software, and contributing to open source projects.
            </TextFooter>
            <Socials />
            <Lanyard />
        </Left>
        <Right>
            <Header tap>
                <Avatar>
                    <Image
                        priority
                        src={`https://avatars.githubusercontent.com/${GITHUB}`}
                        alt="Hexiro GitHub Avatar"
                        height={500}
                        width={500}
                        quality={100}
                        draggable={false}
                    />
                </Avatar>
            </Header>
        </Right>
    </MeSection>
));

const MeSection = styled(motion.section)`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 1164px) {
        flex-direction: column-reverse;
        justify-content: flex-end;
    }
`;

const Left = styled(motion.div)`
    align-items: center;
    width: 75%;
    max-width: 500px;
    padding: 0 10px;

    @media only screen and (max-width: 1164px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        margin-top: 20px;
        width: 100%;
    }
`;

const Right = styled.div`
    padding: 0 10px;
`;

const Intro = styled(motion.h1)`
    line-height: 1;
`;

const TextFooter = styled(motion.p)`
    min-width: 200px;
    margin-bottom: 20px;
`;

const Avatar = styled.div`
    min-width: 400px;
    min-height: 400px;

    @media only screen and (max-width: 1164px) {
        min-width: 200px;
        min-height: 200px;
        max-width: 400px;
        max-height: 400px;
    }

    & > span {
        filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.25));
    }
    & > span > img,
    & > span > noscript > img {
        border-radius: 12%;
    }
`;
