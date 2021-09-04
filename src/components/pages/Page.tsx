import Head from "next/head";
import React from "react";

interface PageProps {
    name: string;
    description: string;
    children?: React.ReactNode;
}

export const Page = ({ name, description, children }: PageProps): JSX.Element => {
    return (
        <>
            <Head>
                <title>{`${name} | Hexiro`}</title>
                <meta name="description" content={description} />
            </Head>
            {children}
            <noscript>
                <style>{".fade-in{opacity:1!important;}"}</style>
            </noscript>
        </>
    );
};
