import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { styles } from './styles';
import React from 'react';

const List = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
    </View>
  );
};

export default List;
