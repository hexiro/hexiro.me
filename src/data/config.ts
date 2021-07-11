export const Github = process.env.GITHUB || "";
export const Twitter = process.env.TWITTER || "";

export const Age = ((): number => {
    // subtract birth time from now and do some math with the seconds to get years
    let date = Date.now();
    let birthday = Date.parse(process.env.BIRTHDAY || "");
    return Math.floor((date - birthday) / 31556952000);
})();

export const GithubLink = `https://github.com/${Github}`;
export const TwitterLink = `https://twitter.com/${Twitter}`;