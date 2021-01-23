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
import {Input, Button} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {CustomHeaderRightButton} from '../components/HeaderRightButton';
import {useForm, Controller} from 'react-hook-form';
import {
  errorComponent,
  errorContainer,
  sDateFormat,
  sDateFormatDatePicker,
  sISODateFormat,
  oActivityIndicatorStyle,
} from '../constants/CommonConfig';
import {useSelector, useDispatch} from 'react-redux';
import {storeGBDetails} from '../store/actions/GBDetailsAction';
import {storeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {sFontName} from '../constants/CommonConfig';
import axios from 'axios';

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
      {bLoader && (
        <ActivityIndicator
          size={Platform.OS === 'ios' ? 0 : 'large'}
          color={Colors.grey}
          animating={true}
          //hidesWhenStopped={true}
          style={oActivityIndicatorStyle}
        />
      )}
      <View style={styles.mainContainer}>
        {/*<View style={styles.headingContainer}>
          <Text style={styles.headingComponent}>Chatrel For Friends</Text>
  </View>*/}

        <View style={styles.firstNameLabelContainer}>
          <Text style={styles.firstNameLabelComponent}>FIRST NAME</Text>
        </View>
        <View style={styles.firstNameValueContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={{
                  //height: hp(2.5),
                  //marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  borderColor: Colors.white,
                }}
                style={{
                  textAlign: 'left',
                  fontSize:
                    Dimensions.get('window').width < Resolution.nWidthBreakpoint
                      ? 10.5
                      : 17.5,
                  fontStyle: 'normal',
                  fontWeight: '300',
                  fontFamily: sFontName,
                }}
                //label="Friend's Firstname"
                placeholder=" Friend's First Name"
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
              <Text style={errorComponent}>Please enter first name.</Text>
            </View>
          )}
        </View>
        <View style={styles.lastNameLabelContainer}>
          <Text style={styles.lastNameLabelComponent}>LAST NAME</Text>
        </View>
        <View style={styles.lastNameValueContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={{
                  //height: hp(2.5),
                  //marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  borderColor: Colors.white,
                }}
                style={{
                  textAlign: 'left',
                  fontSize:
                    Dimensions.get('window').width < Resolution.nWidthBreakpoint
                      ? 10.5
                      : 17.5,
                  fontStyle: 'normal',
                  fontWeight: '300',
                  fontFamily: sFontName,
                }}
                //label="Friend's Lastname"
                placeholder=" Friend's Last Name"
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
              <Text style={errorComponent}>Please enter last name.</Text>
            </View>
          )}
        </View>
        {/*GBID*/}
        <View style={styles.gbidLabelContainer}>
          <Text style={styles.gbidLabelComponent}>GREEN BOOK ID</Text>
        </View>
        <View style={styles.gbidValueContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={{
                  //height: hp(2.5),
                  //marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
                  borderRadius: 10,
                  backgroundColor: Colors.white,
                  borderColor: Colors.white,
                }}
                style={{
                  //color:Colors.black,
                  textAlign: 'left',
                  fontSize:
                    Dimensions.get('window').width < Resolution.nWidthBreakpoint
                      ? 10.5
                      : 17.5,
                  fontStyle: 'normal',
                  fontWeight: '300',
                  fontFamily: sFontName,
                }}
                //label="Friend's GBID"
                placeholder=" Friend's Green Book Number"
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
                Please enter Green Book Number.
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
        <View style={styles.dobLabelContainer}>
          <Text style={styles.dobLabelComponent}>DATE OF BIRTH</Text>
        </View>
        <View style={styles.dobValueContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <DatePicker
                useNativeDriver={true}
                androidMode={'calendar'}
                style={{
                  width: Dimensions.get('window').width * 0.875,
                  //backgroundColor: Colors.white,
                  //borderColor: Colors.white
                  marginBottom:
                    Dimensions.get('window').height <
                    Resolution.nHeightBreakpoint
                      ? 3.6
                      : 6,
                }}
                date={dtFriendDOB}
                mode="date"
                placeholder=" Friend's Date Of Birth"
                format={sDateFormatDatePicker}
                //minDate={dtToday}
                maxDate={dtToday}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  // dateIcon: {
                  //   position: 'absolute',
                  //   left: 0,
                  //   top: 4,
                  //   marginLeft: 0
                  // },
                  dateText: {
                    textAlign: 'left',
                    fontSize:
                      Dimensions.get('window').width <
                      Resolution.nWidthBreakpoint
                        ? 10.5
                        : 17.5,
                    fontStyle: 'normal',
                    fontWeight: '300',
                    fontFamily: sFontName,
                  },
                  placeholderText: {
                    color: Colors.grey,
                    textAlign: 'left',
                    fontSize:
                      Dimensions.get('window').width <
                      Resolution.nWidthBreakpoint
                        ? 10.5
                        : 17.5,
                    fontStyle: 'normal',
                    fontWeight: '300',
                    fontFamily: sFontName,
                  },
                  // dateIcon: {
                  //   width:0,
                  //   height:0,
                  //   },
                  dateInput: {
                    //textAlign:'left',
                    //height:hp(6),
                    marginLeft: wp(2.75),
                    flexGrow: 1,
                    backgroundColor: Colors.white,
                    borderRadius: 10,
                    borderWidth: 1,
                    //overflow: 'hidden',
                    borderColor: Colors.white,
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
          {errors.name_dtFriendDOB && (
            <View style={errorContainer}>
              <Text style={errorComponent}>Please enter Date of Birth.</Text>
            </View>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="VERIFY & CONTINUE"
            onPress={handleSubmit(onSubmit)}
            titleStyle={{
              color: Colors.white,
              fontFamily: sFontName,
            }}
            buttonStyle={{
              backgroundColor: Colors.primary,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: Colors.primary,
            }}
          />
        </View>
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
    cardStyle: {backgroundColor: Colors.blueCardColor},
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
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
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sFontName,
  },

  gbidLabelContainer: {
    width: wp(22),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6,
  },
  gbidLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.primary,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sFontName,
  },
  gbidValueContainer: {},

  firstNameLabelContainer: {
    width: wp(22),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6,
  },
  firstNameLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.primary,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sFontName,
  },
  firstNameValueContainer: {},

  lastNameLabelContainer: {
    width: wp(22),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6,
  },
  lastNameLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.primary,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sFontName,
  },
  lastNameValueContainer: {},

  dobLabelContainer: {
    width: wp(22),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6,
  },
  dobLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.primary,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sFontName,
  },
  dobValueContainer: {
    //flexGrow:1,
    //width: wp(85),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 30 : 50,
  },
  buttonContainer: {},
});
