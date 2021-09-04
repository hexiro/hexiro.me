import Image from "next/image";

import { KeyValue, SongBar, Tooltip } from "components";
import { Discord } from "data/config";
import { Activity, LanyardWebsocket, Spotify, useLanyard } from "react-use-lanyard";

const buildAsset = (applicationId: string, assetId: string): string => {
    return `https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png`;
};

interface LanyardContent {
    largeImage: string;
    smallImage?: string;
    name: string;
    firstLine?: string;
    secondLine?: string;
}

const handleSpotify = (spotify: Spotify): LanyardContent => {
    return {
        largeImage: spotify.album_art_url,
        name: spotify.song,
        firstLine: "By: " + spotify.artist.replaceAll(";", ","),
        secondLine: "On: " + spotify.album.replaceAll(";", ","),
    };
};

const handleGame = (activity: Activity): LanyardContent => {
    // is checked in for loop -- not recognized by ts
    const assets = activity.assets!;
    const application_id = activity.application_id!;
    const largeImage = buildAsset(application_id, assets.large_image);
    const name = activity.name;
    const secondLine = activity.state;

    let smallImage: string | undefined;
    let firstLine: string | undefined = activity.details;

    if (assets.small_image) {
        smallImage = buildAsset(application_id, assets.small_image);
    }
    if (firstLine?.startsWith("Editing")) {
        firstLine = firstLine.replace("Editing", "Editing:");
    }

    return {
        largeImage,
        smallImage,
        name,
        firstLine,
        secondLine,
    };
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
    const songBar = SongBar({ start: timestamps?.start, end: timestamps?.end });

    // if no data / invalid data is returned / i have no availble
    if (loading || !status || !activity) return null;

    const isListening = activity.type === 2;
    const isGame = activity.type === 0;

    if (!activity.assets) return null;
    const assets = activity.assets;

    let content: LanyardContent;
    if (isListening && typeof status.spotify !== "undefined") {
        content = handleSpotify(status.spotify);
    } else if (isGame && typeof activity.application_id !== "undefined") {
        content = handleGame(activity);
    } else {
        return null;
    }

    return (
        <div className="lanyard">
            <div className="lanyard-images">
                <div className="large-image">
                    <Tooltip title={assets.large_text}>
                        <Image
                            alt="large image of application or song"
                            draggable={false}
                            src={content.largeImage}
                            height={90}
                            width={90}
                        />
                    </Tooltip>
                </div>
                {content.smallImage && (
                    <div className="small-image">
                        <Tooltip title={assets.small_text} size="small">
                            <img
                                alt="small image of application"
                                draggable={false}
                                src={content.smallImage}
                            />
                        </Tooltip>
                    </div>
                )}
            </div>
            <div className="lanyard-text">
                <h4 className="main-accent">{content.name}</h4>
                <KeyValue line={content.firstLine} />
                <KeyValue line={content.secondLine} />
            </div>
            {isListening && <div className="lanyard-song-bar">{songBar}</div>}
        </div>
    );
};
