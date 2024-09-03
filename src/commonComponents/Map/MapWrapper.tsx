import React, { ReactNode } from 'react';
import { GoogleMap, useLoadScript, GoogleMapProps } from '@react-google-maps/api';

interface MapWrapperProps extends GoogleMapProps {
  children: ReactNode;
}

const MapWrapper: React.FC<MapWrapperProps> = ({ children, ...rest }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '', 
    libraries: ['places', 'drawing', 'geometry'],
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return <>{isLoaded && <GoogleMap {...rest}>{children}</GoogleMap>}</>;
};

export default MapWrapper;
