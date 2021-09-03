import Page from "components/pages";

export const ErrorPage = ({ status, message }: { status: number | string; message?: string }) => {
    return (
        <Page name={String(status)} description={message || "Oops?"}>
            <main className="full-center">
                <div className="text-center">
                    <h1 className="main-accent font-weight-400">{status}</h1>
                    <h2 className="font-weight-400">{message}</h2>
                </div>
            </main>
        </Page>
    );
};
