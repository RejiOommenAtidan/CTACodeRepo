import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { Chatrel } from '../components/Chatrel';
import Colors from '../constants/Colors';

export const FamilyChatrelScreen = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.headerComponent}>Family Chatrel</Text>
        <Chatrel></Chatrel>
      </View>
    </View>
  );
};

export const FamilyChatrelScreenOptions = navData => {
  return {
    headerTitle: 'Family Chatrel',
    headerLeft: () => {
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
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