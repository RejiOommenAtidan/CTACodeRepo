import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  BackHandler,
  ImageBackground,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {
  sDateFormat,
  sVerificationSuccessfulMessage,
  sVerificationFailedMessage,
  sSomethingWentWrongPleaseTryAgainLater,
  sAttentionRequired,
  sEnteredDetailsDidntMatchDB,
} from '../constants/CommonConfig';
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
import Toast from 'react-native-root-toast';

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

  const dtDOBRef = useRef(null);
  const dtDOBInputRef = useRef(null);
  const isFocused = useIsFocused();
  const {control, handleSubmit, errors} = useForm();
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const sType = useSelector((state) => state.SignInTypeReducer.sType);
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
  const handleVerifyDetailsPress = async () => {
    setbLoader(true);
    let oAPI = {
      // sFirstName: oGoogle.user?.givenName,
      // sLastName: oGoogle.user?.familyName,
      sGBID: sGBID,
      dtDOB: Moment(dtDOB, sDateFormat).format(sISODateFormat),
      sEmail: oGoogle.user?.email,
      code: oGoogle.idToken,
      sType: sType,
    };

    console.log(oAPI);
    // setbLoader(false);

    axios
      .post('User/AuthenticateGBID', oAPI)
      .then((response) => {
        if (response.status === 200) {
          {
            /*Using here word "sJWTToken" rest places "token" word*/
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
            Toast.show(sVerificationSuccessfulMessage, {
              duration: Toast.durations.SHORT,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });
            props.navigation.navigate('Home');
          } else {
            Alert.alert(
              sVerificationFailedMessage,
              sEnteredDetailsDidntMatchDB,
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
        debugger;
        console.error(error.response);
        if (error.response.status === 401) {
          // const oSession = {
          //   sJwtToken: '',
          //   bSession: false,
          // };
          // dispatch(storeJWTToken(oSession));
        } else {
          Alert.alert(
            sAttentionRequired,
            sSomethingWentWrongPleaseTryAgainLater,
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
  };

  useEffect(() => {
    if (isFocused) {
      setsGBID('');
      setdtDOB(null);
      dispatch(removeGoogleCreds);
      dispatch(removeGBDetails);
      dispatch(removeJWTToken);
      dispatch(removeCurrentGBDetails);
      axios.defaults.headers.common['Authorization'] = undefined;
    }
  }, [isFocused]);

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={styles.imagebackgroundComponent}>
      {bLoader && (
        <ActivityIndicator
          size={Platform.OS === 'ios' ? 0 : 'large'}
          color={Colors.spinnerColor}
          animating={true}
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
            Great! Thanks for logging in through{' '}
            {sType === 'Google' ? 'Google' : 'Apple'}.{'\n'}Just one more step
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
                //returnKeyType={'next'}
                returnKeyType={'done'}
                onSubmitEditing={() => {
                  //dtDOBRef.current.onPressDate();
                  dtDOBInputRef.current._inputElement.focus();
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

        {/*Android/iOS Date Picker With Text Component having Masking*/}

        {
          <View>
            <View style={styles.dobContainer}>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <TextInputMask
                    ref={dtDOBInputRef}
                    keyboardType={'number-pad'}
                    returnKeyType={'done'}
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
                    enablesReturnKeyAutomatically={true}
                    //textBreakStrategy={'simple'}
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
                    iconComponent={
                      <Icon
                        color={Colors.white}
                        type="font-awesome"
                        name="calendar"
                      />
                    }
                    ref={dtDOBRef}
                    blurOnSubmit={true}
                    showIcon={true}
                    useNativeDriver={true}
                    androidMode={'calendar'}
                    date={dtDOB}
                    mode="date"
                    hideText={true}
                    placeholder={sDateFormat + '*'}
                    //Had to Code Value for Adjusting Icon to End
                    style={{
                      width: 30,
                      borderBottomColor: Colors.grey,
                      borderBottomWidth: 1,
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
                        marginTop: Platform.OS === 'android' ? hp(2.25) : hp(0),
                      },
                      dateInput: {
                        borderWidth: 0,
                        borderStyle: null,
                        height: 0,
                        width: 0,
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
        }
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
                Linking.openURL(sMappingURL);
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
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.80)',
    flexDirection: 'column',
    height: hp(100),
    width: wp(100),
  },
  imagebackgroundComponent: {
    height: hp(100),
    width: wp(100),
  },
  headerContainer: {
    marginTop: hp(15),
    marginBottom: hp(5),
    marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
  },
  headerComponent: {
    color: Colors.white,
    fontSize: hp(3.25),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    lineHeight: hp(5),
    textAlign: 'left',
  },
  gbidContainer: {
    flexDirection: 'row',
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
  },
  dobContainerAndroid: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
    marginVertical: hp(2.5),
  },
  dobComponent: {
    flexGrow: 1,
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
  },
  infoComponent: {
    color: Colors.white,
    fontFamily: sFontName,
    fontSize: wp(4.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginBottom: hp(3),
    textAlign: 'center',
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
