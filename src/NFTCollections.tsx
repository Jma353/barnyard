import React, {useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Container, Grid, Header, Loader} from 'semantic-ui-react';
import styled from 'styled-components';

import {CollectionCard, LoadingCollectionCard} from './CollectionCard';
import {PAGE_SIZE} from './constants';
import {Collection, getCollections} from './joe';

const StyledContainer = styled(Container)`
  padding-left: 26px;
  margin-top: 25px;
`;

export function NFTCollections(): React.ReactElement {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getCollections({page, pageSize: PAGE_SIZE}).then((result) => {
      if (page === 1) {
        setCollections(result);
      } else {
        setCollections((c) => c.concat(result));
      }
      setIsLoading(false);
    });
  }, [page]);

  const showSkeletons = isLoading && collections.length === 0;

  return (
    <>
      <StyledContainer fluid>
        <Header as="h1">Collections</Header>
      </StyledContainer>
      {showSkeletons && (
        <Grid centered padded>
          {[...Array(10)].map((_, idx) => (
            <LoadingCollectionCard key={idx} />
          ))}
        </Grid>
      )}
      {!showSkeletons && (
        <InfiniteScroll
          dataLength={collections.length}
          hasMore={true}
          loader={<Loader />}
          next={() => setPage(page + 1)}
        >
          <Grid centered padded>
            {collections.map((collection, idx) => (
              <CollectionCard key={idx} collection={collection} />
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </>
  );
}
