import Error from "../components/Error";
import { NextPageContext } from "next";
import Page from "../components/Page";

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
    return (
        <Page name={status as string} description="Oops?">
            <Error status={status} message="Oops?" />,
        </Page>
    );
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
