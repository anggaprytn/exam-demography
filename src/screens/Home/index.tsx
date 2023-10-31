import React, { useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView } from 'react-native';
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
import { formatNumber, isSvgImage, getStateFlagUrl } from '@/utils/helpers';

const statusBarHeight = getStatusBarHeight();

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
        style={{
          width: wp(100) - 32,
          backgroundColor: 'pink',
          height: 50,
          marginHorizontal: 16,
          marginTop: 16,
          borderRadius: 10,
        }}
      />
    );
  }, []);

  const renderCard = useMemo(() => {
    return (
      <>
        <Pressable
          style={{
            width: wp(100) - 32,
            backgroundColor: 'pink',
            height: 100,
            marginHorizontal: 16,
            marginTop: 16,
            borderRadius: 10,
          }}></Pressable>
        <Pressable
          style={{
            width: wp(100) - 32,
            marginHorizontal: 16,
            marginTop: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Pressable
            style={{
              width: wp(50) - 16 - 8,
              backgroundColor: 'orange',
              height: 100,
              borderRadius: 10,
            }}></Pressable>
          <Pressable
            style={{
              width: wp(50) - 16 - 8,
              backgroundColor: 'orange',
              height: 100,
              borderRadius: 10,
            }}></Pressable>
        </Pressable>
      </>
    );
  }, []);

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
