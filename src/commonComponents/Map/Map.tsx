import React from 'react';
import { MarkerClusterer } from '@react-google-maps/api';
import MapWrapper from './MapWrapper';
import HotelMapMarkerCluster from './ListingPageMap';
import HotelMapMarkerSingle from './SinglePageMap';
import { isEmpty } from 'lodash';

interface Location {
  id: number;
  latitude: string;
  longitude: string;
  title: string;
  imagesUrls: {
    thumbnailUrl: string;
  };
  city: string;
  state: string;
  propertyBasePrice: {
    discountedPrice: number;
  };
  rating?: number;
  ratingCount?: number;
}

interface MapProps {
  multiple?: boolean;
  location: Location[];
}

const Map: React.FC<MapProps> = ({ multiple, location }) => {
  const handleClustererClick = (data: google.maps.MarkerClusterer) => {
    const markerClusterer = data.getMarkers();
    console.log(markerClusterer);
  };

  if (isEmpty(location)) {
    return null;
  }

  return (
    <>
      {multiple ? (
        <MapWrapper
          id="map-multiple-location"
          zoom={7}
          center={{
            lat: location[0]?.latitude || 0,
            lng: location[0]?.longitude || 0,
          }}
        >
          <MarkerClusterer
            gridSize={60}
            averageCenter
            enableRetinaIcons={true}
            onClick={handleClustererClick}
          >
            {(clusterer) => (
              <HotelMapMarkerCluster
                location={location}
                clusterer={clusterer}
              />
            )}
          </MarkerClusterer>
        </MapWrapper>
      ) : (
        <MapWrapper
          id="map-single-location"
          mapContainerStyle={{
            height: '400px',
            width: '100%',
          }}
          zoom={8}
          center={{
            lat: location[0]?.latitude || 0,
            lng: location[0]?.longitude || 0,
          }}
        >
          <HotelMapMarkerSingle location={location} />
        </MapWrapper>
      )}
    </>
  );
};

export default Map;
