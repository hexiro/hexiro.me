import { KeyValueProps } from "types";

export const KeyValue = ({ line }: KeyValueProps): JSX.Element | null => {
    if (!line) return null;
    if (!line.includes(":")) return <h5>{line}</h5>;
    const [key, value] = line.split(":", 2);
    return (
        <h5>
            {key} <span className="font-weight-400">{value}</span>
        </h5>
    );
};
