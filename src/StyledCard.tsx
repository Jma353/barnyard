import {Card} from 'semantic-ui-react';
import styled from 'styled-components';

// Excuse my use of !important here; didn't want to waste time
// figuring out how to have styled-components prioritize the
// generated class over the semantic UI classes
export const StyledCard = styled(Card)`
  margin: 20px !important;
`;
