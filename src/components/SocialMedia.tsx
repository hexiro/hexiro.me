import Link from "next/link";

import { SocialMediaProps } from "types";

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
