import React, { useState } from 'react';
import { View, StyleSheet,Text,Switch } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import {sDateFormat} from '../constants/CommonConfig';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {storeGBDetails} from '../store/actions/GBDetailsAction';


export const GBDetailScreen = (props) => {
  const dispatch = useDispatch();
  const [nGBID, setnGBID] = useState("");
  const [bShowGBID, setbShowGBID] = useState(true);
  const [dtDOB, setdtDOB] = useState(null);
  const dtToday = Moment().format(sDateFormat);
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Input
          label="Enter GBID"
          placeholder="GBID Please"
          autoFocus={true}
          //autoCapitalize={"characters"}
          autoCompleteType={"off"}
          autoCorrect={false}
          clearButtonMode={"while-editing"}
          //dataDetectorTypes={"phoneNumber"}
          secureTextEntry={!bShowGBID}
          keyboardType={"number-pad"}
          keyboardAppearance={"default"}
          disableFullscreenUI={true}
          maxLength={7}
          onChangeText={(value) => { setnGBID(value) }}
          value={nGBID}
        />
        <View style={styles.container}>
        <Switch
          onValueChange={()=>{setbShowGBID(!bShowGBID)}}
          value={bShowGBID}
        /> 
        <Text>Show/Hide GBID</Text>
        </View>
      </View>
      <View style={styles.container}>
        <DatePicker
          androidMode={"spinner"}
          style={{ width: 150 }}
          date={dtDOB}
          mode="date"
          placeholder="Select DOB"
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
          onDateChange={(date) => { setdtDOB(date) }}
        />
      </View>
      <View style={styles.container}>
        <Button
          title="Verify & Continue"
          onPress={()=>{
            let oGBDetails={
              nGBID:parseInt(nGBID),
              dtDob:dtDOB
            };
            console.log(oGBDetails);
          dispatch(storeGBDetails(oGBDetails));
          props.navigation.navigate({routeName:"Home"});
        }}
        />
      </View>
    </View>
  );
};

GBDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: 'GB Details',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};


const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});