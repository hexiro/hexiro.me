import Image from "next/image";
import type { ComponentProps } from "react";

import { Card } from "@/components/ui/Cards";
import { H4 } from "@/components/ui/Headings";

interface IImageCardProps extends ComponentProps<typeof Image> {
    caption: string;
}

export function ImageCard({ caption, alt, ...props }: IImageCardProps) {
    return (
        <Card className="w-full px-8 py-6 sm:px-10 sm:py-6 xl:px-6 xl:py-5">
            <div className="mx-auto flex w-fit flex-col items-start justify-between gap-y-8 sm:w-auto sm:flex-row sm:items-center sm:gap-x-6 xl:flex-col">
                <div className="sm:self-start xl:mt-0 xl:max-w-xs">
                    <H4 green className="text-base md:text-[28px]">
                        {caption}
                    </H4>
                    <p className="sm:text-base">{alt}</p>
                </div>
                <Image
                    priority
                    alt={`${caption}, ${alt}`}
                    className="max-h-xs h-full w-full max-w-xs rounded-md border-2 border-solid border-white/10 drop-shadow-md sm:max-h-[16rem] sm:max-w-[16rem] md:h-auto md:w-auto"
                    {...props}
                />
            </div>
        </Card>
    );
}
