import { ErrorPage } from "components/pages";

export default function NotFound() {
    return <ErrorPage status="404" message="Oops? This page couldn't be found!" />;
}
