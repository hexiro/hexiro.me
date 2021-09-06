import Detail from "components/projects/details/Detail";

import { BiGitCommit } from "react-icons/bi";

export const Commits = ({ commits }: { commits: number }): JSX.Element | null => {
    return (
        <Detail detail={commits}>
            <BiGitCommit />
        </Detail>
    );
};
