import { styled } from "@/theme";

import type { GetStaticProps } from "next";
import Image from "next/image";
import type { MutableRefObject } from "react";
import { useRef } from "react";

import { slideFromLeft } from "@/commons/framer";
import { HeartIcon } from "@/commons/icons";

import { Divider } from "@/components/layout";
import { BrandedBox, Flex, Heading, LinkOverlay, Paragraph, Tooltip } from "@/components/ui";

import type { MovieRating } from "@/data/movieRatings";
import fetchMovieRatings from "@/data/movieRatings";

import Page, { PageDescription, PageHeading, PageText } from "@/layout/Page";

import { motion } from "framer-motion";
import { useDraggable } from "react-use-draggable-scroll";

interface AboutPageProps {
    movieRatings: MovieRating[] | null;
}

const NAME = "About";
const LONG_NAME = "About Me";
const DESCRIPTION_PT_1 =
    "Hi, my name is Nathan Lodge, and I'm a self-taught software engineer from the United States. I've had a love for programming since middle school, and over the years, I've continued to develop my skills and learn more programming languages and other software development frameworks, libraries, and technologies.";
const DESCRIPTION_PT_2 =
    "Aside from coding, I also enjoy watching movies. I love films that make me think and my favorite genres are Psychological Thriller, Drama, and Crime. Listed below are movies I’ve watched over the years and my review of them. I try not to be overly critical, so I’ve given a lot of movies a 10/10. The movies marked with hearts are my personal favorites.";

export default function AboutPage({ movieRatings }: AboutPageProps) {
    const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
    const { events } = useDraggable(ref);

    return (
        <Page name={NAME} description={DESCRIPTION_PT_1}>
            <PageText>
                <PageHeading>{LONG_NAME}</PageHeading>
                <PageDescription size="md">{DESCRIPTION_PT_1}</PageDescription>
                <br />
                <PageDescription size="md">{DESCRIPTION_PT_2}</PageDescription>
            </PageText>
            <motion.div variants={slideFromLeft}>
                <Heading as="h2">Movies</Heading>
            </motion.div>
            <MoviesContainer ref={ref} {...events}>
                {movieRatings?.map((movie) => (
                    <Movie key={movie.title} movie={movie} />
                ))}
            </MoviesContainer>
        </Page>
    );
}

const Movie = ({ movie }: { movie: MovieRating }) => (
    <MovieContainer>
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

const MovieContainer = styled(BrandedBox, {
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

const MoviesContainer = styled(motion.div, {
    display: "grid",
    gridGap: "$3",
    gridAutoFlow: "column",
    overflowX: "scroll",
    overflowY: "hidden",
    paddingTop: "$3",
    paddingBottom: "$2",
    gridTemplateRows: "auto auto",

    "@xxl": {
        gridTemplateRows: "auto auto auto",
    },
});

const SmallText = styled("span", {
    color: "$text-secondary",
    textAlign: "left",
    fontSize: 14,
    letterSpacing: -0.2,
    fontWeight: 600,
});

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => ({
    props: {
        movieRatings: await fetchMovieRatings(),
    },
    revalidate: 60 * 60,
});
