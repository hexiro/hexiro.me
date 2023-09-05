import type { NextFontWithVariable } from "next/dist/compiled/@next/font";
import type { ReactNode } from "react";

import { twMerge } from "tailwind-merge";

interface PageProps {
    readonly fonts: NextFontWithVariable[];
    readonly children: ReactNode;
}

export default function Page({ fonts, children }: PageProps) {
    return (
        <div
            className={twMerge(
                "min-w-screen relative flex h-full min-h-screen w-full flex-col overflow-y-auto overflow-x-hidden bg-background md:flex-row",
                ...fonts.map((font) => font.variable)
            )}
        >
            {children}
        </div>
    );
}
