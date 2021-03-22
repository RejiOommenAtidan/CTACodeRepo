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
  sDummyPhotoForiOS,
  sMobilePassphrase,
  sRequestAccessForEmailID,
  sSignTypeApple,
  sSignTypeGoogle,
} from '../constants/CommonConfig';
import {useIsFocused} from '@react-navigation/native';
// import jwt_decode from "jwt-decode";
// import {sFontName, sFontNameBold} from '../constants/CommonConfig';
// import Colors from '../constants/Colors';
// import {Button} from 'react-native-elements';
// import {sClientIDAndroid, sClientIDIOS} from '../constants/CommonConfig';

export const GLogin = (props) => {
  // const [sClientIDAndroidAPI, setsClientIDAndroidAPI] = useState('');
  // const [sClientIDIOSAPI, setsClientIDIOSAPI] = useState('');
  const dispatch = useDispatch();
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const [user, setUser] = useState({});
  let sClientIDAndroidAPI = '';
  let sClientIDIOSAPI = '';
  const [bGoogleButton, setbGoogleButton] = useState(true);
//   const [bRenderAppleButton, setbRenderAppleButton] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    axios
      .post(
        `/ChatrelPayment/GetGoogleCredentialsForMobile?sMobilePassphrase=${sMobilePassphrase}`,
      )
      .then((resp) => {
        if (resp.status === 200) {
          console.log(
            'Login Ping Pong Android: ' + resp.data.sGoogleClientIDAndroid,
          );
          console.log('Login Ping Pong iOS: ' + resp.data.sGoogleClientIDIOS);
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
        console.log('Error ', error.response);
        console.log('Error Config', error.config);
      })
      .then((release) => {
        //console.log(release); => udefined
      });

    Platform.OS === 'android' ? isSignedIn() : null;

    // appleAuth.isSupported
    //   ? setbRenderAppleButton(true)
    //   : setbRenderAppleButton(false);

    // getUserDataFromAsnycStorage().then(data => {
    //   //console.info(data);
    //   let userInfo = data;
    //   if (userInfo) {
    //     setUser(userInfo);
    //     dispatch(storeGoogleCreds(userInfo));
    //     props.props.navigation.navigate("GBDetail");
    //   }
    // });
  }, [isFocused]);

  // const getUserDataFromAsnycStorage = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('oUserInfo');
  //     console.info(jsonValue);
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     console.info(e);
  //   }
  // };

//   useEffect(() => {
//     // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
//     return appleAuth.onCredentialRevoked(async () => {
//       console.warn(
//         'If this function executes, User Credentials have been Revoked',
//       );
//     });
//   }, [isFocused]);

//   const onAppleButtonPress = async () => {
//     try {
//       //debugger;
//       // performs login request
//       const appleAuthRequestResponse = await appleAuth.performRequest({
//         requestedOperation: appleAuth.Operation.LOGIN,
//         requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
//       });

//       // const {
//       //   email,
//       //   // email_verified,
//       //   // is_private_email,
//       //   // sub,
//       // } = jwt_decode(appleAuthRequestResponse.identityToken);

//       // const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

//       // Alert.alert("Credential State",JSON.stringify(credentialState));
//       // get current authentication state for user
//       // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
//       // const credentialState = await appleAuth.getCredentialStateForUser(
//       //   appleAuthRequestResponse.user,
//       // );

//       // use credentialState response to ensure the user is authenticated
//       //if (credentialState === appleAuth.State.AUTHORIZED) {
//       // user is authenticated
//       // Alert.alert(
//       //   appleAuthRequestResponse.user,
//       //   appleAuthRequestResponse.authorizationCode,
//       // );
//       // console.log(
//       //   'Authorization Code: ' + appleAuthRequestResponse.authorizationCode,
//       // );
//       // console.log(
//       //   'Authorization Scopes: ' + appleAuthRequestResponse.authorizedScopes,
//       // );
//       // console.log(
//       //   'Full Name: ' + JSON.stringify(appleAuthRequestResponse.fullName),
//       // );
//       // console.log('Identity Token: ' + appleAuthRequestResponse.identityToken);
//       // console.log('Nonce: ' + appleAuthRequestResponse.nonce);
//       // console.log(
//       //   'Real User Status: ' + appleAuthRequestResponse.realUserStatus,
//       // );
//       // console.log('State: ' + appleAuthRequestResponse.state);
//       // console.log('User: ' + appleAuthRequestResponse.user);
//       // console.log('Email: ' + appleAuthRequestResponse.email);
//       if (appleAuthRequestResponse.email === null) {
//         Alert.alert(sAttentionRequired, sRequestAccessForEmailID);
//         return;
//       }
//       let iOSUserInfo = {
//         idToken: appleAuthRequestResponse.identityToken,
//         serverAuthCode: '',
//         scopes: [],
//         user: {
//           photo: sDummyPhotoForiOS,
//           givenName: appleAuthRequestResponse.fullName.givenName,
//           familyName: appleAuthRequestResponse.fullName.familyName,
//           name:
//             appleAuthRequestResponse.fullName.givenName +
//             ' ' +
//             appleAuthRequestResponse.fullName.familyName,
//           email: appleAuthRequestResponse.email,
//           id: '',
//         },
//       };
//       setUser(iOSUserInfo);
//       //Store Google Creds
//       dispatch(storeGoogleCreds(iOSUserInfo));
//       dispatch(storeSignInType(sSignTypeApple));
//       const jsonUserInfoValue = JSON.stringify(iOSUserInfo);
//       await AsyncStorage.setItem('oUserInfo', jsonUserInfoValue);
//       props.props.navigation.navigate('GBDetail');
//       // console.log(iOSUserInfo);
//     } catch (err) {
//       console.error(JSON.stringify(err));
//       // Alert.alert('In Error', JSON.stringify(err));
//     }
//   };

  const signIn = async () => {
    try {
      // debugger;
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log(JSON.stringify(userInfo));
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
//   appleSignInContainer: {
//     marginVertical: hp(2.5),
//   },
//   appleSignInComponent: {
//     width: 192,
//     height: 48,
//   },
});
