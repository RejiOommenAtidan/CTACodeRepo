import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  PermissionsAndroid,
  ToastAndroid
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import { Loader } from '../components/Loader';
import { CustomHeaderRightButton } from '../components/HeaderRightButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Moment from 'moment';
import {
  sDateFormat,
  sFontName,
  sFontNameBold,
  oActivityIndicatorStyle,
  sAPIBASEURL,
} from '../constants/CommonConfig';
import { useIsFocused } from '@react-navigation/native';
// import { DownloadDirectoryPath } from 'react-native-fs';
import RNFetchBlob from 'react-native-fetch-blob'

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

  const oGBDetails = useSelector((state) => state.GBDetailsReducer.oGBDetails);
  const sJwtToken = useSelector((state) => state.GBDetailsReducer.sJwtToken);

  const downloadFile = async (singleHistory) => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        handleDownloadReceiptOnPress(singleHistory);
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const handleDownloadReceiptOnPress = (singleHistory) => {
    console.log(singleHistory.sChatrelReceiptNumber);
    // console.log("Receipt Number", sChatrelReceiptNumber);
    // axios.get(`/ChatrelPayment/GetReceipt/?sReceiptNumber=` + singleHistory.sChatrelReceiptNumber, { responseType: 'blob' })
    //   .then(resp => {
    //     if (resp.status === 200) {
    //       console.log("Response", resp);

    const { dirs } = RNFetchBlob.fs;

    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: `Receipt.pdf`,
        path: `${dirs.DownloadDir}/Receipt.pdf`,
      },
    })
      .fetch('GET', sAPIBASEURL + '/ChatrelPayment/GetReceipt/?sReceiptNumber=' + singleHistory.sChatrelReceiptNumber, {
        Authorization: 'Bearer ' + sJwtToken,
      })
      .then(
        resp => {
          //if (resp.status === 200) {
          ToastAndroid.show(
            'Receipt Downloaded Successfully',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          //}
        }
      ).catch(error => {
        console.log("Error ", error.response);
        if (error.response) {
          console.error(error.response);
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.warn(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then(release => {
        //console.log(release); => udefined
      });


    // const url = URL.createObjectURL(new Blob([resp.data]));
    // const link = document.createElement("a");
    // link.href = url;
    // link.setAttribute("download", "ChatrelReceipt.pdf");
    // document.body.appendChild(link);
    // link.click();
    //   }
    // })
    // .catch(error => {
    //   console.log("Error ", error.response);
    //   if (error.response) {
    //     console.error(error.response);
    //     console.error(error.response.data);
    //     console.error(error.response.status);
    //     console.error(error.response.headers);
    //   } else if (error.request) {
    //     console.warn(error.request);
    //   } else {
    //     console.error('Error', error.message);
    //   }
    //   console.log(error.config);
    // })
    // .then(release => {
    //   //console.log(release); => udefined
    // });
  };

  const getChatrelHistoryDetails = () => {
    axios
      .get(
        `/ChatrelPayment/GetPaymentHistory/?sGBID=` + oCurrentGBDetails.sGBID,
      )
      .then((resp) => {
        if (resp.status === 200) {
          setPaymentHistory(resp.data);
          setbLoader(false);
          //console.log(resp.data);
        }
      })
      .catch((error) => {
        setbLoader(false);
        alert('Something went wrong, please try again later.');
        console.log(error.message);
        console.log(error.config);
      });
  };

  useEffect(() => {
    if (isFocused) {
      setbLoader(true);
      console.log('Chatrel History Called');
      getChatrelHistoryDetails();
    }
  }, [isFocused]);

  const [paymentHistory, setPaymentHistory] = useState([]);

  return (
    <View style={styles.mainContainer}>
      <Loader
        loading={bLoader} />
      {/*<View style={styles.headingContainer}>
        <Text style={styles.headingComponent}>CHATREL HISTORY</Text>
  </View>*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {paymentHistory.length === 0 && !bLoader && (
          <View style={styles.zeroRecordContainer}>
            <Text style={styles.zeroRecordComponent}>
              No Chatrel Payments Done So Far, Please pay your outstanding
              Chatrel Amount
            </Text>
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
                    marginBottom: hp(1),
                  }}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelComponent}>RECEIPT NUMBER</Text>
                    <Text style={styles.valueComponent}>
                      {singleHistory.sChatrelReceiptNumber}
                    </Text>
                  </View>

                  {/* <View style={styles.receiptNumberValueContainer}>
                </View> */}

                  <View style={styles.labelContainer}>
                    <Text
                      style={{ ...styles.labelComponent, textAlign: 'right' }}>
                      CHATREL DATE
                    </Text>
                    <Text
                      style={{ ...styles.valueComponent, textAlign: 'right' }}>
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
                    marginBottom: hp(1),
                  }}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelComponent}>AMOUNT</Text>
                    <Text style={styles.valueComponent}>
                      ${singleHistory.nChatrelTotalAmount}
                    </Text>
                  </View>

                  {/* <View style={styles.totalChatrelValueContainer}>
                  </View> */}

                  <View style={styles.labelContainer}>
                    <Text
                      style={{ ...styles.labelComponent, textAlign: 'right' }}>
                      PAYMENT MODE
                    </Text>
                    <Text
                      style={{ ...styles.valueComponent, textAlign: 'right' }}>
                      {singleHistory.sPaymentMode}
                    </Text>
                  </View>

                  {/* <View style={styles.chatrelStatusValueContainer}>
                </View> */}
                </View>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: hp(1),
                  }}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelComponent}>GREEN BOOK ID</Text>
                    <Text style={styles.valueComponent}>
                      {singleHistory.sGBIDPaidFor}
                    </Text>
                  </View>

                  {/* <View style={styles.totalChatrelValueContainer}>
                  </View> */}

                  <View style={styles.labelContainer}>
                    <Text
                      style={{ ...styles.labelComponent, textAlign: 'right' }}>
                      PAID BY GREEN BOOK ID
                    </Text>
                    <Text
                      style={{ ...styles.valueComponent, textAlign: 'right' }}>
                      {oGBDetails.sGBID}
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
                      downloadFile(singleHistory);
                      //handleDownloadReceiptOnPress(singleHistory);
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
                      fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                      fontFamily:
                        Platform.OS === 'android' ? sFontNameBold : sFontName,
                      fontSize: wp(4),
                    }}
                    buttonStyle={{
                      // height: hp(5),
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
    headerTitle: 'CHATREL HISTORY',
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
    // headerRight: CustomHeaderRightButton,
    cardStyle: { backgroundColor: Colors.white },
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //flexDirection: "column",
    // marginHorizontal:
    //   Dimensions.get('window').width * Resolution.nWidthScreenMargin,
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
  zeroRecordContainer: {},
  zeroRecordComponent: {
    textAlign: 'center',
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    fontFamily: sFontName,
  },
  cardComponent: {
    width: wp(92.5),
    backgroundColor: Colors.white,

    //Border Stuff
    borderRadius: 15,
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS
    shadowRadius: 15,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,

    //For Android
    elevation: 15,
    overflow: 'visible',

    marginBottom: hp(2),
  },
  cardHeaderComponent: {
    textAlign: 'left',
    fontSize: wp(6),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.primary,
    fontFamily: sFontName,
  },
  cardDividerComponent: {
    height: 0.75,
    backgroundColor: Colors.greenBG,
  },

  labelContainer: {
    marginBottom: hp(1.25),
  },
  labelComponent: {
    textAlign: 'left',
    fontSize: wp(3),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.labelColorLight,
    fontFamily: sFontName,
    marginBottom: hp(1),
  },
  valueComponent: {
    textAlign: 'left',
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: sFontName,
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
    textAlign: 'right',
    fontSize: wp(5.5),
    fontStyle: 'normal',
    color: Colors.darkYellowFamilyPage,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
  downloadReceiptContainer: {
    marginTop: hp(0.25),
  },
});
