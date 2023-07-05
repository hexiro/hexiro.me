import { SOCIALS } from "@/commons/config";

import { H1, H3 } from "@/components/ui/Headings";

import { SocialCard } from "@/components/cards/SocialCard";

export default function ContactPage() {
    return (
        <>
            <div className="mb-12">
                <H1>Contact</H1>
                <H3 className="text-subtitle">Connect w/ me through another medium</H3>
            </div>
            <ul className="flex flex-row flex-wrap gap-6">
                {SOCIALS.map((social) => (
                    <SocialCard key={social.name} social={social} />
                ))}
            </ul>
        </>
    );
}
