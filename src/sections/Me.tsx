import Image from "next/image";
import React from "react";

import { Header } from "components/common";
import Lanyard from "components/lanyard";

import styled from "styled-components";

export const Me = React.forwardRef<HTMLElement>((_, ref) => (
    <MeSection id="me" ref={ref}>
        <Left>
            <Text>
                <h1>
                    Hi! I'm <Header>Hexiro</Header>,
                </h1>
                <TextFooter>
                    A self-taught software engineer who enjoys problem solving, technology, building
                    software, and contributing to open source projects.
                </TextFooter>
            </Text>
            <Lanyard />
        </Left>
        <Right>
            <Avatar>
                <Image
                    src="https://avatars.githubusercontent.com/hexiro"
                    height={500}
                    width={500}
                    quality={100}
                    draggable={false}
                ></Image>
            </Avatar>
        </Right>
    </MeSection>
));

const MeSection = styled.section`
    position: relative;
    display: flex;
    width: 100%;
    height: 500px;
    align-items: center;
    padding: 0 10%;

    @media only screen and (max-width: 1100px) {
        height: 800px;
        flex-direction: column-reverse;
        /* align-items: unset; */
        justify-content: center;
    }
`;

const Left = styled.div`
    align-items: center;
    margin-right: 20px;
    max-width: 500px;
    width: 75%;

    @media only screen and (max-width: 1100px) {
        margin-top: 40px;
        margin-right: unset;
    }
`;

const Right = styled.div`
    margin-left: auto;
    margin-right: 20px;
    align-items: flex-end;

    @media only screen and (max-width: 1100px) {
        margin-left: unset;
        margin-right: unset;
    }
`;

const Text = styled.div`
    margin-top: -20px;
    margin-bottom: 20px;
`;

const TextFooter = styled.p`
    min-width: 200px;
`;

const Avatar = styled.div`
    min-width: 400px;
    min-height: 400px;

    @media only screen and (max-width: 1100px) {
        min-width: 200px;
        min-height: 200px;
        max-width: 400px;
        max-height: 400px;
    }

    & > span {
        filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.25));
    }
    & > span > img {
        border-radius: 12%;
    }
`;
