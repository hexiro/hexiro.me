export const Age = ((): number => {
    // subtract birth time from now and do some math with the seconds to get years
    let date = Date.now();
    let birthday = Date.parse("2005-07-02 00:00:00-0500");
    return Math.floor((date - birthday) / 31556952000);
})();
