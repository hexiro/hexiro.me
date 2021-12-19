import { BiGitRepoForked } from "react-icons/bi";
import Detail from "sections/projects/project/details/Detail";

export const Forks = ({ forks }: { forks: number }): JSX.Element | null => (
    <Detail detail={forks}>
        <BiGitRepoForked />
    </Detail>
);
