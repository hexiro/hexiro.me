import Detail from "components/projects/details/Detail";

import { BiGitPullRequest } from "react-icons/bi";

export const PullRequests = ({ pullRequests }: { pullRequests: number }): JSX.Element | null => {
    return (
        <Detail detail={pullRequests}>
            <BiGitPullRequest />
        </Detail>
    );
};
