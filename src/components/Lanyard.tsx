import { LanyardWebsocket, useLanyard } from "react-use-lanyard";

import { Discord } from "../data/config";

const buildAsset = (assetId: string): string => {
    return `https://cdn.discordapp.com/app-assets/383226320970055681/${assetId}.png`;
};

const buildTrackLink = (trackId: string): string => {
    return `https://open.spotify.com/track/${trackId}`;
};

export default function Lanyard(): JSX.Element | null {
    const { loading, status } = useLanyard({
        userId: Discord,
        socket: true,
    }) as LanyardWebsocket;

    console.log(status);

    // if no data / invalid data is returned / i have no activities
    if (loading || !status || status.activities.length === 0) return null;

    // sort activities by type and find the one with the lowest type integer
    const activity = status.activities.sort((a, b) => (a.type > b.type ? 1 : -1))[0];

    // if activity type isn't custom app or spotify
    if (!(activity.type == 0 || activity.type == 2)) return null;

    const spotify = status.spotify;
    const isSpotify = activity.type === 2;
    const assets = activity.assets;

    // assets
    let largeImage: string;
    let smallImage: string | undefined;

    // text
    let name: string;
    let firstLine: string | undefined;
    let secondLine: string | undefined;

    if (isSpotify) {
        largeImage = spotify!.album_art_url;
        name = spotify!.song;
        firstLine = "By " + spotify!.artist.replaceAll(";", ",");
        secondLine = "On " + spotify!.album.replaceAll(";", ",");
    } else {
        largeImage = buildAsset(assets!.large_image);
        smallImage = buildAsset(assets!.small_image);
        name = activity.name;
        firstLine = activity.details;
        secondLine = activity.state;
    }

    return (
        <div className="lanyard transition">
            <div className="lanyard-images">
                {largeImage && <img className="large-image" draggable={false} src={largeImage} />}
                {smallImage && <img className="small-image" draggable={false} src={smallImage} />}
            </div>
            <div className="lanyard-text">
                <h4 className="main-accent">{name}</h4>
                {firstLine && <h5>{firstLine}</h5>}
                {secondLine && <h5>{secondLine}</h5>}
            </div>
        </div>
    );
}
