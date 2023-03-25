import type { GetStaticProps } from "next";
import type { MutableRefObject } from "react";
import { useRef } from "react";

import { slideFromLeft } from "@/commons/animations";

import { Heading } from "@/components/ui";

import Movie from "@/components/about/Movie";
import MoviesContainer from "@/components/about/MoviesContainer";

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

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => ({
    props: {
        movieRatings: await fetchMovieRatings(),
    },
    revalidate: 60 * 60,
});
