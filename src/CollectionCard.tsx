import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Card, Image} from 'semantic-ui-react';
import styled from 'styled-components';

import {Box} from './Box';
import {DEFAULT_COLLECTION_IMAGE} from './constants';
import {Collection} from './joe';
import Avax from './media/avax.svg';
import WAvax from './media/wavax.svg';
import {Skeleton} from './Skeleton';
import {StyledCard} from './StyledCard';
import {getBeautifiedCost} from './utils';

type Props = {
  collection: Collection;
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

export function CollectionCard({collection}: Props): React.ReactElement {
  const navigate = useNavigate();

  return (
    <StyledCard
      link
      onClick={() => navigate(`/collection/${collection.slugName}`)}
    >
      <Image
        src={collection.pfpUrl || DEFAULT_COLLECTION_IMAGE}
        ui={false}
        wrapped
      />
      <Card.Content>
        <Card.Header>{collection.name}</Card.Header>
      </Card.Content>
      <Card.Content
        extra
      >{`${collection.numItems} items | ${collection.numOwners} owners`}</Card.Content>
      <Card.Content extra>
        <Box>
          <Box flexDirection="column">
            <LeftAligned>Floor</LeftAligned>
            <Box>
              <RightPadded>
                <Avax />
              </RightPadded>
              {collection.floor != null
                ? getBeautifiedCost(collection.floor)
                : '--'}
            </Box>
          </Box>
          <Box flexDirection="column">
            <LeftAligned>7D Volume</LeftAligned>
            <Box>
              <RightPadded>
                <WAvax />
              </RightPadded>
              {collection.volume != null
                ? getBeautifiedCost(collection.volume)
                : '--'}
            </Box>
          </Box>
        </Box>
      </Card.Content>
    </StyledCard>
  );
}

export function LoadingCollectionCard(): React.ReactElement {
  return (
    <StyledCard>
      <Skeleton count={1} height={290} />
      <Card.Content extra>
        <Skeleton count={1} />
      </Card.Content>
      <Card.Content extra>
        <Skeleton count={1} />
      </Card.Content>
      <Card.Content extra>
        <Skeleton count={2} />
      </Card.Content>
    </StyledCard>
  );
}
