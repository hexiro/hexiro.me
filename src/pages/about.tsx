import { useEffect } from "react";
const ErrorPage = () => {
    useEffect(() => {
        throw new Error("gun");
    }, []);
    return null;
};
export default ErrorPage;
