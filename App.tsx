import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from '@/routes/RootNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PaperProvider } from 'react-native-paper';
import { store, persistor } from '@/redux/_store';
import { theme, settings } from '@/constants';
import { useFont } from '@/utils/hooks';

const MainApp = () => {
  const { loaded, error } = useFont();
  if (!loaded) {
    return null;
  }

  if (error) {
    console.error(error);
  }

  return (
    <Provider store={store}>
      <PaperProvider settings={settings} theme={theme}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

export default MainApp;
