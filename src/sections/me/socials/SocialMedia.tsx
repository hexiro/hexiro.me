import React, { PropsWithChildren } from "react";

import { fadeChild } from "commons/animations";
import { To } from "components/common";

import { motion } from "framer-motion";
import styled from "styled-components";

export const SocialMedia = ({ href, children }: PropsWithChildren<{ href: string }>) => (
    <SocialItem variants={fadeChild}>
        <To href={href}>{children}</To>
    </SocialItem>
);

const SocialItem = styled(motion.li)`
    height: 25px;
    width: 25px;
    margin-right: 30px;
    display: inline-block;
`;
