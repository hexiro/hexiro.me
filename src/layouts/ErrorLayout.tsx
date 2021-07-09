export interface ErrorPage {
    status: number | string;
    message: string;
}

export function ErrorLayout({ status, message}: ErrorPage) {
    return (
        <main className="full-center">
            <div className="text-center">
                <h1 className="main-accent font-weight-400">{status}</h1>
                <h2 className="font-weight-400">{message}</h2>
            </div>
        </main>
    );
}


