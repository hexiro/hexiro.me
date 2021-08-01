import { Activity, LanyardWebsocket, useLanyard } from "react-use-lanyard";
import { KeyValue, SongBar, Tooltip } from "./";

import { Discord } from "../data/config";

const buildAsset = (applicationId: string, assetId: string): string => {
    return `https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png`;
};

export const Lanyard = () => {
    const { loading, status } = useLanyard({
        userId: Discord,
        socket: true,
    }) as LanyardWebsocket;

    let activity: Activity | undefined;
    for (const act of status?.activities || []) {
        if (act && (act.type === 2 || act.type === 0) && act.assets && act.timestamps) {
            activity = act;
            break;
        }
    }

    const timestamps = activity?.timestamps;
    const stamp = SongBar({ start: timestamps?.start, end: timestamps?.end });

    // if no data / invalid data is returned / i have no availble
    if (loading || !status || !activity) return null;

    const isListening = activity.type === 2 && typeof status.spotify !== "undefined";
    const isGame = activity.type === 0 && typeof activity.application_id !== "undefined";

    // is checked if for loop -- not recognized by ts
    const assets = activity.assets!;

    // assets
    let largeImage: string;
    let smallImage: string | undefined;

    // text
    let name: string;
    let firstLine: string | undefined;
    let secondLine: string | undefined;

    if (isListening) {
        const spotify = status.spotify!;
        largeImage = spotify.album_art_url;
        name = spotify.song;
        firstLine = "By: " + spotify.artist.replaceAll(";", ",");
        secondLine = "On: " + spotify.album.replaceAll(";", ",");
    } else if (isGame) {
        const application_id = activity.application_id!;
        largeImage = buildAsset(application_id, assets.large_image);
        if (assets.small_image) {
            smallImage = buildAsset(application_id, assets.small_image);
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
                    {smallImage && (
                        <Tooltip title={assets?.small_text} size="small">
                            <img
                                alt="small image of application"
                                draggable={false}
                                src={smallImage}
                            />
                        </Tooltip>
                    )}
                </div>
            </div>
            <div className="lanyard-text">
                <h4 className="main-accent">{name}</h4>
                <KeyValue line={firstLine} />
                <KeyValue line={secondLine} />
            </div>
            {isListening && <div className="lanyard-song-bar">{stamp}</div>}
        </div>
    );
};
