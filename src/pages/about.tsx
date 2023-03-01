import { styled } from "@/theme";

import type { GetStaticProps } from "next";
import Image from "next/image";

import { Divider } from "@/components/layout";
import { BrandedBox, Heading, Paragraph } from "@/components/ui";

import type { MovieRating } from "@/data/movieRatings";
import fetchMovieRatings from "@/data/movieRatings";

import Page from "@/layout/Page";

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

        <SubLine>
            {/* <HeadingContainer> */}
                <Heading ellipsis as="h3">
                    {movie.title}
                </Heading>
            {/* </HeadingContainer> */}
            <Divider orientation="vertical" margin={8} size={2} />
            <SmallText>{movie.rating}/10</SmallText>
        </SubLine>
        <Paragraph css={{ color: "$brand-accent" }}>{movie.releaseYear}</Paragraph>
    </MovieContainer>
);

const HeadingContainer = styled("div", {
    flexGrow: 1,
});

const SubLine = styled("div", {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
});

const MoviePoster = styled(Image, {
    width: 200,
    height: 300,
    borderRadius: "$md",
    marginBottom: "$3",
});

const MovieContainer = styled(BrandedBox, {
    display: "flex",
    padding: "$2 $3",
    flexDirection: "column",
    width: 234,
    height: 420,
});

const MoviesContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    gap: "$4",
    flexWrap: "wrap",
});

const SmallText = styled("span", {
    // marginLeft: "$2",
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
