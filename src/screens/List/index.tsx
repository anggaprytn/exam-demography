import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { styles } from './styles';
import React from 'react';

const Home = () => {

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
    </View>
  );
};

export default Home;
