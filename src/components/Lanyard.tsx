import { LanyardWebsocket, useLanyard } from "react-use-lanyard";

import { Discord } from "../data/config";
import Timestamper from "../hooks/timestamp";

const buildAsset = (assetId: string): string => {
    return `https://cdn.discordapp.com/app-assets/383226320970055681/${assetId}.png`;
};

export default function Lanyard() {
    const { loading, status } = useLanyard({
        userId: Discord,
        socket: true,
    }) as LanyardWebsocket;

    const activity = status?.activities.sort((a, b) => (a.type > b.type ? 1 : -1))[0];
    let stamp = Timestamper(activity?.timestamps);

    // if no data / invalid data is returned / i have no activities
    if (loading || !status || status.activities.length === 0) return null;
    // if activity isn't set right
    if (!activity || (activity.type !== 2 && activity.type !== 0)) return null;

    const spotify = status.spotify;
    const assets = activity.assets;

    // assets
    let largeImage: string;
    let smallImage: string | undefined;

    // text
    let name: string;
    let firstLine: string | undefined;
    let secondLine: string | undefined;

    if (activity.type === 2 && spotify) {
        largeImage = spotify.album_art_url;
        name = spotify.song;
        firstLine = "By " + spotify.artist.replaceAll(";", ",");
        secondLine = "On " + spotify.album.replaceAll(";", ",");
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
                {stamp && <h5>{stamp}</h5>}
            </div>
        </div>
    );
}
