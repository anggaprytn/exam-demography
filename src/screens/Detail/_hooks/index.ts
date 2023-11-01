import { useRef } from 'react';
import MapView from 'react-native-maps';

const initialRegion = {
  latitude: -6.1753924,
  longitude: 106.8271528,
  latitudeDelta: 0.0025,
  longitudeDelta: 0.0025,
};

const flattenCoordinates = (geometry: { type: string; coordinates: any }) => {
  let flatCoords: { latitude: number; longitude: number }[] = [];

  const processCoords = (coords: number[]) => {
    const [longitude, latitude] = coords;
    flatCoords.push({ latitude, longitude });
  };

  if (geometry.type === 'Polygon') {
    geometry.coordinates.forEach(ring => {
      ring.forEach(processCoords);
    });
  } else if (geometry.type === 'MultiPolygon') {
    geometry.coordinates.forEach(polygon => {
      polygon.forEach(ring => {
        ring.forEach(processCoords);
      });
    });
  }

  return flatCoords;
};

export const useMap = () => {
  const mapViewRef: any = useRef<MapView>(null);

  const animateToCoords = (geometry: { type: string; coordinates: any }) => {
    const flatCoords = flattenCoordinates(geometry);

    mapViewRef.current?.fitToCoordinates(flatCoords, {
      edgePadding: { top: 20, right: 20, bottom: 20, left: 20 },
      animated: true,
    });
  };

  return {
    mapViewRef,
    initialRegion,
    animateToCoords,
  };
};
