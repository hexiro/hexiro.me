import { WAKATIME, WAKATIME_TOKEN } from "@/commons/config";

import { z } from "zod";

export default async function wakatimeStats() {
    const url = `https://wakatime.com/api/v1/users/${WAKATIME}/stats/last_7_days`;

    const headers = {
        Authorization: `Basic ${Buffer.from(WAKATIME_TOKEN).toString("base64")}`,
    };

    const resp = await fetch(url, { headers });
    const { data } = wakatimeSchema.parse(await resp.json());

    const dailyAverageDuration = data.daily_average_including_other_language;
    const last7daysDuration = data.total_seconds_including_other_language;

    const editors = data.editors.slice(0, 3);
    const languages = data.languages.slice(0, 3);

    return { dailyAverageDuration, last7daysDuration, editors, languages };
}

type MultiInfo = z.infer<typeof multiInfoSchema>;

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
