import React, { useContext, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

import Headings from '@components/Headings';
import MDXRenderer from "@components/MDX";

import mediaqueries from '@styles/media';
import { IArticle } from '@types';
import Icons from "@icons";

import { GridLayoutContext } from './Articles.List.Context';

const siteQuery = graphql`
  {
    allArticle {
      totalCount
    }
  }
`;

interface ArticlesListProps {
  articles: IArticle[];
  alwaysShowAllDetails?: boolean;
  currentPage: number;
}

interface ArticlesListItemProps {
  article: IArticle;
  counter: number;
  narrow?: boolean;
}

const ArticlesList: React.FC<ArticlesListProps> = ({
  articles,
  alwaysShowAllDetails,
  currentPage
}) => {
  if (!articles) return null;

  const { gridLayout = 'tiles', hasSetGridLayout, getGridLayout } = useContext(
    GridLayoutContext,
  );

  const articlePairs = articles.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []);
  const result = useStaticQuery(siteQuery);
  const totalCount = result.allArticle.totalCount;
  const pageLength = 8;
  const sumArticlesInPreviousPage = (currentPage - 1) * pageLength;

  useEffect(() => getGridLayout(), []);

  return (
    <ArticlesListContainer
      style={{ opacity: hasSetGridLayout ? 1 : 0 }}
      alwaysShowAllDetails={alwaysShowAllDetails}
    >
      <List>
        {articles.map((ap, index) => {
          return (
            <ListItem key={index} article={ap} counter={totalCount - index - sumArticlesInPreviousPage}/>
          );
        })}
      </List>

      <ViewAllTips to="/clips" data-a11y="false"> View all clips → </ViewAllTips>

    </ArticlesListContainer>
  );
};

export default ArticlesList;

const ListItem: React.FC<ArticlesListItemProps> = ({ article, narrow, counter }) => {
  if (!article) return null;

  const hasOverflow = narrow && article.title.length > 35;

  return (
    <ArticleWrap>
      <Item>
        <div>
          <TitleWrap>
            <ViewDetailLink to={article.slug} data-a11y="false">
              {/* {
                counter < 10
                ? <span> {"#0" + counter} </span>
                : <span> {"#" + counter} </span>
              } */}
              <Icons.Link />
            </ViewDetailLink>
            <Title dark hasOverflow={hasOverflow}>
              {article.title}
            </Title>
          </TitleWrap>
          <MDXRenderer content={article.body}>
          </MDXRenderer>
        </div>
      </Item>
    </ArticleWrap>
  );
};

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`;

const ArticlesListContainer = styled.div<{ alwaysShowAllDetails?: boolean }>`
  transition: opacity 0.25s;
  margin-top: 40px;
  ${p => p.alwaysShowAllDetails && showDetails}

  ${mediaqueries.tablet`
    margin-top: 0;
  `}

`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 30px;
  grid-template-rows: 2;
  grid-row-gap: 76px;

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    
    &:not(:last-child) {
      margin-bottom: 0;
    }
  `}
`;

const Item = styled.div`
  position: relative;
  margin-bottom: 96px;

  ${mediaqueries.tablet`
    margin-bottom: 60px;
  `}

  ${mediaqueries.phablet`
    margin-bottom: 40px;
  `}

`;

const TitleWrap = styled.div`
  max-width: 360px;
`;


const Title = styled(Headings.h2)`
  font-size: 28px;
  font-family: ${p => p.theme.fonts.title};
  margin-bottom: 10px;
  transition: color 0.3s ease-in-out;
  line-height: 1.25;

  ${mediaqueries.desktop`
    margin-bottom: 15px;
  `}

  ${mediaqueries.tablet`
    font-size: 24px;
    max-width: 100%;
  `}
`;

const ArticleWrap = styled.div`
  position: relative;
`;

const ViewDetailLink = styled(Link)`
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-size: 48px;
  color: ${p => p.theme.colors.grey};
  font-family: ${p => p.theme.fonts.title};
  transition: color 0.25s ease 0s;

  &:hover {
    color: ${p => p.theme.colors.secondary};
  }
`;

const ViewAllTips = styled(Link)`
  padding: 12px 16px;
  box-sizing: border-box;
  border: 1px solid ${p => p.theme.colors.secondary};
  color: ${p => p.theme.colors.primary};
  background-color: transparent;
  font-size: 16px;
  opacity: 1;
  text-align: center;
  transition: background-color 0.25s ease 0s;
  
  ${mediaqueries.phablet`
    display: block;
  `};

  &:hover {
    background-color: ${p => p.theme.colors.secondary};
    color: ${p => p.theme.colors.background};
  }
`;