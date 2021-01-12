import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {GLogin} from '../components/GLogin';
import {ActivityIndicator} from 'react-native';
import Colors from '../constants/Colors';
import Resolution from '../constants/ResolutionBreakpoint';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ResponsiveImage from 'react-native-responsive-image';

export const LoginScreen = (props) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imgContainer}>
        <ResponsiveImage
          initWidth="335"
          initHeight="325"
          source={require('../assets/CTALogo.png')}
          PlaceholderContent={<ActivityIndicator size={36}/>}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerComponent}>Welcome to Chatrel</Text>
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
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
  },
  imgContainer: {
    marginTop:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 15 : 25,
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 12 : 20,
  },
  headerContainer: {
    width: wp(70),
    height: hp(6.5),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },
  headerComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 18 : 30,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.white,
    lineHeight:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  textContainer: {
    width: wp(70),
    height: hp(6.5),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 92.4
        : 154,
  },
  textComponent: {
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9 : 14.75,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: '300',
    fontFamily: 'NunitoSans-Light',
    lineHeight:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint
        ? 10.5
        : 17.5,
    letterSpacing: Resolution.nLetterSpacing / 2,
    color: Colors.white,
  },
});
