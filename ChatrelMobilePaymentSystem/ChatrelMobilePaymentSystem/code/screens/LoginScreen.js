import React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform } from 'react-native';
import { GLogin } from '../components/GLogin';
import { ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import Resolution from '../constants/ResolutionBreakpoint';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ResponsiveImage from 'react-native-responsive-image';
import { sFontName, sFontNameBold } from '../constants/CommonConfig';

export const LoginScreen = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        {/*Values Coded*/}
        <ResponsiveImage
          initWidth="330"
          initHeight="320"
          source={require('../assets/CTALogo.png')}
          PlaceholderContent={
            <ActivityIndicator
              //animating={true}
              size={Platform.OS === 'ios' ? 0 : 'large'}
            />
          }
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerComponent}>Welcome to eChatrel</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textComponent}>
          Your go-to resource for supporting the Tibetan Government.
        </Text>
      </View>
      <GLogin props={props}></GLogin>
    </View>
  );
};

export const LoginScreenOptions = (navData) => {
  return {
    headerShown: false,
    headerLeft: null,
    headerRight: null,
    headerBackTitleVisible: false,
    cardStyle: { backgroundColor: Colors.greenBG },
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginBottom: hp(7.5),
  },
  imgContainer: {
    //marginTop: hp(10),
    marginBottom: hp(2.5),
  },
  headerContainer: {
    // marginBottom: hp(2.5),
  },
  headerComponent: {
    textAlign: 'center',
    fontSize: wp(8),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    color: Colors.white,
    marginBottom: hp(2.5),
    // lineHeight:
    //   Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    // letterSpacing: Resolution.nLetterSpacing,
  },
  textContainer: {
    // marginBottom: hp(6),
    // alignContent:"space-between"
  },
  textComponent: {
    textAlign: 'center',
    fontSize: wp(4.25),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    color: Colors.white,
    marginBottom: hp(7.5),
    lineHeight: hp(3.25),
    paddingHorizontal: wp(8),
    // height:hp(10)
    // letterSpacing: Resolution.nLetterSpacing / 2,

    ////FONT BOLD EG
    //fontWeight: Platform.OS==="android"?"normal":"bold",
    //fontFamily: Platform.OS==="android"?sFontNameBold:sFontName,
  },
});
