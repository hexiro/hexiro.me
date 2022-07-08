import { Center, Heading, Text } from "@chakra-ui/react";

import { Page } from "./Page";

interface ErrorPageProps {
    status: number | string;
    message?: string;
}

export const ErrorPage = ({ status, message }: ErrorPageProps): JSX.Element => {
    status = String(status);
    message = message ?? "Oops?";
    return (
        <Page name={status} description={message}>
            <Center flexDirection="column" height="100%" textAlign="center">
                <Heading>{status}</Heading>
                <Text>{message}</Text>
            </Center>
        </Page>
    );
};
