import { NextPage, NextPageContext } from "next";

import ErrorPage from "components/pages/Error";

interface ErrorProps {
    statusCode?: number;
}

const ErrorHandler: NextPage<ErrorProps> = ({ statusCode }): JSX.Element => {
    return (
        <ErrorPage
            status={statusCode || "Client Error"}
            message="Oops? That wasn't supposed to happen!"
        />
    );
};

ErrorHandler.getInitialProps = ({ res, err }: NextPageContext) => {
    let statusCode: number | undefined;
    if (res) {
        statusCode = res.statusCode;
    } else if (err && err.statusCode) {
        statusCode = err.statusCode;
    }
    return { statusCode };
};

export default ErrorHandler;
