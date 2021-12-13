import { GetStaticProps } from "next";
import React, { useRef, useEffect, useState, FC } from "react";

import Nav from "components/nav";
import Page from "components/pages";

import graphQL, { ProjectProps, PROJECTS } from "commons/graphql";

import { useWindowScroll } from "react-use";
import Sections, { Me, Projects } from "sections";
import styled from "styled-components";

interface HomeProps {
    projects: ProjectProps[];
}

export default function Home({ projects }: HomeProps) {
    const meRef = useRef<HTMLElement | null>(null);
    const projectsRef = useRef<HTMLElement | null>(null);

    return (
        <Page name="Home" description="desc">
            <Nav refs={[meRef, projectsRef]} />
            <Sections>
                <Me meRef={meRef}></Me>
                <Projects projectsRef={projectsRef} projects={projects}></Projects>
            </Sections>
        </Page>
    );
}

// regen top 3 pinned repos every hour
export const getStaticProps: GetStaticProps = async () => {
    const resp = await graphQL(PROJECTS);
    const json = await resp.json();
    const projects: ProjectProps[] = json["data"]["viewer"]["pinnedItems"]["nodes"];

    return {
        props: {
            projects,
        },
        revalidate: 3600,
    };
};
