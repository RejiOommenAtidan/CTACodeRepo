import React, {useState} from 'react';
import {
  Text,
  Alert,
  View,
  StyleSheet,
  Platform,
  BackHandler,
  Modal,
  ActivityIndicator,
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
  sFontName,
  sFontNameBold,
  sHimalayaFontName,
  sMappingURL,
  oActivityIndicatorStyle,
} from '../constants/CommonConfig';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {GoogleSignin} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeGoogleCreds} from '../store/actions/GLoginAction';
import {removeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import {useFocusEffect} from '@react-navigation/native';
import {
  removeGBDetails,
  removeJWTToken,
} from '../store/actions/GBDetailsAction';
import Resolution from '../constants/ResolutionBreakpoint';
import {WebView} from 'react-native-webview';

export const LoginScreen = (props) => {
  const [bShowWebView, setbShowWebView] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Exit App',
          'Do you want to exit?',
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

  // const [bLogoLoaded, setbLogoLoaded] = useState(false);
  const dispatch = useDispatch();
  let keysToRemove = ['oUserInfo', 'oGBInfo'];

  const removeCompleteDetails = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.multiRemove(keysToRemove, (err) => {
        dispatch(removeGoogleCreds);
        dispatch(removeGBDetails);
        dispatch(removeJWTToken);
        dispatch(removeCurrentGBDetails);
        props.navigation.navigate('Login');
      });
    } catch (error) {
      props.navigation.navigate('Login');
    }
  };

  axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        Alert.alert(
          'Session Timeout',
          'Your session has expired. Please login again.',
          [
            {
              text: 'Logout',
              onPress: () => removeCompleteDetails(),
              style: 'default',
            },
          ],
          {cancelable: false},
        );
        //return;
      }
      return Promise.reject(error);
    },
  );

  return (
    <View style={styles.mainContainer}>
      <Modal
        visible={bShowWebView}
        onRequestClose={() => setbShowWebView(false)}>
        <WebView
          cacheEnabled={false}
          pullToRefreshEnabled={true}
          source={{uri: sMappingURL}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          style={{marginTop: hp(3.5)}}
          renderLoading={() => (
            <ActivityIndicator
              size={Platform.OS === 'ios' ? 0 : 'large'}
              color={Colors.spinnerColor}
              animating={true}
              //hidesWhenStopped={true}
              style={oActivityIndicatorStyle}
            />
          )}
        />
      </Modal>
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
        {/* <Text
          style={{
            ...styles.textComponent,
            fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
            fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
            fontSize: wp(4.75),
            marginBottom: hp(1.25),
          }}>
          Map Google Account with Green Book
        </Text> */}
        <Text
          style={{
            textAlign: 'center',
          }}>
          <Text
            style={{
              ...styles.textComponent,
              fontSize: wp(4.25),
            }}>
            Update your Google Account by filling{' '}
          </Text>
          <Text
            style={{
              ...styles.textComponent,
              color: Colors.darkYellowFamilyPage,
              fontSize: wp(4.25),
              fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
              fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
              textDecorationLine: 'underline',
              textDecorationColor: Colors.darkYellowFamilyPage,
            }}
            onPress={() => {
              setbShowWebView(true);
              //Linking.openURL(sMappingURL);
            }}>
            this form
          </Text>
        </Text>
      </View>
      <View
        style={{
          ...styles.tibetanTextContainer,
          flex: 1,
          marginBottom: hp(1.75),
          justifyContent: 'flex-end',
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
    //flex: 1,
    // justifyContent: 'center',
    // alignSelf: 'center',
    flexGrow: 1,
    alignItems: 'center',
    marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
    marginVertical: hp(Resolution.nHeightMarginValueScreen),
  },
  imgContainer: {
    marginVertical: hp(1.25),
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
