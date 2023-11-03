import React, { useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, FlatList } from 'react-native';
import { styles } from './styles';
import { defaultColors } from '@/themes';
import { Text, Pressable } from '@/components';
import IconFeather from 'react-native-vector-icons/Feather';
import { dataFlag } from '@/constants';
import { SvgUri } from 'react-native-svg';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import {
  formatNumber,
  isSvgImage,
  getStateFlagUrl,
  hexToRGBA,
} from '@/utils/helpers';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useHome } from './_hooks';

const Home = () => {
  const { dataCard, navigation, dataStates } = useHome();

  const renderTagline = useMemo(() => {
    return (
      <View style={styles.tagline}>
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
        onPress={() => navigation.navigate('List', { isSearch: true })}
        style={styles.search}>
        <IconMaterialIcons
          name="search"
          size={24}
          color={'#4B464D'}
          style={styles.mh16}
        />
        <Text type="regular" size={19} color={defaultColors.text}>
          Search here...
        </Text>
      </Pressable>
    );
  }, [navigation]);

  const renderItemData = useCallback(({ item }: any) => {
    return (
      <View style={styles.card}>
        <View
          style={[
            styles.icon,
            {
              backgroundColor: hexToRGBA(item.color, 0.15),
            },
          ]}>
          {item.icon}
        </View>
        <View style={styles.textCard}>
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
      <Pressable style={styles.containerCard}>
        <FlatList data={dataCard} renderItem={renderItemData} numColumns={2} />
      </Pressable>
    );
  }, [dataCard, renderItemData]);

  const renderText = useMemo(() => {
    return (
      <View style={styles.containerText}>
        <Text type="semibold" size={22} color={defaultColors.text}>
          All States
        </Text>
        <Pressable
          onPress={() => navigation.navigate('List', { isSearch: false })}
          style={styles.seeall}>
          <Text
            type="medium"
            size={18}
            color={defaultColors.primary}
            style={styles.mt1}>
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
          style={styles.cardList}>
          <View style={styles.flag}>
            {isSvg ? (
              <SvgUri uri={flagUrl} width={'100%'} height={'100%'} />
            ) : (
              <Image
                source={flagUrl}
                contentFit="contain"
                style={styles.flag}
              />
            )}
          </View>
          <View style={styles.containerName}>
            <Text
              type="semibold"
              size={21}
              color={defaultColors.text}
              numberOfLines={1}>
              {item?.State}
            </Text>
            <View style={styles.population}>
              <IconFeather
                name={'users'}
                size={18}
                color={defaultColors.grayText}
                style={styles.mr4}
              />
              <Text type="regular" size={17} color={defaultColors.grayText}>
                {formatNumber(item?.Population)} Population
              </Text>
            </View>
          </View>
        </Pressable>
      );
    },
    [dataStates, navigation],
  );

  const renderFooter = useCallback(() => {
    return <View style={styles.h16} />;
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
  }, [dataStates, renderFooter, renderItem]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
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
