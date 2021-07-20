import Link from "next/link";
import { ReactNode } from "react";

export interface SocialMediaProps {
    href: string;
    children?: ReactNode;
}

export const SocialMedia = ({ href, children }: SocialMediaProps): JSX.Element => {
    return (
        <li className="social-item">
            <Link href={href}>
                <a rel="noreferrer" target="_blank">
                    {children}
                </a>
            </Link>
        </li>
    );
};
