import Head from "next/head";
import { ReactNode } from "react";

interface PageProps {
    name: string;
    description: string;
    children?: ReactNode;
}

export const Page = ({ name, description, children }: PageProps): JSX.Element => {
    return (
        <>
            <Head>
                <title>{`${name} | Hexiro`}</title>
                <meta name="description" content={description} />
            </Head>
            {children}
        </>
    );
};
