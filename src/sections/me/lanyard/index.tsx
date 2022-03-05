import Image from "next/image";

import { DISCORD } from "commons/config";
import theme from "commons/theme";
import { Header, Tooltip } from "components/common";
import TimestampBar from "sections/me/lanyard/TimestampBar";

import { AnimatePresence, motion } from "framer-motion";
import { useMedia } from "react-use";
import type { Activity, Spotify } from "react-use-lanyard";
import { useLanyard } from "react-use-lanyard";
import styled from "styled-components";

export default function Lanyard(): JSX.Element | null {
    const { loading, status } = useLanyard({
        userId: DISCORD,
        socket: true,
    });

    const isLargeEnough = useMedia("(min-width: 420px)");

    const types = [0, 2];
    const activity = status?.activities
        ?.sort((a, b) => (a.type > b.type ? 1 : -1))
        ?.find(act => types.includes(act.type));

    const assets = activity?.assets;

    const isListening = activity?.type === 2;
    const isGame = activity?.type === 0;

    let content: LanyardContent | null = null;

    if (!loading && status && activity) {
        if (isListening) content = handleSpotify(status.spotify);
        else if (isGame) content = handleGame(activity);
    }

    return (
        <AnimatePresence>
            {content && assets && isLargeEnough && (
                <LanyardContainer>
                    <Images>
                        <Tooltip title={assets.large_text}>
                            <LargeImage
                                priority
                                alt="large image of application or song"
                                draggable={false}
                                src={content.largeImage}
                                layout="fixed"
                                height={95}
                                width={95}
                            />
                        </Tooltip>
                        {content.smallImage && (
                            <SmallImageContainer>
                                <Tooltip title={assets.small_text} size="small">
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
                    {isListening && <TimestampBar timestamps={activity?.timestamps} />}
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

const buildAsset = (applicationId: string, assetId: string): string =>
    `https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png`;

const handleSpotify = (spotify?: Spotify): LanyardContent | null => {
    if (!spotify) return null;
    return {
        largeImage: spotify.album_art_url,
        name: spotify.song,
        firstLine: "By " + spotify.artist.replaceAll(";", ","),
        secondLine: "On " + spotify.album.replaceAll(";", ","),
    };
};

const handleGame = (activity: Activity): LanyardContent | null => {
    const { assets } = activity;
    const applicationId = activity.application_id;
    if (!assets || !applicationId) return null;

    let largeImage: string = buildAsset(applicationId, assets.large_image);
    let smallImage: string | undefined;

    if (assets.small_image)
        if (largeImage) {
            smallImage = buildAsset(applicationId, assets.small_image);
        } else {
            largeImage = buildAsset(applicationId, assets.small_image);
        }

    const { name } = activity;
    const firstLine = activity.details;
    const secondLine = activity.state;

    return {
        largeImage,
        smallImage,
        name,
        firstLine,
        secondLine,
    };
};

const LanyardContainer = styled(motion.div)`
    display: flex;
    position: relative;
    padding: 20px;
    margin-top: 20px;
    height: 135px;
    width: 380px;
    border-radius: 6px;
    background: ${theme.accent.background};
    box-shadow: 0 4px 10px rgb(0 0 0 / 25%);
`;

const Images = styled.div`
    position: relative;
`;

// !important bcuz next/image lol
const LargeImage = styled(Image)`
    border-radius: 4px;
    box-shadow: 0 0px 10px rgb(0 0 0 / 25%) !important;
`;

const SmallImageContainer = styled.div`
    position: absolute;
    right: -8px;
    bottom: -8px;
`;

const SmallImage = styled(Image)`
    border-radius: 50%;
    border: ${theme.core.main} 2px solid !important;
`;

const Text = styled.div`
    display: flex;
    width: 250px;
    flex-direction: column;
    position: relative;
    padding-left: 20px;
    text-align: left;

    & * {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    & h4 {
        margin-bottom: 2px;
    }
    & h5 {
        color: ${theme.core.subtext};
        align-items: flex-end;
        line-height: 1.3;
    }
`;
