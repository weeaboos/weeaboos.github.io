import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';
import { getActivePosts } from '../utils';

const Table = styled('table')`
  width: 100%;

  tr:hover {
    background: #E1E1E1;
  }
`;

const TableHead = styled('thead')``;

const TableHCell = styled('th')``;

const TableBody = styled('tbody')``;

const TableRow = styled('tr')`
  width: 100%;
`;

const TableCell = styled('td')`
  span.title {
    font-weight: bold;
  }
`;

const Container = styled('div')`
  width: 100%;
  margin: 16px 0;
  text-align: center;
`;

const generatePostSnippet = post => {
  const { id, fields, frontmatter, excerpt } = post;
  return <TableRow key={id}>
    <TableCell>
      <Link
        to={fields.slug}
        css={{ textDecoration: `none`, color: `#0000FF` }}
      >
        <span className="title">{frontmatter.title}</span>
      </Link>
    </TableCell>
    <TableCell>{frontmatter.artist}</TableCell>
    <TableCell>{frontmatter.language}</TableCell>
  </TableRow>
};

const generateSongList = posts => {
  return posts.map(post => generatePostSnippet(post.node));
};

const generateHeader = () => {
  return <TableRow>
    <TableHCell>タイトル</TableHCell>
    <TableHCell>歌手</TableHCell>
    <TableHCell>言語</TableHCell>
  </TableRow>;
};

const SongList = ({ data }) => {
  const posts = getActivePosts(data);
  return <Container>
    <Table>
      <TableHead>
        { generateHeader() }
      </TableHead>
      <TableBody>
        { generateSongList(posts) }
      </TableBody>
    </Table>
  </Container>;
}

export default SongList;
