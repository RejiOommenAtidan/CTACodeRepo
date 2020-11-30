import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import { CustomHeaderRightButton } from '../components/HeaderRightButton';
import { sDateFormat } from '../constants/CommonConfig';
import Moment from 'moment';

export const FamilyChatrelIntermediateScreen = (props) => {
  const aFamilyMembersHardCoded = [
    { sName: "Jane Doe", sRelation: "Mother", dtDOB: "26-10-1972", nAge: 48, sGBIDRelation: "3571596", nChatrelDue: 250 },
    { sName: "John Doe", sRelation: "Father", dtDOB: "26-10-1968", nAge: 52, sGBIDRelation: "7531593", nChatrelDue: 200 },
    { sName: "Martha Doe", sRelation: "Spouse", dtDOB: "1997-03-02", nAge: 23, sGBIDRelation: "4862579", nChatrelDue: 225 },
  ];
  const [aFamilyMembers, setaFamilyMembers] = useState(aFamilyMembersHardCoded);
  const oCurrentGBDetails = useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails);
  const getFamilyDetails = () => {
    axios.get(`/ChatrelPayment/GetFamilyDetails/?sGBID=` + oCurrentGBDetails.sGBID)
      .then(resp => {
        if (resp.status === 200) {
          setaFamilyMembers(resp.data);
        }
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.config);
      });
  };

  useEffect(() => {
    //getFamilyDetails();
  });

  const handleFamilyMemberPress = (member) => {
    console.log(member)
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingComponent}>FAMILY MEMBERS</Text>
      </View>
      <ScrollView>
        {aFamilyMembers.map((member, index) => {
          return (
            <View key={index} >
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => { handleFamilyMemberPress(member) }}
              >
                <Card containerStyle={styles.cardComponent}>
                  <Card.Title style={styles.cardHeaderComponent}>{member.sName}</Card.Title>
                  {/*Currency*/}
                  <View style={styles.chatrelLabelContainer}>
                    <Text style={styles.chatrelLabelComponent}>USD {member.nChatrelDue}</Text>
                  </View>
                  {/*<View style={styles.chatrelLabelContainer}>
                    <Text style={styles.chatrelLabelComponent}>USD</Text>
                  </View>
                  <View style={styles.chatrelValueContainer}>
                    <Text style={styles.chatrelValueComponent}>{member.nChatrelDue}</Text>
                  </View>*/}
                  <Card.Divider style={styles.cardDividerComponent} />
                  {/*GBID*/}
                  <View style={styles.gbidLabelContainer}>
                    <Text style={styles.gbidLabelComponent}>GREENBOOK ID</Text>
                  </View>
                  <View style={styles.gbidValueContainer}>
                    <Text style={styles.gbidValueComponent}>{member.sGBIDRelation}</Text>
                  </View>
                  {/*Age*/}
                  <View style={styles.ageLabelContainer}>
                    <Text style={styles.ageLabelComponent}>AGE</Text>
                  </View>
                  <View style={styles.ageValueContainer}>
                    <Text style={styles.ageValueComponent}>{member.nAge}</Text>
                  </View>
                  {/*DOB*/}
                  <View style={styles.dtDOBLabelContainer}>
                    <Text style={styles.dtDOBLabelComponent}>DATE OF BIRTH</Text>
                  </View>
                  <View style={styles.dtDOBValueContainer}>
                    <Text style={styles.dtDOBValueComponent}>{member.dtDOB}</Text>
                  </View>
                  {/*Relation*/}
                  <View style={styles.relationLabelContainer}>
                    <Text style={styles.relationLabelComponent}>RELATION</Text>
                  </View>
                  <View style={styles.relationValueContainer}>
                    <Text style={styles.relationValueComponent}>{member.sRelation}
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
    </View>
  );
};

export const FamilyChatrelIntermediateScreenOptions = navData => {
  return {
    headerTitle: 'Family Chatrel',
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: CustomHeaderRightButton
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical: Dimensions.get('window').height * Resolution.nHeightScreenMargin,
    alignItems: "flex-start"
  },
  headingContainer: {
    width: Dimensions.get('window').width * 0.33,
    height: Dimensions.get('window').height * 0.03,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3 : 5
  },
  headingComponent: {
    width: '100%',
    height: '100%',
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 8.4 : 14,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  touchableOpacity: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10
  },
  cardComponent: {
    width: Dimensions.get('window').width * 0.70,
    height: Dimensions.get('window').height * 0.45,
    borderRadius: 15,
    borderColor: Colors.white,
    backgroundColor: Colors.white
  },
  cardHeaderComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 13.5 : 22.5,
    fontStyle: "normal",
    fontWeight: "300",
    color: Colors.primary,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Light',
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10
  },

  chatrelLabelContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10
  },
  chatrelLabelComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 8.4 : 14,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.darkYellowFamilyPage,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },

  cardDividerComponent: {
    height: 0.75,
    backgroundColor: Colors.greenBG
  },

  gbidLabelContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
  },
  gbidLabelComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  gbidValueContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15
  },
  gbidValueComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },

  ageLabelContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
  },
  ageLabelComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  ageValueContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15
  },
  ageValueComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },

  dtDOBLabelContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
  },
  dtDOBLabelComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  dtDOBValueContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15
  },
  dtDOBValueComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },

  relationLabelContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
  },
  relationLabelComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  relationValueContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15
  },
  relationValueComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  }
});