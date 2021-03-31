import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  Linking,
} from 'react-native';
import {Card, Button, Avatar} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {
  sFontName,
  sFontNameBold,
  sFAQURL,
  sHimalayaFontName,
  sLogoutConfirmation,
  sInvalidDetailsForChatrel,
  sPleaseContactCTA,
  sAttentionRequired,
  sSomethingWentWrongPleaseTryAgainLater,
} from '../constants/CommonConfig';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {removeGoogleCreds} from '../store/actions/GLoginAction';
import {removeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import {
  removeGBDetails,
  removeJWTToken,
  storeJWTToken,
  storePaidUntil,
} from '../store/actions/GBDetailsAction';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {Loader} from '../components/Loader';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen = (props) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Logout',
          sLogoutConfirmation,
          [
            {
              text: 'No',
              onPress: () => true,
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => removeCompleteDetailsAndNavigateToLogin(),
            },
          ],
          {cancelable: false},
        );

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const Device = require('react-native-device-detection');
  const [bLoader, setbLoader] = useState(true);
  const [dollarToRupees, setDollarToRupees] = React.useState(0.0);
  const [activeSections, setactiveSections] = useState([]);
  const [chatrelPending, setChatrelPending] = React.useState(null);
  const [currencySymbol, setCurrencySymbol] = React.useState();
  const [paymentData, setPaymentData] = React.useState();
  const [outstanding, setOutstanding] = useState(false);
  const [donationDiv, setDonationDiv] = useState(false);
  const [thankYouMsg, setThankYouMsg] = useState(false);
  const [thankYouMessageContent, setThankYouMessageContent] = useState('');
  const [empty, setEmpty] = useState(false);
  const [sHomePageImage, setsHomePageImage] = useState(null);
  const [sHomePageMessage, setsHomePageMessage] = useState(null);
  const [sHomePageName, setsHomePageName] = useState(null);
  const [sHomePageDesignation, setsHomePageDesignation] = useState(null);
  const [sFAQDocument, setsFAQDocument] = useState(null);
  const isFocused = useIsFocused();

  const aCard = [
    {
      id: 1,
      sContent: 'Contribute Now!',
      sRouteName: 'SelfChatrel',
      sIconName: 'donate',
    },
    {
      id: 2,
      sContent: 'Contribute for Family & Friends!',
      sRouteName: 'FriendChatrelIntermediate',
      sIconName: 'leaf',
    },
  ];

  const oCurrentGBDetails = useSelector(
    (state) => state.GBDetailsReducer.oGBDetails,
  );

  const dispatch = useDispatch();
  let keysToRemove = ['oUserInfo', 'oGBInfo'];
  let navigation = useNavigation();

  const removeCompleteDetailsAndNavigateToLogin = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      //await AsyncStorage.multiRemove(keysToRemove, (err) => {
      axios
        .get(`/User/Logout`)
        .then((resp) => {
          if (
            resp.status === 200 &&
            resp.data.message === 'Logged Out successfully'
          ) {
            dispatch(removeGoogleCreds);
            dispatch(removeGBDetails);
            dispatch(removeJWTToken);
            dispatch(removeCurrentGBDetails);
            axios.defaults.headers.common['Authorization'] = undefined;
            navigation.navigate('Login');
          }
        })
        .catch((error) => {
          console.log('Error ', error.response);
          navigation.navigate('Login');
        })
        .then((release) => {
          navigation.navigate('Login');
        });
      //});
    } catch (error) {
      console.error(error);
      navigation.navigate('Login');
    }
  };

  const renderContent = (section, index) => {
    return (
      <View
        key={index}
        style={{
          alignSelf: 'center',
          paddingHorizontal: 10,
          paddingVertical: 10,
          widht: '100%',
        }}>
        <Button
          TouchableComponent={TouchableWithoutFeedback}
          title={section.sContent}
          titleStyle={styles.accodrionContextText}
          onPress={() => {
            navigation.navigate(section.sRouteName);
          }}
          iconLeft
          icon={{
            type: 'font-awesome-5',
            name: section.sIconName,
            color: Colors.greenBG,
          }}
          type="outline"
          buttonStyle={{
            width: '100%',
            backgroundColor: Colors.buttonYellow,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.buttonYellow,

            //For iOS
            shadowRadius: 25,
            shadowColor: Colors.lightBlueChatrelWebsite,
            shadowOffset: {width: 5, height: 5},
            shadowOpacity: 1,

            //For Android
            elevation: 25,
            overflow: 'visible',
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    if (isFocused) {
      console.log('Home Screen Called');
      setbLoader(true);
      setEmpty(false);
      setChatrelPending(null);
      setCurrencySymbol();
      setPaymentData();
      setOutstanding(false);
      setDonationDiv(false);
      setThankYouMsg(false);
      setThankYouMessageContent('');
      setactiveSections([0, 1]);
      setsHomePageImage(null);
      setsHomePageMessage(null);
      setsHomePageName(null);
      setsHomePageDesignation(null);
      setsFAQDocument(null);
      axios
        .get(
          `/ChatrelPayment/DisplayChatrelPayment/?sGBID=` +
            oCurrentGBDetails.sGBID,
        )
        .then((resp) => {
          if (resp.status === 200) {
            const oSession = {
              sJwtToken: resp.data.token,
              bSession: true,
            };
            dispatch(storeJWTToken(oSession));
            fetch('https://api.ratesapi.io/api/latest?base=INR&symbols=USD')
              .then((response) => response.json())
              .then((data) => {
                setDollarToRupees(data.rates.USD);
              });
            if (resp.data.message !== 'Paid Until Missing') {
              dispatch(storePaidUntil(resp.data.chatrel.nPaidUntil));
              if (resp.data.chatrel.chatrelPayment.nChatrelTotalAmount === 0) {
                setChatrelPending('0');
                setThankYouMsg(true);
                if (
                  resp.data.chatrel.chatrelFrom === resp.data.chatrel.chatrelTo
                ) {
                  setThankYouMessageContent(
                    resp.data.chatrel.chatrelFrom +
                      ' - ' +
                      (resp.data.chatrel.chatrelTo + 1).toString().slice(-2),
                  );
                } else {
                  setThankYouMessageContent(
                    resp.data.chatrel.chatrelFrom +
                      ' - ' +
                      (resp.data.chatrel.chatrelFrom + 1).toString().slice(-2) +
                      ' to ' +
                      resp.data.chatrel.chatrelTo +
                      ' - ' +
                      (resp.data.chatrel.chatrelTo + 1).toString().slice(-2),
                  );
                }
                if (
                  resp.data.chatrel.gbChatrels[0].nCurrentChatrelSalaryAmt === 0
                ) {
                  setOutstanding(false);
                } else {
                  setDonationDiv(true);
                }
              } else {
                setChatrelPending(
                  resp.data.chatrel.chatrelPayment.nChatrelTotalAmount,
                );
                setOutstanding(true);
              }
              setPaymentData(resp.data.chatrel);

              if (
                resp.data.chatrel.gbChatrels[0].sAuthRegionCurrency === 'USD'
              ) {
                setCurrencySymbol('$');
              } else {
                setCurrencySymbol('₹');
              }
            } else {
              dispatch(storePaidUntil(null));
              setEmpty(true);
            }
            axios
              .get(`/ChatrelPayment/GetHomePageData`)
              .then((resp) => {
                if (resp.status === 200) {
                  const oSession = {
                    sJwtToken: resp.data.token,
                    bSession: true,
                  };
                  dispatch(storeJWTToken(oSession));
                  setsHomePageImage(resp.data.sHomePageImage);
                  setsHomePageMessage(resp.data.sHomePageMessage);
                  setsHomePageName(resp.data.sHomePageName);
                  setsHomePageDesignation(resp.data.sHomePageDesignation);
                  setsFAQDocument(resp.data.sFAQDocument);
                  setbLoader(false);
                }
              })
              .catch((error) => {
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
              });
          }
        })
        .catch((error) => {
          console.error(error.response)
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
                sInvalidDetailsForChatrel,
                sPleaseContactCTA,
                [
                  {
                    text: 'Logout',
                    onPress: () => removeCompleteDetailsAndNavigateToLogin(),
                  },
                ],
                {cancelable: false},
              );
            }, 1000);
          }
        });
    }
  }, [isFocused]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <Loader loading={bLoader} />
        {/*Thank You Condition*/}
        {thankYouMsg && !bLoader && (
          <View
            style={{
              ...styles.viewMarginComponent,
              // marginTop: hp(1),
            }}>
            <Card containerStyle={styles.pendingAmountComponent}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Icon
                  color={Colors.white}
                  //iconStyle={styles.iconStyles}
                  iconProps={{}}
                  //underlayColor={Colors.websiteLightBlueColor}
                  backgroundColor={Colors.greenBG}
                  //size={40}
                  type="feather"
                  name="check"
                  //containerStyle={styles.iconContainerStyles}
                />
                <View>
                  <Text>
                    <Text
                      style={{
                        ...styles.greyTextComponent,
                        color: Colors.greenBG,
                        textAlign: 'left',
                        fontSize: wp(6),
                        fontFamily: sHimalayaFontName,
                        // lineHeight: Platform.isPad ? hp(0) : hp(3.5),
                        lineHeight:
                          Platform.OS === 'ios'
                            ? Platform.isPad
                              ? hp(5)
                              : hp(3.5)
                            : Device.isTablet
                            ? hp(5)
                            : hp(3.5),
                      }}>
                      རྩིས་ལོ་
                    </Text>
                    <Text
                      style={{
                        ...styles.greyTextComponent,
                        color: Colors.greenBG,
                        textAlign: 'left',
                        fontSize: wp(6),
                        lineHeight:
                          Platform.OS === 'ios'
                            ? Platform.isPad
                              ? hp(5)
                              : hp(3.5)
                            : Device.isTablet
                            ? hp(5)
                            : hp(3.5),
                      }}>
                      {' '}
                      {thankYouMessageContent}{' '}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      ...styles.greyTextComponent,
                      color: Colors.greenBG,
                      textAlign: 'left',
                      fontSize: wp(6),
                      fontFamily: sHimalayaFontName,
                      // lineHeight: Platform.isPad ? hp(0) : hp(3.5),
                      lineHeight:
                        Platform.OS === 'ios'
                          ? Platform.isPad
                            ? hp(5)
                            : hp(3.5)
                          : Device.isTablet
                          ? hp(5)
                          : hp(3.5),
                    }}>
                    ལོའི་དྭང་བླངས་དཔྱ་དངུལ་འབུལ་འབབ་གཙང་འབུལ་ཟིན།
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        )}
        {/*Chatrel President*/}
        {sHomePageImage &&
          sHomePageMessage &&
          sHomePageName &&
          sHomePageDesignation && (
            <Card
              containerStyle={{
                ...styles.presidentCardContainerStyle,
                marginBottom: hp(1),
                marginTop: hp(5),
              }}
              title={
                <Avatar
                  rounded
                  size="large"
                  containerStyle={styles.avatarContainerStyle}
                  source={{
                    uri: sHomePageImage,
                  }}
                />
              }
              titleStyle={{}}>
              {/*<Card.Divider style={styles.presidentCardDividerStyle} />*/}
              <View style={{marginTop: hp(5)}}>
                <View style={styles.viewMarginComponent}>
                  <Text
                    style={{
                      ...styles.greyTextComponent,
                      marginBottom: hp(1.25),
                      fontSize: wp(4.75),
                    }}>
                    {sHomePageMessage}
                  </Text>
                </View>
                <View style={styles.viewMarginComponent}>
                  <Text style={styles.boldTextComponent}>{sHomePageName}</Text>
                </View>
                <View style={{...styles.viewMarginComponent, marginBottom: 0}}>
                  <Text
                    style={{
                      ...styles.greyTextComponent,
                      fontSize: wp(5),
                    }}>
                    {sHomePageDesignation}
                  </Text>
                </View>
              </View>
            </Card>
          )}
        {/*Paid Until Missing*/}
        {empty && !bLoader && (
          <Card
            title={
              <View style={styles.titleStyleView}>
                <Icon
                  color={Colors.white}
                  iconStyle={styles.iconStyles}
                  iconProps={{}}
                  //underlayColor={Colors.websiteLightBlueColor}
                  backgroundColor={Colors.websiteLightBlueColor}
                  size={40}
                  type="font-awesome-5"
                  name="briefcase"
                  containerStyle={styles.iconContainerStyles}
                />
              </View>
            }
            titleStyle={{}}
            containerStyle={{
              ...styles.newJobContribCardContainer,
              marginTop: hp(10),
            }}>
            <View style={styles.viewMarginComponent}>
              <Text>
                <Text style={{...styles.greyTextComponent, textAlign: 'left'}}>
                  There is no chatrel contribution record in the database. You
                  are requested to upload your two year chatrel receipt copy{' '}
                </Text>
                <Text
                  style={{
                    ...styles.greyTextComponent,
                    textAlign: 'left',
                    textDecorationLine: 'underline',
                    textDecorationColor: Colors.ChatrelInfoBlue,
                    color: Colors.ChatrelInfoBlue,
                  }}
                  onPress={() => {
                    navigation.navigate('FileDispute');
                  }}>
                  here
                </Text>
              </Text>
            </View>
          </Card>
        )}
        {/* 2 Buttons Render*/}
        <View
          style={{
            ...styles.viewMarginComponent,
            marginTop: hp(2),
            //marginBottom: hp(5),
          }}>
          {aCard.map((card, index) => {
            return renderContent(card, index);
          })}
        </View>
        {/*First Condition*/}
        {outstanding && !bLoader && (
          <View
            style={{
              ...styles.viewMarginComponent,
              marginBottom: hp(5),
            }}>
            <Card containerStyle={styles.pendingAmountComponent}>
              {/* <Card.Image
                style={styles.pendingAmountImageComponent}
                source={require('../assets/Pay.png')}
              /> */}
              {/* <Card.Divider /> */}
              <View>
                <Text style={styles.greyTextComponent}>
                  Your Pending Contribution is:
                </Text>
                <Text style={styles.boldTextComponent}>
                  {currencySymbol}
                  {chatrelPending}
                </Text>
              </View>
              <Button
                titleStyle={{
                  color: Colors.white,
                  fontStyle: 'normal',
                  fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                  fontFamily:
                    Platform.OS === 'android' ? sFontNameBold : sFontName,
                  fontSize: wp(4),
                }}
                buttonStyle={{
                  alignSelf: 'center',
                  backgroundColor: Colors.greenBG,
                  marginTop: hp(2),
                  borderRadius:
                    Dimensions.get('window').width < Resolution.nWidthBreakpoint
                      ? 10.2
                      : 17,
                  width: wp(75),
                }}
                title="CONTRIBUTE NOW"
                onPress={() => {
                  navigation.navigate('SelfChatrel');
                }}
              />
            </Card>
          </View>
        )}
        {/*New Job Contribution*/}
        {!outstanding && !empty && !donationDiv && !bLoader && (
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
                  name="briefcase"
                  containerStyle={styles.iconContainerStyles}
                />
              </View>
            }
            titleStyle={{}}
            containerStyle={styles.newJobContribCardContainer}>
            <View style={styles.viewMarginComponent}>
              <Text style={styles.boldTextComponent}>
                Have you got a job now?
              </Text>
            </View>
            <View style={styles.viewMarginComponent}>
              <Text style={styles.greyTextComponent}>
                Change your status and contribute more towards the Tibetan
                Government.
              </Text>
            </View>
            <Button
              title="UPDATE EMPLOYMENT STATUS"
              titleStyle={{
                color: Colors.white,
                fontStyle: 'normal',
                fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                fontFamily:
                  Platform.OS === 'android' ? sFontNameBold : sFontName,
                textAlign: 'center',
              }}
              buttonStyle={{
                backgroundColor: Colors.websiteLightBlueColor,
                borderRadius: 15,
              }}
              onPress={() => {
                navigation.navigate('SelfChatrel');
              }}
            />
          </Card>
        )}
        {/*Additional Donation Card*/}
        {donationDiv && !empty && !bLoader && (
          <Card
            title={
              <View style={styles.titleStyleView}>
                <Icon
                  color={Colors.white}
                  iconStyle={styles.iconStyles}
                  iconProps={{}}
                  //underlayColor={Colors.websiteLightBlueColor}
                  backgroundColor={Colors.websiteLightBlueColor}
                  size={40}
                  type="font-awesome-5"
                  name="donate"
                  containerStyle={styles.iconContainerStyles}
                />
              </View>
            }
            titleStyle={{}}
            containerStyle={styles.newJobContribCardContainer}>
            <View style={styles.viewMarginComponent}>
              <Text style={styles.boldTextComponent}>
                Make Additional Donation
              </Text>
            </View>
            <View style={styles.viewMarginComponent}>
              <Text style={styles.greyTextComponent}>
                Contribute more by paying additional donation towards the
                Tibetan Government.
              </Text>
            </View>
            <Button
              title="DONATE"
              titleStyle={{
                color: Colors.white,
                fontStyle: 'normal',
                fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                fontFamily:
                  Platform.OS === 'android' ? sFontNameBold : sFontName,
                textAlign: 'center',
              }}
              buttonStyle={{
                backgroundColor: Colors.websiteLightBlueColor,
                borderRadius: 15,
              }}
              onPress={() => {
                navigation.navigate('SelfChatrel');
              }}
            />
          </Card>
        )}
        {/*Goals of Chatrel*/}
        <Card
          containerStyle={{
            ...styles.presidentCardContainerStyle,
            marginBottom: hp(1),
          }}>
          {/*<Card.Divider style={styles.cardDividerStyle} />*/}
          <View>
            <View style={styles.viewMarginComponent}>
              <Text style={styles.boldTextComponent}>
                Goals and Needs of Chatrel
              </Text>
            </View>
            <View style={styles.viewMarginComponent}>
              <Text style={styles.greyTextComponent}>
                Chatrel symbolizes the Tibetan people’s recognition of CTA as
                their legitimate representative. Chatrel payment exhibits
                Tibetan people’s support for CTA’s financial needs until Tibet
                regains freedom.
              </Text>
            </View>
            <View style={{...styles.viewMarginComponent, marginBottom: 0}}>
              <Button
                title="READ FAQs"
                titleStyle={{
                  color: Colors.white,
                  fontFamily: sFontName,
                  fontStyle: 'normal',
                  fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                  fontFamily:
                    Platform.OS === 'android' ? sFontNameBold : sFontName,
                  textAlign: 'center',
                }}
                buttonStyle={{
                  backgroundColor: Colors.faqButtonColor,
                  borderRadius: 15,
                }}
                onPress={() => {
                  Linking.openURL(sFAQURL);
                }}>
                READ FAQs
              </Button>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export const HomeScreenOptions = (navData) => {
  return {
    headerTitle: 'HOME',
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
  headerContainer: {},
  headerComponent: {
    color: Colors.blue,
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    marginBottom: hp(2),
    textAlign: 'left',
    width: wp(60),
    // height: hp(4),
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 20 : 25,
  },
  singleCardContainer: {
    width: wp(105) / 3,
  },
  singleCardComponent: {
    // height:
    //   Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 54 : 90,
    // lineHeight:hp(5)
  },
  pendingAmountContainer: {},
  pendingAmountComponent: {
    width: wp(92.5),
    backgroundColor: Colors.white,
    marginBottom: hp(5),
    //Border Stuff
    borderRadius: 15,
    marginBottom: hp(2),
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
  pendingAmountImageComponent: {
    width: wp(75),
    height: hp(33),
  },
  pendingAmountTextComponent: {
    color: Colors.black,
    fontSize: wp(4),
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginBottom: hp(2),
    textAlign: 'left',
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
  },
  newJobContribCardContainer: {
    width: wp(92.5),
    backgroundColor: Colors.white,
    marginTop: hp(5),
    marginBottom: hp(5),
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
  newJobContribTextContainer: {
    marginBottom: hp(2),
  },
  newJobContribTextComponent: {
    color: Colors.blackText,
    fontSize: wp(6),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    textAlign: 'center',
  },
  viewMarginComponent: {
    marginBottom: hp(2.5),
    //width: wp(70),
    //height: hp(33),
  },
  jobContribStatusTextComponent: {
    color: Colors.grey,
    fontSize: wp(5),
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  presidentCardContainerStyle: {
    width: wp(92.5),
    backgroundColor: Colors.white,

    //Border Stuff
    borderRadius: 15,
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS
    shadowRadius: 25,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,

    //For Android
    elevation: 25,
    overflow: 'visible',
  },
  titleViewStyle: {
    // marginBottom: hp(2),
  },

  avatarContainerStyle: {
    alignSelf: 'center',
    position: 'absolute',
    top: -55,
  },
  cardDividerStyle: {
    backgroundColor: Colors.buttonYellow,
    height: 1,
    marginBottom: hp(3),
  },
  presidentCardDividerStyle: {
    backgroundColor: Colors.buttonYellow,
    height: 1,
    marginBottom: hp(3),
    marginTop: hp(5),
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
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 15,
    position: 'absolute',
    top: -55,
    // left:20,
    //Border Stuff
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS

    //For Android
    // overflow: 'visible',
  },

  boldTextComponent: {
    color: Colors.blackText,
    fontSize: wp(6),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    textAlign: 'center',
  },
  greyTextComponent: {
    color: Colors.labelColorLight,
    fontSize: wp(5.25),
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: hp(3.5),
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
    textAlign: 'center',
  },
  accordionListHeader: {
    alignItems: 'center',
    backgroundColor: Colors.websiteLightBlueColor,
    borderWidth: 1,
    borderColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: wp(3.5),
    marginRight: wp(5),
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: wp(92.5),
  },
  accodrionHeaderText: {
    color: Colors.white,
    fontSize: wp(5.5),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    textAlign: 'left',
  },
  accordionListContent: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: wp(3.5),
    marginVertical: 5,
    width: wp(92.5),
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderWidth: 1,
    // borderColor: Colors.black,
  },
  accodrionContextText: {
    color: Colors.black,
    fontSize: wp(4),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    textAlign: 'center',
    // padding:5
  },
  badgeContainerStyle: {
    marginBottom: hp(1),
  },
  badgeStyle: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.websiteLightBlueColor,
    textAlignVertical: 'center',
  },
});

export default HomeScreen;
