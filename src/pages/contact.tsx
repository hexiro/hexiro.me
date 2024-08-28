import { SOCIALS } from "@/commons/config";

import { H1, H2 } from "@/components/ui/Headings";

import { ContactCard } from "@/components/cards/ContactCard";

import { Seo } from "@/layout/Seo";

const NAME = "Contact";
const DESCRIPTION = "Connect w/ me through another medium.";

export default function ContactPage() {
    return (
        <>
            <Seo name={NAME} description={DESCRIPTION} />
            <div className="mb-12">
                <H1>{NAME}</H1>
                <H2 className="text-subtitle">{DESCRIPTION}</H2>
            </div>
            <ul className="grid auto-cols-fr gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                {SOCIALS.map((social) => (
                    <ContactCard key={social.name} social={social} />
                ))}
            </ul>
        </>
    );
}
