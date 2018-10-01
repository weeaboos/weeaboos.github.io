import React from 'react';
import styled from 'styled-components';

const LyricContainer = styled('div')`
  margin-bottom: 8px;
`;

const VersionContainer = styled('h1')`
  text-align: center;
  padding: 8px;
`;

const lyricToHtml = lyricLine => {
  if (!lyricLine.trim()) return <br/>;

  return <span>
    {lyricLine}<br/>
  </span>;
};

const Lyric = ({ lyricObject }) => {
  const { lyrics, version } = lyricObject;
  return <LyricContainer>
    <VersionContainer>
      {version}
    </VersionContainer>
    {lyrics.map(lyricToHtml)}
  </LyricContainer>;
};

export default Lyric;
