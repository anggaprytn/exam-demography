import React, { useMemo, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { useMap } from './_hooks';
import { StatusBar } from 'expo-status-bar';
import { defaultColors } from '@/themes';
import IconFeather from 'react-native-vector-icons/Feather';
import { Pressable, Text } from '@/components';
import { formatNumber, hexToRGBA } from '@/utils/helpers';
import { SvgUri } from 'react-native-svg';
import { Image } from 'expo-image';

const Detail = () => {
  const {
    mapViewRef,
    initialRegion,
    animateToCoords,
    navigation,
    isSvg,
    polygonGeometry,
    data,
    flagUrl,
  } = useMap();

  useEffect(() => {
    if (polygonGeometry) {
      setTimeout(() => {
        animateToCoords(polygonGeometry);
      }, 500);
    }
  }, [animateToCoords, polygonGeometry]);

  const renderPolyline = (coordinates: number[][][]) => {
    return coordinates.map((ring, index) => (
      <Polyline
        key={index}
        fillColor={hexToRGBA(defaultColors.primary, 0.2)}
        strokeColor={defaultColors.primary}
        strokeWidth={2}
        coordinates={ring.map(([longitude, latitude]) => ({
          latitude,
          longitude,
        }))}
      />
    ));
  };

  const renderGeometry = useCallback(
    (geometry_: { type: string; coordinates: any }) => {
      if (geometry_.type === 'Polygon') {
        return renderPolyline(geometry_.coordinates);
      } else if (geometry_.type === 'MultiPolygon') {
        return geometry_.coordinates.flatMap(polygon =>
          renderPolyline(polygon),
        );
      }
      return null;
    },
    [],
  );

  const renderBackButton = useMemo(() => {
    return (
      <Pressable onPress={() => navigation.goBack()} style={styles.back}>
        <IconFeather
          name="chevron-left"
          size={35}
          style={styles.r2}
          color={defaultColors.grayText}
        />
      </Pressable>
    );
  }, [navigation]);

  const renderCard = useMemo(() => {
    return (
      <Pressable style={styles.card}>
        <View style={styles.img}>
          {isSvg ? (
            <SvgUri uri={flagUrl} width={'100%'} height={'100%'} />
          ) : (
            <Image source={flagUrl} contentFit="contain" style={styles.img} />
          )}
        </View>
        <View style={styles.statesInfo}>
          <Text
            type="semibold"
            size={21}
            color={defaultColors.text}
            numberOfLines={1}>
            {data.State}
          </Text>
          <View style={styles.population}>
            <IconFeather
              name={'users'}
              size={18}
              color={defaultColors.grayText}
              style={styles.mr4}
            />
            <Text type="regular" size={17} color={defaultColors.grayText}>
              {formatNumber(data.Population)} Population
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }, [data.Population, data.State, flagUrl, isSvg]);

  const renderMap = useMemo(() => {
    return (
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        style={styles.container}>
        {polygonGeometry && renderGeometry(polygonGeometry)}
      </MapView>
    );
  }, [initialRegion, mapViewRef, polygonGeometry, renderGeometry]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {renderMap}
      {renderBackButton}
      {renderCard}
    </View>
  );
};

export default Detail;
