import React from "react";
import styled from "@emotion/styled";

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from "@components/Layout";
import Paginator from "@components/Navigation/Navigation.Paginator";
import NavCategory from '@components/Navigation/Navigation.Categories';

import ArticlesHero from "../sections/articles/Articles.Hero";
import ArticlesList from "../sections/articles/Articles.List";

import { Template } from "@types";

const ArticlesPage: Template = ({ location, pageContext }) => {
  // const articles = pageContext.group;
  const { group: articles, category } = pageContext;
  const authors = pageContext.additionalContext.authors;

  return (
    <Layout>
      <SEO pathname={location.pathname} />
      <ArticlesHero authors={authors} />
      <Section narrow>
        {/* <NavCategory category={category} /> */}
        <ArticlesList articles={articles} currentPage={pageContext.index} />
        <ArticlesPaginator show={pageContext.pageCount > 1}>
          <Paginator {...pageContext} />
        </ArticlesPaginator>
      </Section>
    </Layout>
  );
};

export default ArticlesPage;

const ArticlesPaginator = styled.div<{ show: boolean }>`
  ${p => p.show && `margin-top: 64px;`}
`;

const ArticlesListWrap = styled.div`
  margin-top: 80px;
  position: relative;
`;
