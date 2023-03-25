import { useRouter } from "next/router";

import { PAGE_ROUTES } from "@/commons/routes";

export default function usePageRouteIndex() {
    const router = useRouter();
    const index = PAGE_ROUTES.findIndex(({ href }) => href === router.pathname);
    return index;
}
