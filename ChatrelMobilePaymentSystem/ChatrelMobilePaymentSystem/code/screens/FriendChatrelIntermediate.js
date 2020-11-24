import React, { useState } from 'react';
import { Switch, Text, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { sDateFormat } from '../constants/CommonConfig';
import Moment from 'moment';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import axios from 'axios';

export const FriendChatrelIntermediateScreen = (props) => {
  const [nFriendGBID, setnFriendGBID] = useState("");
  const [sFriendFirstname, setsFriendFirstname] = useState("");
  const [sFriendLastname, setsFriendLastname] = useState("");
  const [bShowFriendGBID, setbShowFriendGBID] = useState(true);
  const [dtFriendDOB, setdtFriendDOB] = useState(null);
  const dtToday = Moment().format(sDateFormat);
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingComponent}>Chatrel For Friends</Text>
        </View>
        <View style={styles.firstNameLabelContainer}>
          <Text style={styles.firstNameLabelComponent}>FIRST NAME</Text>
        </View>
        <View style={styles.firstNameValueContainer}>
          <Input
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={{
              height: Dimensions.get('window').height * 0.02,
              marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
              borderRadius: 10,
              backgroundColor: Colors.white,
              borderColor: Colors.white
            }}
            //label="Friend's Firstname"
            placeholder="Friend's First Name"
            //autoFocus={true}
            //autoCapitalize={"characters"}
            autoCompleteType={"off"}
            autoCorrect={false}
            clearButtonMode={"while-editing"}
            //dataDetectorTypes={"phoneNumber"}
            //secureTextEntry={!bShowFriendGBID}
            keyboardType={"default"}
            keyboardAppearance={"default"}
            disableFullscreenUI={true}
            //maxLength={7}
            onChangeText={(value) => { setsFriendFirstname(value) }}
            value={sFriendFirstname}
          />
        </View>
        <View style={styles.lastNameLabelContainer}>
          <Text style={styles.lastNameLabelComponent}>LAST NAME</Text>
        </View>
        <View style={styles.lastNameValueContainer}>
          <Input
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={{
              height: Dimensions.get('window').height * 0.02,
              marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
              borderRadius: 10,
              backgroundColor: Colors.white,
              borderColor: Colors.white
            }}
            //label="Friend's Lastname"
            placeholder="Friend's Last Name"
            //autoFocus={true}
            //autoCapitalize={"characters"}
            autoCompleteType={"off"}
            autoCorrect={false}
            clearButtonMode={"while-editing"}
            //dataDetectorTypes={"phoneNumber"}
            //secureTextEntry={!bShowFriendGBID}
            keyboardType={"default"}
            keyboardAppearance={"default"}
            disableFullscreenUI={true}
            //maxLength={7}
            onChangeText={(value) => { setsFriendLastname(value) }}
            value={sFriendLastname}
          />
        </View>
        {/*GBID*/}
        <View style={styles.gbidLabelContainer}>
          <Text style={styles.gbidLabelComponent}>GREENBOOK ID</Text>
        </View>
        <View style={styles.gbidValueContainer}>
          <Input
            inputContainerStyle={{ borderBottomWidth: 0 }}
            inputStyle={{
              height: Dimensions.get('window').height * 0.02,
              marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
              borderRadius: 10,
              backgroundColor: Colors.white,
              borderColor: Colors.white
            }}
            //label="Friend's GBID"
            placeholder="Friend's GBID"
            //autoFocus={true}
            //autoCapitalize={"characters"}
            autoCompleteType={"off"}
            autoCorrect={false}
            clearButtonMode={"while-editing"}
            //dataDetectorTypes={"phoneNumber"}
            //secureTextEntry={!bShowFriendGBID}
            keyboardType={"number-pad"}
            keyboardAppearance={"default"}
            disableFullscreenUI={true}
            maxLength={7}
            onChangeText={(value) => { setnFriendGBID(value) }}
            value={nFriendGBID}
          />
        </View>
        {/*<View style={styles.container}>
          <Switch
            onValueChange={() => { setbShowFriendGBID(!bShowFriendGBID) }}
            value={bShowFriendGBID}
          />
          <Text>Show/Hide Friend's GBID</Text>
        </View>*/}
        {/*First Name*/}

        <View style={styles.dobLabelContainer}>
          <Text style={styles.dobLabelComponent}>DATE OF BIRTH</Text>
        </View>
        <View style={styles.dobValueContainer}>
          <DatePicker
            androidMode={"spinner"}
            style={{
              width: Dimensions.get('window').width * 0.775,
              //backgroundColor: Colors.white,
              //borderColor: Colors.white
            }}
            date={dtFriendDOB}
            mode="date"
            placeholder="Friend's DOB"
            format={sDateFormat}
            //minDate={dtToday}
            maxDate={dtToday}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              placeholderText: {
                fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
                fontFamily: 'Kanit-Regular'
              },
              // dateIcon: {
              //   width:0,
              //   height:0,
              //   },
              dateInput: {
                //textAlign:'left',
                marginLeft: 36,
                backgroundColor: Colors.white,
                borderRadius: 10,
                borderWidth: 1,
                //overflow: 'hidden',
                borderColor: Colors.white,
                //justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }
            }}
            onDateChange={(date) => { setdtFriendDOB(date) }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Verify & Continue"
            onPress={() => {
              let oFriendGBDetails = {
                nFriendGBID: parseInt(nFriendGBID),
                sFriendFirstname: sFriendFirstname,
                sFriendLastname: sFriendLastname,
                dtFriendDOB: dtFriendDOB
              };
              console.log(oFriendGBDetails);
              props.navigation.navigate("FriendChatrel");
            }}
            titleStyle={{
              color: Colors.white,
              fontFamily: 'Kanit-Regular'
            }}
            buttonStyle={{
              backgroundColor: Colors.primary,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: Colors.primary,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export const FriendChatrelIntermediateScreenOptions = navData => {
  return {
    headerTitle: 'Chatrel for a Friend',
    headerLeft: () => {
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    }
  };
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical: Dimensions.get('window').height * Resolution.nHeightScreenMargin
  },
  headingContainer: {
    width: Dimensions.get('window').width * 0.55,
    height: Dimensions.get('window').height * 0.04,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 22.2 : 37
  },
  headingComponent: {
    width: '100%',
    height: '100%',
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 14.4 : 24,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blue,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },

  gbidLabelContainer: {
    width: Dimensions.get('window').width * 0.22,
    height: Dimensions.get('window').height * 0.02,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6
  },
  gbidLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.primary,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  gbidValueContainer: {},

  firstNameLabelContainer: {
    width: Dimensions.get('window').width * 0.22,
    height: Dimensions.get('window').height * 0.02,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6
  },
  firstNameLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.primary,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  firstNameValueContainer: {},

  lastNameLabelContainer: {
    width: Dimensions.get('window').width * 0.22,
    height: Dimensions.get('window').height * 0.02,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6
  },
  lastNameLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.primary,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  lastNameValueContainer: {},

  dobLabelContainer: {
    width: Dimensions.get('window').width * 0.22,
    height: Dimensions.get('window').height * 0.02,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6
  },
  dobLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.primary,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  dobValueContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 30 : 50,
  },

  buttonContainer: {},
});