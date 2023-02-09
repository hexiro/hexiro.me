import { useRouter } from "next/router";

export default function useIsIndexPage() {
    const router = useRouter();
    const isIndexPage = router.pathname === "/";
    return isIndexPage;
}
