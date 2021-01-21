import React from 'react';
import {Text, View, StyleSheet, Dimensions, Platform} from 'react-native';
import {GLogin} from '../components/GLogin';
import {ActivityIndicator} from 'react-native';
import Colors from '../constants/Colors';
import Resolution from '../constants/ResolutionBreakpoint';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ResponsiveImage from 'react-native-responsive-image';
import {sFontName} from '../constants/CommonConfig';

export const LoginScreen = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        <ResponsiveImage
          initWidth="330"
          initHeight="320"
          source={require('../assets/CTALogo.png')}
          PlaceholderContent={
            <ActivityIndicator size={Platform.OS === 'ios' ? 0 : 'large'} />
          }
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerComponent}>Welcome to eChatrel</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textComponent}>
          Your go-to resource for supporting the{'\n'}Tibetan Government.
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
    cardStyle: {backgroundColor: Colors.greenBG},
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
  },
  imgContainer: {
    //marginTop: hp(2.5),
    marginBottom: hp(2.5),
  },
  headerContainer: {
    width: wp(75),
    height: hp(5),
    marginBottom: hp(2.5),
  },
  headerComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize: wp(7.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.white,
    fontFamily: sFontName,
    // lineHeight:
    //   Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    // letterSpacing: Resolution.nLetterSpacing,
  },
  textContainer: {
    width: wp(75),
    height: hp(5),
    marginBottom: hp(15),
  },
  textComponent: {
    width: '100%',
    height: '100%',
    fontSize: wp(3.375),
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    color: Colors.white,
    lineHeight: hp(2.5),
    // letterSpacing: Resolution.nLetterSpacing / 2,
  },
});
