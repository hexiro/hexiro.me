import type { PropsWithChildren } from "react";
import { useState } from "react";

import { ICON_SWITCH, ICON_SWITCH_TRANSITION } from "@/commons/animations";
import type { ISocial } from "@/commons/config";

import { ExternalLinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";
import { H5 } from "@/components/ui/Headings";
import { CheckIcon, CopyIcon, ExternalLinkIcon, XIcon } from "@/components/ui/Icons";
import { ExternalLink } from "@/components/ui/Links";

import copy from "copy-to-clipboard";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface ContactCardProps {
    readonly social: ISocial;
    readonly className?: string;
    readonly isSingle?: boolean;
}

export function ContactCard({ social, className, isSingle }: ContactCardProps) {
    const { name, value, link, icon: Icon, canCopy } = social;
    const [copiedSuccess, setCopiedSuccess] = useState<boolean | null>(null);
    const [copiedTimeout, setCopiedTimeout] = useState<NodeJS.Timeout | null>(null);

    const isInteractive = Boolean(link ?? canCopy);
    const isBoth = Boolean(link && canCopy);

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
            isHoverable={isInteractive}
            isFocusable={isInteractive}
            className={twMerge(
                "flex w-full flex-row items-center gap-x-6 px-6 md:px-8",
                isSingle && "w-full xs:min-w-[375px]",
                className
            )}
            onClick={link ? undefined : copyToClipboard}
        >
            <Icon className="h-10 w-10 shrink-0 transition-transform group-hover:rotate-6" />
            <div className="flex flex-col overflow-hidden">
                <H5 className="text-[20px] font-bold text-off-white">{name}</H5>
                <WithExternalLinkOverlay
                    href={link}
                    aria-label={`open ${social.name}'s website`}
                    className="truncate font-mono font-bold normal-case text-text"
                >
                    {value}
                </WithExternalLinkOverlay>
            </div>
            <div className="absolute right-8 top-6 hidden flex-row gap-x-2 xxs:flex">
                {canCopy ? (
                    <button
                        type="button"
                        aria-label="Copy to clipboard"
                        className={twMerge(
                            "z-10 font-mono font-bold text-text outline-none transition-transform hover:-translate-y-[2px]",
                            isBoth && "rounded-sm ring-text/50 transition-all focus-visible:ring-2"
                        )}
                        onClick={copyToClipboard}
                    >
                        <AnimatePresence initial={false} mode="wait">
                            <motion.span
                                key={
                                    copiedSuccess === null
                                        ? "copy"
                                        : copiedSuccess
                                          ? "success"
                                          : "fail"
                                }
                                initial="hidden"
                                animate="enter"
                                exit="exit"
                                variants={ICON_SWITCH}
                                transition={ICON_SWITCH_TRANSITION}
                            >
                                {copiedSuccess === null ? (
                                    <CopyIcon />
                                ) : copiedSuccess ? (
                                    <CheckIcon />
                                ) : (
                                    <XIcon className="text-red-400" />
                                )}
                            </motion.span>
                        </AnimatePresence>
                    </button>
                ) : null}
                {link ? (
                    <ExternalLink
                        isHoverable
                        isFocusable={isBoth}
                        href={link}
                        aria-label={`open ${social} link`}
                    >
                        <ExternalLinkIcon />
                    </ExternalLink>
                ) : null}
            </div>
        </Card>
    );
}

interface WithExternalLinkOverlayProps {
    readonly href: string | undefined;
    readonly "aria-label": string;
    readonly className?: string;
}

const WithExternalLinkOverlay = ({
    href,
    children,
    className,
    ...props
}: PropsWithChildren<WithExternalLinkOverlayProps>) => {
    if (!href) return <span className={className}>{children}</span>;

    return (
        <ExternalLinkOverlay href={href} className={className} {...props}>
            {children}
        </ExternalLinkOverlay>
    );
};
