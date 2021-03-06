import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import config from '../../src/content/meta/config';

import Footer from '../components/Footer';
import Article from '../components/Article';
import Layout from '../components/Layout';
import Heading from '../components/Heading';
import BodyText from '../components/BodyText';
import Seo from '../components/Seo';

const PageTemplate = props => {
  const {
    data: {
      page: {
        body,
        frontmatter: { title },
        fields: { slug },
        excerpt,
      },
    },
  } = props;

  const { siteUrl, siteTitlePostfix } = config;

  return (
    <Layout>
      <Article>
        <Heading title={title} />
        <BodyText body={body} />
      </Article>
      <Footer />
      <Seo
        url={`${siteUrl}${slug}`}
        title={`${title}${siteTitlePostfix}`}
        description={excerpt}
      />
    </Layout>
  );
};

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export default PageTemplate;

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    page: mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      fileAbsolutePath
      fields {
        slug
        prefix
      }
      frontmatter {
        title
        categories
      }
    }
  }
`;
