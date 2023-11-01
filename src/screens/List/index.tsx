import React, { useMemo, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { styles } from './styles';
import { Searchbar } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { dataFlag } from '@/constants';
import { formatNumber, isSvgImage, getStateFlagUrl } from '@/utils/helpers';
import { Pressable, Text } from '@/components';
import { Image } from 'expo-image';
import { SvgUri } from 'react-native-svg';
import IconFeather from 'react-native-vector-icons/Feather';
import { defaultColors } from '@/themes';
import { useList } from './hooks';

const List = () => {
  const {
    searchQuery,
    onChangeSearch,
    results,
    navigation,
    searchRef,
    dataStates,
  } = useList();

  const renderItem = useCallback(
    ({ item }: any) => {
      const flagUrl = getStateFlagUrl(item?.State, dataStates, dataFlag);
      const isSvg = isSvgImage(flagUrl || '');
      return (
        <Pressable
          onPress={() => navigation.navigate('Detail', { data: item })}
          style={styles.card}>
          <View style={styles.img}>
            {isSvg ? (
              <SvgUri uri={flagUrl} width={'100%'} height={'100%'} />
            ) : (
              <Image source={flagUrl} contentFit="contain" style={styles.img} />
            )}
          </View>
          <View style={styles.infoState}>
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
        data={searchQuery !== '' ? results : dataStates}
        renderItem={renderItem}
        keyExtractor={(_, idx: number) => idx.toString()}
        ListFooterComponent={renderFooter}
      />
    );
  }, [dataStates, renderFooter, renderItem, results, searchQuery]);

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

  const renderHeader = useMemo(() => {
    return (
      <View style={styles.header}>
        {renderBackButton}
        <Searchbar
          ref={searchRef}
          style={styles.searchBar}
          placeholder="Search here..."
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
    );
  }, [onChangeSearch, renderBackButton, searchQuery, searchRef]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        {renderHeader}
        {renderList}
      </View>
    </View>
  );
};

export default List;
