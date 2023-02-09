import { forwardRef } from "react";

import { staggerChildren } from "@/commons/framer";

import type { SectionContainerProps } from "@/components/SectionContainer";
import SectionContainer from "@/components/SectionContainer";

import { SEO } from "layout/SEO";

export const Page = forwardRef<HTMLElement, SectionContainerProps>(
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
    ) => (
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
                animate="animate"
                exit="initial"
                {...props}
            >
                {children}
            </SectionContainer>
            <SEO name={name} description={description} />
        </>
    )
);

export default Page;
