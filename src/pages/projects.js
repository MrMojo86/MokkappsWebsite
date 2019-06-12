import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { Margin } from 'styled-components-spacing';

import config from 'content/meta/config';

import Footer from '../components/Footer';
import ProjectList from '../components/ProjectList';
import Article from '../components/Article';
import Layout from '../components/Layout';
import Heading from '../components/Heading';
import FluidImage from '../components/FluidImage';
import Seo from '../components/Seo';
import { FormattedMessage } from 'react-intl';

const MarginCenteredWrapper = styled(Margin)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProjectLogos = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ProjectsPage = props => {
  const {
    data: { projectAssets, companyLogoAssets, consultingImage },
  } = props;

  const { edges } = companyLogoAssets;
  const { siteUrl, siteDescription } = config;

  return (
    <Layout>
      <Article>
        <Heading i18nId="businessProjectsHeading" />
        <MarginCenteredWrapper top={4} bottom={4}>
          <span>
            <a href="/contact">
              <FormattedMessage id="getInTouch" />
            </a>
            <FormattedMessage id="detailedProjectList" />
          </span>
          <MarginCenteredWrapper top={3} bottom={2}>
            <FluidImage image={consultingImage} />
          </MarginCenteredWrapper>
          <MarginCenteredWrapper top={2} bottom={2}>
            <span>
              <FormattedMessage id="workedWith" />
            </span>
            <Margin top={3}>
              <ProjectLogos>
                {edges.map(edge => (
                  <Margin
                    right={2}
                    left={2}
                    key={edge.node.childImageSharp.fixed.src}
                  >
                    <Img fixed={edge.node.childImageSharp.fixed} />
                  </Margin>
                ))}
              </ProjectLogos>
            </Margin>
          </MarginCenteredWrapper>
        </MarginCenteredWrapper>
        <Heading i18nId="privateProjectsHeading" />
        <ProjectList projectAssets={projectAssets} />
      </Article>
      <Footer />
      <Seo
        url={siteUrl}
        title={`Projects | ${siteDescription}`}
        description={siteDescription}
      />
    </Layout>
  );
};

ProjectsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProjectsPage;

export const query = graphql`
  query {
    consultingImage: file(relativePath: { eq: "consulting1.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 700) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    projectAssets: allFile(filter: { absolutePath: { regex: "/projects/" } }) {
      edges {
        node {
          childImageSharp {
            sizes(maxWidth: 600) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
    companyLogoAssets: allFile(
      filter: { absolutePath: { regex: "/company_logos/" } }
    ) {
      edges {
        node {
          childImageSharp {
            fixed(height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
