import { styled } from "@/theme";

import Image from "next/image";

import { HeartIcon } from "@/commons/icons";

import { Divider } from "@/components/layout";
import { LinkOverlay, Flex, Heading, Paragraph, Tooltip } from "@/components/ui";

import { Box } from "@/components/brand";

import type { MovieRating } from "@/data/movieRatings";

interface MovieProps {
    movie: MovieRating;
}

export default function Movie({ movie }: MovieProps) {
    return (
        <MovieContainer hoverable>
            <LinkOverlay newTab href={`https://www.themoviedb.org/movie/${movie.id}`}>
                <MoviePosterContainer>
                    <MoviePoster
                        width={200}
                        height={300}
                        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.posterPath}`}
                        alt={`Poster for ${movie.title}`}
                    />
                    {movie.isFavorite ? (
                        <FavoriteContainer>
                            <Tooltip
                                title="Personal Favorite"
                                size="sm"
                                style={{ width: "100%", height: "100%" }}
                                distance={6}
                            >
                                <Circle>
                                    <HeartIcon fill />
                                </Circle>
                            </Tooltip>
                            <LowerCircle />
                        </FavoriteContainer>
                    ) : null}
                </MoviePosterContainer>
            </LinkOverlay>
            <Flex>
                <SubLine>
                    <Heading ellipsis as="h4">
                        {movie.title}
                    </Heading>
                    <Divider orientation="vertical" margin={8} size={2} css={{ height: "80%" }} />
                    <SmallText>{movie.rating}/10</SmallText>
                </SubLine>
                <Paragraph size="sm" css={{ color: "$brand-accent" }}>
                    {movie.releaseYear}
                </Paragraph>
            </Flex>
        </MovieContainer>
    );
}

const FavoriteContainer = styled("div", {
    position: "absolute",
    top: "-$1",
    right: "-$1",
    size: "30px",
    zIndex: 1,
});

const LowerCircle = styled("div", {
    position: "absolute",
    top: 0,
    right: 0,
    size: "100%",
    borderRadius: "50%",
    backgroundColor: "rgb(0, 0, 0)",
    zIndex: 1,
});

const Circle = styled("div", {
    position: "relative",
    size: "100%",
    borderRadius: "50%",

    backgroundColor: "$brand-tertiary",
    zIndex: 2,

    display: "flex",
    padding: "$1",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid $lighten-10",
});

const SubLine = styled("div", {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
});

const MoviePoster = styled(Image, {
    borderRadius: "$md",
    boxShadow: "$md",
});

const MoviePosterContainer = styled("div", {
    position: "relative",
    alignSelf: "center",
    marginBottom: "$3",

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    [`&, & > ${MoviePoster}`]: {
        width: "100%",
        height: "auto",
        aspectRatio: "2 / 3",
        borderRadius: "$md",
        maxWidth: "$$posterWidth",
    },
});

const MovieContainer = styled(Box, {
    position: "relative",
    display: "flex",
    padding: "$3 $4",
    flexDirection: "column",

    $$posterWidth: "125px",

    "@xs": {
        $$posterWidth: "150px",
    },

    width: "calc($$posterWidth + 4px + ($sizes$4 * 2))",
});

const SmallText = styled("span", {
    color: "$text-secondary",
    textAlign: "left",
    fontSize: 14,
    letterSpacing: -0.2,
    fontWeight: 600,
});