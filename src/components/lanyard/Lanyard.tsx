import Image from "next/image";

import { Header, Tooltip } from "components/common";
import SongBar from "components/lanyard/SongBar";

import { Discord } from "static/config";
import theme from "static/theme";
import { fadeChild } from "static/variants";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, LanyardWebsocket, Spotify, useLanyard } from "react-use-lanyard";
import styled from "styled-components";

export default function Lanyard(): JSX.Element | null {
    const { loading, status } = useLanyard({
        userId: Discord,
        socket: true,
    }) as LanyardWebsocket;

    const types = [0, 2];
    const activity = status?.activities.find(
        act => types.includes(act.type) && act.assets && act.timestamps
    );

    const songBar = SongBar(activity?.timestamps);
    const assets = activity?.assets;

    const isListening = activity?.type === 2;
    const isGame = activity?.type === 0;

    let content: LanyardContent | undefined;

    if (!loading && status && activity && assets) {
        if (isListening && status.spotify) {
            content = handleSpotify(status.spotify);
        } else if (isGame && activity.application_id) {
            content = handleGame(activity);
        }
    }

    return (
        <AnimatePresence>
            {content && (
                <LanyardContainer initial="start" animate="fade" exit="start" variants={fadeChild}>
                    <Images>
                        <LargeImageContainer>
                            <Tooltip title={assets!.large_text}>
                                <LargeImage
                                    alt="large image of application or song"
                                    draggable={false}
                                    src={content.largeImage}
                                    height={90}
                                    width={90}
                                />
                            </Tooltip>
                        </LargeImageContainer>
                        {content.smallImage && (
                            <SmallImageContainer>
                                <Tooltip title={assets!.small_text} size="small">
                                    <SmallImage
                                        alt="small image of application"
                                        draggable={false}
                                        src={content.smallImage}
                                        height={30}
                                        width={30}
                                    />
                                </Tooltip>
                            </SmallImageContainer>
                        )}
                    </Images>
                    <Text>
                        <h4>
                            <Header>{content.name}</Header>
                        </h4>
                        <h5>{content.firstLine}</h5>
                        <h5>{content.secondLine}</h5>
                    </Text>
                    {isListening && songBar}
                </LanyardContainer>
            )}
        </AnimatePresence>
    );
}

interface LanyardContent {
    largeImage: string;
    smallImage?: string;
    name: string;
    firstLine?: string;
    secondLine?: string;
}

const buildAsset = (applicationId: string, assetId: string): string => {
    return `https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png`;
};

const handleSpotify = (spotify: Spotify): LanyardContent => {
    return {
        largeImage: spotify.album_art_url,
        name: spotify.song,
        firstLine: "By " + spotify.artist.replaceAll(";", ","),
        secondLine: "On " + spotify.album.replaceAll(";", ","),
    };
};

const handleGame = (activity: Activity): LanyardContent => {
    // is checked in for loop -- not recognized by ts
    const assets = activity.assets!;
    const application_id = activity.application_id!;
    const largeImage = buildAsset(application_id, assets.large_image);
    const name = activity.name;
    const firstLine = activity.details;
    const secondLine = activity.state;

    let smallImage: string | undefined;

    if (assets.small_image) {
        smallImage = buildAsset(application_id, assets.small_image);
    }

    return {
        largeImage,
        smallImage,
        name,
        firstLine,
        secondLine,
    };
};

const LanyardContainer = styled(motion.div)`
    position: absolute;
    display: flex;
    height: 130px;
    width: 350px;
    margin: 32vh 0 20px;
    padding: 20px 0 20px 20px;
    border-radius: 6px;
    overflow: hidden;
    background: ${theme.accent.background};
    box-shadow: 0 4px 10px rgb(0 0 0 / 25%);

    @media only screen and (max-width: 1250px) {
        position: relative;
        margin: 5px auto;
        max-width: 350px;
        width: 80%;
    }

    @media only screen and (max-width: 300px) {
        display: none;
    }
`;

const Images = styled.div`
    position: relative;
`;

const LargeImageContainer = styled.div``;

// !important bcuz next/image lol
// maybe these can be removed with some args that i don't know about
const LargeImage = styled(Image)`
    border-radius: 4px;
    box-shadow: 0 0px 10px rgb(0 0 0 / 25%) !important;
`;

const SmallImageContainer = styled.div`
    position: absolute;
    right: -7px;
    bottom: -23px;
`;

const SmallImage = styled(Image)`
    border-radius: 50%;
    border: ${theme.core.main} 2px solid !important;
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
