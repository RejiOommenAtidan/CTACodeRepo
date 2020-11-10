import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { Card, Button } from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import CustomHeaderButton from '../components/HeaderButton';
import { Icon } from "react-native-elements";

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
    axios.get(`/ChatrelPayment/DisplayChatrelPayment/sGBID=` + oCurrentGBDetails.sGBID)
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
    return () => {BackHandler.removeEventListener('hardwareBackPress', () => true);};
    
  }, []);
  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.container}>
          <View><Text>Quick Actions</Text></View>
          {aCard.map((card, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => {
                props.navigation.navigate({
                  routeName: card.sRouteName
                });
                console.log(card);
              }}>
                <Card style={styles.card}>
                  <Card.Title>{card.sLabel}</Card.Title>
                  <Card.Divider />
                  <Card.Image source={card.sImagePath} />
                  {/*<Text>{card.sLabel}</Text>*/}
                </Card>
              </TouchableOpacity>
            )
          })}
          {/**/}
          <Card>
            <Card.Image source={require('../assets/Pay.png')} />
            <Text>
              Pendng Amount ${nChatrelTotalAmount}
            </Text>
            <Button
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='PAY NOW'
              onPress={() => {
                props.navigation.navigate({
                  routeName: 'SelfChatrel'
                });
              }}
            />
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Quick Actions',
    //drawerIcon: Icon,
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
          
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  card: {
    width: '50%'
  }
});

export default withNavigationFocus(HomeScreen);
