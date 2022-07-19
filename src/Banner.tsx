import React from 'react';
import {Header} from 'semantic-ui-react';
import styled from 'styled-components';

import {Skeleton} from './Skeleton';

const StyledHeader = styled(Header)<{backgroundImage: string}>`
  height: 250px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${(props) => props.$backgroundImage});
`;

type Props = {
  image?: string;
  isLoading: boolean;
};

export function Banner({image, isLoading}: Props): React.ReactElement {
  if (!image && isLoading) {
    return <Skeleton count={1} height={245} />;
  }

  return <StyledHeader $backgroundImage={image} />;
}
