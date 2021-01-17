import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {Platform} from 'react-native';
import {Card, Button} from 'react-native-elements';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {CustomHeaderRightButton} from '../components/HeaderRightButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {sDateFormat,sPoppinsFontName} from '../constants/CommonConfig';
import Moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {storeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';

export const FamilyChatrelIntermediateScreen = (props) => {
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
  const oCurrentGBDetails = useSelector(
    (state) => state.GBDetailsReducer.oGBDetails,
  );
  const getFamilyDetails = () => {
    axios
      .get(`/ChatrelPayment/GetFamilyDetails/?sGBID=` + oCurrentGBDetails.sGBID)
      .then((resp) => {
        if (resp.status === 200) {
          setaFamilyMembers(resp.data);
          //console.log(resp.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.config);
      });
  };

  useEffect(() => {
    getFamilyDetails();
  }, []);

  const handleFamilyMemberPress = (member) => {
    console.log(member);
    let oCurrentGBDetails = {
      sGBID: member.sGBIDRelation,
      dtDOB: Moment(member.dtDOB).format(sDateFormat),
    };
    dispatch(storeCurrentGBDetails(oCurrentGBDetails));
    props.navigation.navigate('FriendChatrel');
  };
  return (
    <View style={styles.mainContainer}>
      {/*<View style={styles.headingContainer}>
        <Text style={styles.headingComponent}>FAMILY MEMBERS</Text>
  </View>*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        {aFamilyMembers.map((member, index) => {
          return (
            <View key={index}>
              {/* <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => { handleFamilyMemberPress(member) }}
              > */}
              <Card
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
                  <View style={styles.gbidLabelContainer}>
                    <Text style={styles.gbidLabelComponent}>GREEN BOOK ID</Text>
                    <Text style={styles.gbidValueComponent}>
                      {member.sGBIDRelation !== null
                        ? member.sGBIDRelation
                        : 'GB Id not present'}
                    </Text>
                  </View>
                  {/* <View style={styles.gbidValueContainer}>
                </View> */}
                  {/*Age*/}
                  <View style={styles.ageLabelContainer}>
                    <Text style={styles.ageLabelComponent}>AGE</Text>
                    <Text style={styles.ageValueComponent}>{member.nAge}</Text>
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
                  <View style={styles.dtDOBLabelContainer}>
                    <Text style={styles.dtDOBLabelComponent}>
                      DATE OF BIRTH
                    </Text>
                    <Text style={styles.dtDOBValueComponent}>
                      {Moment(member.dtDOB).format(sDateFormat)}
                    </Text>
                  </View>
                  {/* <View style={styles.dtDOBValueContainer}>
                </View> */}
                  {/*Relation*/}
                  <View style={styles.relationLabelContainer}>
                    <Text style={styles.relationLabelComponent}>RELATION</Text>
                    <Text style={styles.relationValueComponent}>
                      {member.sRelation}
                    </Text>
                  </View>
                  {/* <View style={styles.relationValueContainer}>
                </View> */}
                </View>
                <View style={styles.payNowContainer}>
                  <Button
                    disabled={member.sGBIDRelation === null}
                    title={'PAY NOW'}
                    onPress={() => {
                      handleFamilyMemberPress(member);
                    }}
                    iconRight
                    icon={{
                      type: 'font-awesome-5',
                      name: 'donate',
                      color: Colors.white,
                    }}
                    type="outline"
                    titleStyle={{
                      color: Colors.white,
                      fontStyle: 'normal',
                      fontWeight: '900',
                      fontFamily: sPoppinsFontName,
                      fontSize:
                        Dimensions.get('window').width <
                        Resolution.nWidthBreakpoint
                          ? 9
                          : 15,
                    }}
                    buttonStyle={{
                      height: hp(5),
                      backgroundColor: Colors.buttonYellow,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: Colors.buttonYellow,
                      // marginBottom:
                      //   Dimensions.get('window').height <
                      //   Resolution.nHeightBreakpoint
                      //     ? 3
                      //     : 5,
                    }}
                  />
                </View>
              </Card>
              {/* </TouchableOpacity> */}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export const FamilyChatrelIntermediateScreenOptions = (navData) => {
  return {
    headerTitle: 'Family Chatrel',
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
    flexDirection: 'column',
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
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
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sPoppinsFontName,
  },
  touchableOpacity: {},
  cardComponent: {
    width: wp(80),
    height: Platform.OS === 'ios' ? hp(28.25) : hp(30),
    borderRadius: 15,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },
  cardHeaderComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint
        ? 13.5
        : 22.5,
    fontStyle: 'normal',
    fontWeight: '300',
    color: Colors.primary,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sPoppinsFontName,
    // marginBottom:
    //   Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },

  chatrelLabelContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },
  chatrelLabelComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 8.4 : 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.darkYellowFamilyPage,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sPoppinsFontName,
  },

  cardDividerComponent: {
    height: 0.75,
    backgroundColor: Colors.greenBG,
  },

  gbidLabelContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  gbidLabelComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sPoppinsFontName,
  },
  gbidValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  gbidValueComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sPoppinsFontName,
  },

  ageLabelContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  ageLabelComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sPoppinsFontName,
  },
  ageValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  ageValueComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sPoppinsFontName,
  },

  dtDOBLabelContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  dtDOBLabelComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sPoppinsFontName,
  },
  dtDOBValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  dtDOBValueComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sPoppinsFontName,
  },

  relationLabelContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  relationLabelComponent: {
    textAlign: 'right',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sPoppinsFontName,
  },
  relationValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  relationValueComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sPoppinsFontName,
  },
  payNowContainer: {
    marginTop: hp(0.25),
  },
});
