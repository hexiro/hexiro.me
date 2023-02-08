import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

import { Button, Link } from "@/components/ui";

type ButtonLinkProps = Omit<ComponentProps<typeof Button> & ComponentProps<typeof Link>, "as">;

const ButtonLink = ({ children, priority, ...props }: ButtonLinkProps) => (
    <ButtonLinkWrapper as={Link} priority={priority} {...props}>
        {children}
    </ButtonLinkWrapper>
);

const ButtonLinkWrapper = styled(Button, {
    color: "inherit",
    textDecoration: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

export default ButtonLink;
