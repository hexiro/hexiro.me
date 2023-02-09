import { forwardRef } from "react";

import { staggerChildren } from "@/commons/framer";
import type { RouteName } from "@/commons/sections";

import type { SectionContainerProps } from "@/components/SectionContainer";
import SectionContainer from "@/components/SectionContainer";

import useNavSectionIsSelected from "@/hooks/useNavSectionIsSelected";
import useViewportAnimation from "@/hooks/useViewportAnimation";
import type { SEOProps } from "@/layout/SEO";
import { SEO } from "@/layout/SEO";

type SectionProps = SectionContainerProps & {
    name: RouteName;
};

const Section = forwardRef<HTMLElement, SectionProps>(
    (
        {
            name,
            description,
            subheading,
            nameElement,
            descriptionElement,
            subheadingElement,
            children,
            ...props
        },
        ref
    ) => {
        const controls = useViewportAnimation(ref);

        return (
            <>
                <SectionContainer
                    ref={ref}
                    name={name}
                    description={description}
                    subheading={subheading}
                    nameElement={nameElement}
                    descriptionElement={descriptionElement}
                    subheadingElement={subheadingElement}
                    variants={staggerChildren}
                    initial="initial"
                    animate={controls}
                    exit="initial"
                    {...props}
                >
                    {children}
                </SectionContainer>
                <SectionSEO name={name} description={description} />
            </>
        );
    }
);

type SectionSEOProps = SEOProps & {
    name: RouteName;
};

const SectionSEO = ({ name, description }: SectionSEOProps) => {
    const isSelected = useNavSectionIsSelected(name);

    return isSelected ? <SEO name={name} description={description} /> : null;
};

export default Section;
