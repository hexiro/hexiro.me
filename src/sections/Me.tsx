import Image from "next/image";
import React from "react";

import { Header } from "components/common";

import styled from "styled-components";

export const Me = React.forwardRef<HTMLElement>((_, ref) => (
    <MeSection id="me" ref={ref}>
        <Avatar>
            <Image
                src="https://avatars.githubusercontent.com/hexiro"
                height={250}
                width={250}
                quality={100}
            ></Image>
        </Avatar>
        <Text>
            <h1>
                Hi! I'm <Header>Hexiro</Header>,
            </h1>
            <TextFooter>
                A self-taught software engineer who enjoys problem solving, technology, building
                software, and contributing to open source projects.
            </TextFooter>
        </Text>
    </MeSection>
));

const MeSection = styled.section`
    position: relative;
    display: flex;
    width: 75vw;
    height: 300px;
    /* background: red; */
`;

const Text = styled.div`
    display: inline-block;
    text-align: left;
    width: 775px;
`;

const TextFooter = styled.p`
    font-size: 1.75em;
`;

const Avatar = styled.div`
    display: inline-block;
    padding: 0 25px 25px 0;
    & img {
        border-radius: 12%;
    }
`;
