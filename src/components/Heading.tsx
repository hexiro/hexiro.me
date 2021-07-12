import Head from "next/head";

interface HeadingProps {
    name: string;
    description: string;
}

export default function PageHeading({ name, description }: HeadingProps): JSX.Element {
    return (
        <Head>
            <title>{`${name} | Hexiro`}</title>
            <meta name="description" content={description} />
        </Head>
    );
}
