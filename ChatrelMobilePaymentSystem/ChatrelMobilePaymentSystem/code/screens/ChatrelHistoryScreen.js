import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, Dimensions,ActivityIndicator} from 'react-native';
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
import {sDateFormat, sFontName,oActivityIndicatorStyle} from '../constants/CommonConfig';
import { useIsFocused } from "@react-navigation/native";

export const ChatrelHistoryScreen = (props) => {
  const [bLoader, setbLoader] = useState(true);
  const isFocused = useIsFocused();
  // const DATA = [
  //   {
  //     sChatrelRecieptNumber: 'W1',
  //     dtEntered: '01-03-2020',
  //     dtPeriodFrom: '2015',
  //     dtPeriodTo: '2020',
  //     sGBID: '1234567',
  //     sFirstName: 'Malay',
  //     sLastName: 'Doshi',
  //     sRelation: 'Self',
  //   },
  //   {
  //     sChatrelRecieptNumber: 'W2',
  //     dtEntered: '01-03-2020',
  //     dtPeriodFrom: '2015',
  //     dtPeriodTo: '2020',
  //     sGBID: '1234568',
  //     sFirstName: 'Siddhesh',
  //     sLastName: 'Lad',
  //     sRelation: 'Friend',
  //   },
  //   {
  //     sChatrelRecieptNumber: 'w3',
  //     dtEntered: '01-03-2020',
  //     dtPeriodFrom: '2015',
  //     dtPeriodTo: '2020',
  //     sGBID: '12345679',
  //     sFirstName: 'Paresh',
  //     sLastName: 'Doshi',
  //     sRelation: 'Father',
  //   },
  // ];

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
          setbLoader(false);
          console.log(resp.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.config);
      });
  };

  useEffect(() => {
    if(isFocused){
      setbLoader(true);
      console.log("Chatrel History Called");
      getChatrelHistoryDetails();
    }
  }, [isFocused]);

  const [paymentHistory, setPaymentHistory] = useState([]);

  const handleDownloadReceiptOnPress = (singleHistory) => {
    console.log(singleHistory);
    //setbLoader(true);
    //TODO: OR CODE GEN & RECEIPT GEN & SAVE TO PHONE
  };

  return (
    <View style={styles.mainContainer}>
      {bLoader && (
          <ActivityIndicator
            size={Platform.OS === 'ios' ? 0 : 'large'}
            color={Colors.grey}
            animating={true}
            //hidesWhenStopped={true}
            style={oActivityIndicatorStyle}
          />
        )}
      {/*<View style={styles.headingContainer}>
        <Text style={styles.headingComponent}>CHATREL HISTORY</Text>
  </View>*/}
      <ScrollView showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      >
        {paymentHistory.length === 0 && !bLoader && (
          <View style={styles.zeroRecordContainer}>
            <Text style={styles.zeroRecordComponent}>No Records Available</Text>
          </View>
        )}
        {paymentHistory.length !== 0 &&
          paymentHistory.map((singleHistory, index) => {
            return (
              <Card
                key={index}
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
                      {(singleHistory.sFirstName
                        ? singleHistory.sFirstName
                        : '') +
                        ' ' +
                        (singleHistory.sLastName
                          ? singleHistory.sLastName
                          : '')}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        //marginBottom: hp(2),
                      }}>
                      <Text style={styles.relationComponent}>
                        {singleHistory.sRelation}
                      </Text>
                    </View>
                  </View>
                }
                titleStyle={{}}>
                {/*<Card.Title style={styles.cardHeaderComponent}>
                  {singleHistory.sFirstName + ' ' + singleHistory.sLastName}
            </Card.Title>*/}
                {/*<Card.Image source={require('../assets/CTALogo.png')} />*/}
                <Card.Divider style={styles.cardDividerComponent} />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: hp(1.25),
                  }}>
                  <View style={styles.receiptNumberLabelContainer}>
                    <Text style={styles.receiptNumberLabelComponent}>
                      RECEIPT NUMBER
                    </Text>
                    <Text style={styles.receiptNumberValueComponent}>
                      {singleHistory.sChatrelReceiptNumber}
                    </Text>
                  </View>

                  {/* <View style={styles.receiptNumberValueContainer}>
                </View> */}

                  <View style={styles.dateLabelContainer}>
                    <Text style={styles.dateLabelComponent}>CHATREL DATE</Text>
                    <Text style={styles.dateValueComponent}>
                      {Moment(singleHistory.dtPayment).format(sDateFormat)}
                    </Text>
                  </View>

                  {/* <View style={styles.dateValueContainer}>
                </View> */}
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: hp(1.25),
                  }}>
                  <View style={styles.totalChatrelLabelContainer}>
                    <Text style={styles.totalChatrelLabelComponent}>
                      TOTAL CHATREL
                    </Text>
                    <Text style={styles.totalChatrelValueComponent}>
                      {singleHistory.nChatrelTotalAmount}
                    </Text>
                  </View>

                  {/* <View style={styles.totalChatrelValueContainer}>
                  </View> */}

                  <View style={styles.chatrelModeLabelContainer}>
                    <Text style={styles.chatrelModeLabelComponent}>
                      PAYMENT MODE
                    </Text>
                    <Text style={styles.chatrelModeValueComponent}>
                      {singleHistory.sPaymentMode}
                    </Text>
                  </View>

                  {/* <View style={styles.chatrelStatusValueContainer}>
                </View> */}
                </View>

                {/* <View style={styles.chatrelModeLabelContainer}>
                  <Text style={styles.chatrelModeLabelComponent}>
                    PAYMENT MODE
                  </Text>
                </View>
                <View style={styles.chatrelModeValueContainer}>
                  <Text style={styles.chatrelModeValueComponent}>
                    {singleHistory.sPaymentMode}
                  </Text>
                </View> */}
                <View style={styles.downloadReceiptContainer}>
                  <Button
                    title={'DOWNLOAD RECEIPT'}
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
                      fontStyle: 'normal',
                      fontWeight: '900',
                      fontFamily: sFontName,
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
    fontFamily: sFontName,
  },
  cardComponent: {
    width: wp(80),
    height: Platform.OS === 'ios' ? hp(28.25) : hp(30),
    borderRadius: 15,
    borderColor: Colors.blue,
    backgroundColor: Colors.white,
    //shadowColor: Colors.shadowColor,
    borderStyle: 'solid',
    borderWidth: 1,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: 60,
    //marginBottom: 10,
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
    fontFamily: sFontName,
  },
  cardDividerComponent: {
    height: 0.75,
    backgroundColor: Colors.greenBG,
  },
  receiptNumberLabelContainer: {
    // marginBottom:
    //   Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
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
    fontFamily: sFontName,
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
    fontFamily: sFontName,
  },

  dateLabelContainer: {
    // marginBottom:
    //   Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  dateLabelComponent: {
    textAlign: 'right',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sFontName,
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
    fontFamily: sFontName,
  },
  totalChatrelLabelContainer: {
    // marginBottom:
    //   Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
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
    fontFamily: sFontName,
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
    fontFamily: sFontName,
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
    fontFamily: sFontName,
  },
  chatrelModeValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  chatrelModeValueComponent: {
    textAlign: 'right',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sFontName,
  },

  chatrelStatusLabelContainer: {
    // marginBottom:
    //   Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
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
    fontFamily: sFontName,
  },
  chatrelStatusValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  chatrelStatusValueComponent: {
    textAlign: 'right',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sFontName,
  },
  relationContainer: {
    //flexGrow: 1,
    //marginBottom:
    //Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },
  relationComponent: {
    //textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 8.4 : 14,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.darkYellowFamilyPage,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sFontName,
  },
  downloadReceiptContainer: {
    marginTop: hp(0.25),
  },
  zeroRecordContainer:{

  },
  zeroRecordComponent:{
    textAlign: 'center',
    fontSize:
      wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sFontName,
  }
});
