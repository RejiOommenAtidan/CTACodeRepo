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

export const FriendChatrelIntermediateScreen = (props) => {
  const [nFriendGBID, setnFriendGBID] = useState("");
  const [sFriendFirstname, setsFriendFirstname] = useState("");
  const [sFriendLastname, setsFriendLastname] = useState("");
  const [bShowFriendGBID, setbShowFriendGBID] = useState(true);
  const [dtFriendDOB, setdtFriendDOB] = useState(null);
  const dtToday = Moment().format(sDateFormat);
  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.container}>
          {/*<Text>Chatrel for a Friend</Text>*/}
          <Text>Please Provide the following Information for verification</Text></View>
        <Input
          label="Friend's GBID"
          placeholder="Friend's GBID Please"
          autoFocus={true}
          //autoCapitalize={"characters"}
          autoCompleteType={"off"}
          autoCorrect={false}
          clearButtonMode={"while-editing"}
          //dataDetectorTypes={"phoneNumber"}
          secureTextEntry={!bShowFriendGBID}
          keyboardType={"number-pad"}
          keyboardAppearance={"default"}
          disableFullscreenUI={true}
          maxLength={7}
          onChangeText={(value) => { setnFriendGBID(value) }}
          value={nFriendGBID}
        />
        <View style={styles.container}>
          <Switch
            onValueChange={() => { setbShowFriendGBID(!bShowFriendGBID) }}
            value={bShowFriendGBID}
          />
          <Text>Show/Hide Friend's GBID</Text>
        </View>
        <View style={styles.container}>
          <Input
            label="Friend's Firstname"
            placeholder="Friend's Firstname Please"
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
        <View style={styles.container}>
          <Input
            label="Friend's Lastname"
            placeholder="Friend's Lastname Please"
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
        <View style={styles.container}>
          <DatePicker
            androidMode={"spinner"}
            style={{ width: 150 }}
            date={dtFriendDOB}
            mode="date"
            placeholder="Select Friend's DOB"
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
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(date) => { setdtFriendDOB(date) }}
          />
        </View>
        <View style={styles.container}>
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
              // debugger;
              props.navigation.navigate("FriendChatrel");
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
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical: Dimensions.get('window').height * Resolution.nHeightScreenMargin
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});