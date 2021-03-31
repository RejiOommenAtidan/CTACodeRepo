import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Alert,
  Platform,
  FlatList,
} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {Loader} from '../components/Loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Moment from 'moment';
import {
  sDateFormat,
  sFontName,
  sFontNameBold,
  sFolderName,
  sReceiptDownloadMessageAndroid,
  sReceiptDownloadMessageIOS,
  nMaxBatchSize,
  nInitialBatchSize,
  sAttentionRequired,
  sSomethingWentWrongPleaseTryAgainLater,
} from '../constants/CommonConfig';
import {useIsFocused} from '@react-navigation/native';
import RNFetchBlob from 'react-native-fetch-blob';
import {storeJWTToken} from '../store/actions/GBDetailsAction';
import Toast from 'react-native-root-toast';

export const ChatrelHistoryScreen = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [bLoader, setbLoader] = useState(true);

  const oCurrentGBDetails = useSelector(
    (state) => state.CurrentGBDetailsReducer.oCurrentGBDetails,
  );

  const oGBDetails = useSelector((state) => state.GBDetailsReducer.oGBDetails);
  const sPaidUntil = useSelector((state) => state.GBDetailsReducer.sPaidUntil);
  const sJwtToken = useSelector((state) => state.GBDetailsReducer.sJwtToken);
  const [paymentHistory, setPaymentHistory] = useState([]);

  const downloadFile = async (singleHistory) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
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
    //console.log(singleHistory.sChatrelReceiptNumber);
    setbLoader(true);

    const {dirs} = RNFetchBlob.fs;

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

          fPath = fPath + '/' + sFolderName;

          if (Platform.OS === 'ios') {
            RNFetchBlob.fs.mkdir(fPath).catch((err) => {
              console.log(err);
            });
          }

          fPath =
            `${fPath}/ChatrelReceipt-` +
            singleHistory.sChatrelReceiptNumber +
            `.pdf`;

          if (Platform.OS === 'ios') {
            RNFetchBlob.fs.createFile(fPath, resp.data.receipt, 'base64');
          } else {
            RNFetchBlob.fs.writeFile(fPath, resp.data.receipt, 'base64');
          }

          setbLoader(false);

          Toast.show(
            Platform.OS === 'android'
              ? sReceiptDownloadMessageAndroid
              : sReceiptDownloadMessageIOS,
            {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            },
          );
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
          setTimeout(() => {
            Alert.alert(
              sAttentionRequired,
              sSomethingWentWrongPleaseTryAgainLater,
              [
                {
                  text: 'Ok',
                  onPress: () => true,
                  style: 'cancel',
                },
              ],
              {cancelable: true},
            );
          }, 1000);
        }
      })
      .then((release) => {});
  };

  useEffect(() => {
    if (isFocused) {
      setbLoader(true);
      getChatrelHistoryDetails();
    }
  }, [isFocused]);

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
          if (
            resp.data.message === 'Payment History Found' &&
            sPaidUntil !== null
          ) {
            if (resp.data.paymentHistory.length > 0) {
              //console.log(resp.data.paymentHistory);
              let tempReversedArray = resp.data.paymentHistory;
              tempReversedArray = tempReversedArray.reverse();
              setPaymentHistory(tempReversedArray);
            }
          } else {
            if (sPaidUntil === null) setPaymentHistory(null);
            else setPaymentHistory([]);
          }
          setbLoader(false);
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
          setTimeout(() => {
            Alert.alert(
              sAttentionRequired,
              sSomethingWentWrongPleaseTryAgainLater,
              [
                {
                  text: 'Ok',
                  onPress: () => true,
                  style: 'cancel',
                },
              ],
              {cancelable: true},
            );
          }, 1000);
        }
      });
  };

  return (
    <View style={styles.mainContainer}>
      <Loader loading={bLoader} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {paymentHistory === null && !bLoader && (
          <View style={styles.zeroRecordContainer}>
            <Card
              title={
                <View
                  style={{
                    marginBottom: hp(5.5),
                    shadowRadius: 15,
                    shadowColor: Colors.lightBlueChatrelWebsite,
                    shadowOffset: {width: 5, height: 5},
                    shadowOpacity: 1,
                  }}>
                  <Icon
                    color={Colors.white}
                    iconStyle={{
                      backgroundColor: Colors.websiteLightBlueColor,
                      margin: hp(2),
                    }}
                    iconProps={{}}
                    backgroundColor={Colors.websiteLightBlueColor}
                    size={40}
                    type="simple-line-icon"
                    name="envelope-letter"
                    containerStyle={{
                      alignSelf: 'flex-start',
                      borderRadius: 10,
                      position: 'absolute',
                      top: -55,
                      // left:20,
                    }}
                  />
                </View>
              }
              titleStyle={{}}
              containerStyle={{
                width: wp(92.5),
                backgroundColor: Colors.white,
                marginTop: hp(5),

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
              }}>
              <View
                style={{
                  marginBottom: hp(2),
                }}>
                <Text style={styles.zeroRecordComponent}>
                  There is no chatrel contribution record in the database. You
                  are requested to upload your two year chatrel receipt copy{' '}
                  <Text
                    style={styles.navigateToFileDisputeComponent}
                    onPress={() => {
                      props.navigation.navigate('FileDispute');
                    }}>
                    here
                  </Text>
                </Text>
              </View>
            </Card>
          </View>
        )}

        {paymentHistory !== null && paymentHistory.length === 0 && !bLoader && (
          <View style={styles.zeroRecordContainer}>
            <Card
              title={
                <View
                  style={{
                    marginBottom: hp(5.5),
                    shadowRadius: 15,
                    shadowColor: Colors.lightBlueChatrelWebsite,
                    shadowOffset: {width: 5, height: 5},
                    shadowOpacity: 1,
                  }}>
                  <Icon
                    color={Colors.white}
                    iconStyle={{
                      backgroundColor: Colors.websiteLightBlueColor,
                      margin: hp(2),
                    }}
                    iconProps={{}}
                    backgroundColor={Colors.websiteLightBlueColor}
                    size={40}
                    type="simple-line-icon"
                    name="envelope-letter"
                    containerStyle={{
                      alignSelf: 'flex-start',
                      borderRadius: 10,
                      position: 'absolute',
                      top: -55,
                      // left:20,
                      //Border Stuff
                    }}
                  />
                </View>
              }
              titleStyle={{}}
              containerStyle={{
                width: wp(92.5),
                backgroundColor: Colors.white,
                marginTop: hp(5),

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
              }}>
              <View
                style={{
                  marginBottom: hp(2),
                }}>
                <Text
                  style={{
                    ...styles.navigateToFileDisputeComponent,
                    textDecorationLine: 'none',
                    color: Colors.black,
                  }}>
                  Contribution Status{'\n'}
                  {'\n'}
                  <Text
                    style={{
                      ...styles.zeroRecordComponent,
                      textDecorationLine: 'none',
                      color: Colors.black,
                      padding: wp(1),
                    }}>
                    Please donate your outstanding Chatrel Amount
                  </Text>
                </Text>
              </View>
            </Card>
          </View>
        )}

        <FlatList
          pagingEnabled={true}
          alwaysBounceVertical={true}
          bounces={true}
          maxToRenderPerBatch={nMaxBatchSize}
          data={paymentHistory}
          initialNumToRender={nInitialBatchSize}
          renderItem={({item, index}) => {
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
                      {(item.sFirstName ? item.sFirstName : '') +
                        ' ' +
                        (item.sLastName ? item.sLastName : '')}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        //marginBottom: hp(2),
                      }}>
                      <Text style={styles.relationComponent}>
                        {item.sRelation}
                      </Text>
                    </View>
                  </View>
                }
                titleStyle={{}}>
                {/*<Card.Title style={styles.cardHeaderComponent}>
                  {item.sFirstName + ' ' + item.sLastName}
            </Card.Title>*/}
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
                      {item.sChatrelReceiptNumber}
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
                      {Moment(item.dtPayment).format(sDateFormat)}
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
                      {/* {item.sPaymentMode === 'Online' ? '$' : ''} */}
                      {item.sPaymentCurrency + ' '}
                      {item.nChatrelTotalAmount}
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
                      {item.sPaymentMode}
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
                      {item.sCountryIDPaidFor}
                      {''}
                      {item.sGBIDPaidFor}
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
                </View>
                <View style={styles.downloadReceiptContainer}>
                  <Button
                    disabled={item.sPaymentMode !== 'Online'}
                    title={'DOWNLOAD RECEIPT'}
                    onPress={() => {
                      try {
                        Platform.OS === 'android'
                          ? downloadFile(item)
                          : handleDownloadReceiptOnPress(item);
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
                      backgroundColor: Colors.buttonYellow,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: Colors.buttonYellow,
                    }}
                    disabledStyle={{
                      borderColor: Colors.grey,
                      backgroundColor: Colors.grey,
                    }}
                  />
                </View>
              </Card>
            );
          }}></FlatList>
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
          iconName={'menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    cardStyle: {backgroundColor: Colors.white},
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
  },
  headingContainer: {
    height: hp(4),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
    width: wp(55),
  },
  headingComponent: {
    color: Colors.primary,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 13.2 : 22,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    height: '100%',
    textAlign: 'left',
    width: '100%',
  },
  zeroRecordContainer: {
    width: wp(92.5),
  },
  zeroRecordComponent: {
    color: Colors.blackText,
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
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
    color: Colors.ChatrelInfoBlue,
    fontSize: wp(6),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  cardDividerComponent: {
    backgroundColor: Colors.greenBG,
    height: 0.75,
  },
  labelContainer: {
    marginBottom: hp(1.25),
  },
  labelComponent: {
    color: Colors.labelColorLight,
    fontSize: wp(3.25),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
    marginBottom: hp(1),
  },
  valueComponent: {
    color: Colors.blackTextAPI,
    fontSize: wp(5.25),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  receiptNumberLabelContainer: {},
  receiptNumberLabelComponent: {
    color: Colors.blackText,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  receiptNumberValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },
  receiptNumberValueComponent: {
    color: Colors.blackTextAPI,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  dateLabelContainer: {},
  dateLabelComponent: {
    color: Colors.blackText,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'right',
  },
  dateValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
  },
  dateValueComponent: {
    color: Colors.blackTextAPI,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  totalChatrelLabelContainer: {},
  totalChatrelLabelComponent: {
    color: Colors.blackText,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  totalChatrelValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  totalChatrelValueComponent: {
    color: Colors.blackTextAPI,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },

  chatrelModeLabelContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  chatrelModeLabelComponent: {
    color: Colors.blackText,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  chatrelModeValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  chatrelModeValueComponent: {
    color: Colors.blackTextAPI,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'right',
  },
  chatrelStatusLabelContainer: {},
  chatrelStatusLabelComponent: {
    color: Colors.blackText,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  chatrelStatusValueContainer: {
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 9 : 15,
  },
  chatrelStatusValueComponent: {
    color: Colors.blackTextAPI,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'right',
  },
  relationContainer: {},
  relationComponent: {
    color: Colors.buttonYellow,
    fontSize: wp(5.5),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    textAlign: 'right',
  },
  downloadReceiptContainer: {
    marginTop: hp(0.25),
  },
  navigateToFileDisputeComponent: {
    color: Colors.ChatrelInfoBlue,
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.ChatrelInfoBlue,
    textAlign: 'left',
  },
});
