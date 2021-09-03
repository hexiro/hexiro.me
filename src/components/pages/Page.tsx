import Head from "next/head";
import { ReactNode } from "react";

interface PageProps {
    name: string;
    description: string;
    fadesIn?: boolean;
    children?: ReactNode;
}

export const Page = ({ name, description, fadesIn, children }: PageProps): JSX.Element => {
    return (
        <>
            <Head>
                <title>{`${name} | Hexiro`}</title>
                <meta name="description" content={description} />
            </Head>
            {children}
            {fadesIn && (
                <noscript>
                    <style>{".fades-in{opacity:1!important}"}</style>
                </noscript>
            )}
        </>
    );
};
