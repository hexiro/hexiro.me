import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import { Button, Link } from "@/components/ui";

type ButtonAsLinkProps = Omit<ComponentProps<typeof Button> & ComponentProps<typeof Link>, "as">;

const ButtonAsLink = ({ href, ...props }: ButtonAsLinkProps) => (
    <Button as={Link} href={href} {...props} />
);

const ButtonLink = styled(ButtonAsLink, {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "inherit",
    textDecoration: "inherit",
});

export default ButtonLink;
