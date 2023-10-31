import { useRef } from 'react';
import MapView from 'react-native-maps';

const initialRegion = {
  latitude: -6.1753924,
  longitude: 106.8271528,
  latitudeDelta: 0.0025,
  longitudeDelta: 0.0025,
};

export const useMap = () => {
  const mapViewRef: any = useRef<MapView>(null);

  return {
    mapViewRef,
    initialRegion,
  };
};
