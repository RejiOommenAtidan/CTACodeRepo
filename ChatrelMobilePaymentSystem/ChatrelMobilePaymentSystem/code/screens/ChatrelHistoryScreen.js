import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  PermissionsAndroid,
  ToastAndroid,
  Alert,
  Platform,
} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {Loader} from '../components/Loader';
import {CustomHeaderRightButton} from '../components/HeaderRightButton';
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
  sFolderName,
  sReceiptDownloadMessage,
} from '../constants/CommonConfig';
import {useIsFocused} from '@react-navigation/native';
import RNFetchBlob from 'react-native-fetch-blob';
import {storeJWTToken} from '../store/actions/GBDetailsAction';
// import { DownloadDirectoryPath } from 'react-native-fs';

export const ChatrelHistoryScreen = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [bLoader, setbLoader] = useState(true);

  const oCurrentGBDetails = useSelector(
    (state) => state.CurrentGBDetailsReducer.oCurrentGBDetails,
  );

  const oGBDetails = useSelector((state) => state.GBDetailsReducer.oGBDetails);
  const sJwtToken = useSelector((state) => state.GBDetailsReducer.sJwtToken);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const downloadFile = async (singleHistory) => {
    try {
      //debugger;
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      //alert(granted)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await handleDownloadReceiptOnPress(singleHistory);
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to download the file',
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDownloadReceiptOnPress = async (singleHistory) => {
    console.log(singleHistory.sChatrelReceiptNumber);
    setbLoader(true);

    // const {dirs} = RNFetchBlob.config({
    //   addAndroidDownloads: {
    //     useDownloadManager: true, // <-- this is the only thing required
    //     // Optional, override notification setting (default to true)
    //     notification: true,
    //     // Optional, but recommended since android DownloadManager will fail when
    //     // the url does not contains a file extension, by default the mime type will be text/plain
    //     description: 'Chatrel Receipt Downloaded Successfully!',
    //     title: `ChatrelReceipt-` + singleHistory.sChatrelReceiptNumber + `.pdf`,
    //     path:
    //       `
    //       ${Platform.select({
    //         ios: dirs.DocumentDir,
    //         android: dirs.DownloadDir,
    //       })}/${sFolderName}/ChatrelReceipt-` +
    //       singleHistory.sChatrelReceiptNumber +
    //       `.pdf`,
    //   },
    // }).fs;

    const {dirs} = RNFetchBlob.fs;
    // const {dirs} = RNFetchBlob.config({
    //   fileCache: true,
    //   addAndroidDownloads: {
    //     useDownloadManager: true,
    //     notification: true,
    //     mediaScannable: true,
    //     title: `ChatrelReceipt-` + singleHistory.sChatrelReceiptNumber + `.pdf`,
    //     path: `${dirs.DownloadDir}/Chatrel Receipt.pdf`,
    //   },
    // }).fs;
    axios
      .get(
        `/ChatrelPayment/GetReceipt/?sReceiptNumber=` +
          singleHistory.sChatrelReceiptNumber,
      )
      .then((resp) => {
        if (resp.status === 200) {
          const oSession = {
            sJwtToken: resp.data.token,
            bSession: true,
          };
          dispatch(storeJWTToken(oSession));
          let fPath = Platform.select({
            ios: dirs.DocumentDir,
            android: dirs.DownloadDir,
          });

          debugger;

          fPath = fPath + '/' + sFolderName;

          fPath =
            `${fPath}/ChatrelReceipt-` +
            singleHistory.sChatrelReceiptNumber +
            `.pdf`;

          //alert("File Save Before reached")
          if (Platform.OS === 'ios') {
            RNFetchBlob.fs.createFile(fPath, resp.data.receipt, 'base64');
          } else {
            RNFetchBlob.fs.writeFile(fPath, resp.data.receipt, 'base64');
          }

          setbLoader(false);

          // let pdfLocation =
          //   RNFetchBlob.fs.dirs.DownloadDir +
          //   '/' +
          //   'ChatrelReceipt' +
          //   singleHistory.sChatrelReceiptNumber +
          //   '.pdf';
          // RNFetchBlob.fs.writeFile(
          //   pdfLocation,
          //   RNFetchBlob.base64.encode(
          //     'data:application/pdf;base64,' + resp.data.receipt,
          //   ),
          //   'base64',
          // );
          //alert("File ALert");
          Platform.OS === 'android'
            ? ToastAndroid.show(
                sReceiptDownloadMessage,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              )
            : null;
        }
      })
      .catch((error) => {
        setbLoader(false);
        if (error.response.status === 401) {
          // const oSession = {
          //   sJwtToken: '',
          //   bSession: false,
          // };
          // dispatch(storeJWTToken(oSession));
        } else {
        }
      })
      .then((release) => {
        //console.log(release); => udefined
      });

    // RNFetchBlob.config({
    //   fileCache: true,
    //   addAndroidDownloads: {
    //     useDownloadManager: true,
    //     notification: true,
    //     mediaScannable: true,
    //     title: `Chatrel Receipt.pdf`,
    //     path: `${dirs.DownloadDir}/Chatrel Receipt.pdf`,
    //   },
    // })
    //   .fetch(
    //     'GET',
    //     sAPIBASEURL +
    //       '/ChatrelPayment/GetReceipt/?sReceiptNumber=' +
    //       singleHistory.sChatrelReceiptNumber,
    //     {
    //       Authorization: 'Bearer ' + sJwtToken,
    //     },
    //   )
    //   .then((resp) => {
    //     debugger;
    //     console.log(resp.json());
    //     //if (resp.status === 200) {
    //     //TODO: iOS
    //     Platform.OS === 'android'
    //       ? ToastAndroid.show(
    //           'Receipt Downloaded Successfully',
    //           ToastAndroid.SHORT,
    //           ToastAndroid.CENTER,
    //         )
    //       : null;
    //     //}
    //   })
    //   .catch((error) => {
    //     console.log('Error ', error.response);
    //     if (error.response) {
    //       console.error(error.response);
    //       console.error(error.response.data);
    //       console.error(error.response.status);
    //       console.error(error.response.headers);
    //     } else if (error.request) {
    //       console.warn(error.request);
    //     } else {
    //       console.error('Error', error.message);
    //     }
    //     console.log(error.config);
    //   });
  };

  const getChatrelHistoryDetails = () => {
    axios
      .get(
        `/ChatrelPayment/GetPaymentHistory/?sGBID=` + oCurrentGBDetails.sGBID,
      )
      .then((resp) => {
        if (resp.status === 200) {
          const oSession = {
            sJwtToken: resp.data.token,
            bSession: true,
          };
          dispatch(storeJWTToken(oSession));
          if (resp.data.message === 'Payment History Found') {
            setPaymentHistory(resp.data.paymentHistory);
            console.log('Chatrel History Screen Called:');
            console.log(resp.data.paymentHistory);
            setbLoader(false);
          } else {
            setPaymentHistory([]);
            setbLoader(false);
          }
        }
      })
      .catch((error) => {
        setbLoader(false);
        if (error.response.status === 401) {
          // const oSession = {
          //   sJwtToken: '',
          //   bSession: false,
          // };
          // dispatch(storeJWTToken(oSession));
        } else {
          Alert.alert('Something went wrong, please try again later.');
        }
      });
  };

  useEffect(() => {
    if (isFocused) {
      setbLoader(true);
      //console.log('Chatrel History Called');
      getChatrelHistoryDetails();
    }
  }, [isFocused]);

  return (
    <View style={styles.mainContainer}>
      <Loader loading={bLoader} />
      {/*<View style={styles.headingContainer}>
        <Text style={styles.headingComponent}>CHATREL HISTORY</Text>
  </View>*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {(paymentHistory.length === 0 || paymentHistory === []) && !bLoader && (
          <View style={styles.zeroRecordContainer}>
            <Text style={styles.zeroRecordComponent}>
              There is no chatrel contribution record in the database. You are
              requested to upload your two year chatrel reciept copy{' '}
              <Text
                style={styles.navigateToFileDisputeComponent}
                onPress={() => {
                  props.navigation.navigate('FileDispute');
                }}>
                here
              </Text>
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
                      style={{...styles.labelComponent, textAlign: 'right'}}>
                      CHATREL DATE
                    </Text>
                    <Text
                      style={{...styles.valueComponent, textAlign: 'right'}}>
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
                      style={{...styles.labelComponent, textAlign: 'right'}}>
                      PAYMENT MODE
                    </Text>
                    <Text
                      style={{...styles.valueComponent, textAlign: 'right'}}>
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
                      {singleHistory.sCountryIDPaidFor}
                      {''}
                      {singleHistory.sGBIDPaidFor}
                    </Text>
                  </View>

                  {/* <View style={styles.totalChatrelValueContainer}>
                  </View> */}

                  <View style={styles.labelContainer}>
                    <Text
                      style={{...styles.labelComponent, textAlign: 'right'}}>
                      PAID BY GREEN BOOK ID
                    </Text>
                    <Text
                      style={{...styles.valueComponent, textAlign: 'right'}}>
                      {oGBDetails.sCountryID}
                      {''}
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
                    //disabled={true}
                    title={'DOWNLOAD RECEIPT'}
                    onPress={() => {
                      try {
                        Platform.OS === 'android'
                          ? downloadFile(singleHistory)
                          : handleDownloadReceiptOnPress(singleHistory);
                      } catch (error) {
                        console.log(error);
                        console.log(error.message);
                      }
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
    cardStyle: {backgroundColor: Colors.white},
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
  zeroRecordContainer: {
    // width: hp(92.5),
    width: wp(92.5),
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
  },
  zeroRecordComponent: {
    textAlign: 'left',
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
    shadowOffset: {width: 5, height: 5},
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
    color: Colors.ChatrelInfoBlue,
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
    fontSize: wp(3.25),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.labelColorLight,
    fontFamily: sFontName,
    marginBottom: hp(1),
  },
  valueComponent: {
    textAlign: 'left',
    fontSize: wp(5.25),
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
    color: Colors.buttonYellow,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
  downloadReceiptContainer: {
    marginTop: hp(0.25),
  },
  navigateToFileDisputeComponent: {
    textAlign: 'left',
    fontSize: wp(5),
    fontStyle: 'normal',
    textDecorationLine: 'underline',
    color: Colors.ChatrelInfoBlue,
    textDecorationColor: Colors.ChatrelInfoBlue,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
});
