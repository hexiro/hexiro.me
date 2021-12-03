// public

export const GITHUB = "Hexiro";
export const TWITTER = "Hexiiro";
export const DISCORD = "291632819006865408";
export const STEAM = "76561199033382814";

const birthday = Date.parse("2005-07-02T00:00:00-0500");

export const Age = (): number => {
    // subtract birth time from now and do some math with the seconds to get years
    const date = Date.now();
    return Math.floor((date - birthday) / 31556952000);
};

export const GITHUB_LINK = `https://github.com/${GITHUB}`;
export const TWITTER_LINK = `https://twitter.com/${TWITTER}`;
export const STEAM_LINK = `https://steamcommunity.com/profiles/${STEAM}`;

// private

export const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
