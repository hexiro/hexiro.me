import { LanyardWebsocket, useLanyard } from "react-use-lanyard";

import { Discord } from "../data/config";
import Timestamper from "./Timestamp";

const buildAsset = (applicationId: string, assetId: string): string => {
    return `https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png`;
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

    // if data expected to be set is undefined
    if (!assets || !activity.application_id) return null;

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
        largeImage = buildAsset(activity.application_id, assets.large_image);
        smallImage = assets.small_image
            ? buildAsset(activity.application_id, assets.small_image)
            : undefined;
        name = activity.name;
        firstLine = activity.details;
        secondLine = activity.state;
    }

    return (
        <div className="lanyard transition">
            <div className="lanyard-images">
                {
                    <img
                        className="large-image"
                        alt="large image of application or song"
                        draggable={false}
                        src={largeImage}
                    />
                }
                {smallImage && (
                    <img
                        className="small-image"
                        alt="small image of application"
                        draggable={false}
                        src={smallImage}
                    />
                )}
            </div>
            <div className="lanyard-text">
                <h4 className="main-accent">{name}</h4>
                {firstLine && <h5>{firstLine}</h5>}
                {secondLine && <h5>{secondLine}</h5>}
                {stamp}
            </div>
        </div>
    );
}
