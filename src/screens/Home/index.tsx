import React, { useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, FlatList } from 'react-native';
import { styles } from './styles';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { defaultColors } from '@/themes';
import { Text, Pressable } from '@/components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import IconFeather from 'react-native-vector-icons/Feather';
import { dataFlag, dataStates } from '@/constants';
import { SvgUri } from 'react-native-svg';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/core';
import {
  formatNumber,
  isSvgImage,
  getStateFlagUrl,
  hexToRGBA,
} from '@/utils/helpers';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const statusBarHeight = getStatusBarHeight();

const calculateStateMetrics = (data: StateData[]) => {
  const totalStates = data.length;
  const totalPopulation = data.reduce((acc, curr) => acc + curr.Population, 0);

  const sortedPopulations = data
    .map(item => item.Population)
    .sort((a, b) => a - b);
  const mid = Math.floor(sortedPopulations.length / 2);

  const medianPopulation =
    sortedPopulations.length % 2 !== 0
      ? sortedPopulations[mid]
      : (sortedPopulations[mid - 1] + sortedPopulations[mid]) / 2;

  const avgPopulation = totalPopulation / totalStates;

  return {
    totalStates,
    totalPopulation,
    medianPopulation,
    avgPopulation,
  };
};

const result = calculateStateMetrics(dataStates);

const formatNumberData = (num: number): string => {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(1) + 'T';
  }
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toString();
};

const dataCard = [
  {
    name: 'Total States',
    value: result?.totalStates,
    color: '#4CAF50',
    icon: <IconIonicons name="map-outline" size={22} color={'#4CAF50'} />,
  },
  {
    name: 'Total Population',
    value: formatNumberData(result?.totalPopulation),
    color: '#FF9800',
    icon: <IconFeather name={'users'} size={21} color={'#FF9800'} />,
  },
  {
    name: 'Median Population',
    value: formatNumberData(result?.medianPopulation),
    color: '#2196F3',
    icon: <IconAntDesign name="barschart" size={24} color={'#2196F3'} />,
  },
  {
    name: 'Avg. Population',
    value: formatNumberData(result?.avgPopulation),
    color: '#9C27B0',
    icon: <IconAntDesign name="linechart" size={21} color={'#9C27B0'} />,
  },
];

type StateData = {
  'ID State': string;
  State: string;
  'ID Year': number;
  Year: string;
  Population: number;
  'Slug State': string;
};

const Home = () => {
  const navigation: any = useNavigation();

  const renderTagline = useMemo(() => {
    return (
      <View style={{ width: wp(100), paddingHorizontal: 16, marginTop: 16 }}>
        <Text type="medium" size={25} color={defaultColors.text}>
          The{' '}
          <Text type="medium" size={25} color={defaultColors.primary}>
            United States
          </Text>{' '}
          at Your Fingertips
        </Text>
      </View>
    );
  }, []);

  const renderSearchBar = useMemo(() => {
    return (
      <Pressable
        onPress={() => navigation.navigate('List')}
        style={{
          width: wp(100) - 32,
          backgroundColor: '#EFE7F6',
          height: 55,
          marginHorizontal: 16,
          marginTop: 16,
          borderRadius: 55 / 2,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <IconMaterialIcons
          name="search"
          size={24}
          color={'#4B464D'}
          style={{ marginHorizontal: 16 }}
        />
        <Text type="regular" size={19} color={defaultColors.text}>
          Search here...
        </Text>
      </Pressable>
    );
  }, [navigation]);

  const renderItemData = useCallback(({ item }: any) => {
    return (
      <View
        style={{
          width: wp(50) - 32,
          paddingTop: 16 + 8,
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 16,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            height: 40,
            width: 40,
            backgroundColor: hexToRGBA(item.color, 0.15),
            borderRadius: 40 / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {item.icon}
        </View>
        <View
          style={{
            marginLeft: 12,
            width: wp(50) - 40 - 32 - 12,
          }}>
          <Text type="semibold" size={20} color={defaultColors.text}>
            {item.value}
          </Text>
          <Text type="regular" size={15} color={defaultColors.grayText}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  }, []);

  const renderCard = useMemo(() => {
    return (
      <Pressable
        style={{
          elevation: 2,
          backgroundColor: defaultColors.white,
          width: wp(100) - 32,
          marginHorizontal: 16,
          marginTop: 16,
          borderRadius: 10,
          overflow: 'hidden',
          paddingBottom: 16 + 8,
        }}>
        <FlatList data={dataCard} renderItem={renderItemData} numColumns={2} />
      </Pressable>
    );
  }, [renderItemData]);

  const renderText = useMemo(() => {
    return (
      <View
        style={{
          width: wp(100),
          paddingHorizontal: 16,
          marginTop: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text type="semibold" size={22} color={defaultColors.text}>
          All States
        </Text>
        <Pressable onPress={() => navigation.navigate('List')}>
          <Text type="regular" size={18} color={defaultColors.grayText}>
            see all
          </Text>
        </Pressable>
      </View>
    );
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: any) => {
      const flagUrl = getStateFlagUrl(item?.State, dataStates, dataFlag);
      const isSvg = isSvgImage(flagUrl || '');
      return (
        <Pressable
          onPress={() => navigation.navigate('Detail', { data: item })}
          style={{
            height: 68 + 24,
            width: wp(100) - 32,
            paddingHorizontal: 8 + 4,
            paddingVertical: 8 + 4,
            backgroundColor: 'white',
            marginHorizontal: 16,
            marginTop: 16,
            borderRadius: 10,
            flexDirection: 'row',
            elevation: 2,
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
              {item?.State}
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
                {formatNumber(item?.Population)} Population
              </Text>
            </View>
          </View>
        </Pressable>
      );
    },
    [navigation],
  );

  const renderFooter = useCallback(() => {
    return <View style={{ height: 16 }} />;
  }, []);

  const renderList = useMemo(() => {
    return (
      <FlashList
        estimatedItemSize={100}
        data={dataStates}
        renderItem={renderItem}
        keyExtractor={(_, idx: number) => idx.toString()}
        ListFooterComponent={renderFooter}
      />
    );
  }, [renderFooter, renderItem]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: defaultColors.screenBackground,
          marginTop: statusBarHeight,
        }}>
        {renderTagline}
        {renderSearchBar}
        {renderCard}
        {renderText}
        {renderList}
      </ScrollView>
    </View>
  );
};

export default Home;
