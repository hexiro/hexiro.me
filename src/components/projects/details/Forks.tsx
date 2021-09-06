import Detail from "components/projects/details/Detail";

import { BiGitPullRequest } from "react-icons/bi";

export const Forks = ({ forks }: { forks: number }): JSX.Element | null => {
    return (
        <Detail detail={forks}>
            <BiGitPullRequest />
        </Detail>
    );
};
