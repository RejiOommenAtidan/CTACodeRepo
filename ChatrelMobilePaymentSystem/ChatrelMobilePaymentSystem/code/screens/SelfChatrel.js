import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { Chatrel } from '../components/Chatrel';
import Colors from '../constants/Colors';

export const SelfChatrelScreen = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.headerComponent}>Self Chatrel</Text>
      </View>
      {/*<View style={styles.container}>
                <Text>Self Chatrel</Text>
                <Text>PERSONAL INFORMATION</Text>
                <Text>Greenbook ID</Text>
                <Text>{oHardcoded.sGBID}</Text>
                <Text>Date of Birth</Text>
                <Text>{oHardcoded.dtDOB}</Text>
                <Text>Name</Text>
                <Text>{oHardcoded.sName}</Text>
                <Text>Year of Last Payment</Text>
                <Text>{oHardcoded.sPaidUntil}</Text>
                <Text>Payment of Years Due</Text>
                <Text>{oHardcoded.sYearsDue}</Text>
              </View>*/}
      <Chatrel></Chatrel>
    </View>
  );
};

SelfChatrelScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Self Chatrel',
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
  mainContainer: {
    flex: 1,
    margin: 17.5
  },
  headerComponent: {
    width: 142,
    height: 35,
    textAlign: "left",
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: "normal",
    marginBottom: 10,
    color: Colors.blue
  }
});