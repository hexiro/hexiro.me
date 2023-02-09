// public
export const GITHUB = "hexiro";
export const TWITTER = "hexiiro";
export const DISCORD = "291632819006865408";
export const LINKED_IN = "nathan-lodge";
export const WAKATIME = "hexiro";

export const GITHUB_LINK = `https://github.com/${GITHUB}` as const;
export const TWITTER_LINK = `https://twitter.com/${TWITTER}` as const;
export const DISCORD_LINK = `https://discord.com/users/${DISCORD}` as const;
export const LINKED_IN_LINK = `https://www.linkedin.com/in/${LINKED_IN}` as const;

// private
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
export const WAKATIME_TOKEN = process.env.WAKATIME_TOKEN ?? "";
