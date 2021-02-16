import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {Card, Icon} from 'react-native-elements';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {sFontName} from '../constants/CommonConfig';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from '../components/Loader';

export const ContactUsScreen = () => {
  const isFocused = useIsFocused();
  const [bLoader, setbLoader] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setbLoader(false);
      console.log('Contact Us Called');
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
            <Text style={styles.contactUsTextComponent}>CONTACT US</Text>
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
          //iconName={Platform.OS === 'android' ? 'menu' : 'md-menu'}
          iconName={'menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    // headerRight: CustomHeaderRightButton,
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
  contactUsTextComponent: {
    textAlign: 'auto',
    fontSize: wp(3.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    fontFamily: sFontName,
  },
  cardContainerStyle: {
    width: wp(92.5),
    backgroundColor: Colors.white,
    marginTop: hp(5),

    //Border Stuff
    borderRadius: 15,
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS
    shadowRadius: 15,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,

    //For Android
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
    // backgroundColor:Colors.white,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: -55,
    // left:20,
    //Border Stuff
    borderRadius: 10,
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS

    //For Android
    elevation: 15,
    // overflow: 'visible',
  },
});
