import Image from "next/image";
import React from "react";

import { Header } from "components/common";

import styled from "styled-components";

export const Me = React.forwardRef<HTMLElement>((_, ref) => (
    <MeSection id="me" ref={ref}>
        <Text>
            <Intro>
                Hi! I'm <Header>Hexiro</Header>,
            </Intro>
            <TextFooter>
                A self-taught software engineer who enjoys problem solving, technology, building
                software, and contributing to open source projects.
            </TextFooter>
        </Text>
        <Avatar>
            <Image
                src="https://avatars.githubusercontent.com/hexiro"
                height={500}
                width={500}
                quality={100}
                draggable={false}
            ></Image>
        </Avatar>
    </MeSection>
));

const MeSection = styled.section`
    position: relative;
    display: flex;
    width: 75vw;
    padding: 20px;
    justify-content: center;
    align-items: center;
    /* background: red; */
`;

const Intro = styled.h1`
    font-size: 3em;
    font-weight: 400;
`

const Text = styled.div`
    display: inline-block;
    width: 500px;
    margin-bottom: 150px;
    margin-left: 50px;
    margin-right: 20px;
`;

const TextFooter = styled.p`
    font-size: 1.2em;
    opacity: 0.8;
    /* color: #537768; */
`;

const Avatar = styled.div`
    display: inline-block;
    padding: 0 150px;


    & > span {
        filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.25));
    }
    & > span > img {
        border-radius: 12%;
    }
`;
