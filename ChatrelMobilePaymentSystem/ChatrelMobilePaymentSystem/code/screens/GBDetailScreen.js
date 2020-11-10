import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Switch, BackHandler, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import { sDateFormat } from '../constants/CommonConfig';
import Moment from 'moment';
import { useDispatch } from 'react-redux';
import { storeGBDetails } from '../store/actions/GBDetailsAction';
import { storeCurrentGBDetails } from '../store/actions/CurrentGBDetailsAction';
import Colors from '../constants/Colors';

export const GBDetailScreen = (props) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
    };
  }, []);

  const dispatch = useDispatch();
  const [sGBID, setsGBID] = useState("");
  const [bShowGBID, setbShowGBID] = useState(true);
  const [dtDOB, setdtDOB] = useState(null);
  const dtToday = Moment().format(sDateFormat);

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={{flex: 1}}
      resizeMode="cover">
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.headerComponent}>
          Verify your Details
        </Text>
      </View>
      <View>
        <Text style={styles.textComponent}>
          Disclaimer: All Fields are Mandatory
        </Text>
      </View>
      <View style={styles.gbidContainer}>
        <Input
          label="Enter GBID"
          placeholder="GBID Please"
          autoFocus={true}
          autoCompleteType={"off"}
          autoCorrect={false}
          clearButtonMode={"while-editing"}
          //secureTextEntry={!bShowGBID}
          keyboardType={"number-pad"}
          keyboardAppearance={"default"}
          disableFullscreenUI={true}
          maxLength={7}
          onChangeText={(value) => { setsGBID(value) }}
          value={sGBID}
        />
        {/*<View style={styles.showGBIDContainer}>
          <Switch
            style={styles.showGBIDComponent}
            onValueChange={() => { setbShowGBID(!bShowGBID) }}
            value={bShowGBID}
          />
          <Text>Show/Hide GBID</Text>
        </View>*/}
      </View>
      <View style={styles.dobContainer}>
        <DatePicker
          androidMode={"spinner"}
          style={styles.dobComponent}
          date={dtDOB}
          mode="date"
          placeholder="Select DOB"
          format={sDateFormat}
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
      <View style={styles.buttonContainer}>
        <Button
          style={styles.buttonComponent}
          title="Verify & Continue"
          onPress={() => {
            let oGBDetails = {
              sGBID: sGBID,
              dtDob: dtDOB
            };
            dispatch(storeGBDetails(oGBDetails));
            dispatch(storeCurrentGBDetails(oGBDetails));
            props.navigation.navigate({ routeName: "Home" });
          }}
        />
      </View>
    </View>
    </ImageBackground>
  );
};

GBDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: 'GB Details',
    header: null,
    headerLeft: null,
    headerRight: null
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 5,
    flexDirection: 'column'
  },
  headerComponent: {
    marginTop: 300,
    paddingLeft: 10,
    textAlign: "left",
    fontSize: 28,
    paddingBottom: 10,
    fontStyle: "normal",
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.white
  },
  textComponent: {
    paddingLeft: 10,
    fontSize: 16,
    textAlign: "left",
    paddingBottom: 5,
    marginBottom: 15,
    fontStyle: "normal",
    fontWeight: "bold",
    color: Colors.white
  },
  gbidContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gbidComponent: {
    height: 40,
    paddingLeft: 10
  },
  dobContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dobComponent: {
    height: 40,
    paddingLeft: 10,
    width: 375
  },
  buttonContainer: {
    marginTop: 20
  },
  buttonComponent: {
    // marginTop:20
    // marginLeft:20,
    // marginRight:20
  }
});