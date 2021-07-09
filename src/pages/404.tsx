import Head from "next/head";
import { ErrorLayout } from "../layouts/ErrorLayout";

export default function NotFound() {
    return [
        <Head>
            <title>404 | Hexiro</title>
            <meta name="description" content="Oops? This page couldn't be found!" />
        </Head>,
        <ErrorLayout status="404" message="Oops? This page couldn't be found!" />,
    ];
}
