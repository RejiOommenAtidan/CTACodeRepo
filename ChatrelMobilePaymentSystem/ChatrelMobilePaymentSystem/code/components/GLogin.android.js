import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Platform, Alert} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {useSelector, useDispatch} from 'react-redux';
import {storeGoogleCreds} from '../store/actions/GLoginAction';
import {storeSignInType} from '../store/actions/SignInTypeAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {
  sAttentionRequired,
  sMobilePassphrase,
  sSignTypeGoogle,
  sSomethingWentWrongPleaseTryAgainLater,
} from '../constants/CommonConfig';
import {useIsFocused} from '@react-navigation/native';

export const GLogin = (props) => {
  const dispatch = useDispatch();
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const [user, setUser] = useState({});
  let sClientIDAndroidAPI = '';
  let sClientIDIOSAPI = '';
  const [bGoogleButton, setbGoogleButton] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    axios
      .post(
        `/ChatrelPayment/GetGoogleCredentialsForMobile?sMobilePassphrase=${sMobilePassphrase}`,
      )
      .then((resp) => {
        if (resp.status === 200) {
          sClientIDAndroidAPI = resp.data.sGoogleClientIDAndroid;
          sClientIDIOSAPI = resp.data.sGoogleClientIDIOS;
          setbGoogleButton(false);
          GoogleSignin.configure({
            webClientId: sClientIDAndroidAPI,
            offlineAccess: true,
            forceCodeForRefreshToken: true,
            iosClientId: sClientIDIOSAPI,
          });
        }
      })
      .catch((error) => {
        setTimeout(() => {
          Alert.alert(
            sAttentionRequired,
            sSomethingWentWrongPleaseTryAgainLater,
            [
              {
                text: 'Ok',
                onPress: () => true,
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }, 1000);
      });

    Platform.OS === 'android' ? isSignedIn() : null;
  }, [isFocused]);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //Store User Info
      setUser(userInfo);
      //Store Google Creds
      dispatch(storeGoogleCreds(userInfo));
      dispatch(storeSignInType(sSignTypeGoogle));
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
      dispatch(storeSignInType(sSignTypeGoogle));
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
    <View>
      <View style={styles.gSignInContainer}>
        <GoogleSigninButton
          style={styles.gSignInComponent}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          disabled={bGoogleButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gSignInContainer: {
    marginVertical: hp(5),
  },
  gSignInComponent: {
    // height: Platform.OS === 'android' ? hp(5.75) : hp(4.75),
    // width: Platform.OS === 'android' ? wp(50) : wp(47.5),

    //Values Coded
    height: 48,
    width: 192,
  },
});
