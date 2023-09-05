import type { PropsWithChildren } from "react";
import { useState } from "react";

import { iconSwitch } from "@/commons/animations";
import type { ISocial } from "@/commons/config";

import { ExternalLinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";
import { H5 } from "@/components/ui/Headings";
import { CheckIcon, CopyIcon, ExternalLinkIcon, XIcon } from "@/components/ui/Icons";
import { ExternalLink } from "@/components/ui/Links";

import copy from "copy-to-clipboard";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface IContactCardProps {
    readonly social: ISocial;
    readonly className?: string;
    readonly isSingle?: boolean;
}

export function ContactCard({ social, className, isSingle }: IContactCardProps) {
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
                isSingle && "min-w-[375px]",
                className
            )}
            onClick={link ? undefined : copyToClipboard}
        >
            <Icon className="h-10 w-10 shrink-0 transition-transform group-hover:rotate-6" />
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
                        className={twMerge(
                            "font-mono font-bold text-text outline-none transition-transform hover:-translate-y-[2px] ",
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
                                variants={iconSwitch}
                                transition={{ duration: 0.15 }}
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
                    <ExternalLink isFocusable={isBoth} href={link}>
                        <ExternalLinkIcon />
                    </ExternalLink>
                ) : null}
            </div>
        </Card>
    );
}

interface IWithExternalLinkOverlay extends PropsWithChildren {
    readonly href: string | undefined;
    readonly className?: string;
}

const WithExternalLinkOverlay = ({ href, children, className }: IWithExternalLinkOverlay) => {
    if (!href) return <span className={className}>{children}</span>;

    return (
        <ExternalLinkOverlay href={href} className={className}>
            {children}
        </ExternalLinkOverlay>
    );
};
