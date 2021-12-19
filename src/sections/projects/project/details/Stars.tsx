import { BiStar } from "react-icons/bi";
import Detail from "sections/projects/project/details/Detail";

export const Stars = ({ stargazers }: { stargazers: number }): JSX.Element | null => (
    <Detail detail={stargazers}>
        <BiStar />
    </Detail>
);
