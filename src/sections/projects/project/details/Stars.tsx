import Detail from "sections/projects/project/details/Detail";

import { StargazersIcon } from "commons/icons";

export const Stars = ({ stargazers }: { stargazers: number }): JSX.Element | null => (
    <Detail detail={stargazers}>
        <StargazersIcon />
    </Detail>
);
