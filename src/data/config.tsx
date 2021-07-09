export const Github = "Hexiro";
export const Twitter = "Hexiiro";

export const Age = ((): number => {
    // subtract birth time from now and do some math with the seconds to get years
    let date = Date.now();
    let birthday = Date.parse("2005-07-02T00:00:00-0500");
    return Math.floor((date - birthday) / 31556952000);
})();
export const GithubLink = `https://github.com/${Github}`;
export const TwitterLink = `https://twitter.com/${Twitter}`;

export const DarkTextColor = "#e0f5e2";
export const DarkMainAccent = "#5ce09a";
export const DarkMainColor = "#4bff9f";
export const DarkBackgroundColor = "#191c1d";
export const DarkBackgroundAccent = "#292d2f";
export const DarkScrollbarColor = "#606160";

export const LightTextColor = "#2f2f2f";
export const LightMainAccent = "#3abd78";
export const LightMainColor = "#404040a8";
export const LightBackgroundColor = "#ebebeb";
export const LightBackgroundAccent = "#e4e4e4";
export const LightScrollbarColor = DarkScrollbarColor;

export const DarkColors = (
    <style>{`
    :root {
        --text-color: ${DarkTextColor};
        --main-accent: ${DarkMainAccent};
        --main-color: ${DarkMainColor};
        --background-color: ${DarkBackgroundColor};
        --background-accent: ${DarkBackgroundAccent};
        --scrollbar-color: ${DarkScrollbarColor};
    }
    `}</style>
);

export const LightColors = (
    <style>{`
    @media (prefers-color-scheme: light) {
        :root {
            --text-color: ${LightTextColor};
            --main-accent: ${LightMainAccent};
            --main-color: ${LightMainColor};
            --background-color: ${LightBackgroundColor};
            --background-accent: ${LightBackgroundAccent};
            --scrollbar-color: ${LightScrollbarColor};
        }
    }
    `}</style>
);
