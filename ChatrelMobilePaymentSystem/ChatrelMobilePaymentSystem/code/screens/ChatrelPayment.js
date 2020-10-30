import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';

export const ChatrelPaymentScreen = (props) => {
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text>
                    This is Chatrel Payment Screen
            </Text>
            </View>
        </View>
    );
};

ChatrelPaymentScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Chatrel Payment',
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