import React from 'react';
import styled from 'styled-components';

export const Box = styled.div<React.CSSProperties>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  justify-content: ${(props) => props.justifyContent || 'space-between'};
  align-items: center;
`;
