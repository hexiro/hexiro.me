import Head from "next/head";
import React from "react";

import styled from "styled-components";

export default function Page({ name, description, children, locked }: PageProps): JSX.Element {
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
            {locked && <Locked />}
        </>
    );
}

interface PageProps {
    name: string;
    description: string;
    locked?: boolean;
    children?: React.ReactNode;
}

const Locked = styled.body`
    overflow: hidden;
`;
