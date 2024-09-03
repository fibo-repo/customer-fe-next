// components/MapInfoWindow.tsx
import React from 'react';
import { InfoWindow } from '@react-google-maps/api';
import Image from 'next/image';
import Rating from '@/UiComponent/Rating/Rating';
import GridCard from '@/UiComponent/GridCard/GridCard';

interface DataProp{
  id: number;
  lat: number;
  lng: number;
  formattedAddress: string;
  title: string;
  price: number;
  thumbUrl?: string;
  ratingCount?: number;
  rating?: number;
}

interface MapInfoWindowProps {
  data:DataProp ;
  onCloseClick: () => void;
}

const MapInfoWindow: React.FC<MapInfoWindowProps> = ({ data, onCloseClick }) => {
  const position = { lat: data?.lat, lng: data?.lng };

  return (
    <InfoWindow
      position={position}
      options={{ pixelOffset: new window.google.maps.Size(0, -85) }}
      id={data?.id}
      onCloseClick={onCloseClick}
    >
      <GridCard
        className="info_window_card"
        location={data?.formattedAddress}
        title={data?.title}
        price={`$${data?.price}/Night - Free Cancellation`}
        rating={
          <Rating
            rating={data?.rating}
            ratingCount={data?.ratingCount}
            type="bulk"
          />
        }
      >
        <Image src={data?.thumbUrl} alt={data?.title} />
      </GridCard>
    </InfoWindow>
  );
};

export default MapInfoWindow;
