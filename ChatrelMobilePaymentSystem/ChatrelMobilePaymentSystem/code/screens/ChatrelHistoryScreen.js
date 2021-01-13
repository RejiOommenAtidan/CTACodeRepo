import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {CustomHeaderRightButton} from '../components/HeaderRightButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Moment from 'moment';
import {sDateFormat} from '../constants/CommonConfig';

export const ChatrelHistoryScreen = (props) => {
  const DATA = [
    {
      sChatrelRecieptNumber: 'W1',
      dtEntered: '01-03-2020',
      dtPeriodFrom: '2015',
      dtPeriodTo: '2020',
      sGBID: '1234567',
      sFirstName: 'Malay',
      sLastName: 'Doshi',
      sRelation: 'Self',
    },
    {
      sChatrelRecieptNumber: 'W2',
      dtEntered: '01-03-2020',
      dtPeriodFrom: '2015',
      dtPeriodTo: '2020',
      sGBID: '1234568',
      sFirstName: 'Siddhesh',
      sLastName: 'Lad',
      sRelation: 'Friend',
    },
    {
      sChatrelRecieptNumber: 'w3',
      dtEntered: '01-03-2020',
      dtPeriodFrom: '2015',
      dtPeriodTo: '2020',
      sGBID: '12345679',
      sFirstName: 'Paresh',
      sLastName: 'Doshi',
      sRelation: 'Father',
    },
  ];

  const oCurrentGBDetails = useSelector(
    (state) => state.CurrentGBDetailsReducer.oCurrentGBDetails,
  );

  const getChatrelHistoryDetails = () => {
    axios
      .get(
        `/ChatrelPayment/GetPaymentHistory/?sGBID=` + oCurrentGBDetails.sGBID,
      )
      .then((resp) => {
        if (resp.status === 200) {
          setPaymentHistory(resp.data);
          console.log(resp.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.config);
      });
  };

  useEffect(() => {
    getChatrelHistoryDetails();
  }, []);

  const [paymentHistory, setPaymentHistory] = useState([]);

  const handleDownloadReceiptOnPress = (singleHistory) => {
    console.log(singleHistory);
  };

  return (
    <View style={styles.mainContainer}>
      {/*<View style={styles.headingContainer}>
        <Text style={styles.headingComponent}>CHATREL HISTORY</Text>
  </View>*/}
      <ScrollView>
        {paymentHistory.length === 0 && (
          <View style={styles.zeroRecordContainer}>
            <Text style={styles.zeroRecordComponent}>No Records Available</Text>
          </View>
        )}
        {paymentHistory.length !== 0 &&
          paymentHistory.map((singleHistory, index) => {
            return (
              <Card key={index} containerStyle={styles.cardComponent}>
                <Card.Title style={styles.cardHeaderComponent}>
                  {singleHistory.sFirstName + ' ' + singleHistory.sLastName}
                </Card.Title>
                {/*<Card.Image source={require('../assets/CTALogo.png')} />*/}
                <View style={styles.relationContainer}>
                  <Text style={styles.relationComponent}>
                    {singleHistory.sRelation}
                  </Text>
                </View>
                <Card.Divider style={styles.cardDividerComponent} />
                <View style={styles.receiptNumberLabelContainer}>
                  <Text style={styles.receiptNumberLabelComponent}>
                    RECEIPT NUMBER
                  </Text>
                </View>
                <View style={styles.receiptNumberValueContainer}>
                  <Text style={styles.receiptNumberValueComponent}>
                    {singleHistory.sChatrelReceiptNumber}
                  </Text>
                </View>
                <View style={styles.dateLabelContainer}>
                  <Text style={styles.dateLabelComponent}>CHATREL DATE</Text>
                </View>
                <View style={styles.dateValueContainer}>
                  <Text style={styles.dateValueComponent}>
                    {Moment(singleHistory.dtPayment).format(sDateFormat)}
                  </Text>
                </View>
                <View style={styles.totalChatrelLabelContainer}>
                  <Text style={styles.totalChatrelLabelComponent}>
                    TOTAL CHATREL
                  </Text>
                </View>
                <View style={styles.totalChatrelValueContainer}>
                  <Text style={styles.totalChatrelValueComponent}>
                    ${singleHistory.nChatrelTotalAmount}
                  </Text>
                </View>
                <View style={styles.chatrelModeLabelContainer}>
                  <Text style={styles.chatrelModeLabelComponent}>
                    PAYMENT MODE
                  </Text>
                </View>
                <View style={styles.chatrelModeValueContainer}>
                  <Text style={styles.chatrelModeValueComponent}>
                    {singleHistory.sPaymentMode}
                  </Text>
                </View>
                <View style={styles.chatrelStatusLabelContainer}>
                  <Text style={styles.chatrelStatusLabelComponent}>
                    PAYMENT STATUS
                  </Text>
                </View>
                <View style={styles.chatrelStatusValueContainer}>
                  <Text style={styles.chatrelStatusValueComponent}>
                    {singleHistory.sPaymentStatus}
                  </Text>
                </View>
                <View style={styles.downloadReceiptContainer}>
                  <Button
                    title={'Download Receipt'}
                    onPress={() => {
                      handleDownloadReceiptOnPress(singleHistory);
                    }}
                    iconRight
                    icon={{
                      type: 'font-awesome',
                      name: 'download',
                      color: Colors.white,
                    }}
                    type="outline"
                    titleStyle={{
                      color: Colors.white,
                      fontFamily: 'Kanit-Regular',
                    }}
                    buttonStyle={{
                      backgroundColor: Colors.buttonYellow,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: Colors.buttonYellow,
                      marginBottom:
                        Dimensions.get('window').height <
                        Resolution.nHeightBreakpoint
                          ? 3
                          : 5,
                    }}
                  />
                </View>
              </Card>
            );
          })}
      </ScrollView>
    </View>
  );
};
console.log(Dimensions.get('window').height);
export const ChatrelHistoryScreenOptions = (navData) => {
  return {
    headerTitle: 'Chatrel History',
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
    //flexDirection: "column",
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
    //alignItems: "flex-start"
  },
  headingContainer: {
    width: wp(55),
    height: hp(4),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },
  headingComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 13.2 : 22,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.primary,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  cardComponent: {
    width: wp(70),
    height: hp(55),
    borderRadius: 15,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
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
    fontFamily: 'Kanit-Light',
  },
  cardDividerComponent: {
    height: 0.75,
    backgroundColor: Colors.greenBG,
  },
  receiptNumberLabelContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  receiptNumberLabelComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  receiptNumberValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },
  receiptNumberValueComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  dateLabelContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  dateLabelComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  dateValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },
  dateValueComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  totalChatrelLabelContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  totalChatrelLabelComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  totalChatrelValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  totalChatrelValueComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  chatrelModeLabelContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  chatrelModeLabelComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  chatrelModeValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  chatrelModeValueComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  chatrelStatusLabelContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  chatrelStatusLabelComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  chatrelStatusValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  chatrelStatusValueComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  relationContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },
  relationComponent: {
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 8.4 : 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.darkYellowFamilyPage,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  downloadReceiptContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 12 : 20,
  },
});
