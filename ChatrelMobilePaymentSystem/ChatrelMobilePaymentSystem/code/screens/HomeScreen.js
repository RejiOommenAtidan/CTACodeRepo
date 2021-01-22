import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  Alert,
  Dimensions,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {Card, Button, Tile} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {sFontName, oActivityIndicatorStyle} from '../constants/CommonConfig';
import {Icon} from 'react-native-elements';
import {CustomHeaderRightButton} from '../components/HeaderRightButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {removeGoogleCreds} from '../store/actions/GLoginAction';
import {removeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import {removeGBDetails} from '../store/actions/GBDetailsAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useIsFocused} from '@react-navigation/native';
import {useCollapsibleHeader} from 'react-navigation-collapsible';

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
  const isFocused = useIsFocused();
  const aCard = [
    {
      sLabel: `Self\nChatrel`,
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: 'SelfChatrel',
      sBGColor: Colors.buttonYellow,
      sTextColor: Colors.greenBG,
      sIconName: 'donate',
      sIconColor: Colors.greenBG,
    },
    {
      sLabel: `Friend\nChatrel`,
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: 'FriendChatrelIntermediate',
      sBGColor: Colors.blueCardColor,
      sTextColor: Colors.primary,
      sIconName: 'users',
      sIconColor: Colors.blue,
    },
    {
      sLabel: `Family\nChatrel`,
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: 'FamilyChatrelIntermediate',
      sBGColor: Colors.greenBG,
      sTextColor: Colors.buttonYellow,
      sIconName: 'heart',
      sIconColor: Colors.buttonYellow,
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
          fetch('https://api.ratesapi.io/api/latest?base=INR&symbols=USD')
            .then((response) => response.json())
            .then((data) => {
              console.log('currency', data.rates.USD);
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
        // console.log(error.message);
        // console.log(error.config);
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
          {cancelable: false},
        );
      });
  };

  useEffect(() => {
    if (isFocused) {
      setbLoader(true);
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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {/* <Animated.FlatList
     onScroll={onScroll}
       contentContainerStyle={{ paddingTop: containerPaddingTop }}
       scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
     /> */}
      <View style={styles.mainContainer}>
        {bLoader && (
          <ActivityIndicator
            size={Platform.OS === 'ios' ? 0 : 'large'}
            color={Colors.grey}
            animating={true}
            //hidesWhenStopped={true}
            style={oActivityIndicatorStyle}
          />
        )}
        <View style={styles.headerContainer}>
          <Text style={styles.headerComponent}>Quick Actions</Text>
        </View>
        <View style={styles.cardContainer}>
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
                    </Card.Title>*/}
                    {/*<Card.Divider />*/}
                    {/*<Card.Image source={card.sImagePath} />*/}
                    {/*<Text>{card.sLabel}</Text>*/}
                  </Card>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/**/}
        {nChatrelTotalAmount !== 0 && !bLoader && (
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
                  fontFamily: sFontName,
                  fontStyle: 'normal',
                  fontWeight: 'normal',
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
            {/* <Tile
  imageSrc={require('../assets/CTALogoDonation.png')}
  title={"Pending Amount"}
titleStyle={styles.pendingAmountTextComponent}
  featured
  caption="Some Caption Text"
              /> */}
          </View>
        )}
        {/*New Job Contribution*/}
        {nChatrelTotalAmount === 0 && !bLoader && (
          <View style={styles.newJobContribContainer}>
            <Card containerStyle={styles.newJobContribComponent}>
              <View style={styles.newJobContribTextContainer}>
                <Text style={styles.newJobContribTextComponent}>
                  Have you gotten a new job since your last contribution?
                </Text>
              </View>
              <View style={styles.jobContribStatusTextContainer}>
                <Text style={styles.jobContribStatusTextComponent}>
                  Change your status and contribute more towards the Tibetan
                  Government.
                </Text>
              </View>
              <Button
                title="UPDATE EMPLOYEMENT STATUS"
                titleStyle={{
                  color: Colors.black,
                  fontFamily: sFontName,
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                }}
                buttonStyle={{
                  backgroundColor: Colors.buttonYellow,
                  borderRadius:
                    Dimensions.get('window').width < Resolution.nWidthBreakpoint
                      ? 10.2
                      : 17,
                }}
                onPress={() => {
                  setbLoader(true);
                  props.navigation.navigate('SelfChatrel');
                }}
              />
            </Card>
          </View>
        )}
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
    headerRight: CustomHeaderRightButton,
    cardStyle: {backgroundColor: Colors.white},
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
  newJobContribComponent: {
    backgroundColor: Colors.primary,
    borderRadius:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9 : 15,
  },
  newJobContribTextContainer: {
    //width: wp(70),
    //height: hp(33),
  },
  newJobContribTextComponent: {
    fontSize: wp(6),
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    color: Colors.white,
    marginBottom: hp(2),
    lineHeight: hp(4.5),
    //letterSpacing: Resolution.nLetterSpacing
  },
  jobContribStatusTextContainer: {
    //width: wp(70),
    //height: hp(33),
  },
  jobContribStatusTextComponent: {
    fontSize: wp(3),
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    color: Colors.white,
    marginBottom: hp(2),
    lineHeight: hp(3),
    //letterSpacing: Resolution.nLetterSpacing
  },
});

//export default withNavigationFocus(HomeScreen);

export default HomeScreen;
