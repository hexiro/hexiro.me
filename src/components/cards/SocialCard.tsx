import { useState } from "react";

import type { ISocial } from "@/commons/config";

import { ExternalLinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { H5 } from "@/components/ui/Headings";
import { CheckIcon, CopyIcon, ExternalLinkIcon, XIcon } from "@/components/ui/Icons";

import copy from "copy-to-clipboard";

export function SocialCard({ social }: { social: ISocial }) {
    const { name, value, link, icon: Icon } = social;
    const [copiedSuccess, setCopiedSuccess] = useState<boolean | null>(null);
    const [copiedTimeout, setCopiedTimeout] = useState<NodeJS.Timeout | null>(null);

    const copyToClipboard = () => {
        if (copiedTimeout) clearTimeout(copiedTimeout);

        try {
            copy(value);
            setCopiedSuccess(true);
        } catch (err) {
            setCopiedSuccess(false);
        } finally {
            const clear = () => {
                setCopiedSuccess(null);
                setCopiedTimeout(null);
            };

            const timeout = setTimeout(clear, 3000);
            setCopiedTimeout(timeout);
        }
    };

    return (
        <Card as="li" className="flex min-w-[375px] flex-row items-center gap-x-6 w-full sm:w-auto">
            <Icon className="h-10 w-10" />
            <div className="flex flex-col">
                <H5 className="text-[20px] font-bold text-off-white">{name}</H5>
                <ExternalLinkOverlay
                    href={link}
                    className="font-mono font-bold normal-case text-text"
                >
                    {value}
                </ExternalLinkOverlay>
            </div>
            <div className="absolute right-8 top-6 flex flex-row gap-x-2">
                <button
                    type="button"
                    className="font-mono font-bold text-text transition-transform hover:translate-y-[-2px]"
                    onClick={copyToClipboard}
                >
                    {copiedSuccess === null ? (
                        <CopyIcon />
                    ) : copiedSuccess ? (
                        <CheckIcon />
                    ) : (
                        <XIcon className="text-red-400" />
                    )}
                </button>
                <ExternalLink href={link} className="transition-transform hover:translate-y-[-2px]">
                    <ExternalLinkIcon />
                </ExternalLink>
            </div>
        </Card>
    );
}
