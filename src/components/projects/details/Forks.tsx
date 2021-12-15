import Detail from "components/projects/details/Detail";

import { BiGitRepoForked } from "react-icons/bi";

export const Forks = ({ forks }: { forks: number }): JSX.Element | null => (
    <Detail detail={forks}>
        <BiGitRepoForked />
    </Detail>
);
