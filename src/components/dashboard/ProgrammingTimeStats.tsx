import { styled } from "@/theme";

import { Divider } from "@/components/layout";
import { Heading, ImportantContainer, Paragraph } from "@/components/ui";

interface ProgrammingTimeStatsProps {
    dailyAverage: number;
    last7Days: number;
}

export default function ProgrammingTimeStats({
    dailyAverage,
    last7Days,
}: ProgrammingTimeStatsProps) {
    return (
        <ProgrammingTimeStatsContainer>
            <Heading as="h3">Time Spent</Heading>
            <Paragraph css={{ maxWidth: 300 }}>
                {"Time I've spent coding over different time frames"}
            </Paragraph>
            <Divider />
            <DetailsContainer>
                <Detail title="Daily Average" duration={dailyAverage} />
                <Detail title="Past Week" duration={last7Days} />
            </DetailsContainer>
        </ProgrammingTimeStatsContainer>
    );
}

const ProgrammingTimeStatsContainer = styled(ImportantContainer, {
    flexDirection: "column",
});

const Detail = ({ title, duration }: { title: string; duration: number }) => (
    <div>
        <Heading as="h4" css={{ color: "$brand-accent" }}>
            {title}
        </Heading>
        <Paragraph>{secondsToFormattedTime(duration)}</Paragraph>
    </div>
);

const DetailsContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "$2",
});

const secondsToFormattedTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
};
