import { useRouter } from "next/router";
import { useMemo } from "react";

export default function usePathname() {
    const router = useRouter();
    const pathname = useMemo(() => router.pathname, [router.pathname]);
    return pathname;
}
