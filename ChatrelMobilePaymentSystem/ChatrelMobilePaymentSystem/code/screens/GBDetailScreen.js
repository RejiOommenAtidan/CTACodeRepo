import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Switch,
  BackHandler,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {sDateFormatDatePicker} from '../constants/CommonConfig';
import Moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {storeGBDetails} from '../store/actions/GBDetailsAction';
import {storeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
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
import axios from 'axios';

export const GBDetailScreen = (props) => {
  useEffect(() => {
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

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
    };
  }, []);

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

  const dispatch = useDispatch();
  let keysToRemove = ['oUserInfo', 'oGBInfo'];
  const navigation = useNavigation();
  const [sGBID, setsGBID] = useState('');
  const [bShowGBID, setbShowGBID] = useState(true);
  const [dtDOB, setdtDOB] = useState(null);
  const dtToday = Moment().format(sDateFormatDatePicker);
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const removeCompleteDetailsAndNavigateToLogin = async () => {
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await AsyncStorage.multiRemove(keysToRemove, (err) => {
            dispatch(removeGoogleCreds);
            dispatch(removeGBDetails);
            dispatch(removeCurrentGBDetails);
            navigation.navigate("Login");
        });
    }
    catch (error) {
        console.error(error);
    }
};
  const handleVerifyDetailsPress = async () => {
    let oGBDetails = {
      sGBID: sGBID,
      dtDob: dtDOB,
    };
    let oAPI = {
      sGBID: sGBID,
      dtDOB: dtDOB,
      sFirstName: oGoogle.givenName,
      sLastName: oGoogle.familyName,
      sEmail: oGoogle.email,
    };
    axios
      .post('ChatrelPayment/AuthenticateGBID', oAPI)
      .then((response) => {
        if(response.data=="Verified"){
          dispatch(storeGBDetails(oGBDetails));
          dispatch(storeCurrentGBDetails(oGBDetails));
          try {
            const jsonGBInfoValue = JSON.stringify(oGBDetails);
            AsyncStorage.setItem('oGBInfo', jsonGBInfoValue);
          } catch (e) {
            console.info(e);
          }
          props.navigation.navigate('Home');
        }
        if(response.data=="Failed"){
          Alert.alert("Invalid Credentials", "Please Contact CTA",
            [
                {
                    text: 'Okay',
                    onPress: () => true,
                    style: 'cancel'
                },
                { text: 'Logout', onPress: () => removeCompleteDetailsAndNavigateToLogin() }
            ],
            { cancelable: false }
        );
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
        Alert.alert("Invalid Credentials", "Please Contact CTA",
            [
                {
                    text: 'Okay',
                    onPress: () => true,
                    style: 'cancel'
                },
                { text: 'Logout', onPress: () => removeCompleteDetailsAndNavigateToLogin() }
            ],
            { cancelable: false }
        );
      });
  };

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={styles.imagebacgroundComponent}
      resizeMode="cover">
      <LinearGradient
        style={styles.linearGradient}
        colors={['#000000', '#000000']}
        //start={{ x: 0.5, y: 0.5 }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerComponent}>Verify your Details</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textComponent}>All fields are Mandatory</Text>
          </View>
          {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
          <View style={styles.gbidContainer}>
            <Input
              //label="Enter GBID"
              placeholder="Green Book Number"
              //autoFocus={true}
              autoCompleteType={'off'}
              autoCorrect={false}
              clearButtonMode={'while-editing'}
              //secureTextEntry={!bShowGBID}
              keyboardType={'number-pad'}
              keyboardAppearance={'default'}
              disableFullscreenUI={true}
              maxLength={7}
              onChangeText={(value) => {
                setsGBID(value);
              }}
              value={sGBID}
              style={styles.gbidComponent}
            />
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
            <DatePicker
              androidMode={'spinner'}
              //style={styles.dobComponent}
              date={dtDOB}
              mode="date"
              placeholder="Date of Birth"
              format={sDateFormatDatePicker}
              maxDate={dtToday}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateText: {
                  textAlign: 'left',
                  color: Colors.white,
                  fontSize:
                    Dimensions.get('window').width < Resolution.nWidthBreakpoint
                      ? 12
                      : 20,
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontFamily: 'Kanit-Light',
                },
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top:
                    Dimensions.get('window').height <
                    Resolution.nHeightBreakpoint
                      ? 2.4
                      : 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft:
                    Dimensions.get('window').width < Resolution.nWidthBreakpoint
                      ? 21.6
                      : 36,
                },
              }}
              onDateChange={(date) => {
                console.log(date);
                setdtDOB(date);
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              titleStyle={{color: Colors.black}}
              buttonStyle={styles.buttonComponent}
              title="Verify Details"
              onPress={() => {
                handleVerifyDetailsPress();
              }}
            />
          </View>
          {/*</form>*/}
        </View>
      </LinearGradient>
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

// console.log(Dimensions.get('window').width);
// console.log(Dimensions.get('window').height);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
    flexDirection: 'column',
  },
  imagebacgroundComponent: {
    flex: 1,
  },
  headerContainer: {
    width: wp(70),
    height: hp(6.5),
    marginTop: hp(27.5),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6,
  },
  headerComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 18 : 30,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.white,
    fontFamily: 'Kanit-Regular',
    lineHeight:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
  },
  textContainer: {
    width: wp(70),
    height: hp(3.5),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },
  textComponent: {
    fontFamily: 'NunitoSans-Light',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    textAlign: 'left',
    fontStyle: 'normal',
    fontWeight: '300',
    color: Colors.white,
    lineHeight:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.6 : 18,
    //letterSpacing: Resolution.nLetterSpacing,
  },
  gbidContainer: {
    width: wp(77.5),
    height: hp(3.5),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 20.4
        : 34,
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
    fontWeight: '300',
    fontFamily: 'Kanit-Light',
  },
  dobContainer: {
    width: wp(80),
    height: hp(3.5),
    marginTop:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 20.4
        : 34,
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 20.4
        : 34,
  },
  dobComponent: {
    // textAlign: "left",
    // color: Colors.white,
    // fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 12 : 20,
    // fontStyle: "normal",
    // fontWeight: "normal",
    // fontFamily: 'Kanit-Light'
  },
  buttonContainer: {
    width: wp(80),
    height: hp(3.5),
    marginTop:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 20.4
        : 34,
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 20.4
        : 34,
  },
  buttonComponent: {
    backgroundColor: Colors.buttonYellow,
    height: hp(4.25),
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
    opacity: 0.675,
  },
});
