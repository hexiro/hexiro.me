import Head from "next/head";

interface HeadingProps {
    pageName: string;
    description: string;
}

const PageHeading = ({ pageName, description }: HeadingProps): JSX.Element => {
    return (
        <Head>
            <title>{`${pageName} | Hexiro`}</title>
            <meta name="description" content={description} />
        </Head>
    );
};

export default PageHeading
