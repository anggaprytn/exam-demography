import React, { useState, useRef } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

type StateData = {
  'ID State': string;
  State: string;
  'ID Year': number;
  Year: string;
  Population: number;
  'Slug State': string;
};

type SearchCriteria = 'ID State' | 'State' | 'Slug State';

export const useList = () => {
  const navigation: any = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dataStates = useSelector(({ dataSlice }: any) => dataSlice.dataStates);

  function searchState(
    query: string,
    criteria: SearchCriteria = 'State',
  ): Array<StateData> {
    return dataStates.filter(state =>
      state[criteria].toLowerCase().includes(query.toLowerCase()),
    );
  }

  const route = useRoute<any>();

  const isSearch = route.params?.isSearch;

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  const searchRef = useRef<any>(null);

  useFocusEffect(() => {
    isSearch &&
      setTimeout(() => {
        searchRef.current?.focus();
      }, 1);
  });

  const results = searchState(searchQuery, 'State');
  return {
    searchState,
    onChangeSearch,
    results,
    navigation,
    searchRef,
    searchQuery,
    dataStates,
  };
};
