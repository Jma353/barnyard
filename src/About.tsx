import React from 'react';
import {Card, Container} from 'semantic-ui-react';
import styled from 'styled-components';

const TopMarginContainer = styled(Container)`
  margin-top: 25px;
`;

export function About(): React.ReactElement {
  return (
    <TopMarginContainer>
      <Card fluid>
        <Card.Content header="About Barnyard" />
        <Card.Content>
          Barnyard is an NFT collection browser that pulls data from Trader Joe
          APIs to represent NFTs on the Avalanche blockchain. The site enables
          collection browsing and NFT browsing, and features basic collection
          statistics and NFT statistics such as floor price, asking price,
          historical price, etc.
        </Card.Content>
      </Card>
    </TopMarginContainer>
  );
}
