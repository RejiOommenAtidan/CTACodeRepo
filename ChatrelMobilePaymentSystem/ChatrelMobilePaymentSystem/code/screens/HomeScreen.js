import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Alert, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import { Icon } from "react-native-elements";
// import { withNavigationFocus } from 'react-navigation';
// import CustomHeaderButton from '../components/HeaderButton';

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
      sLabel: "Self Chatrel",
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: "SelfChatrel",
      sBGColor: Colors.buttonYellow,
      sTextColor: Colors.greenBG
    },
    {
      sLabel: "Friend Chatrel",
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: "FriendChatrelIntermediate",
      sBGColor: Colors.blueCardColor,
      sTextColor: Colors.primary
    },
    {
      sLabel: "Family Chatrel",
      sImagePath: require('../assets/CTALogo.png'),
      sRouteName: "FamilyChatrelIntermediate",
      sBGColor: Colors.greenBG,
      sTextColor: Colors.buttonYellow
    }
  ];

  const oCurrentGBDetails = useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails);

  const getChatrelDetails = () => {
    axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=` + oCurrentGBDetails.sGBID)
      .then(resp => {
        if (resp.status === 200) {
          setnChatrelTotalAmount(resp.data.chatrelPayment.nChatrelTotalAmount);
        }
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.config);
      });
  };

  useEffect(() => {
    getChatrelDetails();
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => { BackHandler.removeEventListener('hardwareBackPress', () => true); };
  }, []);
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.cardContainer}>
          {/*<View><Text>Quick Actions</Text></View>*/}
          {aCard.map((card, index) => {
            return (
              <View key={index} style={styles.singleCardContainer}>
                <TouchableOpacity onPress={() => {
                  props.navigation.navigate(card.sRouteName);
                  console.log(card);
                }}>
                  <Card
                    containerStyle={{
                      ...styles.singleCardComponent,
                      backgroundColor: card.sBGColor,
                      borderRadius: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9 : 15,
                    }}
                  >
                    <Card.Title
                      style={{
                        color: card.sTextColor,
                        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
                        fontStyle: "normal",
                        fontWeight: "normal",
                        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
                        letterSpacing: Resolution.nLetterSpacing / 2,
                        fontFamily: 'Kanit-Regular'
                      }}
                    >{card.sLabel}</Card.Title>
                    {/*<Card.Divider />*/}
                    {/*<Card.Image source={card.sImagePath} />*/}
                    {/*<Text>{card.sLabel}</Text>*/}
                  </Card>
                </TouchableOpacity>
              </View>
            )
          })}
        </View>
        {/**/}
        <View style={styles.pendingAmountContainer}>
          <Card containerStyle={styles.pendingAmountComponent}>
            <Card.Image style={styles.pendingAmountImageComponent} source={require('../assets/Pay.png')} />
            <Card.Divider />
            <Text style={styles.pendingAmountTextComponent}>
              Pending Amount ${nChatrelTotalAmount}
            </Text>
            <Button
              titleStyle={{ color: Colors.white, fontFamily: 'Kanit-Regular' }}
              buttonStyle={{
                backgroundColor: Colors.greenBG,
                borderRadius: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.2 : 17,
              }}
              title='PAY NOW'
              onPress={() => {
                props.navigation.navigate('SelfChatrel');
              }}
            />
          </Card>
        </View>
        {/*New Job Contribution*/}
        {/*<View style={styles.newJobContribContainer}>
          <Card
            containerStyle={styles.newJobContribComponent}
          >
            <View style={styles.newJobContribTextContainer}>
              <Text style={styles.newJobContribTextComponent}>
                Have you gotten a new{"\n"} job since your last{"\n"} contribution?
          </Text>
            </View>
            <View style={styles.jobContribStatusTextContainer}>
              <Text style={styles.jobContribStatusTextComponent}>
                Change your status and contribute more towards{"\n"} the Tibetan Government.
          </Text>
            </View>
            <Button
              titleStyle={{ color: Colors.white, fontFamily: 'Kanit-Regular' }}
              buttonStyle={{
                backgroundColor: Colors.buttonYellow,
                borderRadius: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.2 : 17,
              }}
              title='UPDATE EMPLOYEMENT STATUS'
              onPress={() => {
                props.navigation.navigate('SelfChatrel');
              }}
            />
          </Card>
            </View>*/}
      </View>
    </ScrollView>
  );
};

export const HomeScreenOptions = navData => {
  return {
    
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical: Dimensions.get('window').height * Resolution.nHeightScreenMargin,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 20 : 25,
  },
  singleCardContainer: {
    width: Dimensions.get('window').width / 3
  },
  singleCardComponent: {
    height: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 48 : 80
  },
  pendingAmountContainer: {
  },
  pendingAmountComponent: {
    borderRadius: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9 : 15
  },
  pendingAmountImageComponent: {
    width: Dimensions.get('window').width * 0.70,
    height: Dimensions.get('window').height * 0.33
  },
  pendingAmountTextComponent: {
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 12 : 18,
    fontFamily: 'Kanit-Regular',
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    color: Colors.black,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    letterSpacing: Resolution.nLetterSpacing
  },
  newJobContribComponent: {
    backgroundColor: Colors.primary
  },
  newJobContribTextContainer: {
    width: Dimensions.get('window').width * 0.70,
    //height: Dimensions.get('window').height * 0.33
  },
  newJobContribTextComponent: {
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 15.6 : 26,
    fontFamily: 'Kanit-ExtraLight',
    fontStyle: "normal",
    fontWeight: "200",
    textAlign: "left",
    color: Colors.white,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1 : 6,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing
  },
  jobContribStatusTextContainer: {
    width: Dimensions.get('window').width * 0.70,
    //height: Dimensions.get('window').height * 0.33
  },
  jobContribStatusTextComponent: {
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontFamily: 'NunitoSans-Light',
    fontStyle: "normal",
    fontWeight: "300",
    textAlign: "left",
    color: Colors.white,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 22.8 : 38,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing
  }
});

//export default withNavigationFocus(HomeScreen);

export default HomeScreen;
