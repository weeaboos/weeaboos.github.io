import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import Lyric from './lyric';

const MainContainer = styled('div')`
  width: 100%;
  overflow: auto;
`;

const LyricContainer = styled('div')`
  width: 48%;
  line-height: 1.4;
  border-top: solid 1px;
  border-color: #E7EEFD;
  padding: 4px;
  float: left;
  font-size: 16px;
`;

const Button = styled('button')`
  margin: 0 auto;
  margin: 4px;
  border: solid 1px;
  color: #696969;
  cursor: pointer;
`;

const ButtonContainer = styled('div')`
  border-top: solid 1px;
  border-color: #E7EEFD;
  padding: 16px;
  text-align: center;
`;

class Lyricist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabOrder: this.initActiveTabOrder(),
    };

    this.swapOrder = this.swapOrder.bind(this);
    this.renderChangeButtons = this.renderChangeButtons.bind(this);
  }

  initActiveTabOrder() {
    const { lyrics } = this.props.data;
    return Array.from(Array(lyrics.length).keys());
  }

  swapOrder(tabIdx, idxToSwapWith) {
    const tOrder= this.state.activeTabOrder;
    tOrder[tabIdx] = [tOrder[idxToSwapWith], tOrder[idxToSwapWith] = tOrder[tabIdx]][0];
    this.setState({
      activeTabOrder: tOrder, // trigger re-render
    });
  }

  renderChangeButtons(tabIdx) {
    const { activeTabOrder } = this.state;
    const { lyrics } = this.props.data;
    if (activeTabOrder.length < 3) return null;

    return activeTabOrder.map((val, idx) => {
      if (idx < 2) return null;

      const { version } = lyrics[val];
        
      return <ButtonContainer>
        <Button onClick={() => this.swapOrder(tabIdx, idx)}>
          {version}
        </Button>
      </ButtonContainer>;
    });
  }

  render() {
    const { title, language, lyrics } = this.props.data;
    const { activeTabOrder } = this.state;

    return <MainContainer>
      <LyricContainer>
        <Lyric lyricObject={lyrics[activeTabOrder[0]]} />
        { this.renderChangeButtons(0) }
      </LyricContainer>
      <LyricContainer>
        <Lyric lyricObject={lyrics[activeTabOrder[1]]} />
        { this.renderChangeButtons(1) }
      </LyricContainer>
    </MainContainer>;
  }
}

Lyricist.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Lyricist;
