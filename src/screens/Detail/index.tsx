import React, { useMemo } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useMap } from './_hooks';
import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { defaultColors } from '@/themes';
import IconFeather from 'react-native-vector-icons/Feather';
import { Pressable, Text } from '@/components';
import { useNavigation, useRoute } from '@react-navigation/core';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { formatNumber, isSvgImage, getStateFlagUrl } from '@/utils/helpers';
import { dataFlag, dataStates } from '@/constants';
import { SvgUri } from 'react-native-svg';
import { Image } from 'expo-image';

const statusBarHeight = getStatusBarHeight();

const Detail = () => {
  const { mapViewRef, initialRegion } = useMap();

  const navigation: any = useNavigation();

  const route = useRoute<any>();

  const data = route.params?.data;

  const flagUrl = getStateFlagUrl(data?.State, dataStates, dataFlag);
  const isSvg = isSvgImage(flagUrl || '');

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
        style={styles.container}
      />
      {renderBackButton}
      {renderCard}
    </View>
  );
};

export default Detail;
