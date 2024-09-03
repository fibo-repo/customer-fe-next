import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";
import HotelInfoWindow from "./MapInfoWindow";
import MakerImage from "./hotelMapMarker.png";
import { RoomGuest, SearchDate } from "@/types/commonTypes";

interface Location {
  id: number;
  latitude: string | number;
  longitude: string | number;
  title: string;
  image: {
    thumb_url: string;
  };
  location: {
    lat: number;
    lng: number;
    formattedAddress: string;
  };
  price: number;
  rating?: number;
  ratingCount?: number;
}

interface SingleMapDisplayProps {
  location: Location;
  searchDate: SearchDate;
  roomGuest: RoomGuest;
}

const SingleMapDisplay: React.FC<SingleMapDisplayProps> = ({
  location,
  searchDate,
  roomGuest,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markerIndex, setMarkerIndex] = useState<number | null>(null);

  const infoWindowToggle = (index: number) => {
    setIsOpen(!isOpen);
    setMarkerIndex(index);
  };

  const hotelData = [
    {
      lat:
        typeof location.location.lat === "number"
          ? location.location.lat
          : parseFloat(location.latitude as string),
      lng:
        typeof location.location.lng === "number"
          ? location.location.lng
          : parseFloat(location.longitude as string),
      id: location.id,
      title: location.title,
      thumbUrl: location.image.thumb_url,
      formattedAddress: location.location.formattedAddress,
      price: location.price,
      rating: location.rating,
      ratingCount: location.ratingCount,
    },
  ];

  return (
    <>
      {hotelData.map((singlePostLocation, index) => (
        <Marker
          key={index}
          icon={MakerImage.src}
          position={{
            lat: singlePostLocation.lat,
            lng: singlePostLocation.lng,
          }}
          onClick={() => infoWindowToggle(singlePostLocation.id)}
        >
          {isOpen && markerIndex === singlePostLocation.id && (
            <HotelInfoWindow
              data={singlePostLocation}
              onCloseClick={() => infoWindowToggle(singlePostLocation.id)}
              searchDate={searchDate}
              roomGuest={roomGuest}
            />
          )}
        </Marker>
      ))}
    </>
  );
};

const HotelMapMarkerSingle: React.FC<SingleMapDisplayProps> = (props) => {
  return <SingleMapDisplay {...props} />;
};

export default HotelMapMarkerSingle;
