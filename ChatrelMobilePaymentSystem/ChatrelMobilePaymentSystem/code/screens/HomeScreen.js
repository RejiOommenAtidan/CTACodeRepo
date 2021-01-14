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
} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
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

  const [nChatrelTotalAmount, setnChatrelTotalAmount] = useState(0);

  const aCard = [
    {
      sLabel: `Self\nChatrel`,
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: 'SelfChatrel',
      sBGColor: Colors.buttonYellow,
      sTextColor: Colors.greenBG,
      sIconName: 'donate',
      sIconColor:Colors.greenBG
    },
    {
      sLabel: `Friend\nChatrel`,
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: 'FriendChatrelIntermediate',
      sBGColor: Colors.blueCardColor,
      sTextColor: Colors.primary,
      sIconName: 'users',
      sIconColor:Colors.blue
    },
    {
      sLabel: `Family\nChatrel`,
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: 'FamilyChatrelIntermediate',
      sBGColor: Colors.greenBG,
      sTextColor: Colors.buttonYellow,
      sIconName: 'heart',
      sIconColor:Colors.buttonYellow
    },
  ];

  const oCurrentGBDetails = useSelector(
    (state) => state.CurrentGBDetailsReducer.oCurrentGBDetails,
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
          setnChatrelTotalAmount(resp.data.chatrelPayment.nChatrelTotalAmount);
        }
      })
      .catch((error) => {
        // console.log(error.message);
        // console.log(error.config);
        Alert.alert(
          'Invalid Details for Chatrel',
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
    getChatrelDetails();
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
    };
  }, []);
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerComponent}>Quick Actions</Text>
        </View>
        <View style={styles.cardContainer}>
          {aCard.map((card, index) => {
            return (
              <View key={index} style={styles.singleCardContainer}>
                <TouchableOpacity
                  onPress={() => {
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
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Text
                          style={{
                            color: card.sTextColor,
                            fontSize: wp(4.5),
                            fontStyle: 'normal',
                            fontWeight: 'bold',
                            //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
                            letterSpacing: Resolution.nLetterSpacing / 2,
                            fontFamily: 'Kanit-Regular',
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
                        fontFamily: 'Kanit-Regular',
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
        {nChatrelTotalAmount !== 0 && (
          <View style={styles.pendingAmountContainer}>
            <Card containerStyle={styles.pendingAmountComponent}>
              <Card.Image
                style={styles.pendingAmountImageComponent}
                source={require('../assets/Pay.png')}
              />
              <Card.Divider />
              <Text style={styles.pendingAmountTextComponent}>
                Pending Amount ${nChatrelTotalAmount}
              </Text>
              <Button
                titleStyle={{color: Colors.white, fontFamily: 'Kanit-Regular'}}
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
                  props.navigation.navigate('SelfChatrel');
                }}
              />
            </Card>
          </View>
        )}
        {/*New Job Contribution*/}
        {nChatrelTotalAmount === 0 && (
          <View style={styles.newJobContribContainer}>
            <Card containerStyle={styles.newJobContribComponent}>
              <View style={styles.newJobContribTextContainer}>
                <Text style={styles.newJobContribTextComponent}>
                  Have you gotten a new{'\n'} job since your last{'\n'}{' '}
                  contribution?
                </Text>
              </View>
              <View style={styles.jobContribStatusTextContainer}>
                <Text style={styles.jobContribStatusTextComponent}>
                  Change your status and contribute more towards{'\n'} the
                  Tibetan Government.
                </Text>
              </View>
              <Button
                titleStyle={{color: Colors.white, fontFamily: 'Kanit-Regular'}}
                buttonStyle={{
                  backgroundColor: Colors.buttonYellow,
                  borderRadius:
                    Dimensions.get('window').width < Resolution.nWidthBreakpoint
                      ? 10.2
                      : 17,
                }}
                title="UPDATE EMPLOYEMENT STATUS"
                onPress={() => {
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
    headerTitle: 'Home',
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
  headerContainer: {
    width: wp(60),
    height: hp(4),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  headerComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 12 : 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blue,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 20 : 25,
  },
  singleCardContainer: {
    width: wp(111) / 3,
  },
  singleCardComponent: {
    height:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 54 : 90,
  },
  pendingAmountContainer: {},
  pendingAmountComponent: {
    borderRadius:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9 : 15,
  },
  pendingAmountImageComponent: {
    width: wp(75),
    height: hp(33),
  },
  pendingAmountTextComponent: {
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 12 : 18,
    fontFamily: 'Kanit-Regular',
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    color: Colors.black,
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    letterSpacing: Resolution.nLetterSpacing,
  },
  newJobContribComponent: {
    backgroundColor: Colors.primary,
    borderRadius:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9 : 15,
  },
  newJobContribTextContainer: {
    width: wp(70),
    //height: hp(33),
  },
  newJobContribTextComponent: {
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 15.6 : 26,
    fontFamily: 'Kanit-ExtraLight',
    fontStyle: 'normal',
    fontWeight: '200',
    textAlign: 'left',
    color: Colors.white,
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1 : 6,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing
  },
  jobContribStatusTextContainer: {
    width: wp(70),
    //height: hp(33),
  },
  jobContribStatusTextComponent: {
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontFamily: 'NunitoSans-Light',
    fontStyle: 'normal',
    fontWeight: '300',
    textAlign: 'left',
    color: Colors.white,
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 22.8
        : 38,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing
  },
});

//export default withNavigationFocus(HomeScreen);

export default HomeScreen;
