import { GITHUB } from "@/commons/config";

import { z } from "zod";

export default async function contributionsCalendar(): Promise<GitHubContributionsCalendar> {
    const url = `https://github-contributions.vercel.app/api/v1/${GITHUB}`;
    const resp = await fetch(url);
    const data = contributionsSchema.parse(await resp.json());

    const calendarBeginning = new Date();
    calendarBeginning.setFullYear(calendarBeginning.getFullYear() - 1);
    calendarBeginning.setMonth(calendarBeginning.getMonth() - 1);

    const filteredContributions = data.contributions.filter(
        (c) => new Date(c.date) > calendarBeginning
    );
    const trimmedContributions = filteredContributions.map(({ date, count }) => ({ date, count }));

    return trimmedContributions;
}

export type GitHubContributionsCalendar = Array<{
    date: string;
    count: number;
}>;

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
