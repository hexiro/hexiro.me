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
        <Card as="li" className="flex flex-row items-center gap-x-6 min-w-[375px]">
            <Icon className="w-10 h-10" />
            <div className="flex flex-col">
                <H5 className="text-off-white font-bold text-[20px]">{name}</H5>
                <ExternalLinkOverlay href={link} className="font-mono font-bold text-text normal-case">
                    {value}
                </ExternalLinkOverlay>
            </div>
            <div className="absolute top-6 right-8 flex flex-row gap-x-2">
                <button
                    type="button"
                    className="text-text font-bold font-mono"
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
                <ExternalLink href={link}>
                    <ExternalLinkIcon />
                </ExternalLink>
            </div>
        </Card>
    );
}
