import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Switch,
  BackHandler,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { sDateFormatDatePicker } from '../constants/CommonConfig';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { storeGBDetails, storeJWTToken } from '../store/actions/GBDetailsAction';
import { storeCurrentGBDetails } from '../store/actions/CurrentGBDetailsAction';
import Colors from '../constants/Colors';
import Resolution from '../constants/ResolutionBreakpoint';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { removeGoogleCreds } from '../store/actions/GLoginAction';
import { removeCurrentGBDetails } from '../store/actions/CurrentGBDetailsAction';
import { removeGBDetails } from '../store/actions/GBDetailsAction';
import { useForm, Controller } from 'react-hook-form';
import {
  errorComponent,
  errorContainer,
  sFontName,
  sFontNameBold,
  oActivityIndicatorStyle,
} from '../constants/CommonConfig';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

export const GBDetailScreen = (props) => {


  useEffect(() => {
    if (isFocused) {
      BackHandler.addEventListener('hardwareBackPress', () => true);

      // getUserDataFromAsnycStorage().then(oUserInfo => {
      //   if (oUserInfo) {
      //     getGBDataFromAsnycStorage().then(oGBInfo => {
      //       if (oGBInfo) {
      //         let oUserCompleteDetails = {...oUserInfo,...oGBInfo}
      //         verifyAllDetails(oUserCompleteDetails);
      //       }
      //     });
      //   }
      // });


    }
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
    };
  }, [isFocused]);

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () => true);

  //   // getUserDataFromAsnycStorage().then(oUserInfo => {
  //   //   if (oUserInfo) {
  //   //     getGBDataFromAsnycStorage().then(oGBInfo => {
  //   //       if (oGBInfo) {
  //   //         let oUserCompleteDetails = {...oUserInfo,...oGBInfo}
  //   //         verifyAllDetails(oUserCompleteDetails);
  //   //       }
  //   //     });
  //   //   }
  //   // });

  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', () => true);
  //   };
  // }, []);

  // const getGBDataFromAsnycStorage = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('oGBInfo');
  //     console.info(jsonValue);
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     console.info(e);
  //   }
  // };

  // const getUserDataFromAsnycStorage = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('oUserInfo');
  //     console.info(jsonValue);
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     console.info(e);
  //   }
  // };

  // const verifyAllDetails = (oUserCompleteDetails) => {
  //   axios
  //     .post('/ChatrelPayment/VerifyUser', oUserCompleteDetails)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         //TODO: Make Set State calls
  //         props.navigation.navigate('Home');
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         // Not 2xx
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         console.log(error.response.headers);
  //       } else if (error.request) {
  //         console.log(error.request);
  //       } else {
  //         console.log('Error', error.message);
  //       }
  //     });
  // };
  const isFocused = useIsFocused();
  const { control, handleSubmit, errors } = useForm();
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const dispatch = useDispatch();
  let keysToRemove = ['oUserInfo', 'oGBInfo'];
  const navigation = useNavigation();
  const [sGBID, setsGBID] = useState('');
  const [bShowGBID, setbShowGBID] = useState(true);
  const [dtDOB, setdtDOB] = useState(null);
  const dtToday = Moment().format(sDateFormatDatePicker);
  const [bLoader, setbLoader] = useState(false);
  const removeCompleteDetailsAndNavigateToLogin = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.multiRemove(keysToRemove, (err) => {
        dispatch(removeGoogleCreds);
        dispatch(removeGBDetails);
        dispatch(removeCurrentGBDetails);
        navigation.navigate('Login');
      });
    } catch (error) {
      console.error(error);
      navigation.navigate('Login');
    }
  };
  const handleVerifyDetailsPress = async () => {
    setbLoader(true);

    let oGBDetails = {
      sGBID: sGBID,
      dtDOB: dtDOB,
    };

    let oAPI = {
      sGBID: sGBID,
      dtDOB: dtDOB,
      // sFirstName: oGoogle.user?.givenName,
      // sLastName: oGoogle.user?.familyName,
      sEmail: oGoogle.user?.email,
      code: oGoogle.idToken,
    };

    console.log(oGBDetails);
    console.log(oAPI);

    axios
      .post('User/AuthenticateGBID', oAPI)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.result == 'Verified') {
            console.log(response.data.sJwtToken)
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${response.data.sJwtToken}`;
            dispatch(storeJWTToken(response.data.sJwtToken));
            dispatch(storeGBDetails(oGBDetails));
            dispatch(storeCurrentGBDetails(oGBDetails));
            try {
              const jsonGBInfoValue = JSON.stringify(oGBDetails);
              AsyncStorage.setItem('oGBInfo', jsonGBInfoValue);
            } catch (e) {
              console.info(e);
            }
            setbLoader(false);
            props.navigation.navigate('Home');
          } else {
            setbLoader(false);
            Alert.alert(
              'Verification failed!',
              "The entered details didn't match our database. Please try again.",
              [
                {
                  text: 'Ok',
                  onPress: () => true,
                  style: 'cancel',
                },
                {
                  text: 'Logout',
                  onPress: () => removeCompleteDetailsAndNavigateToLogin(),
                },
              ],
              { cancelable: false },
            );
          }
        }
      })
      .catch((error) => {
        //debugger;
        // if (error.response) {
        //   // Not 2xx
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // } else if (error.request) {
        //   console.log(error.request);
        // } else {
        //   console.log('Error', error.message);
        // }

        setbLoader(false);
        Alert.alert(
          'Verification failed!',
          "The entered details didn't match our database. Please try again.",
          [
            {
              text: 'Ok',
              onPress: () => true,
              style: 'cancel',
            },
            {
              text: 'Logout',
              onPress: () => removeCompleteDetailsAndNavigateToLogin(),
            },
          ],
          { cancelable: false },
        );
        console.info(error.message);
      });
  };

  useEffect(() => {
    if (isFocused) {
      setsGBID("");
      setdtDOB(null);
    }
  }, [isFocused]);

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={styles.imagebackgroundComponent}
      imageStyle={
        {
          //backgroundColor: 'rgba(0,0,0,0.4)'
          // backfaceVisibility:"hidden",
          // backgroundColor:Colors.white,
          // opacity:0.5
        }
      }>
      {/* <LinearGradient
        //style={styles.linearGradient}
        colors={[Colors.white, Colors.white]}
        //start={{ x: 0.5, y: 0.5 }}
      > */}
      {bLoader && (
        <ActivityIndicator
          size={Platform.OS === 'ios' ? 0 : 'large'}
          color={Colors.spinnerColor}
          animating={true}
          //hidesWhenStopped={true}
          style={{
            ...oActivityIndicatorStyle,
            backgroundColor: Colors.black,
            opacity: 0.5,
          }}
        />
      )}

      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerComponent}>
            Great! Thanks for logging in through Google.{'\n'}Just one more step
            now.
          </Text>
        </View>
        {/*<View style={styles.textContainer}>
            <Text style={styles.textComponent}>All fields are Mandatory</Text>
  </View>*/}
        {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
        <View style={styles.gbidContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <Input
                //label="Enter GBID"
                placeholder={'Green Book Number*'}
                placeholderTextColor={Colors.grey}
                //autoFocus={true}
                autoCompleteType={'off'}
                autoCorrect={false}
                clearButtonMode={'while-editing'}
                //secureTextEntry={!bShowGBID}
                keyboardType={'number-pad'}
                keyboardAppearance={'default'}
                disableFullscreenUI={false}
                maxLength={7}
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                  setsGBID(value);
                }}
                value={sGBID}
                style={styles.gbidComponent}
              />
            )}
            name="name_nGBID"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.name_nGBID && (
            <View
              style={{
                ...errorContainer,
                marginLeft: wp(2),
              }}>
              <Text style={errorComponent}>
                Please enter Green Book Number.
              </Text>
            </View>
          )}
          {/*<View style={styles.showGBIDContainer}>
        <Switch
          style={styles.showGBIDComponent}
          onValueChange={() => { setbShowGBID(!bShowGBID) }}
          value={bShowGBID}
        />
        <Text>Show/Hide GBID</Text>
      </View>*/}
        </View>
        <View style={styles.dobContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <DatePicker
                showIcon={false}
                useNativeDriver={true}
                androidMode={'calendar'}
                style={styles.dobComponent}
                date={dtDOB}
                mode="date"
                placeholder="Date of Birth*"
                //placeholderTextColor={Colors.grey}
                format={sDateFormatDatePicker}
                maxDate={dtToday}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    borderWidth: 0,
                    borderStyle: null,
                    height: 0,
                    width: 0,
                  },
                  placeholderText: {
                    color: Colors.grey,
                    fontSize:
                      Dimensions.get('window').width <
                        Resolution.nWidthBreakpoint
                        ? 12
                        : 20,
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: sFontName,
                  },
                  dateText: {
                    //textAlign: 'left',
                    color: Colors.white,
                    fontSize:
                      Dimensions.get('window').width <
                        Resolution.nWidthBreakpoint
                        ? 12
                        : 20,
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: sFontName,
                  },
                  // dateIcon: {
                  //   width:0,
                  //   height:0,
                  //position: 'relative',
                  //left: 0,
                  //top:
                  //Dimensions.get('window').height <
                  //Resolution.nHeightBreakpoint
                  //? 2.4
                  //: 4,
                  // marginLeft: 0,
                  //},
                  dateInput: {
                    flexGrow: 1,
                    alignItems: 'flex-start',
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    borderTopWidth: 0,
                    marginLeft: wp(2.75),
                  },
                }}
                onBlur={onBlur}
                onDateChange={(date) => {
                  onChange(date);
                  setdtDOB(date);
                }}
              />
            )}
            name="name_dtDOB"
            rules={{ required: true }}
            defaultValue=""
          />
        </View>
        {errors.name_dtDOB && (
          <View
            style={{
              ...errorContainer,
              marginLeft: wp(8),
            }}>
            <Text style={errorComponent}>Please enter Date of Birth.</Text>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.buttonComponent}
            title="VERIFY"
            titleStyle={{
              color: Colors.black,
              //fontWeight: 'bold',
              // fontFamily: sFontName,
              // fontWeight: 'normal',
              fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
              fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
              //fontStyle: 'normal',
              //fontWeight: 'normal',
              textAlign: 'center',
            }}
            onPress={handleSubmit(handleVerifyDetailsPress)}
          />
        </View>
        {/*</form>*/}
        <View>
          <Text style={styles.infoComponent}>
            Signed in as {oGoogle?.user.email}
          </Text>
          <Text
            style={styles.backToLoginComponent}
            onPress={() => removeCompleteDetailsAndNavigateToLogin()}>
            Sign Out?
          </Text>
        </View>
      </View>
      {/* </LinearGradient> */}
    </ImageBackground>
  );
};

export const GBDetailScreenOptions = (navData) => {
  return {
    headerShown: false,
    headerLeft: null,
    headerRight: null,
    cardStyle: { backgroundColor: 'transparent', shadowColor: 'transparent' },
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    // flexGrow:1,
    // marginHorizontal:
    //   Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    // marginVertical:
    //   Dimensions.get('window').height * Resolution.nHeightScreenMargin,
    flexDirection: 'column',
    alignSelf: 'center',
    width: wp(100),
    height: hp(100),
    backgroundColor: 'rgba(0,0,0,0.80)',
  },
  imagebackgroundComponent: {
    width: wp(100),
    height: hp(100),
    //flex: 1,
    // opacity
    // height:hp(100),
    // width:wp(100)
    //opacity:0
    // opacity:0.5
    //flex: 1,
    //backgroundColor: 'rgb(0,0,0)',
    //opacity:1
  },
  headerContainer: {
    // marginHorizontal:
    //   Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    // // width: wp(85),
    // // height: hp(15),
    // marginTop: hp(22),
    // marginBottom: hp(5),
  },
  headerComponent: {
    width: wp(85),
    textAlign: 'left',
    fontSize: hp(3.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.white,
    fontFamily: sFontName,
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginTop: hp(22),
    marginBottom: hp(6),
    lineHeight: hp(4.75),

    //letterSpacing: Resolution.nLetterSpacing,
  },
  textContainer: {
    // marginHorizontal:
    //   Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    // width: wp(85),
    // height: hp(3.5),
    // marginBottom: hp(2),
  },
  textComponent: {
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    width: wp(85),
    //height: hp(3.5),
    marginBottom: hp(2),
    fontFamily: sFontName,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    textAlign: 'left',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.white,
    // lineHeight:
    //   Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.6 : 18,
    //letterSpacing: Resolution.nLetterSpacing,
  },
  gbidContainer: {
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    width: wp(85),
    height: hp(3.5),
    marginBottom: hp(3),
    lineHeight:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    //letterSpacing: Resolution.nLetterSpacing,
    // maxwidth: '95%',
    // minWidth: '80%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  gbidComponent: {
    textAlign: 'left',
    color: Colors.white,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 12 : 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
  },
  dobContainer: {
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    flexDirection: 'row',
    width: wp(85 - 1.5),
    height: hp(3.5),
    marginTop: hp(5),
    marginBottom: hp(5),
  },
  dobComponent: {
    // textAlign: "left",
    // color: Colors.white,
    // fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 12 : 20,
    // fontStyle: "normal",
    // fontWeight: "normal",
    // fontFamily: sFontName
    flexGrow: 1,
    //width:wp(10)
    // width:wp(50)
  },
  buttonContainer: {
    width: wp(85),
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    height: hp(3.5),
    marginTop: hp(4),
    marginBottom: hp(5),
  },
  buttonComponent: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.buttonYellow,
    backgroundColor: Colors.buttonYellow,
    height: hp(4.25),
    // width:"100%"
    //color: Colors.black
    // marginTop:20
    // marginLeft:20,
    // marginRight:20
    //width: Dimensions.get("window").width * 0.50
  },
  linearGradient: {
    // alignItems: 'center',
    // justifyContent: 'center',
    //borderRadius: 5,
    height: hp(100),
    width: wp(100),
    opacity: 0,
  },
  infoComponent: {
    textAlign: 'center',
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    width: wp(85),
    //height: hp(3.5),
    marginBottom: hp(2),
    fontFamily: sFontName,
    fontSize: wp(4.25),
    // textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.white,
  },
  backToLoginComponent: {
    textAlign: 'center',
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    width: wp(85),
    //height: hp(3.5),
    marginBottom: hp(2),
    fontSize: wp(4.75),
    // textAlign: 'center',
    fontStyle: 'normal',
    textDecorationLine: 'underline',
    color: Colors.blue,
    textDecorationColor: Colors.blue,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
});
