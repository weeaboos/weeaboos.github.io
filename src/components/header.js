import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import {Flex, Box} from 'grid-styled';
import { shuffle, simpleRange } from '../utils';
import Ticker from './ticker';
import lyrics from '../utils/lyrics';

const StyledNav = Box.extend`
  height: 125px;
  width: 100%;
  padding: 32px 16px 24px 16px;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #E7EEFD;
  background-color: #fcfdff;
  text-align: center;
`;

// Not inclusive [a, b)
const randIntBetween = (a, b) => {
  return Math.floor(Math.random() * b) + a;
}

const getRandomLyric = () => {
  const randInt = randIntBetween(0, lyrics.length);
  return openJsonHelper(lyrics[randInt]);
};

const openJsonHelper = helperName => {
  // https://github.com/gatsbyjs/gatsby/issues/356
  const jsonData = require(`../posts/helper/${helperName}.json`);
  return jsonData;
};

const Header = () => {
  const randomLyric = getRandomLyric();
  const speed = randomLyric.bpm;
  const lyrics = randomLyric.lyrics;
  const text = lyrics[randIntBetween(0, lyrics.length)].lyrics.join(' ');
  return <StyledNav is="header">
    <Link to='/'>
      <Ticker text={text} speed={speed}></Ticker>
    </Link>
  </StyledNav>;
}

export default Header;
