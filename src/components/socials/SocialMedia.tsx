import { PropsWithChildren } from "react";
import React from "react";

import { To } from "components/common";

import { fadeChild } from "commons/animations";

import { motion } from "framer-motion";
import styled from "styled-components";

export const SocialMedia = ({ href, children }: PropsWithChildren<{ href: string }>) => {
    return (
        <SocialItem variants={fadeChild}>
            <To href={href}>{children}</To>
        </SocialItem>
    );
};

// type SocialMediaProps = React.ComponentProps<typeof SocialItem> &
//     PropsWithChildren<{ href: string }>;

const SocialItem = styled(motion.li)`
    height: 25px;
    width: 25px;
    margin-right: 30px;
    display: inline-block;
`;
