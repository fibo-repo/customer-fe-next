import React, { useState } from 'react';
import { Marker } from '@react-google-maps/api';
import HotelInfoWindow from './MapInfoWindow';
import MakerImage from './hotelMapMarker.png';


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

interface HotelMapMarkerClusterProps {
  location: Location[];
  clusterer: any; // Adjust the type if you have a specific one for clusterer
}

const HotelMapMarkerCluster: React.FC<HotelMapMarkerClusterProps> = ({
  location,
  clusterer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markerIndex, setMarkerIndex] = useState<number | null>(null);
  let hotelData: {
    id: number;
    lat: number;
    lng: number;
    title: string;
    thumbUrl?: string;
    formattedAddress: string;
    price: number;
  }[] = [];

  const infoWindowToggle = (index: number) => {
    setIsOpen(!isOpen);
    setMarkerIndex(index);
  };

  location &&
    location.forEach((item) => {
      hotelData.push({
        id: item.id,
        lat: parseFloat(item.latitude),
        lng: parseFloat(item.longitude),
        title: item.title,
        thumbUrl: item.imagesUrls?.thumbnailUrl,
        formattedAddress: `${item.city} ${item.state}`,
        price: item.propertyBasePrice.discountedPrice,
        // rating: item.rating,
        // ratingCount: item.ratingCount,
      });
    });

  return (
    <>
      {hotelData.map((singlePostLocation, index) => (
        <Marker
          key={index}
          icon={MakerImage.src}
          clusterer={clusterer}
          position={{ lat: singlePostLocation.lat, lng: singlePostLocation.lng }}
          onClick={() => infoWindowToggle(singlePostLocation.id)}
        >
          {isOpen && markerIndex === singlePostLocation.id ? (
            <HotelInfoWindow
              data={singlePostLocation}
              onCloseClick={() => infoWindowToggle(singlePostLocation.id)}
            />
          ) : null}
        </Marker>
      ))}
    </>
  );
};

export default HotelMapMarkerCluster;
