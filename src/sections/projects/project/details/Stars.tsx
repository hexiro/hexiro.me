import Detail from "sections/projects/project/details/Detail";

import { BiStar } from "react-icons/bi";

export const Stars = ({ stargazers }: { stargazers: number }): JSX.Element | null => (
    <Detail detail={stargazers}>
        <BiStar />
    </Detail>
);
