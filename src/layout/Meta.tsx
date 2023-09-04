import type { NextFont } from "next/dist/compiled/@next/font";
import Script from "next/script";

import { GlobalSeo } from "@/layout/Seo";

interface IMetaProps {
    sansFont: NextFont;
}

export default function Meta({ sansFont }: IMetaProps) {
    return (
        <>
            <Script
                async
                src="https://umami.hexiro.me/script.js"
                data-website-id="2c859610-01b6-4c75-b106-0422d8beb6b5"
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
