import type { PropsWithChildren } from "react";
import { useState } from "react";

import type { ISocial } from "@/commons/config";

import { ExternalLinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";
import { H5 } from "@/components/ui/Headings";
import { CheckIcon, CopyIcon, ExternalLinkIcon, XIcon } from "@/components/ui/Icons";
import { ExternalLink } from "@/components/ui/Links";

import copy from "copy-to-clipboard";
import { twMerge } from "tailwind-merge";

interface ISocialCardProps {
    social: ISocial;
    className?: string;
    isSingle?: boolean;
}

export function SocialCard({ social, className, isSingle }: ISocialCardProps) {
    const { name, value, link, icon: Icon, canCopy } = social;
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
        <Card
            as="li"
            className={twMerge(
                "flex w-full flex-row items-center gap-x-6 px-6 md:px-8",
                isSingle && "min-w-[375px]",
                className
            )}
            isHoverable={Boolean(link ?? canCopy)}
            onClick={link ? undefined : copyToClipboard}
        >
            <Icon className="h-10 w-10 shrink-0" />
            <div className="flex flex-col overflow-hidden">
                <H5 className="text-[20px] font-bold text-off-white">{name}</H5>
                <WithExternalLinkOverlay
                    href={link}
                    className="truncate font-mono font-bold normal-case text-text"
                >
                    {value}
                </WithExternalLinkOverlay>
            </div>
            <div className="absolute right-8 top-6 hidden flex-row gap-x-2 xxs:flex">
                {canCopy ? (
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
                ) : null}
                {link ? (
                    <ExternalLink
                        href={link}
                        className="transition-transform hover:translate-y-[-2px]"
                    >
                        <ExternalLinkIcon />
                    </ExternalLink>
                ) : null}
            </div>
        </Card>
    );
}

interface IWithExternalLinkOverlay extends PropsWithChildren {
    href: string | undefined;
    className?: string;
}

const WithExternalLinkOverlay = ({ href, children, className }: IWithExternalLinkOverlay) => {
    if (!href) return <span className={className}>{children}</span>;

    return (
        <ExternalLinkOverlay href={href} className={className}>
            {children}
        </ExternalLinkOverlay>
    );
};
