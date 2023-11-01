import React from 'react';
import IconFeather from 'react-native-vector-icons/Feather';
import { dataStates } from '@/constants';
import { useNavigation } from '@react-navigation/core';
import { formatNumberData, calculateStateMetrics } from '@/utils/helpers';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

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

export const useHome = () => {
  const navigation: any = useNavigation();

  return {
    dataCard,
    navigation,
  };
};
