import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link";

type ButtonLinkProps = Omit<ComponentProps<typeof Button> & ComponentProps<typeof Link>, "as">;

const ButtonLink = ({ ...props }: ButtonLinkProps) => <ButtonLinkWrapper {...props} as={Link} />;

const ButtonLinkWrapper = styled(Button, {
    color: "inherit",
    textDecoration: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export default ButtonLink;