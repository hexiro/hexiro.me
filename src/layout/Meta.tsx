import type { NextFont } from "next/dist/compiled/@next/font";
import Script from "next/script";

import { GlobalSeo } from "@/layout/Seo";

interface MetaProps {
    readonly sansFont: NextFont;
}

export default function Meta({ sansFont }: MetaProps) {
    return (
        <>
            <Script
                defer
                src="https://umami.hexiro.me/script.js"
                data-website-id="8c4a0553-cf04-49a9-bef9-812f32fd65f3"
            />
            <style jsx global>{`
                html {
                    font-family: ${sansFont.style.fontFamily};
                }
            `}</style>
            <GlobalSeo />
        </>
    );
}
