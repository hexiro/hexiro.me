import { styled } from "@/theme";

import { slideFromBottom, slideFromLeft, staggerChildren } from "@/commons/framer";
import type { IconType } from "@/commons/icons";
import { PythonIcon, TypeScriptIcon, JavaScriptIcon, CSSIcon, HTMLIcon } from "@/commons/icons";

import { BrandedBox, Heading, Paragraph } from "@/components/ui";

import Page from "@/layout/Page";

import { motion } from "framer-motion";

const NAME = "Tools";
const DESCRIPTION =
    "A look at my technical skills and the tools I utilize in my work, including programming languages, frameworks, and software.";

export default function ToolsPage() {
    return (
        <Page name={NAME} description={DESCRIPTION}>
            <ToolsSections variants={staggerChildren}>
                <ToolSection name="Languages">
                    <Tool name="Python" icon={PythonIcon} />
                    <Tool name="TypeScript" icon={TypeScriptIcon} />
                    <Tool name="JavaScript" icon={JavaScriptIcon} />
                    <Tool name="HTML" icon={HTMLIcon} />
                    <Tool name="CSS" icon={CSSIcon} />
                </ToolSection>
            </ToolsSections>
        </Page>
    );
}

interface ToolProps {
    name: string;
    icon: IconType;
}

const Tool = ({ name, icon }: ToolProps) => (
    <ToolContainer variants={slideFromBottom}>
        {icon({ size: "xl" })}
        <ToolName size="sm" align="center">
            {name}
        </ToolName>
    </ToolContainer>
);

const ToolSection = ({ name, children }: { name: string; children: React.ReactNode }) => (
    <ToolSectionContainer variants={staggerChildren}>
        <motion.div variants={slideFromLeft}>
            <Heading as="h2">{name}</Heading>
        </motion.div>
        <ToolsContainer variants={staggerChildren}>{children}</ToolsContainer>
    </ToolSectionContainer>
);

const ToolsSections = styled(motion.div, {
    display: "flex",
    flexDirection: "column",
    gap: "$4",
    paddingY: "$2",
});

const ToolSectionContainer = styled(motion.div, {
    display: "flex",
    flexDirection: "column",
    gap: "$4",
});

const ToolsContainer = styled(motion.div, {
    flexWrap: "wrap",
    display: "$$display",
    gap: "$$gap",
    flexDirection: "$$direction",
    gridColumns: "$$columns",

    $$display: "flex",
    $$gap: "$space$3",
    $$direction: "column",
    $$columns: 2,

    "@xs": {
        $$display: "grid",
        gridGap: "$$gap",
    },

    "@sm": {
        $$columns: 3,
    },

    "@md": {
        $$display: "flex",
        $$direction: "row",
        gap: "$$gap",
    },
});

const ToolContainer = styled(BrandedBox, {
    width: "auto",
    height: 120,

    display: "flex",
    flexDirection: "column",
    padding: "$2 $3",
    gap: "$1",
    alignItems: "center",
    justifyContent: "center",

    "@md": {
        width: 140,
        height: 120,
    },
});

const ToolName = styled(Paragraph, {
    fontWeight: 600,
    color: "$brand-accent",
});
