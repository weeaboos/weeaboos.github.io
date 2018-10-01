import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';
import SongList from '../components/songlist';
import { availableLanguages } from '../utils/constants';
import getLocale from '../utils/lang';

const Container = styled('div')`
  width: 100%;
`;

export default props => {
  const { data } = props;
  return <Container>
    <SongList data={data}/>
  </Container>;
};

// TODO: Gatsby bug to keep in mind https://github.com/gatsbyjs/gatsby/issues/6916
export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            artist
            language
          }
          fields {
            slug
          }
          excerpt(pruneLength: 140)
        }
      }
    }
  }
`;
