import { NextPageContext } from "next";
import Head from "next/head";
import { ErrorLayout } from "../layouts/ErrorLayout";

interface ErrorProps {
    statusCode?: number;
}

function ErrorHandler({ statusCode }: ErrorProps) {
    let status: string | number;
    if (statusCode) {
        status = statusCode;
    } else {
        status = "Client Error";
    }
    return [
        <Head>
            <title>{`${status} | Hexiro`}</title>
            <meta name="description" content="Oops?" />
        </Head>,
        <ErrorLayout status={status} message="Oops?" />,
    ];
}

ErrorHandler.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
    let statusCode;
    if (res) {
        statusCode = res.statusCode;
    } else if (err && err.statusCode) {
        statusCode = err.statusCode;
    }
    return { statusCode };
};

export default ErrorHandler;
