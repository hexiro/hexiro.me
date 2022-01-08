import Detail from "sections/projects/project/details/Detail";

import { ForksIcon } from "commons/icons";

export const Forks = ({ forks }: { forks: number }): JSX.Element | null => (
    <Detail detail={forks}>
        <ForksIcon />
    </Detail>
);
