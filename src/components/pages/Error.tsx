import { Header } from "components/common";
import Page from "components/pages";

import styled from "styled-components";

const ErrorPage = ({
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
export default ErrorPage;

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Text = styled.div`
    text-align: center;
`;
