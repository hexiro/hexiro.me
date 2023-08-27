import type { ReactNode } from "react";

import { twMerge } from "tailwind-merge";

interface IPageProps {
    cssVariables: string[];
    children: ReactNode;
}

export default function Page({ cssVariables, children }: IPageProps) {
    return (
        <div
            className={twMerge(
                "min-w-screen relative flex h-full min-h-screen w-full flex-col overflow-y-auto overflow-x-hidden bg-background md:flex-row",
                ...cssVariables
            )}
        >
            {children}
        </div>
    );
}
