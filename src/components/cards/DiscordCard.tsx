import Image from "next/image";
import type { PropsWithChildren } from "react";

import { HorizontalDivider } from "@/components/layout/Divider";
import { Card, SecondaryCard } from "@/components/ui/Cards";
import { H2, H3, H4 } from "@/components/ui/Headings";

import useDiscordState from "@/hooks/useDiscordState";

import { twMerge } from "tailwind-merge";

const SPECIAL_CHARS = "!@#$%^&?";

export function DiscordCard({ className }: { readonly className?: string }) {
    const state = useDiscordState();

    return (
        <Card className={twMerge("w-full sm:w-auto", className)}>
            <div className="flex flex-col gap-6 sm:gap-8">
                <div className="flex flex-row gap-x-4">
                    <div className="relative h-14 w-14 shrink-0 md:h-16 md:w-16">
                        <Image
                            width={64}
                            height={64}
                            src={state.user.avatar}
                            alt={state.user.alt}
                            draggable={false}
                            className="rounded-full"
                        />
                        {state.user.status === "online" ? (
                            <StatusIndicator className="bg-green" />
                        ) : (
                            <StatusIndicator className="bg-subtitle">
                                <div className="relative flex h-full w-full items-center justify-center">
                                    <span className="h-1/2 w-1/2 rounded-full bg-black/25" />
                                </div>
                            </StatusIndicator>
                        )}
                    </div>
                    <div className="mt-1 flex flex-col overflow-hidden leading-extra-tight">
                        <H3 className="text-green">{state.user.displayName}</H3>
                        <span className="font-bold uppercase text-subtitle">
                            @{state.user.username}
                        </span>
                    </div>
                </div>
                <HorizontalDivider className="block border-[1px] sm:hidden" />
                <SecondaryCard className="flex flex-row gap-x-4 border-transparent bg-transparent p-0 shadow-none sm:w-[500px] sm:gap-x-6 sm:border-solid sm:border-white/10 sm:bg-white/5 sm:p-5 sm:shadow-sm">
                    <div className="relative hidden h-16 w-16 shrink-0 self-center sm:h-[100px] sm:w-[100px] xs:block">
                        {state.ide ? (
                            <Image
                                priority
                                width={100}
                                height={100}
                                src={state.ide.images.large.src}
                                alt={state.ide.images.large.alt}
                                draggable={false}
                                className="rounded-md border border-white/5 brightness-[99%] contrast-[200%] invert-[15%] saturate-[289%] sepia-[24%] filter"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center rounded-md bg-background-accent">
                                <H2 className="text-off-white">!#?</H2>
                            </div>
                        )}
                    </div>
                    <div className="my-1 w-full overflow-hidden">
                        <span
                            className="mb-2 truncate font-sans text-[18px] font-extrabold uppercase leading-none text-off-white sm:leading-normal lg:text-base"
                        >
                            {state.ide ? state.ide.name : "No IDE active"}
                        </span>
                        {state.ide ? (
                            state.ide.lines.map((line) =>
                                line[0] ? (
                                    <PresenceLine key={line[0].text}>
                                        {line.map((chunk) => (
                                            <span
                                                key={chunk.text}
                                                className={
                                                    chunk.highlighted
                                                        ? "font-bold text-green"
                                                        : "font-semibold"
                                                }
                                            >
                                                {chunk.text}
                                            </span>
                                        ))}
                                    </PresenceLine>
                                ) : null
                            )
                        ) : (
                            <PresenceLine>
                                {[SPECIAL_CHARS, SPECIAL_CHARS, SPECIAL_CHARS].join("-")}
                            </PresenceLine>
                        )}
                    </div>
                </SecondaryCard>
            </div>
        </Card>
    );
}

function StatusIndicator({
    className,
    children,
}: PropsWithChildren<{ readonly className?: string }>) {
    return (
        <div
            className={twMerge(
                "absolute bottom-[-1px] right-[-3px] h-[22px] w-[22px] rounded-full border-[5px] border-background-secondary bg-[#B6B6B6] md:h-6 md:w-6",
                className
            )}
        >
            {children}
        </div>
    );
}

function PresenceLine({ className, children }: PropsWithChildren<{ readonly className?: string }>) {
    return (
        <p className={twMerge("truncate font-mono text-[16px] leading-tight text-text", className)}>
            {children}
        </p>
    );
}
