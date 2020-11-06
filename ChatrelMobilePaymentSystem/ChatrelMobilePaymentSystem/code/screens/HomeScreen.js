import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { Card, Button } from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

const aCard = [
  { sLabel: "Self Chatrel", sImagePath: require('../assets/CTALogo.png') },
  { sLabel: "Family Chatrel", sImagePath: require('../assets/CTALogo.png') },
  { sLabel: "Friend Chatrel", sImagePath: require('../assets/CTALogo.png') },
];

const HomeScreen = (props) => {
  // console.log(props);
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
  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", backAction);

    // return () =>
    //   BackHandler.removeEventListener("hardwareBackPress", backAction);

  }, []);
  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.container}>
          <View><Text>Quick Actions</Text></View>
          {aCard.map((card, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => { console.log(card) }}>
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
              Pendng Amount $197.8
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
