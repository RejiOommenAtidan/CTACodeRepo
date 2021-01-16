import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {Dimensions} from 'react-native';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../../code/constants/Colors';
import {CustomHeaderRightButton} from '../components/HeaderRightButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';

export const MyProfileScreen = (props) => {
  // const handleCreatePDF = async () => {
  //   const page1 = PDFPage
  //   .create()
  //   .setMediaBox(200, 200)
  //   .drawText('You can add text and rectangles to the PDF!', {
  //     x: 5,
  //     y: 235,
  //     color: '#007386',
  //     fontName: "Kanit Regular"
  //   })
  //   .drawRectangle({
  //     x: 25,
  //     y: 25,
  //     width: 150,
  //     height: 150,
  //     color: '#FF99CC',
  //   })
  //   .drawRectangle({
  //     x: 75,
  //     y: 75,
  //     width: 50,
  //     height: 50,
  //     color: '#99FFCC',
  //   });
  
  //   const docsDir = await PDFLib.getDocumentsDirectory();
  // const pdfPath = `${docsDir}/sample.pdf`;
  // PDFDocument
  //   .create(pdfPath)
  //   .addPages(page1)
  //   .write() // Returns a promise that resolves with the PDF's path
  //   .then(path => {
  //     alert('PDF created at: ' + path);
  //     // Do stuff with your shiny new PDF!
  //   });
  // };

  




  const oGBDetails = useSelector((state) => state.GBDetailsReducer.oGBDetails);
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  // const oUserHardcodedMyProfile = {
  //   sGBID: '7654321',
  //   sName: 'ABCD DEFG',
  //   nAge: 22,
  //   dtDOB: '01-01-2001',
  //   sEmailAddress: 'a.b@gmail.com',
  //   sAuthorityRegion: 'Thimpu',
  // };
  return (
    <View style={styles.mainContainer}>
      {/*<View style={styles.headerContainer}>
                <Text style={styles.headerComponent}>
                    My Profile
                </Text>
    </View>*/}
      {/*FULL NAME*/}
      <View style={styles.nameLabelContainer}>
        <Text style={styles.nameLabelComponent}>FULL NAME</Text>
      </View>
      <View style={styles.nameValueContainer}>
        <Text style={styles.nameValueComponent}>
          {oGoogle.givenName + ' ' + oGoogle.familyName}
        </Text>
      </View>
      {/*GBID*/}
      <View style={styles.gbidLabelContainer}>
        <Text style={styles.gbidLabelComponent}>GREEN BOOK ID</Text>
      </View>
      <View style={styles.gbidValueContainer}>
        <Text style={styles.gbidValueComponent}>{oGBDetails.sGBID}</Text>
      </View>
      {/*DOB*/}
      <View style={styles.dtDOBLabelContainer}>
        <Text style={styles.dtDOBLabelComponent}>DATE OF BIRTH</Text>
      </View>
      <View style={styles.dtDOBValueContainer}>
        <Text style={styles.dtDOBValueComponent}>{oGBDetails.dtDOB}</Text>
      </View>
      {/*AGE*/}
      {/*<View style={styles.ageLabelContainer}>
        <Text style={styles.ageLabelComponent}>AGE</Text>
      </View>
      <View style={styles.ageValueContainer}>
        <Text style={styles.ageValueComponent}>
          {oUserHardcodedMyProfile.nAge}
        </Text>
  </View>*/}
      {/*AUTHREGION*/}
      {/*<View style={styles.sAuthRegionLabelContainer}>
        <Text style={styles.sAuthRegionLabelComponent}>AUTHORITY REGION</Text>
      </View>
      <View style={styles.sAuthRegionValueContainer}>
        <Text style={styles.sAuthRegionValueComponent}>
          {oUserHardcodedMyProfile.sAuthorityRegion}
        </Text>
</View>*/}
      {/*EMAIL ADDRESS*/}
      <View style={styles.emailIDLabelContainer}>
        <Text style={styles.emailIDLabelComponent}>EMAIL ADDRESS</Text>
      </View>
      <TouchableOpacity style={styles.emailIDValueContainer} >
        <Text style={styles.emailIDValueComponent}>{oGoogle.email}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const MyProfileScreenOptions = (navData) => {
  return {
    headerTitle: 'My Profile',
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
    headerRight: CustomHeaderRightButton,
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
  },
  headerContainer: {
    width: wp(32),
    height: hp(4),
    //marginTop: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 18 : 30,
  },
  headerComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 14.4 : 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blue,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  nameLabelContainer: {
    width: wp(75),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  nameLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  nameValueContainer: {
    width: wp(75),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.2
        : 27,
  },
  nameValueComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.8 : 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  gbidLabelContainer: {
    width: wp(75),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  gbidLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  gbidValueContainer: {
    width: wp(75),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.2
        : 27,
  },
  gbidValueComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.8 : 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  ageLabelContainer: {
    width: wp(75),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  ageLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  ageValueContainer: {
    width: wp(75),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.2
        : 27,
  },
  ageValueComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.8 : 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  dtDOBLabelContainer: {
    width: wp(75),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  dtDOBLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  dtDOBValueContainer: {
    width: wp(75),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.2
        : 27,
  },
  dtDOBValueComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.8 : 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  emailIDLabelContainer: {
    width: wp(75),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  emailIDLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  emailIDValueContainer: {
    width: wp(75),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.2
        : 27,
  },
  emailIDValueComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.8 : 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  sAuthRegionLabelContainer: {
    width: wp(75),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  sAuthRegionLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  sAuthRegionValueContainer: {
    width: wp(75),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.2
        : 27,
  },
  sAuthRegionValueComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.8 : 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
});
