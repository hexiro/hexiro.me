import type { NextPage, NextPageContext } from "next";

import { ErrorPage } from "layout/Error";

interface ErrorProps {
    statusCode?: number;
}

const ErrorHandler: NextPage<ErrorProps> = ({ statusCode }): JSX.Element => (
    <ErrorPage
        status={statusCode ?? "Client Error"}
        message="Oops? That wasn't supposed to happen!"
    />
);

ErrorHandler.getInitialProps = ({ res, err }: NextPageContext) => ({
    statusCode: res?.statusCode ?? err?.statusCode,
});

export default ErrorHandler;
