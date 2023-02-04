import { GITHUB } from "@/commons/config";

import dayjs from "dayjs";
import { z } from "zod";

export default async function contributionsCalendar(): Promise<CompressedGitHubContributionsCalendar> {
    const url = `https://github-contributions.vercel.app/api/v1/${GITHUB}`;
    const resp = await fetch(url);
    const data = contributionsSchema.parse(await resp.json());

    const now = dayjs();
    const start = now.subtract(1, "year").subtract(1, "month");
    const end = now.add(1, "week");

    const filteredContributions = data.contributions.filter((c) => {
        const date = dayjs(c.date);
        return date.isAfter(start) && date.isBefore(end);
    });
    const sortedContributions = filteredContributions.sort((a, b) =>
        dayjs(a.date).diff(dayjs(b.date))
    );
    const trimmedContributions = sortedContributions.map(({ date, count }) => ({ date, count }));

    const compressContributions = compress(trimmedContributions);
    const decompressedContributions = decompress(compressContributions);

    return compressContributions;
}

export type GitHubContributionsCalendar = Array<{
    date: string;
    count: number;
}>;

export const compress = (
    contributions: GitHubContributionsCalendar
): CompressedGitHubContributionsCalendar => {
    contributions = [...contributions];

    const firstContribution = contributions.shift();

    if (!firstContribution) {
        return { data: [], start: "" };
    }

    const firstDate = dayjs(firstContribution.date);

    const data: number[][] = [[firstContribution.count]];

    let startMonth = firstDate.month();
    let index = 0;

    for (const contribution of contributions) {
        const date = dayjs(contribution.date);
        const month = date.month();

        if (month === startMonth) {
            data[index].push(contribution.count);
        } else {
            data.push([contribution.count]);
            startMonth = month;
            index++;
        }
    }

    return { data, start: firstContribution.date };
};

export const decompress = (
    contributions: CompressedGitHubContributionsCalendar
): GitHubContributionsCalendar => {
    const startDate = dayjs(contributions.start);

    const data: GitHubContributionsCalendar = [];

    for (const [index, values] of contributions.data.entries()) {
        let date = startDate;

        if (index > 0) {
            date = date.add(index, "month").set("date", 1);
        }

        for (const [day, count] of values.entries()) {
            data.push({
                date: date.add(day, "day").format("YYYY-MM-DD"),
                count,
            });
        }
    }

    return data;
};

export type CompressedGitHubContributionsCalendar = { data: number[][]; start: string };

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const hexSchema = z.string().regex(/^#[0-9a-f]{6}$/);

const contributionsSchema = z.object({
    years: z.array(
        z.object({
            year: z.coerce.number(),
            total: z.number(),
            range: z.object({ start: dateSchema, end: dateSchema }),
        })
    ),
    contributions: z.array(
        z.object({
            date: dateSchema,
            count: z.number(),
            color: hexSchema,
            intensity: z.coerce.number().min(0).max(4),
        })
    ),
});
