import Image from "next/image";
import type { PropsWithChildren } from "react";

import { Card, SecondaryCard } from "@/components/ui/Cards";
import { H3, H4, H5 } from "@/components/ui/Headings";

import useDiscordState from "@/hooks/useDiscordState";

import { twMerge } from "tailwind-merge";

const SPECIAL_CHARS = "!@#$%^&?";

export function DiscordCard({ className }: { className?: string }) {
    const state = useDiscordState();

    console.log({ state });

    return (
        <Card isHoverable className={className}>
            <div className="flex flex-col gap-8">
                <div className="flex flex-row">
                    <div className="relative mr-4">
                        <Image
                            className="rounded-full"
                            width={64}
                            height={64}
                            src={state.user.avatar}
                            alt={state.user.alt}
                            draggable={false}
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
                    <div className="mt-1 flex flex-col leading-extra-tight">
                        <H4 className="text-[28px] text-green">{state.user.displayName}</H4>
                        <H5 className="font-sans text-[16px] font-bold text-subtitle">
                            @{state.user.username}
                        </H5>
                    </div>
                </div>
                <SecondaryCard className="flex w-[500px] flex-row">
                    <div className="relative mr-6 shrink-0">
                        {state.ide ? (
                            <Image
                                priority
                                className="rounded-md "
                                width={100}
                                height={100}
                                src={state.ide.images.large.src}
                                alt={state.ide.images.large.alt}
                                draggable={false}
                            />
                        ) : (
                            <div className="flex h-[100px] w-[100px] items-center justify-center rounded-md bg-background-accent">
                                <H3 className="text-off-white">!#?</H3>
                            </div>
                        )}
                    </div>
                    <div className="my-1 w-full overflow-hidden">
                        <H5 className="mb-2 truncate font-sans text-[24px] font-extrabold text-off-white">
                            {state.ide ? state.ide.name : "No IDE active"}
                        </H5>
                        {state.ide ? (
                            state.ide.lines.map((line) => (
                                <PresenceLine key={line[0].text}>
                                    {line.map((chunk) => (
                                        <span
                                            key={chunk.text}
                                            className={
                                                chunk.highlighted
                                                    ? "font-bold text-green"
                                                    : "font-semibold text-[#9E9E9E]"
                                            }
                                        >
                                            {chunk.text}
                                        </span>
                                    ))}
                                </PresenceLine>
                            ))
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

function StatusIndicator({ className, children }: PropsWithChildren<{ className?: string }>) {
    return (
        <div
            className={twMerge(
                "absolute bottom-[-1px] right-[-3px] h-6 w-6 rounded-full border-[5px] border-background-secondary bg-[#B6B6B6]",
                className
            )}
        >
            {children}
        </div>
    );
}

function PresenceLine({ className, children }: PropsWithChildren<{ className?: string }>) {
    return (
        <p className={twMerge("font-mono text-[16px] leading-tight text-subtitle truncate", className)}>
            {children}
        </p>
    );
}
