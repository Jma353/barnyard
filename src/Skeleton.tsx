import 'react-loading-skeleton/dist/skeleton.css';

import React from 'react';
import LoadingSkeleton from 'react-loading-skeleton';

type Props = {
  count: number;
  height?: number;
};

export function Skeleton({count, height}: Props): React.ReactElement {
  return <LoadingSkeleton count={count} height={height} />;
}
