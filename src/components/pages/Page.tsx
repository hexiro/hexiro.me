import Head from "next/head";
import React from "react";

export default function Page({ name, description, children }: PageProps): JSX.Element {
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
}

interface PageProps {
    name: string;
    description: string;
    locked?: boolean;
    children?: React.ReactNode;
}
