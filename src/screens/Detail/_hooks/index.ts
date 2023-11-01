import { useRef } from 'react';
import MapView from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
  isSvgImage,
  getStateFlagUrl,
  getGeometryByName,
} from '@/utils/helpers';
import { dataFlag, us_states } from '@/constants';
import { useSelector } from 'react-redux';

const initialRegion = {
  latitude: 40.758896,
  longitude: -73.98513,
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
  const dataStates = useSelector(({ dataSlice }: any) => dataSlice.dataStates);

  const navigation: any = useNavigation();
  const mapViewRef: any = useRef<MapView>(null);

  const route = useRoute<any>();

  const data = route.params?.data;

  const flagUrl = getStateFlagUrl(data?.State, dataStates, dataFlag);

  const isSvg = isSvgImage(flagUrl || '');

  const polygonGeometry: any = getGeometryByName(us_states, data?.State);

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
    navigation,
    isSvg,
    polygonGeometry,
    data,
    flagUrl,
  };
};
