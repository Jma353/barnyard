import debounce from 'lodash.debounce';
import React, {useEffect, useMemo, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useParams} from 'react-router-dom';
import {Container, Grid, Loader, Message} from 'semantic-ui-react';
import styled from 'styled-components';

import {Banner} from './Banner';
import {
  CollectionDetails,
  CollectionEntry,
  getCollectionDetails,
  getCollectionEntries,
} from './joe';
import {LoadingNFTCard, NFTCard} from './NFTCard';
import {SearchBar} from './SearchBar';

const TopMarginContainer = styled(Container)`
  margin-top: 25px;
`;

const PAGE_SIZE = 20;

export function NFTCollection(): React.ReactElement {
  const {name} = useParams();

  const [collectionDetails, setCollectionDetails] = useState<
    CollectionDetails | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [collection, setCollection] = useState<CollectionEntry[]>([]);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSearch = (query: string): void => {
    // Full reset needs to happen so that effect can start paging again
    // with the new query introduced
    setQuery(query);
    setPage(1);
    setCollection([]);
  };

  // Ensures typing doesn't happen for N ms before search is dispatched
  const debounceHandleSearch = useMemo(() => debounce(handleSearch, 400), []);

  useEffect(() => {
    if (!name) {
      return;
    }

    setIsLoading(true);
    getCollectionDetails({name})
      .then((result) => {
        setCollectionDetails(result);
        setIsLoading(false);
      })
      // Only real place HTTP can fail for this demo
      .catch((error) => setError(error.message));
  }, [name]);

  useEffect(() => {
    if (!collectionDetails) {
      return;
    }

    setIsLoading(true);
    getCollectionEntries({
      collectionAddress: collectionDetails?.address,
      page,
      pageSize: PAGE_SIZE,
      query,
    }).then((result) => {
      if (page === 1) {
        setCollection(result);
      } else {
        setCollection((c) => c.concat(result));
      }

      setIsLoading(false);
    });

    return () => debounceHandleSearch.cancel();
  }, [page, query, debounceHandleSearch, collectionDetails]);

  const showSkeletons = isLoading && collection.length === 0;

  if (error) {
    return (
      <TopMarginContainer>
        <Message error>
          <Message.Header>
            Uh Oh! There was an error in the Barnyard!
          </Message.Header>
          <p>{error}</p>
        </Message>
      </TopMarginContainer>
    );
  }

  return (
    <>
      <Banner image={collectionDetails?.bannerUrl} isLoading={isLoading} />
      <TopMarginContainer>
        <SearchBar
          placeholder="Search Token ID or Name"
          onSearch={debounceHandleSearch}
        />
      </TopMarginContainer>

      {showSkeletons && (
        <Grid centered padded>
          {[...Array(10)].map((_, idx) => (
            <LoadingNFTCard key={idx} />
          ))}
        </Grid>
      )}
      {!showSkeletons && (
        <InfiniteScroll
          dataLength={collection.length}
          hasMore={true}
          loader={<Loader />}
          next={() => setPage(page + 1)}
        >
          <Grid centered padded>
            {collection.map((entry, idx) => (
              <NFTCard key={idx} entry={entry} />
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </>
  );
}
