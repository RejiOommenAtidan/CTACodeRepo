import React, {useState, useEffect, useRef} from 'react';
import {Text, View, ScrollView, StyleSheet, Alert} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {Platform} from 'react-native';
import {Input, Button, Card, Icon} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {useForm, Controller} from 'react-hook-form';
import {
  errorComponent,
  errorContainer,
  sDateFormat,
  sISODateFormat,
  oRequiredStyles,
  sVerificationSuccessfulMessage,
  sVerificationFailedMessage,
  sEnteredDetailsDidntMatchDB,
  sAttentionRequired,
  sSomethingWentWrongPleaseTryAgainLater,
} from '../constants/CommonConfig';
import {TextInputMask} from 'react-native-masked-text';
import {storeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {sFontName, sFontNameBold} from '../constants/CommonConfig';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {Loader} from '../components/Loader';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import {storeJWTToken} from '../store/actions/GBDetailsAction';

export const FriendChatrelIntermediateScreen = (props) => {
  const dispatch = useDispatch();
  const {control, handleSubmit, errors} = useForm();
  const [bLoader, setbLoader] = useState(false);
  const onSubmit = () => {
    setbLoader(true);

    let oFriendGBDetails = {
      // sFirstName: sFriendFirstname,
      // sLastName: sFriendLastname,
      // dtDOB: dtFriendDOB,
      sFriendGBID: nFriendGBID,
      dtDOB: Moment(dtFriendDOB, sDateFormat).format(sISODateFormat),
    };

    //console.log('Friend GB Details: ' + oFriendGBDetails.dtDOB);

    axios
      .get(
        `/ChatrelPayment/VerifyFriendDetails/?sGBID=${oFriendGBDetails.sFriendGBID}&sFirstName=${oFriendGBDetails.sFirstName}&sLastName=${oFriendGBDetails.sLastName}&dtDOB=${oFriendGBDetails.dtDOB}`,
      )
      .then((resp) => {
        if (resp.status === 200 && resp.data.verified === true) {
          const oSession = {
            sJwtToken: resp.data.token,
            bSession: true,
          };
          dispatch(storeJWTToken(oSession));
          setbLoader(false);
          let oGBDetails = {
            sGBID: nFriendGBID,
            dtDOB: dtFriendDOB,
          };

          Toast.show(sVerificationSuccessfulMessage, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          dispatch(storeCurrentGBDetails(oGBDetails));
          setnFriendGBID('');
          setdtFriendDOB(null);
          props.navigation.navigate('FriendChatrel');
        } else {
          setbLoader(false);
          const oSession = {
            sJwtToken: resp.data.token,
            bSession: true,
          };
          dispatch(storeJWTToken(oSession));
          setTimeout(() => {
            Alert.alert(
              sVerificationFailedMessage,
              sEnteredDetailsDidntMatchDB,
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
        }
      })
      .catch((error) => {
        setbLoader(false);
        if (error.response.status === 401) {
          // const oSession = {
          //   sJwtToken: '',
          //   bSession: false,
          // };
          // dispatch(storeJWTToken(oSession));
        } else {
          setTimeout(() => {
            Alert.alert(
              sVerificationFailedMessage,
              sEnteredDetailsDidntMatchDB,
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
        }
      });
  };

  const nFriendGBIDRef = useRef(null);
  const dtFriendDOBRef = useRef(null);
  const dtFriendDOBInputRef = useRef(null);
  const [nFriendGBID, setnFriendGBID] = useState('');
  const [dtFriendDOB, setdtFriendDOB] = useState(null);
  const dtToday = Moment().format(sDateFormat);
  const isFocused = useIsFocused();

  const pingPong = () => {
    axios
      .get(`/ChatrelPayment/Ping`)
      .then((resp) => {
        if (resp.status === 200) {
          const oSession = {
            sJwtToken: resp.data.token,
            bSession: true,
          };
          dispatch(storeJWTToken(oSession));
        }
      })
      .catch((error) => {
        debugger;
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
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };

  useEffect(() => {
    if (isFocused) {
      console.log('Friends and Family Chatrel Screen Called');
      setdtFriendDOB(null);
      setnFriendGBID('');
      pingPong();
    }
  }, [isFocused]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <Loader loading={bLoader} />
        <Card
          title={
            <View style={styles.titleStyleView}>
              <Icon
                color={Colors.white}
                iconStyle={styles.iconStyles}
                iconProps={{}}
                backgroundColor={Colors.websiteLightBlueColor}
                size={40}
                type="font-awesome-5"
                name="leaf"
                containerStyle={styles.iconContainerStyles}
              />
            </View>
          }
          titleStyle={{}}
          containerStyle={styles.cardContainerStyle}>
          {/*Green Book ID*/}
          <View style={styles.labelContainer}>
            <Text>
              <Text style={styles.labelComponent}>GREEN BOOK ID</Text>
              <Text style={oRequiredStyles}>*</Text>
            </Text>
          </View>
          <View style={styles.valueComponent}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    //dtFriendDOBRef.current.onPressDate();
                    dtFriendDOBInputRef.current._inputElement.focus();
                  }}
                  ref={nFriendGBIDRef}
                  containerStyle={styles.valueContainerStyle}
                  style={styles.valueComponent}
                  //label="Friend's GBID"
                  placeholder="Enter Green Book Number"
                  placeholderTextColor={Colors.grey}
                  //autoFocus={true}
                  //autoCapitalize={"characters"}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  clearButtonMode={'while-editing'}
                  //dataDetectorTypes={"phoneNumber"}
                  //secureTextEntry={!bShowFriendGBID}
                  returnKeyType={'done'}
                  keyboardType={'number-pad'}
                  keyboardAppearance={'default'}
                  disableFullscreenUI={true}
                  maxLength={7}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                    setnFriendGBID(value);
                  }}
                  value={nFriendGBID}
                />
              )}
              name="name_nFriendGBID"
              rules={{required: true}}
              defaultValue=""
            />
            {errors.name_nFriendGBID && (
              <View style={errorContainer}>
                <Text style={errorComponent}>
                  Please enter Green Book Number.
                </Text>
              </View>
            )}
          </View>

          {/*ANDROID and iOS Date of Birth Part*/}

          <View>
            <View style={styles.labelContainer}>
              <Text>
                <Text style={styles.labelComponent}>DATE OF BIRTH</Text>
                <Text style={oRequiredStyles}>*</Text>
              </Text>
            </View>
            <View style={styles.dobValueContainer}>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <TextInputMask
                    ref={dtFriendDOBInputRef}
                    returnKeyType={'done'}
                    keyboardType={'number-pad'}
                    style={{
                      borderBottomColor: Colors.black,
                      borderBottomWidth: 1,
                      color: Colors.black,
                      flexGrow: 1,
                      fontSize: wp(5),
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontFamily: sFontName,
                      textAlign: 'left',
                    }}
                    type={'datetime'}
                    options={{
                      format: sDateFormat,
                      validator: true,
                      // the options for your mask if needed
                    }}
                    value={dtFriendDOB}
                    onChangeText={(date) => {
                      onChange(date);
                      setdtFriendDOB(date);
                    }}
                    placeholder={sDateFormat}
                    placeholderTextColor={Colors.grey}
                    onBlur={onBlur}
                  />
                )}
                name="name_dtFriendDOB"
                rules={{required: true}}
                defaultValue=""
              />
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <DatePicker
                    iconComponent={
                      <Icon
                        color={Colors.black}
                        type="font-awesome"
                        name="calendar"
                      />
                    }
                    blurOnSubmit={true}
                    ref={dtFriendDOBRef}
                    useNativeDriver={true}
                    androidMode={'calendar'}
                    style={{
                      width: 30,
                      borderBottomColor: Colors.black,
                      borderBottomWidth: 1,
                    }}
                    hideText={true}
                    date={dtFriendDOB}
                    mode="date"
                    placeholder={sDateFormat}
                    format={sDateFormat}
                    //minDate={dtToday}
                    maxDate={dtToday}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={true}
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
                      setdtFriendDOB(date);
                    }}
                  />
                )}
                name="name_dtFriendDOB"
                rules={{required: true}}
                defaultValue=""
              />
            </View>
            {errors.name_dtFriendDOB && (
              <View style={errorContainer}>
                <Text style={{...errorComponent, marginTop: hp(1)}}>
                  Please enter Date of Birth.
                </Text>
              </View>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="VERIFY AND CONTRIBUTE"
              onPress={handleSubmit(onSubmit)}
              titleStyle={{
                color: Colors.white,
                fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                fontFamily:
                  Platform.OS === 'android' ? sFontNameBold : sFontName,
              }}
              containerStyle={{
                marginTop: hp(3),
                marginBottom: hp(1),
              }}
              buttonStyle={{
                backgroundColor: Colors.primary,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: Colors.primary,
              }}
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export const FriendChatrelIntermediateScreenOptions = (navData) => {
  return {
    headerTitle: 'FRIENDS & FAMILY',
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          //iconName={Platform.OS === 'android' ? 'menu' : 'md-menu'}
          iconName={'menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    // headerRight: CustomHeaderRightButton,
    cardStyle: {backgroundColor: Colors.white},
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical: hp(Resolution.nHeightMarginValueScreen),
    // marginHorizontal: wp(Resolution.nWidthMarginValueScreen),
  },
  labelContainer: {
    marginBottom: hp(1),
  },
  labelComponent: {
    color: Colors.blackText,
    fontSize: wp(3.75),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  valueContainer: {},
  valueComponent: {
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  dobValueContainer: {
    flexDirection: 'row',
    marginBottom: hp(1),
    // marginBottom:
    //   Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 30 : 50,
  },
  buttonContainer: {},
  cardContainerStyle: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    marginTop: hp(5),
    width: wp(92.5),

    //Border Stuff
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS
    shadowRadius: 15,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,

    //For Android
    elevation: 15,
    overflow: 'visible',
  },
  titleStyleView: {
    marginBottom: hp(5.5),
    shadowRadius: 15,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
  },
  iconStyles: {
    backgroundColor: Colors.websiteLightBlueColor,
    margin: hp(2),
  },
  iconContainerStyles: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    elevation: 15,
    position: 'absolute',
    top: -55,
    // left:20,
    //Border Stuff
    // backgroundColor:Colors.white,
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,
    // overflow: 'visible',
  },
  valueContainerStyle: {
    paddingHorizontal: 0,
  },
});
