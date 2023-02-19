import { forwardRef } from "react";

import { sectionsAnimated } from "@/commons/atoms";
import { staggerChildren } from "@/commons/framer";
import type { SectionName } from "@/commons/sections";

import type { SectionContainerProps } from "@/components/SectionContainer";
import SectionContainer from "@/components/SectionContainer";

import useNavSectionIsSelected from "@/hooks/useIsSectionInView";
import useViewportAnimation from "@/hooks/useViewportAnimation";
import type { SEOProps } from "@/layout/SEO";
import { SEO } from "@/layout/SEO";

import { useSetAtom } from "jotai";

type SectionProps = SectionContainerProps & {
    name: SectionName;
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
        const setHasSectionAnimated = useSetAtom(sectionsAnimated[name]);

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
                    onAnimationComplete={() => setHasSectionAnimated(true)}
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
    name: SectionName;
};

const SectionSEO = ({ name, description }: SectionSEOProps) => {
    const isSelected = useNavSectionIsSelected(name);

    return isSelected ? <SEO name={name} description={description} /> : null;
};

export default Section;
