import React, { useMemo } from 'react';
import { View, Image } from 'react-native';
import { styles } from './styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useMap } from './_hooks';
import { StatusBar } from 'expo-status-bar';
import { Text } from '@/components';
import { defaultColors } from '@/themes';

const Map = () => {
  const { mapViewRef, initialRegion } = useMap();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />\
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        showsUserLocation
        initialRegion={initialRegion}
        style={styles.container}
      />
    </View>
  );
};

export default Map;
