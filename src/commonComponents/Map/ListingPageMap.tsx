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
  clusterer: any;
  searchDate: SearchDate;
  roomGuest: RoomGuest;
}

const HotelMapMarkerCluster: React.FC<HotelMapMarkerClusterProps> = ({
  location,
  clusterer,
  searchDate,
  roomGuest,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [markerIndex, setMarkerIndex] = useState<number | null>(null);

  const hotelData = location.map((item) => ({
    id: item.id,
    lat:
      typeof item.latitude === "string"
        ? parseFloat(item.latitude)
        : item.latitude,
    lng:
      typeof item.longitude === "string"
        ? parseFloat(item.longitude)
        : item.longitude,
    title: item.title,
    thumbUrl: item.imagesUrls?.thumbnailUrl,
    formattedAddress: `${item.city}, ${item.state}`,
    price: item.propertyBasePrice.discountedPrice,
    // rating: item.rating,
    // ratingCount: item.ratingCount,
  }));

  const infoWindowToggle = (index: number) => {
    setIsOpen((prev) => !prev);
    setMarkerIndex(index);
  };

  return (
    <>
      {hotelData.map((singlePostLocation, index) => (
        <Marker
          key={index}
          icon={MakerImage.src}
          clusterer={clusterer}
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

export default HotelMapMarkerCluster;
