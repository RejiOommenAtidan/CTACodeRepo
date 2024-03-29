import React from 'react';
import {
  Text,
  Alert,
  View,
  StyleSheet,
  Platform,
  BackHandler,
  Linking,
} from 'react-native';
import {GLogin} from '../components/GLogin';
import Colors from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ResponsiveImage from 'react-native-responsive-image';
import {
  sExitApp,
  sExitConfirmation,
  sFontName,
  sFontNameBold,
  sHimalayaFontName,
  sMappingURL,
  sSessionExpireLoginAgain,
  sSessionTimeout,
} from '../constants/CommonConfig';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {GoogleSignin} from '@react-native-community/google-signin';
import {removeGoogleCreds} from '../store/actions/GLoginAction';
import {removeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import {useFocusEffect} from '@react-navigation/native';
import {
  removeGBDetails,
  removeJWTToken,
} from '../store/actions/GBDetailsAction';
import Resolution from '../constants/ResolutionBreakpoint';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginScreen = (props) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          sExitApp,
          sExitConfirmation,
          [
            {
              text: 'No',
              onPress: () => true,
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => BackHandler.exitApp(),
            },
          ],
          {cancelable: true},
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const dispatch = useDispatch();
  let keysToRemove = ['oUserInfo', 'oGBInfo'];

  const removeCompleteDetails = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      //await AsyncStorage.multiRemove(keysToRemove, (err) => {
      dispatch(removeGoogleCreds);
      dispatch(removeGBDetails);
      dispatch(removeJWTToken);
      dispatch(removeCurrentGBDetails);
      props.navigation.navigate('Login');
      //});
    } catch (error) {
      props.navigation.navigate('Login');
    }
  };

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        //console.log(
        //'Token inside 401: ' + axios.defaults.headers.common['Authorization'],
        //);

        setTimeout(() => {
          Alert.alert(
            sSessionTimeout,
            sSessionExpireLoginAgain,
            [
              {
                text: 'Logout',
                onPress: () => removeCompleteDetails(),
                style: 'default',
              },
            ],
            {cancelable: false},
          );
        }, 1000);
        //return;
      }
      return Promise.reject(error);
    },
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        {/*Values Coded*/}
        <ResponsiveImage
          initWidth="340"
          initHeight="330"
          source={require('../assets/CTALogo.png')}
          // PlaceholderContent={
          //   <ActivityIndicator style={oActivityIndicatorStyle} />
          // }
        />
      </View>
      <View style={styles.tibetanTextContainer}>
        <Text style={styles.tibetanTextComponent}>
          དྭང་བླངས་དཔྱ་དངུལ་གྱི་དྲྭ་ཐོག་ཏུ་ཕེབས་པར་དགའ་བསུ་ཞུ།
        </Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerComponent}>Welcome to Chatrel Online</Text>
      </View>
      {/* <View style={styles.textContainer}>
        <Text style={styles.textComponent}>
          Your go-to resource for supporting the Tibetan Government.
        </Text>
      </View> */}
      <GLogin props={props}></GLogin>
      <View style={styles.textContainer}>
        <Text
          style={{
            textAlign: 'center',
          }}>
          <Text
            style={{
              ...styles.textComponent,
              fontSize: wp(4.15),
            }}>
            Update your Google Account by filling{' '}
          </Text>
          <Text
            style={{
              ...styles.textComponent,
              color: Colors.darkYellowFamilyPage,
              fontSize: wp(4.15),
              fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
              fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
              textDecorationLine: 'underline',
              textDecorationColor: Colors.darkYellowFamilyPage,
            }}
            onPress={() => {
              Linking.openURL(sMappingURL);
            }}>
            this form
          </Text>
        </Text>
      </View>
      <View
        style={{
          ...styles.tibetanTextContainer,
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: hp(1.75),
        }}>
        <Text style={styles.tibetanTextComponent}>
          བོད་མིའི་སྒྲིག་འཛུགས་དཔལ་འབྱོར་ལས་ཁུངས་ནས།
        </Text>
      </View>
    </View>
  );
};

export const LoginScreenOptions = (navData) => {
  return {
    headerShown: false,
    headerLeft: null,
    headerRight: null,
    headerBackTitleVisible: false,
    cardStyle: {backgroundColor: Colors.greenBG},
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flexGrow: 1,
    marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
    marginVertical: hp(Resolution.nHeightMarginValueScreen),
  },
  imgContainer: {
    marginVertical: hp(1.5),
  },
  tibetanTextContainer: {
    marginVertical: hp(1.25),
  },
  tibetanTextComponent: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: wp(7),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sHimalayaFontName,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  headerContainer: {
    marginVertical: hp(1.25),
  },
  headerComponent: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: wp(6.75),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textContainer: {
    marginVertical: hp(1.25),
  },
  textComponent: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: wp(4.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  ////FONT BOLD EG
  //fontWeight: Platform.OS==="android"?"normal":"bold",
  //fontFamily: Platform.OS==="android"?sFontNameBold:sFontName,
});
