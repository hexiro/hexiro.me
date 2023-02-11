import { styled } from "@/theme";

import { idToHref } from "@/commons";
import { fadeIn } from "@/commons/framer";
import type { SectionName } from "@/commons/sections";

import { Link, ListItem } from "@/components/ui";

import useIsIndexPage from "@/hooks/useIsIndexPage";
import useIsSectionInView from "@/hooks/useIsSectionInView";

import { AnimatePresence, motion } from "framer-motion";

interface SectionProps {
    name: SectionName;
}

export default function Section({ name }: SectionProps) {
    const isIndexPage = useIsIndexPage();
    const isSelected = useIsSectionInView(name);

    return (
        <SectionLinkItem key={name}>
            <Link noNextLink href={idToHref(name)} animation="popAndTap">
                {name}
            </Link>
            <AnimatePresence initial={false}>
                {isIndexPage && isSelected ? (
                    <SectionUnderline
                        variants={fadeIn}
                        layoutId="nav-section-underline"
                        initial="initial"
                        animate="animate"
                        exit="initial"
                    />
                ) : null}
            </AnimatePresence>
        </SectionLinkItem>
    );
}

const SectionLinkItem = styled(ListItem, {
    position: "relative",
});

const SectionUnderline = styled(motion.div, {
    position: "absolute",
    bottom: -25,
    left: "-2%",
    width: "104%",
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: "$brand-primary",
});
