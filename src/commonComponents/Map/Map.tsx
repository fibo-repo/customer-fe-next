import React from "react";
import { MarkerClusterer } from "@react-google-maps/api";
import MapWrapper from "./MapWrapper";
import HotelMapMarkerCluster from "./ListingPageMap";
import HotelMapMarkerSingle from "./SinglePageMap";
import { isEmpty } from "lodash";
import { SearchDate, RoomGuest } from "@/types/commonTypes";

interface Location {
  id: number;
  latitude: string | number;
  longitude: string | number;
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
  searchDate: SearchDate;
  roomGuest: RoomGuest;
}

const Map: React.FC<MapProps> = ({
  multiple,
  location,
  searchDate,
  roomGuest,
}) => {
  const handleClustererClick = (cluster: any) => {
    const markerClusterer = cluster.getMarkers();
    console.log(markerClusterer);
  };

  if (isEmpty(location)) {
    return null;
  }

  // Ensure latitude and longitude are numbers
  const singleLocation = {
    id: location[0].id,
    latitude: typeof location[0].latitude === 'string' ? parseFloat(location[0].latitude) : location[0].latitude,
    longitude: typeof location[0].longitude === 'string' ? parseFloat(location[0].longitude) : location[0].longitude,
    title: location[0].title,
    image: {
      thumb_url: location[0].imagesUrls.thumbnailUrl,
    },
    location: {
      lat: typeof location[0].latitude === 'string' ? parseFloat(location[0].latitude) : location[0].latitude,
      lng: typeof location[0].longitude === 'string' ? parseFloat(location[0].longitude) : location[0].longitude,
      formattedAddress: `${location[0].city}, ${location[0].state}`,
    },
    price: location[0].propertyBasePrice.discountedPrice,
    rating: location[0].rating,
    ratingCount: location[0].ratingCount,
  };

  return (
    <>
      {multiple ? (
        <MapWrapper
          id="map-multiple-location"
          zoom={7}
          center={{
            lat: typeof location[0].latitude === 'string' ? parseFloat(location[0].latitude) : location[0].latitude,
            lng: typeof location[0].longitude === 'string' ? parseFloat(location[0].longitude) : location[0].longitude,
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
                searchDate={searchDate}
                roomGuest={roomGuest}
              />
            )}
          </MarkerClusterer>
        </MapWrapper>
      ) : (
        <MapWrapper
          id="map-single-location"
          mapContainerStyle={{
            height: "400px",
            width: "100%",
          }}
          zoom={8}
          center={{
            lat: typeof location[0].latitude === 'string' ? parseFloat(location[0].latitude) : location[0].latitude,
            lng: typeof location[0].longitude === 'string' ? parseFloat(location[0].longitude) : location[0].longitude,
          }}
        >
          <HotelMapMarkerSingle
            location={singleLocation}
            searchDate={searchDate}
            roomGuest={roomGuest}
          />
        </MapWrapper>
      )}
    </>
  );
};

export default Map;
