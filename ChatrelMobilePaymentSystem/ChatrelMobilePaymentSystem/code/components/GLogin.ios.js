import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Platform, Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
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
  sDummyPhotoForiOS,
  sMobilePassphrase,
  sSignTypeApple,
  sSignTypeGoogle,
  sAttentionRequired,
  sRequestAccessForEmailID,
} from '../constants/CommonConfig';
import {useIsFocused} from '@react-navigation/native';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import {sFontName, sFontNameBold} from '../constants/CommonConfig';
import Colors from '../constants/Colors';
import {Button} from 'react-native-elements';
// import {decode as atob, decode, encode as btoa} from 'base-64';
// import jwt_decode from "jwt-decode";

export const GLogin = (props) => {
  const dispatch = useDispatch();
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const [user, setUser] = useState({});
  let sClientIDAndroidAPI = '';
  let sClientIDIOSAPI = '';
  const [bGoogleButton, setbGoogleButton] = useState(true);
  const [bRenderAppleButton, setbRenderAppleButton] = useState(false);
  const [oGlobalUserInfo, setoGlobalUserInfo] = useState(null);
  // var oGlobalUserInfo = {};
  const isFocused = useIsFocused();
  useEffect(() => {
    //AsyncStorage.clear();
    axios
      .post(
        `/ChatrelPayment/GetGoogleCredentialsForMobile?sMobilePassphrase=${sMobilePassphrase}`,
      )
      .then((resp) => {
        if (resp.status === 200) {
          // console.log(
          //   'Login Ping Pong Android: ' + resp.data.sGoogleClientIDAndroid,
          // );
          // console.log('Login Ping Pong iOS: ' + resp.data.sGoogleClientIDIOS);
          Platform.OS === 'android' ? isSignedIn() : null;

          appleAuth.isSupported
            ? setbRenderAppleButton(true)
            : setbRenderAppleButton(false);

          getUserDataFromAsnycStorage().then((data) => {
            //console.log(JSON.stringify(data));
            //Alert.alert('Async Storage Data: ', JSON.stringify(data));
            //debugger;
            setoGlobalUserInfo(data);
            //oGlobalUserInfo = data;
            sClientIDAndroidAPI = resp.data.sGoogleClientIDAndroid;
            sClientIDIOSAPI = resp.data.sGoogleClientIDIOS;
            setbGoogleButton(false);
            GoogleSignin.configure({
              webClientId: sClientIDAndroidAPI,
              offlineAccess: true,
              forceCodeForRefreshToken: true,
              iosClientId: sClientIDIOSAPI,
            });
          });
          // sClientIDAndroidAPI = resp.data.sGoogleClientIDAndroid;
          // sClientIDIOSAPI = resp.data.sGoogleClientIDIOS;
          // setbGoogleButton(false);
          // GoogleSignin.configure({
          //   webClientId: sClientIDAndroidAPI,
          //   offlineAccess: true,
          //   forceCodeForRefreshToken: true,
          //   iosClientId: sClientIDIOSAPI,
          // });
        }
      })
      .catch((error) => {
        console.log('Error ', error.response);
        console.log('Error Config', error.config);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  }, [isFocused]);

  const getUserDataFromAsnycStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('oUserInfoApple');
      console.info(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.info(e);
    }
  };

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('User Credentials have been Revoked');
    });
  }, [isFocused]);

  const onAppleButtonPress = async () => {
    try {
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      //Logic
      //Check for null for both email and fullName
      //if first time store in async and continue
      //else read from async and continue

      if (
        appleAuthRequestResponse.email !== null &&
        appleAuthRequestResponse.fullName.familyName !== null &&
        appleAuthRequestResponse.fullName.givenName !== null
      ) {
        //First Time
        //Store Every Thing in Async Storage

        let oiOSEmailNameUserInfo = {
          idToken: appleAuthRequestResponse.identityToken,
          serverAuthCode: '',
          scopes: [],
          user: {
            photo: sDummyPhotoForiOS,
            givenName: appleAuthRequestResponse.fullName.givenName,
            familyName: appleAuthRequestResponse.fullName.familyName,
            name: appleAuthRequestResponse.fullName,
            email: appleAuthRequestResponse.email,
            id: '',
          },
        };
        setoGlobalUserInfo(oiOSEmailNameUserInfo);
        //oGlobalUserInfo = oiOSEmailNameUserInfo;
        const jsonUserInfoValue = JSON.stringify(oiOSEmailNameUserInfo);
        await AsyncStorage.setItem('oUserInfoApple', jsonUserInfoValue);

        setUser(oiOSEmailNameUserInfo);
        //Store Google Creds
        dispatch(storeGoogleCreds(oiOSEmailNameUserInfo));
        dispatch(storeSignInType(sSignTypeApple));
        //Alert.alert('AR', 'Before Async Set Storage');
        props.props.navigation.navigate('GBDetail');
      }
      // const {
      //   email,
      //   // email_verified,
      //   // is_private_email,
      //   // sub,
      // } = jwt_decode(appleAuthRequestResponse.identityToken);

      // var base64Url = appleAuthRequestResponse.identityToken.split('.')[1];
      // var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      // var jsonPayload = decodeURIComponent(
      //   decode(base64)
      //     .split('')
      //     .map(function (c) {
      //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      //     })
      //     .join(''),
      // );
      // const jwtObject = JSON.parse(jsonPayload);
      // console.log(jwtObject);

      // const credentialState = await appleAuth.getCredentialStateForUser(
      //   appleAuthRequestResponse.user,
      // );

      // Alert.alert("Credential State",JSON.stringify(credentialState));
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      // const credentialState = await appleAuth.getCredentialStateForUser(
      //   appleAuthRequestResponse.user,
      // );

      ////use credentialState response to ensure the user is authenticated
      //if (credentialState === appleAuth.State.AUTHORIZED) {
      ////user is authenticated
      // Alert.alert(
      //   "Given Name",
      //   appleAuthRequestResponse.fullName.familyName,
      // );
      // console.log(
      //   'Authorization Code: ' + appleAuthRequestResponse.authorizationCode,
      // );
      // console.log(
      //   'Authorization Scopes: ' + appleAuthRequestResponse.authorizedScopes,
      // );
      // console.log(
      //   'Full Name: ' + JSON.stringify(appleAuthRequestResponse.fullName),
      // );
      // console.log(
      //   'Identity Token: ' + appleAuthRequestResponse.identityToken,
      // );
      // console.log('Nonce: ' + appleAuthRequestResponse.nonce);
      // console.log(
      //   'Real User Status: ' + appleAuthRequestResponse.realUserStatus,
      // );
      // console.log('State: ' + appleAuthRequestResponse.state);
      // console.log('User: ' + appleAuthRequestResponse.user);
      // console.log('Email: ' + appleAuthRequestResponse.email);
      //Alert.alert('CS', JSON.stringify(credentialState));
      //Alert.alert(appleAuthRequestResponse.email,oGlobalUserInfo.user.email);
      //debugger;
      // if (
      //   appleAuthRequestResponse.email === null &&
      //   appleAuthRequestResponse.fullName.familyName === null &&
      //   appleAuthRequestResponse.fullName.givenName === null &&
      //   oGlobalUserInfo?.user?.email === null
      // ) {

      //   Alert.alert(sAttentionRequired, sRequestAccessForEmailID);
      //   return;
      // }
      else {
        //Second Time

        let iOSUserInfo = {
          idToken: appleAuthRequestResponse.identityToken,
          serverAuthCode: '',
          scopes: [],
          user: {
            photo: sDummyPhotoForiOS,
            givenName: oGlobalUserInfo.user.givenName,
            familyName: oGlobalUserInfo.user.familyName,
            name:
              oGlobalUserInfo.user.givenName +
              ' ' +
              oGlobalUserInfo.user.familyName,
            email: oGlobalUserInfo.user.email,
            id: '',
          },
        };
        //Alert.alert('After iOSUserInfo', JSON.stringify(iOSUserInfo));

        setUser(iOSUserInfo);
        //Store Google Creds
        dispatch(storeGoogleCreds(iOSUserInfo));
        dispatch(storeSignInType(sSignTypeApple));
        //Alert.alert('AR', 'Before Async Set Storage');
        const jsonUserInfoValue = JSON.stringify(iOSUserInfo);
        //Clear before Storing

        AsyncStorage.clear();
        await AsyncStorage.setItem('oUserInfoApple', jsonUserInfoValue);
        //Alert.alert('AR', 'Before Nav to GBDetails');
        props.props.navigation.navigate('GBDetail');
        //}
      }
    } catch (err) {
      console.error(JSON.stringify(err));
      //Alert.alert('In Catch', JSON.stringify(err));
    }
  };

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
        {/* {Platform.OS === 'ios' && bRenderAppleButton && (
          <View style={styles.appleSignInContainer}>
            <AppleButton
              buttonStyle={AppleButton.Style.WHITE}
              buttonType={AppleButton.Type.SIGN_IN}
              style={styles.appleSignInComponent}
              onPress={onAppleButtonPress}
              //cornerRadius={10}
            />
          </View>
        )} */}
        {/* <GoogleSigninButton
          style={styles.gSignInComponent}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
          disabled={bGoogleButton}
        /> */}
        <Button
          disabled={bGoogleButton}
          title="Verify Your Identity"
          titleStyle={{
            fontStyle: 'normal',
            fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
            fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
            fontSize: wp(4),
            padding: hp(4),
            color: Colors.black,
          }}
          type={'solid'}
          onPress={signIn}
          buttonStyle={styles.iOSVerifyButtonComponent}
          disabledStyle={{
            borderColor: Colors.grey,
            backgroundColor: Colors.grey,
          }}
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
  appleSignInContainer: {
    marginVertical: hp(2.5),
  },
  appleSignInComponent: {
    width: 192,
    height: 48,
  },
  iOSVerifyButtonComponent: {
    backgroundColor: Colors.buttonYellow,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.buttonYellow,
  },
});
