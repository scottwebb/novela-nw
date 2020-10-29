import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { Link } from 'gatsby';

import Image from '@components/Image';
import Section from '@components/Section';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';
import Icons from "@icons";

import { GridLayoutContext } from './Articles.List.Context';

const myQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              writingHeading
            }
          }
        }
      }
    }
  }
`;


const FeaturedArticlesHero: React.FC<IAuthor> = ({ authors }) => {
  const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext,
  );

  const results = useStaticQuery(myQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;
  
  return (
    <HeroContainer>
      <TextWrap>
        <Section narrow id="Articles__Hero">
          <HeroContent>
            <HeadingContainer>
              <HeroHeading dangerouslySetInnerHTML={{ __html: hero.writingHeading }} />
              <InfoText>
              Short but awesome clips shot in London, Ontario, Canada.
              </InfoText>
            </HeadingContainer>
          </HeroContent>
        </Section>
      </TextWrap>
      <SVGWrapper>
        <Icons.Hero />
      </SVGWrapper>
      <GradientMask></GradientMask>
    </HeroContainer>
  );
};

export default FeaturedArticlesHero;

const HeroContainer = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  margin-top: -100px;
  height: 800px;
  // background-image: url("/site-hero.jpg");
  // background-image: ${p => p.theme.colors.heroBackground};
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;


  ${mediaqueries.tablet`
    height: 536px;
  `}

`;

const SVGWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
`;

const GradientMask = styled.div`
  position: absolute;
  width: 100%;
  height: 112px;
  bottom: 0;
  left: 0;
  background: ${p => p.theme.colors.gradient};
  transition: ${p => p.theme.colorModeTransition};
`;

const TextWrap = styled.div`
  position: relative;
  z-index: 2;
`;

const HeroContent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0;

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}

`;

const HeadingContainer = styled.div`
  margin: 240px 0 40px;
  
  ${mediaqueries.tablet`
    width: 100%;
    margin-top: 200px;
  `}
`;

const Logo = styled.div`
  position: relative;
  width: 504px;
  justify-self: center;
  margin-top: 136px;

  ${mediaqueries.tablet`
   display: none;
  `}
`;
  
const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-size: 76px;
  line-height: 1.15;
  font-family: ${p => p.theme.fonts.title};
  color: transparent;
  -webkit-background-clip: text;
  background-image: ${p => p.theme.colors.gradientText};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 48px
  `}

  ${mediaqueries.tablet`
    font-size: 44px;
    text-align: center;
  `}
`;

const InfoText = styled.p`
  font-size: 18px;
  margin-top: 16px;
  line-height: 1.5;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};

  ${mediaqueries.tablet`
    text-align: center;
  `}
`;

const Anchor = styled(Link)`
  color: ${p => p.theme.colors.secondary};
  border-bottom: 1px solid ${p => p.theme.colors.secondary};
  margin-left: 6px;

  &:hover,
  &:focus {
    color: ${p => p.theme.colors.accent};
    border-bottom-color: ${p => p.theme.colors.accent};
  }
`;
