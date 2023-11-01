import React, { useMemo, useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { useMap } from './_hooks';
import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { defaultColors } from '@/themes';
import IconFeather from 'react-native-vector-icons/Feather';
import { Pressable, Text } from '@/components';
import { useNavigation, useRoute } from '@react-navigation/core';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  formatNumber,
  isSvgImage,
  getStateFlagUrl,
  hexToRGBA,
} from '@/utils/helpers';
import { dataFlag, dataStates, us_states } from '@/constants';
import { SvgUri } from 'react-native-svg';
import { Image } from 'expo-image';

const statusBarHeight = getStatusBarHeight();

type Feature = {
  type: string;
  id: string;
  properties: {
    name: string;
  };
  geometry: object;
};

type FeatureCollection = {
  type: string;
  features: Feature[];
};

function getGeometryByName(
  collection: FeatureCollection,
  name: string,
): object | null {
  const feature = collection.features.find(
    data => data.properties.name === name,
  );

  return feature ? feature.geometry : null;
}

const Detail = () => {
  const { mapViewRef, initialRegion, animateToCoords } = useMap();

  const navigation: any = useNavigation();

  const route = useRoute<any>();

  const data = route.params?.data;

  const flagUrl = getStateFlagUrl(data?.State, dataStates, dataFlag);
  const isSvg = isSvgImage(flagUrl || '');

  const polygonGeometry: any = getGeometryByName(us_states, data?.State);

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
        coordinates={ring.map(([longitude, latitude]) => ({
          latitude,
          longitude,
        }))}
        fillColor={hexToRGBA(defaultColors.primary, 0.2)}
        strokeColor={defaultColors.primary}
        strokeWidth={2}
      />
    ));
  };

  const renderGeometry = (geometry_: { type: string; coordinates: any }) => {
    if (geometry_.type === 'Polygon') {
      return renderPolyline(geometry_.coordinates);
    } else if (geometry_.type === 'MultiPolygon') {
      return geometry_.coordinates.flatMap(polygon => renderPolyline(polygon));
    }
    return null;
  };

  const renderBackButton = useMemo(() => {
    return (
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          elevation: 5,
          height: 55,
          borderRadius: 10,
          width: 55,
          backgroundColor: defaultColors.white,
          position: 'absolute',
          top: statusBarHeight + 16,
          left: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconFeather
          name="chevron-left"
          size={35}
          style={{ right: 2 }}
          color={defaultColors.grayText}
        />
      </Pressable>
    );
  }, [navigation]);

  const renderCard = useMemo(() => {
    return (
      <Pressable
        style={{
          width: wp(100) - 32,
          height: 68 + 24,
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 16,
          left: 16,
          elevation: 5,
          borderRadius: 10,
          flexDirection: 'row',
          paddingHorizontal: 8 + 4,
          paddingVertical: 8 + 4,
        }}>
        <View
          style={{
            height: 68,
            width: 100,
            borderRadius: 8,
            overflow: 'hidden',
          }}>
          {isSvg ? (
            <SvgUri uri={flagUrl} width={'100%'} height={'100%'} />
          ) : (
            <Image
              source={flagUrl}
              contentFit="contain"
              style={{
                height: 68,
                width: 100,
                borderRadius: 8,
              }}
            />
          )}
        </View>
        <View
          style={{
            height: 100 - 32,
            width: wp(100) - 32 - 100 - 16 - 32,
            marginLeft: 16,
            borderRadius: 8,
            justifyContent: 'center',
          }}>
          <Text
            type="semibold"
            size={21}
            color={defaultColors.text}
            numberOfLines={1}>
            {data.State}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 6,
            }}>
            <IconFeather
              name={'users'}
              size={18}
              color={defaultColors.grayText}
              style={{ marginRight: 4 }}
            />
            <Text type="regular" size={17} color={defaultColors.grayText}>
              {formatNumber(data.Population)} Population
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }, [data.Population, data.State, flagUrl, isSvg]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <MapView
        ref={mapViewRef}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        style={styles.container}>
        {polygonGeometry && renderGeometry(polygonGeometry)}
      </MapView>
      {renderBackButton}
      {renderCard}
    </View>
  );
};

export default Detail;
