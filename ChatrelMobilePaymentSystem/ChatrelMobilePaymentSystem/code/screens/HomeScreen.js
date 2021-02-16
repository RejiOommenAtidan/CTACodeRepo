import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  Alert,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Card, Button, Avatar, Badge} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {
  sFontName,
  sFontNameBold,
  oActivityIndicatorStyle,
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
} from '../store/actions/GBDetailsAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import {Loader} from '../components/Loader';
import {useFocusEffect} from '@react-navigation/native';
import {CustomHeaderRightButton} from '../components/HeaderRightButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useCollapsibleHeader} from 'react-navigation-collapsible';

// import { withNavigationFocus } from 'react-navigation';
//import CustomHeaderButton from '../components/HeaderButton';

const HomeScreen = (props) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
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

  // const [paidUnitlMissing, setpaidUntilMissing] = useState(false);
  // const [nChatrelTotalAmount, setnChatrelTotalAmount] = useState(0);
  // const [nCurrentChatrelSalaryAmt, setnCurrentChatrelSalaryAmt] = useState(0);
  // const [sCurrencySign, setsCurrencySign] = useState('USD');
  const [bLoader, setbLoader] = useState(true);
  const [dollarToRupees, setDollarToRupees] = React.useState(0.0);
  const [activeSections, setactiveSections] = useState([]);

  const [chatrelPending, setChatrelPending] = React.useState(null);
  const [currencySymbol, setCurrencySymbol] = React.useState();
  const [paymentData, setPaymentData] = React.useState();
  const [outstanding, setOutstanding] = useState(false);
  const [donationDiv, setDonationDiv] = useState(false);
  const [thankYouMsg, setThankYouMsg] = useState(false);
  const [empty, setEmpty] = useState(false);

  const isFocused = useIsFocused();

  const aCard = [
    {
      id: 1,
      sHeader: 'Self Chatrel',
      // sContent: 'Make Chatrel Payments for yourself online!!',
      sContent: 'Contribute Now!',
      sLabel: `Self\nChatrel`,
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: 'SelfChatrel',
      sBGColor: Colors.buttonYellow,
      sTextColor: Colors.greenBG,
      sIconName: 'donate',
      sIconColor: Colors.greenBG,
    },
    {
      id: 2,
      sHeader: 'Friends & Family Chatrel',
      // sContent: 'Pay Instantly for all of your Friends & Family', //46
      sContent: 'Contribute for Family & Friends!', //46
      sLabel: `Friends & Family Chatrel`,
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: 'FriendChatrelIntermediate',
      sBGColor: Colors.greenBG,
      sTextColor: Colors.buttonYellow,
      sIconName: 'leaf',
      sIconColor: Colors.buttonYellow,
    },
    // {
    //   id: 3,
    //   sHeader: 'Friend Chatrel',
    //   sContent: 'Get payments of your friends done too',
    //   sLabel: `Friend\nChatrel`,
    //   sImagePath: require('../assets/CTALogo.png'),
    //   sRouteName: 'FriendChatrelIntermediate',
    //   sBGColor: Colors.blueCardColor,
    //   sTextColor: Colors.primary,
    //   sIconName: 'users',
    //   sIconColor: Colors.blue,
    // },
  ];

  const oCurrentGBDetails = useSelector(
    (state) => state.GBDetailsReducer.oGBDetails,
  );

  const dispatch = useDispatch();
  let keysToRemove = ['oUserInfo', 'oGBInfo'];
  const navigation = useNavigation();

  const removeCompleteDetailsAndNavigateToLogin = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.multiRemove(keysToRemove, (err) => {
        dispatch(removeGoogleCreds);
        dispatch(removeGBDetails);
        dispatch(removeJWTToken);
        dispatch(removeCurrentGBDetails);
        navigation.navigate('Login');
      });
    } catch (error) {
      console.error(error);
      navigation.navigate('Login');
    }
  };

  const getChatrelDetails = () => {
    axios
      .get(
        `/ChatrelPayment/DisplayChatrelPayment/?sGBID=` +
          oCurrentGBDetails.sGBID,
      )
      .then((resp) => {
        // if (resp.status === 200) {
        //   const oSession = {
        //     sJwtToken: resp.data.token,
        //     bSession: true,
        //   };
        //   dispatch(storeJWTToken(oSession));
        //   console.log(resp.data);
        //   if (resp.data.chatrel.chatrelPayment) {
        //     if (resp.data.chatrel.message === 'Paid Until Missing') {
        //       setpaidUntilMissing(true);
        //     }
        //     fetch('https://api.ratesapi.io/api/latest?base=INR&symbols=USD')
        //       .then((response) => response.json())
        //       .then((data) => {
        //         setDollarToRupees(data.rates.USD);
        //       });

        //     // resp.data.chatrel.chatrelPayment.nChatrelTotalAmount*parseFloat(dollarToRupees.toFixed(4))
        //     setnChatrelTotalAmount(
        //       resp.data.chatrel.chatrelPayment.nChatrelTotalAmount,
        //     );
        //     setnCurrentChatrelSalaryAmt(
        //       resp.data.chatrel.gbChatrels[0].nCurrentChatrelSalaryAmt,
        //     );

        //     if (resp.data.chatrel.gbChatrels[0].sAuthRegionCurrency === 'USD') {
        //       setsCurrencySign('$');
        //     } else {
        //       setsCurrencySign('₹');
        //     }
        //     setactiveSections([0, 1]);
        //   }
        // }
        // setbLoader(false);

        if (resp.status === 200) {
          console.log('Self Chatrel Payment data:', resp.data);

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
            if (resp.data.chatrel.chatrelPayment.nChatrelTotalAmount === 0) {
              setChatrelPending('0');
              setThankYouMsg(true);
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
            console.log(resp.data.chatrel);

            if (resp.data.chatrel.gbChatrels[0].sAuthRegionCurrency === 'USD') {
              setCurrencySymbol('$');
            } else {
              setCurrencySymbol('₹');
            }
          } else {
            debugger;
            setEmpty(true);
          }
        }
        setbLoader(false);
        //console.log('Data fetched...', resp.data);
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
          console.log(error.response);
          Alert.alert(
            'Invalid details for Chatrel',
            'Please Contact CTA',
            [
              {
                text: 'Logout',
                onPress: () => removeCompleteDetailsAndNavigateToLogin(),
              },
            ],
            {cancelable: false},
          );
        }
      });
  };

  // const renderSectionTitle = (section) => {
  //   return (
  //     <View style={styles.content}>
  //       <Text>{section.content}</Text>
  //     </View>
  //   );
  // };

  const renderHeader = (section, index, expanded) => {
    return (
      <View style={styles.accordionListHeader}>
        <Text style={styles.accodrionHeaderText}>{section.sHeader}</Text>
        {expanded ? (
          <Icon
            style={{fontSize: 20}}
            name="remove-circle"
            color={Colors.white}
          />
        ) : (
          <Icon style={{fontSize: 20}} name="add-circle" color={Colors.white} />
        )}
      </View>
    );
  };
  {
    /*<View style={styles.accordionListContent}>*/
  }
  {
    /* </View> */
  }

  const renderContent = (section) => {
    return (
      <View
        style={{
          // alignContent: 'center',
          // alignItems: 'center',
          widht: '100%',
          alignSelf: 'center',
          // marginVertical: 5,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        {/* <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate(section.sRouteName);
            }}> */}
        {/* <Badge
              containerStyle={styles.badgeContainerStyle}
              badgeStyle={{...styles.badgeStyle,padding:20}}
              value={
                <Text style={styles.accodrionContextText}>
                  {section.sContent}
                </Text>
              }
            /> */}
        <Button
          TouchableComponent={TouchableWithoutFeedback}
          title={
            <Text style={styles.accodrionContextText}>{section.sContent}</Text>
          }
          onPress={() => {
            props.navigation.navigate(section.sRouteName);
          }}
          iconLeft
          icon={{
            type: 'font-awesome-5',
            name: section.sIconName,
            color: Colors.greenBG,
          }}
          type="outline"
          // titleStyle={{
          //   color: Colors.white,
          //   fontStyle: 'normal',
          //   fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
          //   fontFamily:
          //     Platform.OS === 'android' ? sFontNameBold : sFontName,
          //   fontSize: wp(4),
          // }}
          // containerStyle={{
          //   alignContent:"center",
          //   alignItems:"center",
          //   alignSelf:"center",
          // }}
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
        {/* </TouchableWithoutFeedback> */}

        {/*<FontAwesome5
            onPress={() => {
              //console.log(section.sRouteName)
              props.navigation.navigate(section.sRouteName);
            }}
            color={section.sIconColor}
            name={section.sIconName}
            adjustsFontSizeToFit={true}
            size={18}
          //size={size}
          //color={focused ? Colors.black : Colors.black}
          />*/}
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setactiveSections(activeSections);
  };

  useEffect(() => {
    if (isFocused) {
      setbLoader(true);
      setChatrelPending(null);
      setCurrencySymbol();
      setPaymentData();
      setOutstanding(false);
      setDonationDiv(false);
      setThankYouMsg(false);
      setEmpty(false);
      console.log('Home Screen Called');
      setactiveSections([0, 1]);
      getChatrelDetails();
    }
  }, [isFocused]);

  // useEffect(() => {
  //   //getChatrelDetails();
  //   // BackHandler.addEventListener('hardwareBackPress', () => true);
  //   // return () => {
  //   //   BackHandler.removeEventListener('hardwareBackPress', () => true);
  //   // };
  // }, []);

  // const {
  //   onScroll /* Event handler */,
  //   onScrollWithListener /* Event handler creator */,
  //   containerPaddingTop /* number */,
  //   scrollIndicatorInsetTop /* number */,
  //   /* Animated.AnimatedInterpolation by scrolling */
  //   translateY /* 0.0 ~ -headerHeight */,
  //   progress /* 0.0 ~ 1.0 */,
  //   opacity /* 1.0 ~ 0.0 */,
  // } = useCollapsibleHeader(HomeScreenOptions);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <Loader loading={bLoader} />
        {/*Paid Until Missing*/}
        {empty &&
          !bLoader &&
          Alert.alert(
            'Attention Required',
            'Last paid chatrel date not available. Please Contact CTA or file a dispute.',
            [
              {
                text: 'File a Dispute',
                onPress: () => props.navigation.navigate('FileDispute'),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          )}
        {/* <Animated.FlatList
       onScroll={onScroll}
         contentContainerStyle={{ paddingTop: containerPaddingTop }}
         scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
       /> */}
        {/*<View style={styles.headerContainer}>
            <Text style={styles.headerComponent}>Quick Actions</Text>
          </View>*/}
        {/*<View style={styles.cardContainer}>
            {aCard.map((card, index) => {
              return (
                <View key={index} style={styles.singleCardContainer}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setbLoader(true);
                      props.navigation.navigate(card.sRouteName);
                      //console.log(card);
                    }}>
                    <Card
                      containerStyle={{
                        ...styles.singleCardComponent,
                        backgroundColor: card.sBGColor,
                        borderRadius:
                          Dimensions.get('window').width <
                          Resolution.nWidthBreakpoint
                            ? 9
                            : 15,
                      }}
                      title={
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <Text
                            style={{
                              color: card.sTextColor,
                              fontSize: wp(4.25),
                              fontStyle: 'normal',
                              fontWeight: 'normal',
                              lineHeight: hp(3.5),
                              // letterSpacing: Resolution.nLetterSpacing / 2,
                              fontFamily: sFontName,
                            }}>
                            {card.sLabel}
                          </Text>
                          <View style={{flexGrow: 1}} />
                          <FontAwesome5
                            color={card.sIconColor}
                            name={card.sIconName}
                            //adjustsFontSizeToFit={true}
                            size={20}
                            //size={size}
                            //color={focused ? Colors.black : Colors.black}
                          />
                        </View>
                      }
                      titleStyle={{}}>
                      {/*<Card.Title
                        style={{
                          color: card.sTextColor,
                          fontSize: wp(3.2),
                          fontStyle: 'normal',
                          fontWeight: 'bold',
                          //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
                          letterSpacing: Resolution.nLetterSpacing / 2,
                          fontFamily: sFontName,
                        }}>
                        {card.sLabel}
                      </Card.Title>
                      <Card.Divider />
                      <Card.Image source={card.sImagePath} />
                      <Text>{card.sLabel}</Text>
                    </Card>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>*/}
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
                  <Text
                    style={{
                      ...styles.boldTextComponent,
                      textAlign: 'left',
                      color: Colors.greenBG,
                      // fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                      // fontFamily:
                      //   Platform.OS === 'android' ? sFontNameBold : sFontName,
                      // fontSize: wp(5),
                    }}>
                    Thank You!
                  </Text>
                  <Text
                    style={{
                      ...styles.greyTextComponent,
                      color: Colors.greenBG,
                      textAlign: 'left',
                      // fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                      // fontFamily:
                      //   Platform.OS === 'android' ? sFontNameBold : sFontName,
                      fontSize: wp(4),
                    }}>
                    This year's Chatrel has been Contributed!
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        )}
        {/*Chatrel President*/}
        <Card
          containerStyle={{
            ...styles.presidentCardContainerStyle,
            marginBottom: hp(1),
            marginTop: hp(5),
          }}
          title={
            <Avatar
              // overlayContainerStyle={{
              //   padding:0,
              //   margin:0,
              // }}

              //   icon={()=>{
              //     return(           <Badge
              //     status="success"
              //     containerStyle={{position: 'absolute', top: 0, right: 0}}
              //   />)
              //   }}

              //icon={{name: 'user', type: 'font-awesome'}}

              rounded
              size="large"
              containerStyle={styles.avatarContainerStyle}
              source={require('../assets/TPresident.jpeg')}
            />
          }
          titleStyle={{}}>
          {/*<Card.Divider style={styles.presidentCardDividerStyle} />*/}
          <View style={{marginTop: hp(5)}}>
            <View style={styles.viewMarginComponent}>
              <Text style={styles.greyTextComponent}>
                This is a huge step for all the Tibetan people that the Chatrel
                collection services are now Online. Power at your fingertips.
              </Text>
            </View>
            <View style={styles.viewMarginComponent}>
              <Text style={styles.boldTextComponent}>FirstName LastName</Text>
            </View>
            <View style={{...styles.viewMarginComponent, marginBottom: 0}}>
              <Text style={styles.greyTextComponent}>President</Text>
            </View>
          </View>
        </Card>
        {/*Accordions*/}
        <View
          style={{
            ...styles.viewMarginComponent,
            marginTop: hp(2),
            //marginBottom: hp(5),
          }}>
          {aCard.map((card, index) => {
            return renderContent(card);
          })}
          {/* <Accordion
            align={'center'}
            containerStyle={{width: '100%'}}
            expandMultiple={true}
            // touchableComponent={TouchableOpacity}
            underlayColor={Colors.white}
            // sectionContainerStyle={{backgroundColor:Colors.white}}
            sections={aCard}
            activeSections={activeSections}
            // renderSectionTitle={renderSectionTitle}
            duration={500}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
          /> */}
        </View>
        {/*Thank You Card*/}

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
                  marginTop: hp(2),
                  width: wp(75),
                  backgroundColor: Colors.greenBG,
                  borderRadius:
                    Dimensions.get('window').width < Resolution.nWidthBreakpoint
                      ? 10.2
                      : 17,
                  alignSelf: 'center',
                }}
                title="CONTRIBUTE NOW"
                onPress={() => {
                  //setbLoader(true);
                  props.navigation.navigate('SelfChatrel');
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
                textAlign: 'center',
                fontStyle: 'normal',
                fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                fontFamily:
                  Platform.OS === 'android' ? sFontNameBold : sFontName,
              }}
              buttonStyle={{
                backgroundColor: Colors.websiteLightBlueColor,
                borderRadius: 15,
              }}
              onPress={() => {
                //setbLoader(true);
                props.navigation.navigate('SelfChatrel');
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
                textAlign: 'center',
                fontStyle: 'normal',
                fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                fontFamily:
                  Platform.OS === 'android' ? sFontNameBold : sFontName,
              }}
              buttonStyle={{
                backgroundColor: Colors.websiteLightBlueColor,
                borderRadius: 15,
              }}
              onPress={() => {
                //setbLoader(true);
                props.navigation.navigate('SelfChatrel');
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
                  textAlign: 'center',
                  color: Colors.white,
                  fontFamily: sFontName,
                  fontStyle: 'normal',
                  fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                  fontFamily:
                    Platform.OS === 'android' ? sFontNameBold : sFontName,
                }}
                buttonStyle={{
                  backgroundColor: Colors.faqButtonColor,
                  borderRadius: 15,
                }}
                onPress={() => {
                  console.log('FAQs To be Added');
                }}>
                READ FAQs
              </Button>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
  // if (bLoader) {
  //   return (
  //     bLoader && (
  //       <ActivityIndicator
  //         size={Platform.OS === 'ios' ? 0 : 'large'}
  //         color={Colors.spinnerColor}
  //         animating={true}
  //         //hidesWhenStopped={true}
  //         style={oActivityIndicatorStyle}
  //       />
  //     )
  //   )
  // };
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
    width: wp(60),
    // height: hp(4),
    marginBottom: hp(2),
    textAlign: 'left',
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blue,
    fontFamily: sFontName,
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
    fontSize: wp(4),
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    color: Colors.black,
    marginBottom: hp(2),
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
    fontSize: wp(6),
    fontStyle: 'normal',
    textAlign: 'center',
    color: Colors.blackText,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
  viewMarginComponent: {
    //width: wp(70),
    //height: hp(33),
    marginBottom: hp(2.5),
  },
  jobContribStatusTextComponent: {
    fontSize: wp(5),
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    color: Colors.grey,
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
    position: 'absolute',
    alignSelf: 'center',
    top: -55,
  },
  cardDividerStyle: {
    height: 1,
    backgroundColor: Colors.buttonYellow,
    marginBottom: hp(3),
  },
  presidentCardDividerStyle: {
    height: 1,
    backgroundColor: Colors.buttonYellow,
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

  boldTextComponent: {
    fontSize: wp(6),
    fontStyle: 'normal',
    textAlign: 'center',
    color: Colors.blackText,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
  greyTextComponent: {
    fontSize: wp(5.25),
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    color: Colors.labelColorLight,
    //lessen from 5 to 3.5
    lineHeight: hp(3.5),
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  accordionListHeader: {
    // marginHorizontal:wp(100)*nSc,
    marginLeft: wp(3.5),
    width: wp(92.5),
    backgroundColor: Colors.websiteLightBlueColor,
    borderWidth: 1,
    borderColor: Colors.white,
    // paddingVertical:hp(1),
    // paddingHorizontal:5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: wp(5),
  },
  accodrionHeaderText: {
    color: Colors.white,
    fontSize: wp(5.5),
    fontStyle: 'normal',
    textAlign: 'left',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
  accordionListContent: {
    marginLeft: wp(3.5),
    width: wp(92.5),
    backgroundColor: Colors.white,
    // borderWidth: 1,
    // borderColor: Colors.black,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accodrionContextText: {
    fontSize: wp(4),
    fontStyle: 'normal',
    textAlign: 'center',
    color: Colors.black,
    // fontWeight: 'normal',
    // fontFamily: sFontName,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    // padding:5
  },
  badgeContainerStyle: {
    marginBottom: hp(1),
  },
  badgeStyle: {
    alignSelf: 'flex-start',
    textAlignVertical: 'center',
    backgroundColor: Colors.websiteLightBlueColor,
  },
});

//export default withNavigationFocus(HomeScreen);

export default HomeScreen;
