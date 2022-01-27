import { PropsWithChildren } from "react";

import { fade, pop } from "commons/animations";
import { Header, To } from "components/common";

import { motion } from "framer-motion";
import styled from "styled-components";

export const SocialMedia = ({ href, children }: PropsWithChildren<{ href: string }>) => {
    const variants = { ...fade, ...pop };
    return (
        <SocialItem whileHover={{ translateY: -3 }} variants={variants}>
            <To href={href}>{children}</To>
        </SocialItem>
    );
};

const SocialItem = styled(motion.li)`
    height: 25px;
    width: 25px;
    margin-right: 30px;
    display: inline-block;
    cursor: pointer;
`;
