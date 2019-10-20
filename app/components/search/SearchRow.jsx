import React from 'react';
import SearchEntry from './SearchEntry';

const SearchRow = ({
  hit, index, page, hitsPerPage,
}) => {
  let entry = null;
  switch (hit.type) {
    case 'service':
      entry = <SearchEntry page={page} hitsPerPage={hitsPerPage} hit={hit} index={index} />;
      break;
    case 'resource':
      entry = <SearchEntry page={page} hitsPerPage={hitsPerPage} hit={hit} index={index} />;
      break;
    default:
    // eslint-disable-next-line no-console
      console.log('Support for the following entry is not supported yet:', hit.type);
  }

  return (
    <ul>
      {entry}
    </ul>
  );
};


export default SearchRow;
