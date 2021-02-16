import React, {useState} from 'react';
import {
  Text,
  Alert,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  BackHandler,
} from 'react-native';
import {GLogin} from '../components/GLogin';
import Colors from '../constants/Colors';
import Resolution from '../constants/ResolutionBreakpoint';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ResponsiveImage from 'react-native-responsive-image';
import {
  sFontName,
  sFontNameBold,
  sHimalayaFontName,
} from '../constants/CommonConfig';
import {ActivityIndicator} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {GoogleSignin} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeGoogleCreds} from '../store/actions/GLoginAction';
import {removeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import {
  removeGBDetails,
  removeJWTToken,
  storeJWTToken,
} from '../store/actions/GBDetailsAction';
import {useFocusEffect} from '@react-navigation/native';
// import {useNavigation} from '@react-navigation/native';

export const LoginScreen = (props) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
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

  // let navigation = useNavigation();
  const removeCompleteDetails = async () => {
    debugger;
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
      console.error(error);
      props.navigation.navigate('Login');
    }
  };

  axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      //console.log('Interceptor valid response', response);
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        //console.log("we hit 401");
        //history.go(0);
        //history.push('/Login');

        //Alert("Your session has expired. Please login again.");

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
        return;
      }
      return Promise.reject(error);
    },
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        {/*Values Coded*/}
        <ResponsiveImage
          initWidth="330"
          initHeight="320"
          source={require('../assets/CTALogo.png')}
          // PlaceholderContent={
          //   <ActivityIndicator
          //     //animating={true}
          //     size={Platform.OS === 'ios' ? 0 : 'large'}
          //   />
          // }
        />
      </View>
      <View style={styles.tibetanTextContainer}>
        <Text style={styles.tibetanTextComponent}>
          དྭང་བླངས་དཔྱ་དངུལ་དྲ་ངོར་འབུལ་བར་དགའ་བསུ་ཞུ།
        </Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerComponent}>Welcome to eChatrel</Text>
      </View>
      {/* <View style={styles.textContainer}>
        <Text style={styles.textComponent}>
          Your go-to resource for supporting the Tibetan Government.
        </Text>
      </View> */}
      <GLogin props={props}></GLogin>
      <View
        style={{
          ...styles.tibetanTextContainer,
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <Text style={{...styles.tibetanTextComponent, marginBottom: 0}}>
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginBottom: hp(7.5),
  },
  imgContainer: {
    marginTop: hp(5),
    marginBottom: hp(2.5),
  },
  headerContainer: {},
  headerComponent: {
    textAlign: 'center',
    fontSize: wp(8.25),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    color: Colors.white,
    marginBottom: hp(12.5),
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
  textContainer: {},
  textComponent: {
    textAlign: 'center',
    fontSize: wp(4.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    color: Colors.white,
    marginBottom: hp(7.75),
    lineHeight: hp(3.5),
    paddingHorizontal: wp(5),
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
  tibetanTextContainer: {},
  tibetanTextComponent: {
    textAlign: 'center',
    fontSize: Platform.OS === 'android' ? wp(5) : wp(7.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sHimalayaFontName,
    color: Colors.white,
    marginBottom: hp(3),
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
  ////FONT BOLD EG
  //fontWeight: Platform.OS==="android"?"normal":"bold",
  //fontFamily: Platform.OS==="android"?sFontNameBold:sFontName,
});
