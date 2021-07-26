import { LanyardWebsocket, useLanyard } from "react-use-lanyard";

import { Discord } from "../data/config";
import { Timestamper } from "./";
import { Tooltip } from "../components/Tooltip";

const buildAsset = (applicationId: string, assetId: string): string => {
    return `https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png`;
};

const keyValueLine = (line: string | undefined): JSX.Element | null => {
    if (!line) return null;
    if (!line.includes(":")) return <h5>{line}</h5>;
    const [key, value] = line.split(":", 2);
    return (
        <h5>
            {key}
            <span className="font-weight-400">{value}</span>
        </h5>
    );
};

export const Lanyard = () => {
    const { loading, status } = useLanyard({
        userId: Discord,
        socket: true,
    }) as LanyardWebsocket;

    const activity = status?.activities.sort((a, b) => (a.type > b.type ? 1 : -1))[0];
    const stamps = activity?.timestamps;
    let stamp = Timestamper({ start: stamps?.start, end: stamps?.end });

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
        firstLine = "By: " + spotify.artist.replaceAll(";", ",");
        secondLine = "On: " + spotify.album.replaceAll(";", ",");
    } else if (assets && activity.application_id) {
        largeImage = buildAsset(activity.application_id, assets.large_image);
        if (assets.small_image) {
            smallImage = buildAsset(activity.application_id, assets.small_image);
        }
        name = activity.name;
        firstLine = activity.details;
        // fix for VSC
        if (firstLine?.startsWith("Editing")) {
            firstLine = firstLine.replace("Editing", "Editing:");
        }
        secondLine = activity.state;
    } else {
        return null;
    }

    return (
        <div className="lanyard">
            <div className="lanyard-images">
                <div className="large-image">
                    <Tooltip title={assets?.large_text}>
                        <img
                            alt="large image of application or song"
                            draggable={false}
                            src={largeImage}
                        />
                    </Tooltip>
                </div>
                <div className="small-image">
                    <Tooltip title={assets?.small_text} size="small">
                        {smallImage && (
                            <img
                                alt="small image of application"
                                draggable={false}
                                src={smallImage}
                            />
                        )}
                    </Tooltip>
                </div>
            </div>
            <div className="lanyard-text">
                <h4 className="main-accent">{name}</h4>
                {keyValueLine(firstLine)}
                {keyValueLine(secondLine)}
            </div>
            {activity.type === 2 && <div className="lanyard-song-bar">{stamp}</div>}
        </div>
    );
};
