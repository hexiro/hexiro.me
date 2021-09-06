import { Header } from "components";
import Page from "components/Pages";

import styled from "styled-components";

export const ErrorPage = ({
    status,
    message,
}: {
    status: number | string;
    message?: string;
}): JSX.Element => {
    return (
        <Page name={String(status)} description={message || "Oops?"} locked={true}>
            <Main>
                <Text>
                    <h1>
                        <Header>{status}</Header>
                    </h1>
                    <h2>{message}</h2>
                </Text>
            </Main>
        </Page>
    );
};

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Text = styled.div`
    text-align: center;
`;
