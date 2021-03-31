import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  Linking,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {Card, Icon} from 'react-native-elements';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  sChatrelNetURL,
  sFontName,
  sFontNameBold,
  sPrivacyPolicyURL,
} from '../constants/CommonConfig';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from '../components/Loader';

export const ContactUsScreen = () => {
  const isFocused = useIsFocused();
  const [bLoader, setbLoader] = useState(false);

  useEffect(() => {
    if (isFocused) {
      console.log('Contact Us Called');
      setbLoader(false);
    }
  }, [isFocused]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <Loader loading={bLoader} />
        <Card
          title={
            <View style={styles.titleStyleView}>
              <Icon
                color={Colors.white}
                iconStyle={styles.iconStyles}
                iconProps={{}}
                backgroundColor={Colors.websiteLightBlueColor}
                size={40}
                type="simple-line-icon"
                name="envelope-letter"
                containerStyle={styles.iconContainerStyles}
              />
            </View>
          }
          titleStyle={{}}
          containerStyle={styles.cardContainerStyle}>
          <View style={styles.contactUsPlaceholderView}>
            <Text style={styles.contactUsTextColonComponent}>
              Postal Address:
            </Text>

            <Text style={{...styles.contactUsTextComponent, marginBottom: 0}}>
              The Secretary,{' '}
            </Text>
            <Text style={{...styles.contactUsTextComponent, marginBottom: 0}}>
              Department of Finance Central Tibetan Administration,{' '}
            </Text>
            <Text style={{...styles.contactUsTextComponent, marginBottom: 0}}>
              Dharamshala – 176215 (H.P.)
            </Text>
            <Text style={styles.contactUsTextComponent}>INDIA</Text>

            <Text style={styles.contactUsTextComponent}>
              <Text style={styles.contactUsTextColonComponent}>
                Telephone:{' '}
              </Text>
              <Text style={styles.contactUsTextComponent}>+91-1892-223738</Text>
              <Text style={styles.contactUsTextComponent}>, 222487</Text>
            </Text>
            <Text style={styles.contactUsTextColonComponent}>
              Website:{' '}
              <Text style={styles.contactUsTextComponent}>
                {sChatrelNetURL}
              </Text>
            </Text>
            <Text style={styles.contactUsTextColonComponent}>
              Email:{' '}
              <Text style={styles.contactUsTextComponent}>
                chatrelonline@tibet.net chatrel@tibet.net
              </Text>
            </Text>

            <Text
              style={{
                ...styles.contactUsTextComponent,
                marginTop: hp(3),
                fontSize: wp(4),
              }}>
              Note: It is requested to write your full name, address and phone
              number if you have any suggestion or any grievances with this
              project.
            </Text>
            <Text
              style={{
                ...styles.contactUsTextComponent,
                marginTop: hp(3),
                fontSize: wp(4),
                marginBottom: hp(1),
              }}>
              You can read our Privacy Policy{' '}
              <Text
                style={styles.privacyPolicyLink}
                onPress={() => Linking.openURL(sPrivacyPolicyURL)}>
                here
              </Text>
            </Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export const ContactUsScreenOptions = (navData) => {
  return {
    headerTitle: 'CONTACT US',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={'menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    cardStyle: {backgroundColor: Colors.white, shadowColor: 'transparent'},
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
  },
  contactUsPlaceholderView: {
    marginBottom: hp(2),
  },
  privacyPolicyLink: {
    color: Colors.ChatrelInfoBlue,
    fontSize: wp(4.25),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    textDecorationColor: Colors.ChatrelInfoBlue,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  contactUsTextComponent: {
    color: Colors.blackText,
    fontSize: wp(4.25),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
    lineHeight: hp(3),
    marginBottom: hp(2),
  },
  contactUsTextColonComponent: {
    color: Colors.ChatrelInfoBlue,
    fontSize: wp(4.75),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    textAlign: 'left',
    lineHeight: hp(3),
    marginBottom: hp(2),
  },
  cardContainerStyle: {
    width: wp(92.5),
    backgroundColor: Colors.white,
    marginTop: hp(5),
    borderRadius: 15,
    shadowRadius: 15,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    elevation: 15,
    overflow: 'visible',
  },
  titleStyleView: {
    marginBottom: hp(5.5),
    shadowRadius: 15,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
  },
  iconStyles: {
    backgroundColor: Colors.websiteLightBlueColor,
    margin: hp(2),
  },
  iconContainerStyles: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: -55,
    borderRadius: 10,
    elevation: 15,
  },
});
