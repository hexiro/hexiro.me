import { memo } from "react";

import { Lenis } from "@studio-freight/react-lenis";
import { twMerge } from "tailwind-merge";

function Page({ cssVariables, children }: { cssVariables: string[]; children: React.ReactNode }) {
    return (
        <Lenis root>
            <div
                className={twMerge(
                    "min-w-screen relative flex h-full min-h-screen w-full flex-col overflow-y-auto overflow-x-hidden bg-background md:flex-row",
                    ...cssVariables
                )}
            >
                {children}
            </div>
        </Lenis>
    );
}

export default memo(Page);
