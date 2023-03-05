import { styled } from "@/theme";

import type { GetStaticProps } from "next";
import Image from "next/image";

import { Divider } from "@/components/layout";
import { BrandedBox, Flex, Heading, Paragraph } from "@/components/ui";

import type { MovieRating } from "@/data/movieRatings";
import fetchMovieRatings from "@/data/movieRatings";

import Page from "@/layout/Page";

import { motion } from "framer-motion";

interface AboutPageProps {
    movieRatings: MovieRating[] | null;
}

const NAME = "About";
const DESCRIPTION = "About me";

export default function AboutPage({ movieRatings }: AboutPageProps) {
    console.log(movieRatings);
    return (
        <Page name={NAME} description={DESCRIPTION}>
            <Heading as="h2">Movies</Heading>
            <MoviesContainer>
                {movieRatings?.map((movie) => (
                    <Movie key={movie.title} movie={movie} />
                ))}
            </MoviesContainer>
        </Page>
    );
}

const Movie = ({ movie }: { movie: MovieRating }) => (
    <MovieContainer>
        <MoviePoster
            width={200}
            height={300}
            src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.posterPath}`}
            alt={`Poster for ${movie.title}`}
        />
        <Flex>
            <SubLine>
                <Heading ellipsis as="h3">
                    {movie.title}
                </Heading>
                <Divider orientation="vertical" margin={8} size={2} />
                <SmallText>{movie.rating}/10</SmallText>
            </SubLine>
            <Paragraph css={{ color: "$brand-accent" }}>{movie.releaseYear}</Paragraph>
        </Flex>
    </MovieContainer>
);

const SubLine = styled("div", {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
});

const MoviePoster = styled(Image, {
    width: "100%",
    height: "auto",
    maxWidth: "200px",

    aspectRatio: "2 / 3",

    borderRadius: "$md",
    marginBottom: "$3",

    alignSelf: "center",

    boxShadow: "$md",
});

const MovieContainer = styled(BrandedBox, {
    display: "flex",
    padding: "$3 $4",
    flexDirection: "column",

    width: "100%",

    "@xl": {
        // poster width + border width + padding
        maxWidth: "calc(200px + 4px + ($sizes$4 * 2))",
    },
});

const MoviesContainer = styled(motion.div, {
    flexWrap: "wrap",

    display: "$$display",
    gap: "$$gap",
    gridGap: "$$gap",
    flexDirection: "$$direction",
    gridColumns: "$$columns",

    $$display: "flex",
    $$gap: "$space$3",
    $$direction: "column",

    "@xs": {
        $$display: "grid",
        $$columns: 2,
    },

    "@md": {
        $$columns: 3,
    },

    "@lg": {
        $$columns: 4,
    },

    "@xl": {
        $$display: "flex",
        $$direction: "row",
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
