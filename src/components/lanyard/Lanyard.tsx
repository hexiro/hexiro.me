import Image from "next/image";

import { Header, Tooltip } from "components/common";
import KeyValue from "components/lanyard/KeyValue";
import SongBar from "components/lanyard/SongBar";
import { Discord } from "data/config";
import theme from "data/theme";

import { Activity, LanyardWebsocket, Spotify, useLanyard } from "react-use-lanyard";
import styled from "styled-components";

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

const Lanyard = () => {
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
        <Container>
            <Images>
                <LargeImage>
                    <Tooltip title={assets.large_text}>
                        <Image
                            alt="large image of application or song"
                            draggable={false}
                            src={content.largeImage}
                            height={90}
                            width={90}
                        />
                    </Tooltip>
                </LargeImage>
                {content.smallImage && (
                    <SmallImage>
                        <Tooltip title={assets.small_text} size="small">
                            <img
                                alt="small image of application"
                                draggable={false}
                                src={content.smallImage}
                            />
                        </Tooltip>
                    </SmallImage>
                )}
            </Images>
            <Text>
                <h4>
                    <Header>{content.name}</Header>
                </h4>
                <KeyValue line={content.firstLine} />
                <KeyValue line={content.secondLine} />
            </Text>
            {isListening && songBar}
        </Container>
    );
};

export default Lanyard;

const Container = styled.div`
    position: relative;
    display: flex;
    height: 130px;
    width: 350px;
    margin: 32vh 0 20px;
    padding: 20px 0 20px 20px;
    border-radius: 6px;
    overflow: hidden;
    background: ${theme.accent.background};
    box-shadow: 0 4px 10px rgb(0 0 0 / 25%);
`;

const Images = styled.div``;

const LargeImage = styled.div`
    & img {
        display: block;
        height: 90px;
        width: 90px;
        border-radius: 4px;
        box-shadow: 0 0px 10px rgb(0 0 0 / 25%);
    }
`;

const SmallImage = styled.div`
    position: absolute;
    right: -7px;
    bottom: -7px;
    & img {
        display: block;
        height: 30px;
        width: 30px;
        border: var(--main-accent) 2px solid;
        border-radius: 50%;
    }
`;

const Text = styled.div`
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    width: 40%;
    line-height: 25px;
    padding: 0 6.245%;
    text-align: left;

    & * {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    & h5 {
        line-height: 17px;
    }
`;
