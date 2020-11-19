import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { GLogin } from '../components/GLogin';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import Colors from '../constants/Colors';
import Resolution from '../constants/ResolutionBreakpoint';

export const LoginScreen = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.imgComponent}
          source={require('../assets/CTALogo.png')}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerComponent}>
          Welcome to Chatrel
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textComponent}>
          Your go-to resource for supporting the{"\n"}Tibetan Government.
        </Text>
      </View>
      <GLogin props={props}></GLogin>
    </View>
  );
};

// export const LoginScreenOptions = navData => {
//   return {
//     //headerTitle: 'Login',
//     header: () => null,
//     headerLeft: () => null,
//     headerRight: () => null
//   };
// };

// console.log(Dimensions.get('window').width)
// console.log(Dimensions.get('window').height)

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical: Dimensions.get('window').height * Resolution.nHeightScreenMargin,
  },
  imgContainer: {
    width: Dimensions.get('window').width * 0.70,
    height: Dimensions.get('window').height * 0.36,
    marginTop: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 15 : 25,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 12 : 20
  },
  imgComponent: {
    width: '100%',
    height: '100%'
  },
  headerContainer: {
    width: Dimensions.get('window').width * 0.70,
    height: Dimensions.get('window').height * 0.065,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },
  headerComponent: {
    width: '100%',
    height: '100%',
    textAlign: "center",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 18 : 30,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.white,
    lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  textContainer: {
    width: Dimensions.get('window').width * 0.70,
    height: Dimensions.get('window').height * 0.065,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 92.4 : 154,
  },
  textComponent: {
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9 : 14.75,
    textAlign: "center",
    fontStyle: "normal",
    fontWeight: "300",
    fontFamily: 'NunitoSans-Light',
    lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.5 : 17.5,
    letterSpacing: Resolution.nLetterSpacing / 2,
    color: Colors.white
  }
});