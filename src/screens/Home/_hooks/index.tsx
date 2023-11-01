import React, { useCallback, useEffect } from 'react';
import IconFeather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';
import { formatNumberData, calculateStateMetrics } from '@/utils/helpers';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { useRequest } from '@/utils/hooks';
import { store } from '@/redux/_store';
import { setDataStates } from '@/redux/_reducers/dataSlice';

export const useHome = () => {
  const navigation: any = useNavigation();

  const dataStates = useSelector(({ dataSlice }: any) => dataSlice.dataStates);

  const result = calculateStateMetrics(dataStates);

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

  const request = useRequest();

  const fetchData = useCallback(async () => {
    try {
      const res = await request({
        method: 'get',
        endpoint:
          'https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest',
      });

      if (res) {
        store.dispatch(setDataStates(res.data));
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [request]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    dataCard,
    navigation,
    dataStates,
  };
};
