import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {sClientIDAndroid} from '../constants/CommonConfig';
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
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      //iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    isSignedIn();

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

  const getUserDataFromAsnycStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('oUserInfo');
      console.info(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.info(e);
    }
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.info(userInfo.user.email);
      // console.info(userInfo.user.givenName);
      // console.info(userInfo.user.familyName);
      // console.info(userInfo.user.name);//full name by google api
      // console.info(userInfo.user.photo);
      setUser(userInfo);
      dispatch(storeGoogleCreds(userInfo));
      try {
        const jsonUserInfoValue = JSON.stringify(userInfo);
        await AsyncStorage.setItem('oUserInfo', jsonUserInfoValue);
      } catch (e) {
        console.info(e);
      }
      props.props.navigation.navigate('GBDetail');
    } catch (error) {
      console.info('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.info('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.info('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.info('Play Services Not Available or Outdated');
      } else {
        console.info('Some Other Error Happened');
      }
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.info('Please Login');
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUser(userInfo);
      dispatch(storeGoogleCreds(userInfo));
      try {
        const jsonUserInfoValue = JSON.stringify(userInfo);
        await AsyncStorage.setItem('oUserInfo', jsonUserInfoValue);
      } catch (e) {
        console.info(e);
      }
      props.props.navigation.navigate('GBDetail');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.info('User has not signed in yet');
      } else {
        console.info("Something went wrong. Unable to get user's info");
      }
    }
  };

  // const signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     setUser({}); // Remember to remove the user from your app's state as well
  //     props.props.navigation.navigate({
  //       routeName: 'Login'
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  gSignInComponent: {
    width: wp(45),
    height: hp(5.25),
  },
});
