import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {sClientIDAndroid, sClientIDIOS} from '../constants/CommonConfig';
import {useSelector, useDispatch} from 'react-redux';
import {storeGoogleCreds} from '../store/actions/GLoginAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const GLogin = (props) => {
  const dispatch = useDispatch();
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const [user, setUser] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: sClientIDAndroid,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
      iosClientId: sClientIDIOS, // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    Platform.OS === 'android' ? isSignedIn() : null;

    // getUserDataFromAsnycStorage().then(data => {
    //   //console.info(data);
    //   let userInfo = data;
    //   if (userInfo) {
    //     setUser(userInfo);
    //     dispatch(storeGoogleCreds(userInfo));
    //     props.props.navigation.navigate("GBDetail");
    //   }
    // });
  }, []);

  // const getUserDataFromAsnycStorage = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('oUserInfo');
  //     console.info(jsonValue);
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     console.info(e);
  //   }
  // };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //Store User Info
      setUser(userInfo);
      //Store Google Creds
      dispatch(storeGoogleCreds(userInfo));

      const jsonUserInfoValue = JSON.stringify(userInfo);
      await AsyncStorage.setItem('oUserInfo', jsonUserInfoValue);

      //Navigate to GBDetail Screen
      props.props.navigation.navigate('GBDetail');
    } catch (error) {
      //console.info('Error Message: '+ error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //console.info('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        //alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //console.info('Play Services Not Available or Outdated');
      } else {
        //console.info('Some Other Error Happened');
      }
    }
  };

  //useEffect Call
  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.info('Please Sign in');
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      //Store User Info
      setUser(userInfo);
      //Store Google Creds
      dispatch(storeGoogleCreds(userInfo));

      const jsonUserInfoValue = JSON.stringify(userInfo);
      await AsyncStorage.setItem('oUserInfo', jsonUserInfoValue);

      //Navigate to GBDetail Screen
      props.props.navigation.navigate('GBDetail');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        //console.info('User has not signed in yet');
      } else {
        //console.info("Something went wrong. Unable to get user's info");
      }
    }
  };

  return (
    <View style={styles.gSignInContainer}>
      <GoogleSigninButton
        style={styles.gSignInComponent}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gSignInContainer: {
    marginVertical: hp(5),
    // alignItems: 'center',
    // flex: 1,
    // justifyContent: 'center',
  },
  gSignInComponent: {
    // height: Platform.OS === 'android' ? hp(5.75) : hp(4.75),
    // width: Platform.OS === 'android' ? wp(50) : wp(47.5),

    //Values Coded
    height: 48,
    width: 192,
  },
});
