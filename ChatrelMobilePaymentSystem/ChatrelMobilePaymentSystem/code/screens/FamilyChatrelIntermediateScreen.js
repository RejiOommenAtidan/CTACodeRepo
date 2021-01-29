import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import { CustomHeaderRightButton } from '../components/HeaderRightButton';
import { Loader } from '../components/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  sDateFormat,
  sFontName,
  sFontNameBold,
  oActivityIndicatorStyle,
} from '../constants/CommonConfig';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { storeCurrentGBDetails } from '../store/actions/CurrentGBDetailsAction';
import { useIsFocused } from '@react-navigation/native';

export const FamilyChatrelIntermediateScreen = (props) => {
  const isFocused = useIsFocused();
  // const aFamilyMembersHardCoded = [
  //   {
  //     sName: 'Jane Doe',
  //     sRelation: 'Mother',
  //     dtDOB: '26-10-1972',
  //     nAge: 48,
  //     sGBIDRelation: '3571596',
  //     nChatrelDue: 250,
  //   },
  //   {
  //     sName: 'John Doe',
  //     sRelation: 'Father',
  //     dtDOB: '26-10-1968',
  //     nAge: 52,
  //     sGBIDRelation: '7531593',
  //     nChatrelDue: 200,
  //   },
  //   {
  //     sName: 'Martha Doe',
  //     sRelation: 'Spouse',
  //     dtDOB: '1997-03-02',
  //     nAge: 23,
  //     sGBIDRelation: '4862579',
  //     nChatrelDue: 225,
  //   },
  // ];

  const dispatch = useDispatch();
  const [aFamilyMembers, setaFamilyMembers] = useState([]);
  const [bLoader, setbLoader] = useState(true);
  const oCurrentGBDetails = useSelector(
    (state) => state.GBDetailsReducer.oGBDetails,
  );
  const getFamilyDetails = () => {
    axios
      .get(`/ChatrelPayment/GetFamilyDetails/?sGBID=` + oCurrentGBDetails.sGBID)
      .then((resp) => {
        if (resp.status === 200) {
          setaFamilyMembers(resp.data);
          setbLoader(false);
          //console.log(resp.data);
        }
      })
      .catch((error) => {
        setbLoader(false);
        alert('Something went wrong, please try again later.');
        console.log(error.message);
        console.log(error.config);
      });
  };

  useEffect(() => {
    if (isFocused) {
      setbLoader(true);
      console.log('Fam Chatrel Called');
      getFamilyDetails();
    }
  }, [isFocused]);

  const handleFamilyMemberPress = (member) => {
    try {
      setbLoader(true);
      console.log(member);
      let oCurrentGBDetails = {
        sGBID: member.sGBIDRelation,
        dtDOB: Moment(member.dtDOB).format(sDateFormat),
      };
      dispatch(storeCurrentGBDetails(oCurrentGBDetails));
      props.navigation.navigate('FamilyChatrel');
    } catch (e) {
      setbLoader(false);
      alert('Something went wrong, please try again later.');
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Loader
        loading={bLoader} />
      {/*<View style={styles.headingContainer}>
        <Text style={styles.headingComponent}>FAMILY MEMBERS</Text>
  </View>*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        {aFamilyMembers.length === 0 && !bLoader && (
          <View style={styles.zeroRecordContainer}>
            <Text style={styles.zeroRecordComponent}>
              No Family Members added, Contact the CTA Team to add Family
              members
            </Text>
          </View>
        )}
        {aFamilyMembers.map((member, index) => {
          return (
            <Card
              key={index}
              containerStyle={styles.cardComponent}
              title={
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: hp(1),
                  }}>
                  <Text style={styles.cardHeaderComponent}>
                    {member.dPending?.sName || member.sName}
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      //marginBottom: hp(2),
                    }}>
                    <Text style={styles.chatrelLabelComponent}>
                      {member.dPending?.chatrelPayment?.nChatrelTotalAmount
                        ? `$${member.dPending?.chatrelPayment?.nChatrelTotalAmount}`
                        : 'NA'}
                    </Text>
                  </View>
                </View>
              }
              titleStyle={{}}>
              {/* <Card.Title style={styles.cardHeaderComponent}>
                  {member.sName}
                </Card.Title> */}
              {/*Currency*/}
              {/* <View style={styles.chatrelLabelContainer}>
                  <Text style={styles.chatrelLabelComponent}>
                    USD {member.nChatrelDue}
                  </Text>
                </View> */}
              {/*<View style={styles.chatrelLabelContainer}>
                    <Text style={styles.chatrelLabelComponent}>USD</Text>
                  </View>
                  <View style={styles.chatrelValueContainer}>
                    <Text style={styles.chatrelValueComponent}>{member.nChatrelDue}</Text>
                  </View>*/}
              <Card.Divider style={styles.cardDividerComponent} />
              {/*GBID*/}

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: hp(1.25),
                }}>
                <View style={styles.labelContainer}>
                  <Text style={styles.labelComponent}>GREEN BOOK ID</Text>
                  <Text style={styles.valueComponent}>
                    {member.sGBIDRelation !== null
                      ? member.sGBIDRelation
                      : 'GB ID not present'}
                  </Text>
                </View>
                {/* <View style={styles.gbidValueContainer}>
                </View> */}
                {/*Age*/}
                <View style={styles.labelContainer}>
                  <Text style={{ ...styles.labelComponent, textAlign: 'right' }}>
                    AGE
                  </Text>
                  <Text style={{ ...styles.valueComponent, textAlign: 'right' }}>
                    {member.nAge}
                  </Text>
                </View>
                {/* <View style={styles.ageValueContainer}>
                </View> */}
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: hp(1.25),
                }}>
                {/*DOB*/}
                <View style={styles.labelContainer}>
                  <Text style={styles.labelComponent}>DATE OF BIRTH</Text>
                  <Text style={styles.valueComponent}>
                    {Moment(member.dtDOB).format(sDateFormat)}
                  </Text>
                </View>
                {/* <View style={styles.dtDOBValueContainer}>
                </View> */}
                {/*Relation*/}
                <View style={styles.labelContainer}>
                  <Text style={{ ...styles.labelComponent, textAlign: 'right' }}>
                    RELATION
                  </Text>
                  <Text style={{ ...styles.valueComponent, textAlign: 'right' }}>
                    {member.sRelation}
                  </Text>
                </View>
                {/* <View style={styles.relationValueContainer}>
                </View> */}
              </View>
              <View style={styles.payNowContainer}>
                <Button
                  disabled={member.sGBIDRelation === null}
                  onPress={() => {
                    handleFamilyMemberPress(member);
                  }}
                  // iconRight
                  // icon={{
                  //   type: 'font-awesome-5',
                  //   name: 'donate',
                  //   color: Colors.white,
                  // }}
                  type="outline"
                  title={'PAY NOW'}
                  titleStyle={{
                    color: Colors.white,
                    fontStyle: 'normal',
                    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                    fontFamily:
                      Platform.OS === 'android' ? sFontNameBold : sFontName,
                    fontSize: wp(4),
                  }}
                  buttonStyle={styles.buttonStyle}
                />
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
};

export const FamilyChatrelIntermediateScreenOptions = (navData) => {
  return {
    headerTitle: 'FAMILY CHATREL',
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
    cardStyle: { backgroundColor: Colors.white },
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    // marginHorizontal:
    //   Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
    alignItems: 'flex-start',
  },
  headingContainer: {
    width: wp(33),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3 : 5,
  },
  headingComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 8.4 : 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    fontFamily: sFontName,
  },

  zeroRecordContainer: {},
  zeroRecordComponent: {
    textAlign: 'center',
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    fontFamily: sFontName,
  },

  cardComponent: {
    width: wp(92.5),
    backgroundColor: Colors.white,

    //Border Stuff
    borderRadius: 15,
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS
    shadowRadius: 15,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,

    //For Android
    elevation: 15,
    overflow: 'visible',

    marginBottom: hp(2),
  },
  cardHeaderComponent: {
    textAlign: 'left',
    fontSize: wp(6),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.primary,
    fontFamily: sFontName,
  },

  chatrelLabelContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },

  chatrelLabelComponent: {
    textAlign: 'right',
    fontSize: wp(5.5),
    fontStyle: 'normal',
    color: Colors.darkYellowFamilyPage,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },

  cardDividerComponent: {
    height: 0.75,
    backgroundColor: Colors.greenBG,
  },

  labelContainer: {
    marginBottom: hp(1.25),
  },

  labelComponent: {
    textAlign: 'left',
    fontSize: wp(3),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.labelColorLight,
    fontFamily: sFontName,
    marginBottom: hp(1),
  },

  valueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },

  valueComponent: {
    textAlign: 'left',
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    fontFamily: sFontName,
  },

  // gbidLabelContainer: {

  // },
  // gbidLabelComponent: {

  // },
  // gbidValueContainer: {

  // },
  // gbidValueComponent: {

  // },

  // ageLabelContainer: {
  //   marginBottom:
  //     Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  // },
  // ageLabelComponent: {
  //   textAlign: 'left',
  //   fontSize:
  //     Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   color: Colors.blackText,
  //   //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
  //   //letterSpacing: Resolution.nLetterSpacing,
  //   fontFamily: sFontName,
  // },
  // ageValueContainer: {
  //   marginBottom:
  //     Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  // },
  // ageValueComponent: {
  //   textAlign: 'left',
  //   fontSize:
  //     Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   color: Colors.blackTextAPI,
  //   //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
  //   //letterSpacing: Resolution.nLetterSpacing,
  //   fontFamily: sFontName,
  // },

  // dtDOBLabelContainer: {
  //   marginBottom:
  //     Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  // },
  // dtDOBLabelComponent: {
  //   textAlign: 'left',
  //   fontSize:
  //     Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   color: Colors.blackText,
  //   //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
  //   //letterSpacing: Resolution.nLetterSpacing,
  //   fontFamily: sFontName,
  // },
  // dtDOBValueContainer: {
  //   marginBottom:
  //     Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  // },
  // dtDOBValueComponent: {
  //   textAlign: 'left',
  //   fontSize:
  //     Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   color: Colors.blackTextAPI,
  //   //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
  //   //letterSpacing: Resolution.nLetterSpacing,
  //   fontFamily: sFontName,
  // },

  // relationLabelContainer: {
  //   marginBottom:
  //     Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  // },
  // relationLabelComponent: {
  //   textAlign: 'right',
  //   fontSize:
  //     Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   color: Colors.blackText,
  //   //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
  //   //letterSpacing: Resolution.nLetterSpacing,
  //   fontFamily: sFontName,
  // },
  // relationValueContainer: {
  //   marginBottom:
  //     Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  // },
  // relationValueComponent: {
  //   textAlign: 'left',
  //   fontSize:
  //     Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
  //   fontStyle: 'normal',
  //   fontWeight: 'normal',
  //   color: Colors.blackTextAPI,
  //   //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
  //   //letterSpacing: Resolution.nLetterSpacing,
  //   fontFamily: sFontName,
  // },
  payNowContainer: {
    marginTop: hp(1),
  },
  buttonStyle: {
    backgroundColor: Colors.buttonYellow,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.buttonYellow,
  },
});
