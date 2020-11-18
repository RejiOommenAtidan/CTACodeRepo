import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Moment from 'moment';

export const ChatrelHistoryScreen = (props) => {
  const DATA = [
    {
      sChatrelRecieptNumber: 'W1',
      dtEntered: "01-03-2020",
      dtPeriodFrom: "2015",
      dtPeriodTo: "2020",
      sGBID: "1234567",
      sFirstName: "Malay",
      sLastName: "Doshi",
      sRelation: "Self",
    },
    {
      sChatrelRecieptNumber: 'W2',
      dtEntered: "01-03-2020",
      dtPeriodFrom: "2015",
      dtPeriodTo: "2020",
      sGBID: "1234568",
      sFirstName: "Siddhesh",
      sLastName: "Lad",
      sRelation: "Friend",
    },
    {
      sChatrelRecieptNumber: 'w3',
      dtEntered: "01-03-2020",
      dtPeriodFrom: "2015",
      dtPeriodTo: "2020",
      sGBID: "12345679",
      sFirstName: "Paresh",
      sLastName: "Doshi",
      sRelation: "Father",
    },
  ];

  const oCurrentGBDetails = useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails);

  const getChatrelHistoryDetails = () => {
    axios.get(`/ChatrelPayment/GetPaymentHistory/?sGBID=` + oCurrentGBDetails.sGBID)
      .then(resp => {
        if (resp.status === 200) {
          setPaymentHistory(resp.data);
          console.log(resp.data);
        }
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.config);
      });
  };

  useEffect(() => {
    //getChatrelHistoryDetails();
  }, []);

  const [paymentHistory, setPaymentHistory] = useState(DATA);

  const handleReceiptOnPress = (singleHistory) => {
    console.log(singleHistory);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      {
        paymentHistory.map((singleHistory, index) => {
          return (
            <Card
              title={singleHistory.sFirstName + " " + singleHistory.sLastName}
              //featuredSubtitle={singleHistory.sRelation}
              key={index}
              style={styles.historyComponent}
            >
              <Card.Divider />
              {/*<Card.Image source={require('../assets/CTALogo.png')} />*/}
              <View>
                <Text>Relation: {singleHistory.sRelation}</Text>
              </View>
              <View>
                <Text>Receipt Number: {singleHistory.sChatrelRecieptNumber}</Text>
              </View>
              <View>
                <Text>Date: {singleHistory.dtEntered}</Text>
              </View>
              <View>
                <Text>Period: {singleHistory.dtPeriodFrom + " - " + singleHistory.dtPeriodTo}</Text>
              </View>
              <View>
              </View><Button title={"Download Receipt"} onPress={() => { handleReceiptOnPress(singleHistory) }} />
            </Card>
          )
        })
      }
    </ScrollView>
  );
};

export const ChatrelHistoryScreenOptions = navData => {
  return {
    headerTitle: 'Chartel History',
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
    margin: 5
  },
  historyComponent: {
  }
});
