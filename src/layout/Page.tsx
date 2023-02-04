import type { SectionProps } from "@/layout/Section";
import Section from "@/layout/Section";

type PageProps = Omit<SectionProps, "isSelected">;

export default function Page({ children, ...props }: PageProps) {
    return (
        <Section isSelected {...props}>
            {children}
        </Section>
    );
}
