import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform, ScrollView, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import Moment from 'moment';
import { sDateFormat } from '../constants/CommonConfig';

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

  const handleDownloadReceiptOnPress = (singleHistory) => {
    console.log(singleHistory);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.headingComponent}>CHATREL HISTORY</Text>
      </View>
      <ScrollView>
        {
          paymentHistory.map((singleHistory, index) => {
            return (
              <Card
                key={index}
                containerStyle={styles.cardComponent}
              >
                <Card.Title style={styles.cardHeaderComponent}>{singleHistory.sFirstName + " " + singleHistory.sLastName}</Card.Title>
                {/*<Card.Image source={require('../assets/CTALogo.png')} />*/}
                <View style={styles.relationContainer}>
                  <Text style={styles.relationComponent}>{singleHistory.sRelation}</Text>
                </View>
                <Card.Divider style={styles.cardDividerComponent} />
                <View style={styles.receiptNumberLabelContainer}>
                  <Text style={styles.receiptNumberLabelComponent}>RECEIPT NUMBER</Text>
                </View>
                <View style={styles.receiptNumberValueContainer}>
                  <Text style={styles.receiptNumberValueComponent}>{singleHistory.sChatrelRecieptNumber}</Text>
                </View>
                <View style={styles.dateLabelContainer}>
                  <Text style={styles.dateLabelComponent}>DATE</Text>
                </View>
                <View style={styles.dateValueContainer}>
                  <Text style={styles.dateValueComponent}>{singleHistory.dtEntered}</Text>
                </View>
                <View style={styles.periodLabelContainer}>
                  <Text style={styles.periodLabelComponent}>PERIOD</Text>
                </View>
                <View style={styles.periodValueContainer}>
                  <Text style={styles.periodValueComponent}>{singleHistory.dtPeriodFrom + " - " + singleHistory.dtPeriodTo}</Text>
                </View>
                <View style={styles.downloadReceiptContainer}>
                  <Button
                    title={"Download Receipt"}
                    onPress={() => { handleDownloadReceiptOnPress(singleHistory) }}
                    iconRight
                    icon={{
                      type: 'font-awesome',
                      name: 'download',
                      color: Colors.white,
                    }}
                    type="outline"
                    titleStyle={{
                      color: Colors.white,
                      fontFamily: 'Kanit-Regular'
                    }}
                    buttonStyle={{
                      backgroundColor: Colors.buttonYellow,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: Colors.buttonYellow,
                      marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3 : 5
                    }}
                  />
                </View>
              </Card>
            )
          })
        }
      </ScrollView>
    </View>
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
    //flexDirection: "column",
    marginHorizontal: Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical: Dimensions.get('window').height * Resolution.nHeightScreenMargin,
    //alignItems: "flex-start"
  },
  headingContainer: {
    width: Dimensions.get('window').width * 0.55,
    height: Dimensions.get('window').height * 0.04,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10
  },
  headingComponent: {
    width: '100%',
    height: '100%',
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 13.2 : 22,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.primary,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
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
    fontFamily: 'Kanit-Light'
  },
  cardDividerComponent: {
    height: 0.75,
    backgroundColor: Colors.greenBG
  },
  receiptNumberLabelContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
  },
  receiptNumberLabelComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  receiptNumberValueContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10
  },
  receiptNumberValueComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },

  dateLabelContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
  },
  dateLabelComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  dateValueContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10
  },
  dateValueComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  periodLabelContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
  },
  periodLabelComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  periodValueContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15
  },
  periodValueComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  relationContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10
  },
  relationComponent: {
    textAlign: "left",
    fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 8.4 : 14,
    fontStyle: "normal",
    fontWeight: "normal",
    color: Colors.darkYellowFamilyPage,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular'
  },
  downloadReceiptContainer: {
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 12 : 20
  }
});
