// src/components/ListingMap.tsx

import React from 'react';
import isEmpty from 'lodash/isEmpty';
import Map from '../../../commonComponents/Map/Map';
import { FixedMap } from './listing.style';

interface ListingMapProps {
  data: any; 
  loading: boolean;
}

const ListingMap: React.FC<ListingMapProps> = ({ data, loading }) => {

    if (isEmpty(data) || loading) return null;

  return (
    <FixedMap>
      <Map location={data} multiple />
    </FixedMap>
  );
};

export default ListingMap;
