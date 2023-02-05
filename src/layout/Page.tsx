import type { SectionProps } from "@/layout/Section";
import Section from "@/layout/Section";

type PageProps = Omit<SectionProps, "index">;

export default function Page({ children, ...props }: PageProps) {
    return (
        <Section index={null} {...props}>
            {children}
        </Section>
    );
}
