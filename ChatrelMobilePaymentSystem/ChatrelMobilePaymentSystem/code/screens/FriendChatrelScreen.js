import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {Chatrel} from '../components/Chatrel';
import Colors from '../constants/Colors';
import Resolution from '../constants/ResolutionBreakpoint';

export const FriendChatrelScreen = (props) => {
  return (
    <View style={styles.mainContainer}>
      <Chatrel props={'Friend'}></Chatrel>
    </View>
  );
};

export const FriendChatrelScreenOptions = (navData) => {
  return {
    headerTitle: 'FRIENDS & FAMILY',
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
    // headerRight: CustomHeaderRightButton,
    cardStyle: {backgroundColor: Colors.white},
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
});
