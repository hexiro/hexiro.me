import { ForksIcon } from "commons/icons";
import Detail from "components/repository/details/Detail";

export const Forks = ({ forks }: { forks: number }): JSX.Element | null => (
    <Detail count={forks}>
        <ForksIcon />
    </Detail>
);
