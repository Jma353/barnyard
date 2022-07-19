import React from 'react';
import {Input} from 'semantic-ui-react';

type Props = {
  onSearch: (query: string) => void;
  placeholder: string;
};

export function SearchBar({onSearch, placeholder}: Props): React.ReactElement {
  return (
    <Input
      icon="search"
      placeholder={placeholder}
      size="large"
      fluid
      onChange={(_, data) => onSearch(data.value)}
    />
  );
}
