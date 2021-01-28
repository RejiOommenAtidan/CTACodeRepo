import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { Card, Button, Avatar } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
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
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { removeGoogleCreds } from '../store/actions/GLoginAction';
import { removeCurrentGBDetails } from '../store/actions/CurrentGBDetailsAction';
import { removeGBDetails } from '../store/actions/GBDetailsAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import { CustomHeaderRightButton } from '../components/HeaderRightButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useCollapsibleHeader } from 'react-navigation-collapsible';

// import { withNavigationFocus } from 'react-navigation';
//import CustomHeaderButton from '../components/HeaderButton';

const HomeScreen = (props) => {
  // const backAction = () => {
  //   if (props.isFocused) {
  //     Alert.alert("Hold on!", "Are you sure you want to exit?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel"
  //       },
  //       {
  //         text: "YES", onPress: () => BackHandler.exitApp()
  //       }
  //       // {
  //       //   cancelable: false
  //       // }
  //     ]);
  //   }
  //   return true;
  // };
  const [dollarToRupees, setDollarToRupees] = React.useState(0.0);
  const [nChatrelTotalAmount, setnChatrelTotalAmount] = useState(0);
  const [bLoader, setbLoader] = useState(true);
  const [activeSections, setactiveSections] = useState([0]);
  const isFocused = useIsFocused();
  const aCard = [
    {
      id: 1,
      sHeader: 'Self Chatrel',
      sContent: 'Make Chatrel Payments for yourself online',
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
      sHeader: 'Family Chatrel',
      sContent: 'Pay Instantly for all of your family members',
      sLabel: `Family\nChatrel`,
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: 'FamilyChatrelIntermediate',
      sBGColor: Colors.greenBG,
      sTextColor: Colors.buttonYellow,
      sIconName: 'heart',
      sIconColor: Colors.buttonYellow,
    },
    {
      id: 3,
      sHeader: 'Friend Chatrel',
      sContent: 'Get payments of your friends done too',
      sLabel: `Friend\nChatrel`,
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: 'FriendChatrelIntermediate',
      sBGColor: Colors.blueCardColor,
      sTextColor: Colors.primary,
      sIconName: 'users',
      sIconColor: Colors.blue,
    },
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
        if (resp.status === 200) {
          debugger;
          fetch('https://api.ratesapi.io/api/latest?base=INR&symbols=USD')
            .then((response) => response.json())
            .then((data) => {
              setDollarToRupees(data.rates.USD);
            });
          setnChatrelTotalAmount(
            parseFloat(resp.data.chatrelPayment.nChatrelTotalAmount) *
            dollarToRupees.toFixed(4),
          );
        }
        setbLoader(false);
      })
      .catch((error) => {
        debugger;
        console.log("Error Message: " + error.message);
        console.log(error.config);
        setbLoader(false);
        Alert.alert(
          'Invalid details for Chatrel',
          'Please Contact CTA',
          [
            // {
            //     text: 'Okay',
            //     onPress: () => true,
            //     style: 'cancel'
            // },
            {
              text: 'Logout',
              onPress: () => removeCompleteDetailsAndNavigateToLogin(),
            },
          ],
          { cancelable: false },
        );
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
            style={{ fontSize: 18 }}
            name="remove-circle"
            color={Colors.white}
          />
        ) : (
            <Icon style={{ fontSize: 18 }} name="add-circle" color={Colors.white} />
          )}
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={styles.accordionListContent}>
        <Text style={styles.accodrionContextText}>{section.sContent}</Text>
      </View>
    );
  };

  const updateSections = (activeSections) => {
    setactiveSections(activeSections);
  };

  useEffect(() => {
    if (isFocused) {
      setbLoader(true);
      setactiveSections([0]);
      console.log('Home Called');
      getChatrelDetails();
    }
  }, [isFocused]);

  useEffect(() => {
    //getChatrelDetails();
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
    };
  }, []);

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

  if (!bLoader) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.mainContainer}>
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
          {/*{nChatrelTotalAmount !== 0 && !bLoader && (
            <View style={styles.pendingAmountContainer}>
              <Card containerStyle={styles.pendingAmountComponent}>
                <Card.Image
                  style={styles.pendingAmountImageComponent}
                  source={require('../assets/Pay.png')}
                />
                <Card.Divider />
                <Text style={styles.pendingAmountTextComponent}>
                  Pending Amount ${nChatrelTotalAmount.toFixed(2)}
                </Text>
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
                    width: wp(75),
                    backgroundColor: Colors.greenBG,
                    borderRadius:
                      Dimensions.get('window').width < Resolution.nWidthBreakpoint
                        ? 10.2
                        : 17,
                  }}
                  title="PAY NOW"
                  onPress={() => {
                    setbLoader(true);
                    props.navigation.navigate('SelfChatrel');
                  }}
                />
                </Card>
              <Tile
    imageSrc={require('../assets/CTALogoDonation.png')}
    title={"Pending Amount"}
  titleStyle={styles.pendingAmountTextComponent}
    featured
    caption="Some Caption Text"
                /> 
            </View>
          )}*/}
          {/*Accordions*/}
          <View style={{ ...styles.viewMarginComponent, marginTop: hp(2), marginBottom: hp(5) }}>
            <Accordion
              align={'center'}
              containerStyle={{ width: '100%' }}
              expandMultiple={false}
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
            />

            {/* <Collapse style={{borderBottomWidth: 1, borderTopWidth: 1}}>
              <CollapseHeader
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  backgroundColor: '#E6E6E6',
                }}>
                <View style={{width: '25%', alignItems: 'center'}}>
                  <Image
                    source={{
                      uri:
                        'https://www.biography.com/.image/t_share/MTQ3NjYxMzk4NjkwNzY4NDkz/muhammad_ali_photo_by_stanley_weston_archive_photos_getty_482857506.jpg',
                    }}
                  />
                </View>
                <View style={{width: '60%'}}>
                  <Text>Name : Mohammed Ali Kley</Text>
                  <Text>Profession: Boxer</Text>
                </View>
              </CollapseHeader>
              <CollapseBody
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#EDEDED',
                }}>
                <Collapse style={{flexDirection: 'row'}}>
                  <CollapseHeader>
                    <Image
                      source={{
                        uri:
                          'https://cdn3.iconfinder.com/data/icons/trico-circles-solid/24/Circle-Solid-Phone-512.png',
                      }}
                    />
                  </CollapseHeader>
                  <CollapseBody
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 10,
                    }}>
                    <Text>+1 310 346 0018</Text>
                  </CollapseBody>
                </Collapse>
                <Collapse style={{flexDirection: 'row'}}>
                  <CollapseHeader>
                    <Image
                      source={{
                        uri:
                          'https://d30y9cdsu7xlg0.cloudfront.net/png/1674-200.png',
                      }}
                    />
                  </CollapseHeader>
                  <CollapseBody
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 10,
                    }}>
                    <Text>sample@sample.ma</Text>
                  </CollapseBody>
                </Collapse>
              </CollapseBody>
            </Collapse> */}
          </View>
          {/*New Job Contribution*/}
          {nChatrelTotalAmount === 0 && !bLoader && (
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
                  setbLoader(true);
                  props.navigation.navigate('SelfChatrel');
                }}
              />
            </Card>
          )}
          {/*Chatrel President*/}
          <Card
            containerStyle={{
              ...styles.presidentCardContainerStyle,
              marginBottom: hp(1),
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
            {/* <Card.Divider style={styles.presidentCardDividerStyle} /> */}
            <View style={{ marginTop: hp(5) }}>
              <View style={styles.viewMarginComponent}>
                <Text style={styles.greyTextComponent}>
                  This is a huge step for all the Tibetan people that the Chatrel
                  collection services are now Online. Power at your fingertips.
                </Text>
              </View>
              <View style={styles.viewMarginComponent}>
                <Text style={styles.boldTextComponent}>FirstName LastName</Text>
              </View>
              <View style={{ ...styles.viewMarginComponent, marginBottom: 0 }}>
                <Text style={styles.greyTextComponent}>President</Text>
              </View>
            </View>
          </Card>
          {/*Goals of Chatrel*/}
          <Card
            containerStyle={{
              ...styles.presidentCardContainerStyle,
              marginBottom: hp(1),
            }}>
            {/* <Card.Divider style={styles.cardDividerStyle} /> */}
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
              <View style={{ ...styles.viewMarginComponent, marginBottom: 0 }}>
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
  };
  if (bLoader) {
    return (
      bLoader && (
        <ActivityIndicator
          size={Platform.OS === 'ios' ? 0 : 'large'}
          color={Colors.spinnerColor}
          animating={true}
          //hidesWhenStopped={true}
          style={oActivityIndicatorStyle}
        />
      )
    )
  };
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
    cardStyle: { backgroundColor: Colors.white },
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
    // width: '100%',
    // height: '100%',
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
    borderRadius:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9 : 15,
    // elevation: 0,
    // borderColor: Colors.white
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
    // letterSpacing: Resolution.nLetterSpacing,
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
    shadowOffset: { width: 5, height: 5 },
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
    shadowOffset: { width: 5, height: 5 },
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
    shadowOffset: { width: 5, height: 5 },
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
    fontSize: wp(5),
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    color: Colors.labelColorLight,
    lineHeight: hp(2),
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
    // borderColor: Colors.white,paddingVertical:hp(1),
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
    fontSize: wp(5),
    fontFamily: sFontName,
    fontStyle: 'normal',
    textAlign: 'left',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
  accordionListContent: {
    marginLeft: wp(3.5),
    width: wp(92.5),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.black,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  accodrionContextText: {
    fontSize: wp(4),
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    color: Colors.black,
  },
});

//export default withNavigationFocus(HomeScreen);

export default HomeScreen;
