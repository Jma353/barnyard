import React from 'react';
import {Card, Image} from 'semantic-ui-react';
import styled from 'styled-components';

import {Box} from './Box';
import {CollectionEntry} from './joe';
import Avax from './media/avax.svg';
import WAvax from './media/wavax.svg';
import {Skeleton} from './Skeleton';
import {StyledCard} from './StyledCard';
import {getBeautifiedCost} from './utils';

type Props = {
  entry: CollectionEntry;
};

const RightPadded = styled.div`
  margin-right: 4px;
  display: flex;
  align-items: center;
`;

const LeftAligned = styled.div`
  width: 100%;
  font-size: 12px;
  text-align: left;
`;

// Some images are unavailable via IPFS; use CDN to benefit from cache + availability
// of more images
const CND_BASE_URL = 'https://joepegs.com/cdn-cgi/image/width=384,height=384/';

export function NFTCard({entry}: Props): React.ReactElement {
  return (
    <StyledCard link>
      <Image
        src={`${CND_BASE_URL}${entry.metadata.image}`}
        ui={false}
        wrapped
      />
      <Card.Content>
        <Card.Header>
          {entry.metadata.name
            ? `${entry.metadata.name} (#${entry.tokenId})`
            : `${entry.collectionSymbol} #${entry.tokenId}`}
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Box>
          <Box flexDirection="column">
            <LeftAligned>Price</LeftAligned>
            <Box>
              <RightPadded>
                <Avax />
              </RightPadded>
              {entry.currentAsk?.price != null
                ? getBeautifiedCost(entry.currentAsk?.price)
                : '--'}
            </Box>
          </Box>
          <Box flexDirection="column">
            <LeftAligned>Top Offer</LeftAligned>
            <Box>
              <RightPadded>
                <WAvax />
              </RightPadded>
              {entry.bestBid?.price != null
                ? getBeautifiedCost(entry.bestBid.price)
                : '--'}
            </Box>
          </Box>
        </Box>
      </Card.Content>
    </StyledCard>
  );
}

export function LoadingNFTCard(): React.ReactElement {
  return (
    <StyledCard>
      <Skeleton count={1} height={290} />
      <Card.Content extra>
        <Skeleton count={2} />
      </Card.Content>
      <Card.Content extra>
        <Skeleton count={2} />
      </Card.Content>
    </StyledCard>
  );
}
