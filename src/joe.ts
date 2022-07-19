import axios from 'axios';

export type Collection = {
  address: string;
  floor?: number;
  name: string;
  numItems: number;
  numOwners: number;
  pfpUrl?: string;
  slugName: string;
  volume?: number;
};

export type CollectionDetails = {
  address: string;
  bannerUrl: string;
  name: string;
};

export type CollectionEntry = {
  bestBid?: {
    price: number;
  };
  collectionSymbol: string;
  currentAsk?: {
    price: number;
  };
  id: string;
  metadata: {
    image: string;
    name: string;
  };
  tokenId: string;
};

const joepegs = axios.create({timeout: 3000});

export async function getCollections(params: {
  page: number;
  pageSize: number;
}): Promise<Collection[]> {
  const response = await joepegs.get(
    `/v2/collections/?pageSize=${params.pageSize}&pageNum=${params.page}&orderBy=volume&filterBy=7d`,
  );
  return response.data;
}

export async function getCollectionDetails(params: {
  name: string;
}): Promise<CollectionDetails> {
  const response = await joepegs.get(`/v2/collections/slug/${params.name}`);
  return response.data;
}

export async function getCollectionEntries(params: {
  collectionAddress: string;
  page: number;
  pageSize: number;
  query: string;
}): Promise<CollectionEntry[]> {
  const response = await joepegs.get(
    `/v2/items/?collectionAddress=${params.collectionAddress}` +
      `&pageSize=${params.pageSize}&pageNum=${params.page}` +
      `&orderBy=price_asc&query=${params.query}&attributeFilters=%5B%5D`,
  );

  return response.data;
}
