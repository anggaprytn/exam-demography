import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './_types';
import { fadeTransition } from './transitions';

import Home from '@/screens/Home';
import Detail from '@/screens/Detail';
import List from '@/screens/List';

const Stack = createStackNavigator<RootStackParamList>();

const ScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          ...fadeTransition,
        }}
      />
      <Stack.Screen
        name="List"
        component={List}
        options={{
          ...fadeTransition,
        }}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  return <ScreenStack />;
};

export default RootNavigator;
