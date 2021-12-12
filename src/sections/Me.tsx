import Image from "next/image";
import React from "react";

import { Header } from "components/common";
import Lanyard from "components/lanyard";

import styled from "styled-components";

interface MeProps {
    meRef: React.MutableRefObject<HTMLElement | null>;
}

export const Me = ({ meRef }: MeProps): JSX.Element => (
    <MeSection id="me" ref={meRef}>
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
);

const MeSection = styled.section`
    position: relative;
    display: flex;
    width: 100%;
    height: 500px;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: 1164px) {
        height: 650px;
        flex-direction: column-reverse;
        justify-content: flex-start;
    }
`;

const Left = styled.div`
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
    }
`;

const Right = styled.div`
    padding: 0 10px;
`;

const Text = styled.div`
    margin-bottom: 20px;
`;

const TextFooter = styled.p`
    min-width: 200px;
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
    & > span > img {
        border-radius: 12%;
    }
`;
