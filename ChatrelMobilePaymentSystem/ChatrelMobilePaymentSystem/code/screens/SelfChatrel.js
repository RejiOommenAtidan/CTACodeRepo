import React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Chatrel } from '../components/Chatrel';
import Colors from '../constants/Colors';
import { CustomHeaderRightButton } from '../components/HeaderRightButton';
import Resolution from '../constants/ResolutionBreakpoint';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const SelfChatrelScreen = (props) => {
  return (
    <View style={styles.mainContainer}>
      {/*<View style={styles.headerContainer}>
        <Text style={styles.headerComponent}>Self Chatrel</Text>
  </View>*/}
      <Chatrel></Chatrel>
    </View>
  );
};

export const SelfChatrelScreenOptions = navData => {
  return {
    headerTitle: 'Self Chatrel',
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: CustomHeaderRightButton,
    cardStyle: { backgroundColor: Colors.ChatrelScreensBGColor }
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical: Dimensions.get('window').height * Resolution.nHeightScreenMargin
  },
  headerContainer: {
    width: wp(50),
    height: hp(4),
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10
  },
  headerComponent: {
    width: '100%',
    height: '100%',
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 14.4 : 24,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blue,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  }
});