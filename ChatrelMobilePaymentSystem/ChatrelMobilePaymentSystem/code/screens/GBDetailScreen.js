import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  BackHandler,
  ImageBackground,
  Platform,
  ActivityIndicator,
  Modal,
  Linking,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {sDateFormat} from '../constants/CommonConfig';
import Moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {storeGBDetails, storeJWTToken} from '../store/actions/GBDetailsAction';
import {storeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import Colors from '../constants/Colors';
import Resolution from '../constants/ResolutionBreakpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Alert} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {removeGoogleCreds} from '../store/actions/GLoginAction';
import {removeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import {
  removeGBDetails,
  removeJWTToken,
} from '../store/actions/GBDetailsAction';
import {useForm, Controller} from 'react-hook-form';
import {
  errorComponent,
  errorContainer,
  sFontName,
  sFontNameBold,
  oActivityIndicatorStyle,
  sISODateFormat,
  sMappingURL,
} from '../constants/CommonConfig';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {TextInputMask} from 'react-native-masked-text';
import {WebView} from 'react-native-webview';

// import LinearGradient from 'react-native-linear-gradient';

export const GBDetailScreen = (props) => {
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

  // useEffect(() => {
  //   if (isFocused) {
  //     BackHandler.addEventListener('hardwareBackPress', () => true);

  //     // getUserDataFromAsnycStorage().then(oUserInfo => {
  //     //   if (oUserInfo) {
  //     //     getGBDataFromAsnycStorage().then(oGBInfo => {
  //     //       if (oGBInfo) {
  //     //         let oUserCompleteDetails = {...oUserInfo,...oGBInfo}
  //     //         verifyAllDetails(oUserCompleteDetails);
  //     //       }
  //     //     });
  //     //   }
  //     // });

  //   }
  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', () => true);
  //   };
  // }, [isFocused]);

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

  const [bShowWebView, setbShowWebView] = useState(false);
  const dtDOBRef = useRef(null);
  const isFocused = useIsFocused();
  const {control, handleSubmit, errors} = useForm();
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const dispatch = useDispatch();
  let keysToRemove = ['oUserInfo', 'oGBInfo'];
  const [sGBID, setsGBID] = useState('');
  const [dtDOB, setdtDOB] = useState(null);
  const dtToday = Moment().format(sDateFormat);
  const [bLoader, setbLoader] = useState(false);

  const removeCompleteDetailsAndNavigateToLogin = async () => {
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
  const handleVerifyDetailsPress = async () => {
    setbLoader(true);
    setTimeout(() => {
      let oAPI = {
        sGBID: sGBID,
        // dtDOB: dtDOB,
        dtDOB: Moment(dtDOB, sDateFormat).format(sISODateFormat),
        // sFirstName: oGoogle.user?.givenName,
        // sLastName: oGoogle.user?.familyName,
        sEmail: oGoogle.user?.email,
        code: oGoogle.idToken,
      };

      console.log(oAPI);

      axios
        .post('User/AuthenticateGBID', oAPI)
        .then((response) => {
          if (response.status === 200) {
            {
              /*exception only sJWTToken rest token*/
            }
            const oSession = {
              sJwtToken: response.data.sJwtToken,
              bSession: true,
            };
            dispatch(storeJWTToken(oSession));
            if (response.data.result === 'Verified') {
              let oGBDetails = {
                sGBID: sGBID,
                dtDOB: dtDOB,
                sCountryID: response.data.sCountryID,
              };
              dispatch(storeGBDetails(oGBDetails));
              dispatch(storeCurrentGBDetails(oGBDetails));
              try {
                const jsonGBInfoValue = JSON.stringify(oGBDetails);
                AsyncStorage.setItem('oGBInfo', jsonGBInfoValue);
              } catch (e) {
                console.info(e);
              }
              //TODO: Show Toast of Verification Successful
              props.navigation.navigate('Home');
            } else {
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
                {cancelable: false},
              );
            }
            setbLoader(false);
          }
        })
        .catch((error) => {
          //console.log(error.response);
          if (error.response.status === 401) {
            // const oSession = {
            //   sJwtToken: '',
            //   bSession: false,
            // };
            // dispatch(storeJWTToken(oSession));
          } else {
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
              {cancelable: false},
            );
          }
          setbLoader(false);
        });
    }, 2000);
  };

  useEffect(() => {
    if (isFocused) {
      setsGBID('');
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
            render={({onChange, onBlur, value}) => (
              <Input
                //autoFocus={true}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  dtDOBRef.current.onPressDate();
                }}
                blurOnSubmit={false}
                style={styles.gbidComponent}
                containerStyle={{
                  paddingHorizontal: hp(1.75),
                }}
                placeholder={'Green Book Number*'}
                placeholderTextColor={Colors.grey}
                autoCompleteType={'off'}
                autoCorrect={false}
                clearButtonMode={'while-editing'}
                keyboardType={'number-pad'}
                keyboardAppearance={'default'}
                maxLength={7}
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                  setsGBID(value);
                }}
                value={sGBID}
                // enablesReturnKeyAutomatically={true}
                // spellCheck={false}
              />
            )}
            name="name_nGBID"
            rules={{required: true}}
            defaultValue=""
          />
        </View>
        {errors.name_nGBID && (
          <View
            style={{
              ...errorContainer,
              marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
            }}>
            <Text style={errorComponent}>Please enter Green Book Number.</Text>
          </View>
        )}

        {/*Android Date Picker With Text Component as a Masking*/}
        {Platform.OS === 'android' && (
          <View>
            <View style={styles.dobContainerAndroid}>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <TextInputMask
                    style={{
                      // flexGrow: 1,
                      borderBottomColor: Colors.grey,
                      borderBottomWidth: 1,
                      color: Colors.grey,
                      fontSize: wp(5),
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontFamily: sFontName,
                      flexGrow: 1,
                      textAlign: 'left',
                    }}
                    type={'datetime'}
                    options={{
                      format: sDateFormat,
                      validator: true,
                      // Masking Options
                    }}
                    value={dtDOB}
                    onChangeText={(date) => {
                      onChange(date);
                      setdtDOB(date);
                    }}
                    placeholder={sDateFormat + '*   '}
                    placeholderTextColor={Colors.grey}
                    onBlur={onBlur}
                    // enablesReturnKeyAutomatically={true}
                    // maxLength={10}
                    // textBreakStrategy={'simple'}
                  />
                )}
                name="name_dtDOB"
                rules={{required: true}}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <DatePicker
                    ref={dtDOBRef}
                    blurOnSubmit={true}
                    showIcon={true}
                    useNativeDriver={true}
                    androidMode={'calendar'}
                    date={dtDOB}
                    mode="date"
                    hideText={true}
                    placeholder={sDateFormat + '*'}
                    //Had to Code for Adjusting Icon to End
                    style={{
                      width: 30,
                      // borderBottomColor:Colors.grey,
                      // borderBottomWidth:2
                    }}
                    //placeholderTextColor={Colors.grey}
                    // allowFontScaling
                    // placeholder={"Date of Birth "+sDateFormat+"*"}
                    format={sDateFormat}
                    maxDate={dtToday}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        alignItems: 'center',
                        display: 'flex',
                        marginTop: hp(2.25),
                        //borderBottomWidth: 1,
                        //borderBottomColor: Colors.grey,
                        // borderWidth: 0,
                        // borderStyle: null,
                        // height: 0,
                        // width: 0,
                        // borderBottomWidth:1,
                        // marginLeft: 0,
                        // alignContent: 'flex-end',
                        // alignSelf: 'flex-end',
                        // justifyContent: 'flex-end',
                      },
                      // placeholderText: {
                      //   color: Colors.grey,
                      //   fontSize: wp(5),
                      //   fontStyle: 'normal',
                      //   fontWeight: 'normal',
                      //   fontFamily: sFontName,
                      // },
                      // dateText: {
                      //   //textAlign: 'left',
                      //   color: Colors.white,
                      //   fontSize: wp(5),
                      //   fontStyle: 'normal',
                      //   fontWeight: 'normal',
                      //   fontFamily: sFontName,
                      // },
                      // dateIcon: {
                      //   width:0,
                      //   height:0,
                      // position: 'relative',
                      // left: 0,
                      // top:
                      // Dimensions.get('window').height <
                      // Resolution.nHeightBreakpoint
                      // ? 2.4
                      // : 4,
                      // marginLeft: 0,
                      // },
                      dateInput: {
                        // flexGrow: 1,
                        // alignItems: 'flex-start',
                        // borderLeftWidth: 0,
                        // borderRightWidth: 0,
                        // borderTopWidth: 0,
                        // margin:0
                        //margin: 0,
                        borderWidth: 0,
                        borderStyle: null,
                        height: 0,
                        width: 0,
                        // marginRight: -32,
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
                rules={{required: true}}
                defaultValue=""
              />
            </View>
            {errors.name_dtDOB && (
              <View
                style={{
                  ...errorContainer,
                  marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
                }}>
                <Text style={errorComponent}>Please enter Date of Birth.</Text>
              </View>
            )}
          </View>
        )}
        {/*IOS PART*/}
        {Platform.OS === 'ios' && (
          <View>
            <View style={styles.dobContainer}>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <DatePicker
                    ref={dtDOBRef}
                    blurOnSubmit={true}
                    showIcon={false}
                    useNativeDriver={true}
                    androidMode={'calendar'}
                    style={styles.dobComponent}
                    date={dtDOB}
                    mode="date"
                    placeholder={sDateFormat + '*'}
                    //placeholderTextColor={Colors.grey}
                    // allowFontScaling
                    // placeholder={"Date of Birth "+sDateFormat+"*"}
                    format={sDateFormat}
                    maxDate={dtToday}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        borderWidth: 0,
                        borderStyle: null,
                        height: 0,
                        width: 0,
                        // borderBottomWidth:1
                      },
                      placeholderText: {
                        color: Colors.grey,
                        fontSize: wp(5),
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontFamily: sFontName,
                      },
                      dateText: {
                        //textAlign: 'left',
                        color: Colors.white,
                        fontSize: wp(5),
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
                        //marginLeft: wp(3),
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
                rules={{required: true}}
                defaultValue=""
              />
            </View>
            {errors.name_dtDOB && (
              <View
                style={{
                  ...errorContainer,
                  marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
                }}>
                <Text style={errorComponent}>Please enter Date of Birth.</Text>
              </View>
            )}
          </View>
        )}
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.buttonStyleComponent}
            title="VERIFY"
            titleStyle={styles.buttonTitleStyle}
            onPress={handleSubmit(handleVerifyDetailsPress)}
          />
        </View>
        {/*</form>*/}
        <View style={styles.infoComponent}>
          <Text
            style={{
              textAlign: 'center',
            }}>
            <Text
              style={{
                ...styles.infoComponent,
                fontSize: wp(4),
              }}>
              Update your Google Account by filling{' '}
            </Text>
            <Text
              style={{
                ...styles.infoComponent,
                color: Colors.darkYellowFamilyPage,
                fontSize: wp(4),
                fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                fontFamily:
                  Platform.OS === 'android' ? sFontNameBold : sFontName,
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
    cardStyle: {backgroundColor: 'transparent', shadowColor: 'transparent'},
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
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.80)',
    flexDirection: 'column',
    height: hp(100),
    width: wp(100),
  },
  imagebackgroundComponent: {
    height: hp(100),
    width: wp(100),
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
    marginTop: hp(15),
    marginBottom: hp(5),
    marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
  },
  headerComponent: {
    color: Colors.white,
    fontSize: hp(3.75),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    lineHeight: hp(5),
    textAlign: 'left',
  },
  gbidContainer: {
    flexDirection: 'row',
    // marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
    //width: wp(85),
    // height: hp(3.5),
    // marginBottom: hp(3),
    // lineHeight:
    //   Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    //letterSpacing: Resolution.nLetterSpacing,
    // maxwidth: '95%',
    // minWidth: '80%',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  gbidComponent: {
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    color: Colors.grey,
    flexGrow: 1,
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  dobContainer: {
    flexDirection: 'row',
    marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
    marginVertical: hp(2.5),
    // marginTop: hp(5),
    // marginBottom: hp(5),
    // width: wp(85 - 2),
  },
  dobContainerAndroid: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
    marginVertical: hp(2.5),
    // justifyContent:"flex-end",
    // alignSelf:"center"
    // marginTop: hp(5),
    // marginBottom: hp(5),
    // width: wp(85 - 2),
  },
  dobComponent: {
    flexGrow: 1,
    // textAlign: "left",
    // color: Colors.white,
    // fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 12 : 20,
    // fontStyle: "normal",
    // fontWeight: "normal",
    // fontFamily: sFontName
    //width:wp(10)
    // width:wp(50)
  },
  textContainer: {
    marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
    marginBottom: hp(2),
  },
  textComponent: {
    color: Colors.white,
    fontFamily: sFontName,
    fontSize: wp(6),
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  buttonContainer: {
    marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
    marginTop: hp(4),
    marginBottom: hp(4),
  },
  buttonStyleComponent: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.buttonYellow,
    backgroundColor: Colors.buttonYellow,
    // height: hp(4),
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
    // height: hp(100),
    // width: wp(100),
    // opacity: 0,
  },
  infoComponent: {
    color: Colors.white,
    fontFamily: sFontName,
    fontSize: wp(4.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginBottom: hp(3),
    textAlign: 'center',
    // marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
  },
  backToLoginComponent: {
    color: Colors.ChatrelInfoBlue,
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    textDecorationColor: Colors.ChatrelInfoBlue,
    textDecorationLine: 'underline',
    textAlign: 'center',
    // marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
  },
  buttonTitleStyle: {
    color: Colors.black,
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
