import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
import { MainNavigator } from './code/navigation/MainNavigator';
import { Provider, useSelector } from 'react-redux';
import { store } from './code/store/configureStore';
import { sAPIBASEURL } from './code/constants/CommonConfig';
import { NavigationContainer } from '@react-navigation/native';

const AppWrapper = () => {
  return (
    <Provider store={store}><App></App></Provider>
  )
};

const App: () => React$Node = () => {
  axios.defaults.baseURL = sAPIBASEURL;
  const sJwtToken = useSelector((state) => state.GBDetailsReducer.sJwtToken);
  if (sJwtToken !== null) {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${sJwtToken}`;
  }
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      {/*<ScrollView>*/}
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      {/*</ScrollView>*/}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default AppWrapper;
