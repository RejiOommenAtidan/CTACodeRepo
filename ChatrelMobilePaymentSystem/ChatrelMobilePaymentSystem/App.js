import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {MainNavigator} from './code/navigation/MainNavigator';
import {store} from './code/store/configureStore';
import {NavigationContainer} from '@react-navigation/native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';
import HandleNotifications from './code/components/HandleNotifications';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <App />
        <HandleNotifications />
      </RootSiblingParent>
    </Provider>
  );
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default AppWrapper;
