import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import {Chatrel} from '../components/Chatrel';

// const oHardcoded = {
//   sGBID:"1234567",
//   dtDOB:"01-01-2001",
//   sName:"Malay Doshi",
//   sPaidUntil:"2017",
//   sYearsDue:"3 Years"
// };

export const SelfChatrelScreen = (props) => {
    return (
        <View style={styles.main}>
        <Text>SELF PAYMENT</Text>
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
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});