import React, { useState, useMemo, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { styles } from './styles';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { FlashList } from '@shopify/flash-list';
import { dataFlag, dataStates } from '@/constants';
import { formatNumber, isSvgImage, getStateFlagUrl } from '@/utils/helpers';
import { Pressable, Text } from '@/components';
import { Image } from 'expo-image';
import { SvgUri } from 'react-native-svg';
import IconFeather from 'react-native-vector-icons/Feather';
import { defaultColors } from '@/themes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const statusBarHeight = getStatusBarHeight();

const List = () => {
  const navigation: any = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => setSearchQuery(query);

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
      <StatusBar style="dark" />
      <View
        style={{
          flex: 1,
          marginTop: statusBarHeight,
        }}>
        <Searchbar
          style={{ marginHorizontal: 16, marginVertical: 16 }}
          placeholder="Search here"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        {renderList}
      </View>
    </View>
  );
};

export default List;
