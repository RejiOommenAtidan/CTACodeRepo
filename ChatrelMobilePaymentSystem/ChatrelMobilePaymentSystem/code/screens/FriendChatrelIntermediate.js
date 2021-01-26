import React, {useState} from 'react';
import {
  Switch,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
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
  sDateFormatDatePicker,
  sISODateFormat,
  oActivityIndicatorStyle,
  oRequiredStyles,
} from '../constants/CommonConfig';
import {storeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {sFontName, sFontNameBold} from '../constants/CommonConfig';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {storeGBDetails} from '../store/actions/GBDetailsAction';
import {CustomHeaderRightButton} from '../components/HeaderRightButton';

export const FriendChatrelIntermediateScreen = (props) => {
  const dispatch = useDispatch();
  const {control, handleSubmit, errors} = useForm();
  const [bLoader, setbLoader] = useState(false);
  const onSubmit = () => {
    setbLoader(true);

    console.log(dtFriendDOB);

    let oFriendGBDetails = {
      sFriendGBID: nFriendGBID,
      sFirstName: sFriendFirstname,
      sLastName: sFriendLastname,
      dtDOB: Moment(dtFriendDOB, sDateFormatDatePicker).format(sISODateFormat),
    };
    console.log(oFriendGBDetails);

    axios
      .get(
        `/ChatrelPayment/VerifyFriendDetails/?sGBID=${oFriendGBDetails.sFriendGBID}&sFirstName=${oFriendGBDetails.sFirstName}&sLastName=${oFriendGBDetails.sLastName}&dtDOB=${oFriendGBDetails.dtDOB}`,
      )
      .then((resp) => {
        if (resp.status === 200 && resp.data === true) {
          //console.log(resp.data);
          // if(resp.data === true){
          // axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=`+sFriendGBID)
          // .then(resp => {
          //   if (resp.status === 200) {
          //     makePayment({sGBID: sFriendGBID, sName: `${sFirstName} ${sLastName}`, sRelation: `Friend`, from:'Chatrel for Friend' }, resp.data, resp.data.chatrelPayment.nChatrelTotalAmount)
          //   }
          // })
          // .catch(error => {
          //   console.log(error.message);
          // });
          setbLoader(false);
          let oGBDetails = {
            sGBID: nFriendGBID,
            dtDOB: dtFriendDOB,
          };
          ToastAndroid.showWithGravity(
            'Verification Successful',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          dispatch(storeCurrentGBDetails(oGBDetails));
          props.navigation.navigate('FriendChatrel');
        } else {
          setbLoader(false);
          alert("Values don't match with database. Enter correct values.");
        }
      })
      .catch((error) => {
        // if (error.response.status === 400) {
        //   console.info('Missing Parameters...');
        // }
        setbLoader(false);
        alert("Values don't match with database. Enter correct values.");
        console.log(error.message);
        console.log(error);
      });
  };
  const [nFriendGBID, setnFriendGBID] = useState('');
  const [sFriendFirstname, setsFriendFirstname] = useState('');
  const [sFriendLastname, setsFriendLastname] = useState('');
  const [bShowFriendGBID, setbShowFriendGBID] = useState(true);
  const [dtFriendDOB, setdtFriendDOB] = useState(null);
  const dtToday = Moment().format(sDateFormatDatePicker);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        {bLoader && (
          <ActivityIndicator
            size={Platform.OS === 'ios' ? 0 : 'large'}
            color={Colors.spinnerColor}
            animating={true}
            //hidesWhenStopped={true}
            style={oActivityIndicatorStyle}
          />
        )}
        {/*<View style={styles.headingContainer}>
          <Text style={styles.headingComponent}>Chatrel For Friends</Text>
  </View>*/}
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
          <View style={styles.labelContainer}>
            <Text>
              <Text style={styles.labelComponent}>FIRST NAME</Text>
              <Text style={oRequiredStyles}>*</Text>
            </Text>
          </View>
          <View style={styles.valueContainer}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  // inputContainerStyle={{borderBottomWidth: 0}}
                  containerStyle={styles.valueContainerStyle}
                  inputStyle={
                    {
                      // borderRadius: 10,
                      // backgroundColor: Colors.white,
                      // borderColor: Colors.white,
                    }
                  }
                  style={styles.valueComponent}
                  //label="Friend's Firstname"
                  placeholder="Enter First Name of Friend"
                  placeholderTextColor={Colors.grey}
                  //autoFocus={true}
                  //autoCapitalize={"characters"}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  clearButtonMode={'while-editing'}
                  //dataDetectorTypes={"phoneNumber"}
                  //secureTextEntry={!bShowFriendGBID}
                  keyboardType={'default'}
                  keyboardAppearance={'default'}
                  disableFullscreenUI={true}
                  //maxLength={7}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                    setsFriendFirstname(value);
                  }}
                  value={sFriendFirstname}
                />
              )}
              name="name_sFriendFirstName"
              rules={{required: true}}
              defaultValue=""
            />
            {errors.name_sFriendFirstName && (
              <View style={errorContainer}>
                <Text style={errorComponent}>
                  Please enter first name of friend
                </Text>
              </View>
            )}
          </View>
          <View style={styles.labelContainer}>
            <Text>
              <Text style={styles.labelComponent}>LAST NAME</Text>
              <Text style={oRequiredStyles}>*</Text>
            </Text>
          </View>
          <View style={styles.valueContainer}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <Input
                  //inputContainerStyle={{borderBottomWidth: 0}}
                  inputStyle={
                    {
                      //height: hp(2.5),
                      //marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
                      //borderRadius: 10,
                      // backgroundColor: Colors.white,
                      // borderColor: Colors.white,
                    }
                  }
                  containerStyle={styles.valueContainerStyle}
                  style={styles.valueComponent}
                  //label="Friend's Lastname"
                  placeholder="Enter Last Name of Friend"
                  placeholderTextColor={Colors.grey}
                  //autoFocus={true}
                  //autoCapitalize={"characters"}
                  autoCompleteType={'off'}
                  autoCorrect={false}
                  clearButtonMode={'while-editing'}
                  //dataDetectorTypes={"phoneNumber"}
                  //secureTextEntry={!bShowFriendGBID}
                  keyboardType={'default'}
                  keyboardAppearance={'default'}
                  disableFullscreenUI={true}
                  //maxLength={7}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                    setsFriendLastname(value);
                  }}
                  value={sFriendLastname}
                />
              )}
              name="name_sFriendLastName"
              rules={{required: true}}
              defaultValue=""
            />
            {errors.name_sFriendLastName && (
              <View style={errorContainer}>
                <Text style={errorComponent}>
                  Please enter last name of friend
                </Text>
              </View>
            )}
          </View>
          {/*GBID*/}
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
                  //inputContainerStyle={{borderBottomWidth: 0}}
                  //inputStyle={{
                  //height: hp(2.5),
                  //marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
                  //borderRadius: 10,
                  // backgroundColor: Colors.white,
                  // borderColor: Colors.white,
                  //}}
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
                  Please enter Green Book Number
                </Text>
              </View>
            )}
          </View>
          {/*<View style={styles.container}>
          <Switch
            onValueChange={() => { setbShowFriendGBID(!bShowFriendGBID) }}
            value={bShowFriendGBID}
          />
          <Text>Show/Hide Friend's GBID</Text>
        </View>*/}
          {/*First Name*/}
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
                <DatePicker
                  useNativeDriver={true}
                  androidMode={'calendar'}
                  style={{
                    width: wp(87.5),

                    // width: wp(90 - 1),
                    // backgroundColor: Colors.white,
                    //borderColor: Colors.white
                    // marginBottom:
                    //   Dimensions.get('window').height <
                    //   Resolution.nHeightBreakpoint
                    //     ? 3.6
                    //     : 6,
                  }}
                  date={dtFriendDOB}
                  mode="date"
                  placeholder="Enter Date of Birth"
                  format={sDateFormatDatePicker}
                  //minDate={dtToday}
                  maxDate={dtToday}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateIcon: {
                      borderWidth: 0,
                      borderStyle: null,
                      height: 0,
                      width: 0,
                    },
                    dateText: {
                      textAlign: 'left',
                      fontSize: wp(5),
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontFamily: sFontName,
                    },
                    placeholderText: {
                      color: Colors.grey,
                      textAlign: 'left',
                      fontSize: wp(5),
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontFamily: sFontName,
                    },
                    // dateIcon: {
                    //   width:0,
                    //   height:0,
                    //   },
                    dateInput: {
                      //textAlign:'left',
                      //height:hp(6),
                      marginRight: wp(2.75),
                      flexGrow: 1,
                      // backgroundColor: Colors.white,
                      borderLeftWidth: 0,
                      borderRightWidth: 0,
                      borderTopWidth: 0,
                      borderRadius: 0,
                      borderWidth: 1,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      //overflow: 'hidden',
                      // borderColor: Colors.white,
                      //justifyContent: 'flex-start',
                      alignItems: 'flex-start',
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
                Please enter Date of Birth
              </Text>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title="VERIFY & CONTINUE"
              onPress={handleSubmit(onSubmit)}
              titleStyle={{
                color: Colors.white,
                fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                fontFamily:
                  Platform.OS === 'android' ? sFontNameBold : sFontName,
              }}
              containerStyle={{
                marginTop: hp(3),
                marginBottom:hp(1)
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
    headerTitle: "FRIEND'S CHATREL",
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
    // marginHorizontal:
    //   Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
  },
  headingContainer: {
    width: wp(55),
    height: hp(4),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 22.2
        : 37,
  },
  headingComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 14.4 : 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blue,
    fontFamily: sFontName,
  },

  labelContainer: {
    marginBottom: hp(1),
  },
  labelComponent: {
    textAlign: 'left',
    fontSize: wp(3.75),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    fontFamily: sFontName,
  },
  valueContainer: {},
  valueComponent: {
    textAlign: 'left',
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
  },

  // gbidLabelContainer: {},
  // gbidLabelComponent: {
  //   // width: '100%',
  //   // height: '100%',
  //   textAlign: 'left',
  //   fontSize:
  //     Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   color: Colors.primary,
  //   fontFamily: sFontName,
  // },
  // gbidValueContainer: {},

  // firstNameLabelContainer: {
  //   // width: wp(22),
  //   // height: hp(2),
  //   marginBottom:
  //     Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6,
  // },
  // firstNameLabelComponent: {
  //   // width: '100%',
  //   // height: '100%',
  //   textAlign: 'left',
  //   fontSize:
  //     Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   color: Colors.primary,
  //   fontFamily: sFontName,
  // },
  // firstNameValueContainer: {},

  // lastNameLabelContainer: {
  //   // width: wp(22),
  //   // height: hp(2),
  //   marginBottom:
  //     Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6,
  // },
  // lastNameLabelComponent: {
  //   // width: '100%',
  //   // height: '100%',
  //   textAlign: 'left',
  //   fontSize:
  //     Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   color: Colors.primary,
  //   fontFamily: sFontName,
  // },
  // lastNameValueContainer: {},

  // dobLabelContainer: {
  //   marginBottom:
  //     Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6,
  // },
  // dobLabelComponent: {
  //   // width: '100%',
  //   // height: '100%',
  //   textAlign: 'left',
  //   fontSize:
  //     Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   color: Colors.primary,
  //   fontFamily: sFontName,
  // },
  dobValueContainer: {
    // marginBottom:
    //   Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 30 : 50,
    marginBottom: hp(1),
  },
  buttonContainer: {},
  cardContainerStyle: {
    width: wp(92.5),
    backgroundColor: Colors.white,
    marginTop: hp(5),
    //Border Stuff
    borderRadius: 15,
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
    // backgroundColor:Colors.white,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: -55,
    // left:20,
    //Border Stuff
    borderRadius: 10,
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS

    //For Android
    elevation: 15,
    // overflow: 'visible',
  },
  valueContainerStyle: {
    paddingHorizontal: 0,
  },
});
