import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { GLogin } from '../components/GLogin';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import Colors from '../constants/Colors';

export const LoginScreen = (props) => {

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.imgComp}
          source={require('../assets/CTALogo.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View>
        <Text style={styles.headerComp}>
          Welcome to Chatrel
        </Text>
      </View>
      <View>
        <Text style={styles.textComponent}>
          Your go-to resource for supporting the{"\n"}Tibetan Government
        </Text>
      </View>
      <GLogin props={props}></GLogin>
    </View>
  );
};

LoginScreen.navigationOptions = navData => {
  return {
    //headerTitle: 'Login',
    header:null,
    headerLeft: null,
    headerRight:null
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 5
  },
  imgContainer: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgComp: {
    width: 250,
    height: 240,
    marginTop: 6,
    marginBottom: 25,
    marginRight: 70
  },
  headerComp: {
    textAlign: "left",
    fontSize: 28,
    paddingBottom: 10,
    marginLeft: 40,
    fontStyle: "normal",
    fontWeight: "normal",
    marginBottom: 10,
    color: Colors.white
  },
  textComponent: {
    fontSize: 14.5,
    textAlign: "left",
    paddingBottom: 5,
    marginBottom: 15,
    marginLeft: 40,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.white
  }
});