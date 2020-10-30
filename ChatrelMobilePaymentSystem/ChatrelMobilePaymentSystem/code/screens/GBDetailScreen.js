import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import {sDateFormat} from '../constants/CommonConfig';

export const GBDetailScreen = (props) => {
  const [nGBID, setnGBID] = useState("");
  const [dtDOB, setdtDOB] = useState(null);
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
          secureTextEntry={true}
          keyboardType={"number-pad"}
          keyboardAppearance={"default"}
          disableFullscreenUI={true}
          maxLength={7}
          onChangeText={(value) => { setnGBID(value) }}
          value={nGBID}
        />
      </View>
      <View style={styles.container}>
        <DatePicker
          style={{ width: 150 }}
          date={dtDOB}
          mode="date"
          placeholder="Select DOB"
          format={sDateFormat}
          //minDate="2016-05-01"
          //maxDate="2016-06-01"
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
          title="Continue"
          onPress={()=>{console.log({
            nGBID:parseInt(nGBID),
            dtDob:dtDOB
          })
          props.navigation.navigate({routeName:"Home"})
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