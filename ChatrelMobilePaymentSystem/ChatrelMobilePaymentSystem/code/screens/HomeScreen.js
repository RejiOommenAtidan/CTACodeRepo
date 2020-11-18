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
    { sLabel: "Self Chatrel", sImagePath: require('../assets/CTALogo.png'), sRouteName: "SelfChatrel" },
    { sLabel: "Family Chatrel", sImagePath: require('../assets/CTALogo.png'), sRouteName: "FamilyChatrelIntermediate" },
    { sLabel: "Friend Chatrel", sImagePath: require('../assets/CTALogo.png'), sRouteName: "FriendChatrelIntermediate" },
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
              <View style={styles.singleCardContainer}>
                <TouchableOpacity key={index} onPress={() => {
                  props.navigation.navigate(card.sRouteName);
                  console.log(card);
                }}>
                  <Card
                    containerStyle={styles.singleCardComponent}
                  >
                    <Card.Title>{card.sLabel}</Card.Title>
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
            <Card.Image source={require('../assets/Pay.png')} />
            <Text style={styles.pendingAmountTextComponent}>
              Pending Amount ${nChatrelTotalAmount}
            </Text>
            <Button
              titleStyle={{ color: Colors.white, fontFamily: 'Kanit-Regular' }}
              buttonStyle={{
                backgroundColor: Colors.greenBG,
              }}
              title='PAY NOW'
              onPress={() => {
                props.navigation.navigate('SelfChatrel');
              }}
            />
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

export const HomeScreenOptions = navData => {
  return {
    headerTitle: 'Quick Actions',
    headerLeft: () => {
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    }
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
    height: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 75 : 100,
    borderRadius: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 15 : 20
  },
  pendingAmountContainer: {
    //position:"relative"
  },
  pendingAmountComponent: {

  },
  pendingAmountTextComponent: {
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 12 : 18,
    fontFamily: 'Kanit-Regular',
    fontStyle: "normal",
    fontWeight: "300",
    textAlign: "left",
    color: Colors.black
  }
});

//export default withNavigationFocus(HomeScreen);

export default HomeScreen;
