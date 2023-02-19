import { WAKATIME, WAKATIME_TOKEN } from "@/commons/config";

import { z } from "zod";

export default async function wakatimeStats() {
    const last7DaysUrl = `https://wakatime.com/api/v1/users/${WAKATIME}/stats/last_7_days`;
    const allTimeUrl = `https://wakatime.com/api/v1/users/${WAKATIME}/stats/all_time`;

    const headers = {
        Authorization: `Basic ${Buffer.from(WAKATIME_TOKEN).toString("base64")}`,
    };

    const fetchPromises = [fetch(last7DaysUrl, { headers }), fetch(allTimeUrl, { headers })];
    const [last7Resp, allTimeResp] = await Promise.all(fetchPromises);
    const jsonPromises = [last7Resp.json(), allTimeResp.json()];
    const [last7Json, allTimeJson] = await Promise.all(jsonPromises);

    const { data: last7Data } = wakatimeSchema.parse(last7Json);
    const { data: allTImeData } = wakatimeSchema.parse(allTimeJson);

    const dailyAverageDuration = allTImeData.daily_average_including_other_language;
    const last7daysDuration = last7Data.total_seconds_including_other_language;

    const sortFn = (a: SingleInfo, b: SingleInfo) => b.total_seconds - a.total_seconds;

    const editors = allTImeData.editors.sort(sortFn).slice(0, 3);
    const languages = allTImeData.languages.sort(sortFn).slice(0, 3);

    return { dailyAverageDuration, last7daysDuration, editors, languages };
}

export type MultiInfo = z.infer<typeof multiInfoSchema>;
type SingleInfo = MultiInfo[0];

const multiInfoSchema = z.array(
    z.object({
        decimal: z.string(),
        digital: z.string(),
        hours: z.number(),
        minutes: z.number(),
        name: z.string(),
        percent: z.number(),
        text: z.string(),
        total_seconds: z.number(),
    })
);

const wakatimeSchema = z.object({
    data: z.object({
        categories: multiInfoSchema,
        daily_average: z.number(),
        daily_average_including_other_language: z.number(),
        days_including_holidays: z.number(),
        days_minus_holidays: z.number(),
        editors: multiInfoSchema,
        holidays: z.number(),
        human_readable_daily_average: z.string(),
        human_readable_daily_average_including_other_language: z.string(),
        human_readable_range: z.string(),
        human_readable_total: z.string(),
        human_readable_total_including_other_language: z.string(),
        id: z.string().uuid(),
        is_already_updating: z.boolean(),
        is_coding_activity_visible: z.boolean(),
        is_including_today: z.boolean(),
        is_other_usage_visible: z.boolean(),
        is_stuck: z.boolean(),
        is_up_to_date: z.boolean(),
        is_up_to_date_pending_future: z.boolean(),
        languages: multiInfoSchema,
        operating_systems: multiInfoSchema,
        percent_calculated: z.number(),
        range: z.string(),
        status: z.string(),
        timeout: z.number(),
        total_seconds: z.number(),
        total_seconds_including_other_language: z.number(),
        user_id: z.string().uuid(),
        username: z.string(),
        writes_only: z.boolean(),
    }),
});
