import React from 'react';
import styled from 'styled-components';

const TickerContainer = styled('div')`
@-webkit-keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes ticker {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  100% {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
}

.ticker-wrap {
  position: fixed;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  height: 4rem;
  background-color: rgba(#000, 0.9); 
  padding-left: 100%;
  box-sizing: content-box;

  .ticker {
    display: inline-block;
    height: 4rem;
    line-height: 4rem;  
    white-space: nowrap;
    padding-right: 100%;
    box-sizing: content-box;

    -webkit-animation-iteration-count: infinite; 
            animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
            animation-timing-function: linear;
   -webkit-animation-name: ticker;
           animation-name: ticker;
    -webkit-animation-duration: $duration;
            animation-duration: $duration;

    &__item {
      display: inline-block;
      padding: 0 2rem;
      font-size: 2rem;
      color: white;   

    }

  }

}
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
  return <TickerContainer>
    <VersionContainer>
      {version}
    </VersionContainer>
    {lyrics.map(lyricToHtml)}
  </TickerContainer>;
};

export default Lyric;