import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import ArticlesGradient from "@components/ArticlesGradient";

import PageHero from "../sections/others/Page.Hero";
import CardSingleList from "../sections/articles/Card.Single.List";

const seoImage = '/preview-figma-plugins.jpg';
const actionTitle = 'Check it out';

const regex = /(<([^>]+)>)/ig; //remove html tag

const siteQuery = graphql`
{
  allFigmaPluginsYaml {
    edges {
      node {
        title
        desc
        url
        image {
          childImageSharp {
            fluid(maxWidth: 800, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    totalCount
  }

  allSite {
    edges {
      node {
        siteMetadata {
          hero {
            pluginsHeading
            pluginsSub
            maxWidth
          }
          title
        }
      }
    }
  }
}
`;

const Page = ({ location }) => {

  const result = useStaticQuery(siteQuery);
  const data = result.allFigmaPluginsYaml;
  const siteSEO = result.allSite.edges[0].node.siteMetadata;

  return (
    <Layout>

      <SEO
        pathname={location.pathname} 
        title={data.totalCount + " " + siteSEO.hero.pluginsHeading.replace(regex, '') + " 2020."}
        description={siteSEO.hero.pluginsSub}
        image={seoImage}
      />

      <PageHero
        heading={data.totalCount + " " + siteSEO.hero.pluginsHeading + " 2020."}
        subtitle={siteSEO.hero.pluginsSub}
        maxWidth={siteSEO.hero.maxWidth}
      />
      <Section narrow>
        <CardSingleList data={data} actionTitle={actionTitle} />
      </Section>
      <ArticlesGradient />
    </Layout>
  );
};

export default Page;
