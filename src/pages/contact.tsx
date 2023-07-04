import { SOCIALS } from "@/commons/config";

import { ExternalLinkOverlay } from "@/components/layout/LinkOverlay";
import { Card } from "@/components/ui/Cards";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { H1, H3, H5 } from "@/components/ui/Headings";
import { ExternalLinkIcon } from "@/components/ui/Icons";

export default function ContactPage() {
    return (
        <>
            <div className="mb-12">
                <H1>Contact</H1>
                <H3 className="text-subtitle">Connect w/ me through another medium</H3>
            </div>
            <ul className="flex flex-row flex-wrap gap-6">
                {SOCIALS.map(({ name, value, link, icon: Icon }) => (
                    <Card
                        key={name}
                        as="li"
                        className="flex flex-row items-center gap-x-6 min-w-[375px]"
                    >
                        <Icon className="w-10 h-10" />
                        <div className="flex flex-col">
                            <H5 className="text-off-white font-bold text-[20px]">{name}</H5>
                            <ExternalLinkOverlay
                                href={link}
                                className="font-mono font-bold text-text"
                            >
                                {value}
                            </ExternalLinkOverlay>
                        </div>
                        <div className="absolute top-6 right-8">
                            <ExternalLink href={link}>
                                <ExternalLinkIcon />
                            </ExternalLink>
                        </div>
                    </Card>
                ))}
            </ul>
        </>
    );
}
