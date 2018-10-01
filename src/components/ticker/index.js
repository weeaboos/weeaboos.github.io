import React from 'react';
import styled from 'styled-components';

const TickerContainer = styled('div')`
  width: 100%;
  font-size: 36px;
  font-weight: bold;

  .marquee {
    margin: 0 auto;
    white-space: nowrap;
    overflow: hidden;
  }

  .marquee span {
    display: inline-block;
    padding-left: 100%;
    animation: marquee ${props => props.theme.speed}s linear infinite;
  }

  @keyframes marquee {
    0%   { transform: translate(0,0); }
    100% { transform: translate(-100%, 0); }
  }
`;


const Ticker = ({ text, speed }) => {
  return <TickerContainer theme={{ speed }}>
      <div className='marquee'>
        <span>{ text }</span>
      </div>
    </TickerContainer>;
};

export default Ticker;
