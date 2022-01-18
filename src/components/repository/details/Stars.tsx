import { StargazersIcon } from "commons/icons";
import Detail from "components/repository/details/Detail";

export const Stars = ({ stargazers }: { stargazers: number }): JSX.Element | null => (
    <Detail detail={stargazers}>
        <StargazersIcon />
    </Detail>
);
