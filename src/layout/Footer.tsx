import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import type { IconType } from "@/commons/icons";
import { PAGE_ROUTES, SOCIAL_ROUTES } from "@/commons/routes";

import { Divider } from "@/components/layout";
import { Heading, Link } from "@/components/ui";

export default function Footer() {
    return (
        <FooterContainer>
            <Divider />
            <FooterContent>
                <div>
                    <Heading as="h2" css={{ color: "$brand-primary-alpha-75" }}>
                        Nathan Lodge
                    </Heading>
                    <Heading as="h3" css={{ color: "$text-secondary" }}>
                        Software Engineer
                    </Heading>
                </div>
                <SectionsAndLinks>
                    <SectionsSlashLinks>
                        <SectionsSlashContactsHeading as="h4">
                            Sections
                        </SectionsSlashContactsHeading>
                        {PAGE_ROUTES.map(({ name, href, icon }) => (
                            <LinkWithIcon key={name} name={name} href={href} icon={icon} />
                        ))}
                    </SectionsSlashLinks>
                    <SectionsSlashLinks>
                        <SectionsSlashContactsHeading as="h4">
                            Contacts
                        </SectionsSlashContactsHeading>
                        {SOCIAL_ROUTES.map(({ name, href, icon }) => (
                            <LinkWithIcon key={name} newTab name={name} href={href} icon={icon} />
                        ))}
                    </SectionsSlashLinks>
                </SectionsAndLinks>
            </FooterContent>
        </FooterContainer>
    );
}

const FooterContainer = styled("footer", {
    display: "flex",
    flexDirection: "column",
    marginTop: "$9",
    paddingBottom: "100px",
    paddingX: "$main-x-padding",

    "@lg": {
        paddingX: "$main-x-padding-lg",
    },
});

const FooterContent = styled("div", {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginTop: "$4",
});

const SectionsAndLinks = styled("div", {
    display: "flex",
    flexDirection: "row",
    gap: "100px",
});

const SectionsSlashLinks = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "$2",
});

const SectionsSlashContactsHeading = styled(Heading, {
    color: "$text-secondary",
    marginBottom: "$2",
});

const FlexLink = styled(Link, {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "12px",
    height: "100%",
});

type LinkWithIconProps = ComponentProps<typeof FlexLink> & {
    name: string;
    icon: IconType;
    href: string;
};

const LinkWithIcon = ({ name, icon, ...props }: LinkWithIconProps) => (
    <FlexLink animation="popAndTap" {...props}>
        {icon({ size: "sm" })}
        <Text>{name}</Text>
    </FlexLink>
);

const Text = styled("p", {
    fontSize: 16,
    fontWeight: 500,
    color: "$text-primary",
});
