import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, Platform, Alert} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import axios from 'axios';
import {MainNavigator} from './code/navigation/MainNavigator';
import {store} from './code/store/configureStore';
import {sAPIBASEURL} from './code/constants/CommonConfig';
import {NavigationContainer} from '@react-navigation/native';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeGoogleCreds} from './code/store/actions/GLoginAction';
import {removeCurrentGBDetails} from './code/store/actions/CurrentGBDetailsAction';
import {
  removeGBDetails,
  removeJWTToken,
  storeJWTToken,
} from './code/store/actions/GBDetailsAction';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <App></App>
      </RootSiblingParent>
    </Provider>
  );
};

const App: () => React$Node = () => {
  // const dispatch = useDispatch();
  // let keysToRemove = ['oUserInfo', 'oGBInfo'];
  // let navigation = useNavigation();
  // axios.defaults.baseURL = sAPIBASEURL;
  // const [sessionTimeout, setSessionTimeout] = React.useState(false);
  // const [timerId, setTimerId] = React.useState(null);
  // const sJwtToken = useSelector((state) => state.GBDetailsReducer.sJwtToken);
  // if (
  //   sJwtToken?.sJwtToken !== null &&
  //   sJwtToken?.sJwtToken !== undefined &&
  //   sJwtToken?.sJwtToken !== ''
  // ) {
  //   let oldToken = axios.defaults.headers.common['Authorization'];
  //   axios.defaults.headers.common[
  //     'Authorization'
  //   ] = `Bearer ${sJwtToken.sJwtToken}`;

  //   // if (oSession !== null)
  //   // {
  //   if (!sJwtToken.bSession) {
  //     console.log('bSession');
  //     setSessionTimeout(true);
  //   }

  //   console.log('old', oldToken);
  //   console.log('new', 'Bearer ' + sJwtToken.sJwtToken);
  //   axios.defaults.headers.common['Authorization'] =
  //     'Bearer ' + sJwtToken.sJwtToken;
  //   debugger;
  //   if (oldToken !== 'Bearer ' + sJwtToken.sJwtToken) {
  //     console.log('Timer Reset', timerId);

  //     var base64Url = sJwtToken.sJwtToken.split('.')[1];
  //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //     var jsonPayload = decodeURIComponent(
  //       atob(base64)
  //         .split('')
  //         .map(function (c) {
  //           return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //         })
  //         .join(''),
  //     );
  //     const jwtObject = JSON.parse(jsonPayload);
  //     //console.log('JWT Token:',JSON.parse(jsonPayload));
  //     if (timerId) {
  //       clearTimeout(timerId);
  //     }

  //     console.log(timerId);

  //     // //console.log(jwtObject.exp-Date.now());
  //     // console.log(Math.floor(Date.now() / 1000)-jwtObject.exp);
  //     // console.log(Date.now() -(jwtObject.exp * 1000));
  //     const timer = () =>
  //       setTimeout(() => {
  //         setSessionTimeout(true);
  //         console.log('Logged Out After 1 Minute');
  //         Alert.alert(
  //           'Session Timeout',
  //           'Your session has expired. Please login again.',
  //           [
  //             {
  //               text: 'Ok',
  //               onPress: () => true(),
  //               style: 'default',
  //             },
  //           ],
  //           {cancelable: false},
  //         );
  //         // }, jwtObject.exp * 1000 - Date.now());
  //       }, 1000 * 60);
  //     setTimerId(timer());
  //   }
  //   console.log('Token changed:', sJwtToken.sJwtToken);
  // }

  // const removeCompleteDetails = async () => {
  //   debugger;
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     await AsyncStorage.multiRemove(keysToRemove, (err) => {
  //       dispatch(removeGoogleCreds);
  //       dispatch(removeGBDetails);
  //       dispatch(removeJWTToken);
  //       dispatch(removeCurrentGBDetails);
  //       navigation.navigate('Login');
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     navigation.navigate('Login');
  //   }
  // };

  // axios.interceptors.response.use(
  //   (response) => {
  //     // Any status code that lie within the range of 2xx cause this function to trigger
  //     // Do something with response data
  //     console.log('Interceptor valid response', response);
  //     return response;
  //   },
  //   (error) => {
  //     // Any status codes that falls outside the range of 2xx cause this function to trigger
  //     // Do something with response error
  //     if (error.response.status === 401) {
  //       //console.log("we hit 401");
  //       //history.go(0);
  //       //history.push('/Login');

  //       //Alert("Your session has expired. Please login again.");

  //       Alert.alert(
  //         'Session Timeout',
  //         'Your session has expired. Please login again.',
  //         [
  //           {
  //             text: 'Ok',
  //             onPress: () => removeCompleteDetails(),
  //             style: 'default',
  //           },
  //         ],
  //         {cancelable: false},
  //       );
  //       return;
  //     }
  //     return Promise.reject(error);
  //   },
  // );

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
  // scrollView: {
  //   backgroundColor: Colors.lighter,
  // },
  // engine: {
  //   position: 'absolute',
  //   right: 0,
  // },
  // body: {
  //   backgroundColor: Colors.white,
  // },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  //   color: Colors.black,
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.dark,
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
});

export default AppWrapper;
