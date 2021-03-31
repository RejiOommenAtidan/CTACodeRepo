import React, {useEffect, useState} from 'react';
import {
  Switch,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Modal,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import Resolution from '../constants/ResolutionBreakpoint';
import Autocomplete from 'react-native-autocomplete-input';
import {
  sFontName,
  sFontNameBold,
  sFolderName,
  sReceiptDownloadMessageAndroid,
  sReceiptDownloadMessageIOS,
  sINRAuthRegionHelpMessage,
  errorComponent,
  errorContainer,
  sCopyPayPalPaymentID,
  sCopyPayPalTransactionID,
  sPayPalPaymentIDCopied,
  sPayPalTransactionIDCopied,
  sContactEmail,
  sAttentionRequired,
  sPayPalUIErrorMessage,
  sSomethingWentWrongPleaseTryAgainLater,
  sContributionUnsuccessful,
} from '../constants/CommonConfig';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from '../components/Loader';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {
  Input,
  Button,
  Card,
  PricingCard,
  Icon,
  Badge,
} from 'react-native-elements';
import axios from 'axios';
import Moment from 'moment';
import Colors from '../constants/Colors';
import {storeJWTToken} from '../store/actions/GBDetailsAction';
import {sHimalayaFontName} from '../constants/CommonConfig';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RNFetchBlob from 'react-native-fetch-blob';
import Toast from 'react-native-root-toast';

export const Chatrel = (props) => {
  const Device = require('react-native-device-detection');
  const [bFourthDone, setbFourthDone] = useState(false);
  const [bCallRunOnce, setbCallRunOnce] = useState(false);
  const [sFailurePayPalWebPageURL, setsFailurePayPalWebPageURL] = useState('');
  const [
    bDisplayAuthorityRegionOnceOnChange,
    setbDisplayAuthorityRegionOnceOnChange,
  ] = useState(true);
  const {control, handleSubmit, errors} = useForm();
  const [lBValidateAutocomplete, setlBValidateAutocomplete] = useState(true);
  //for Main Data
  const [lAuthRegions, setlAuthRegions] = React.useState([]);
  //for filtered data
  const [lFilteredAuthRegions, setlFilteredAuthRegions] = React.useState(null);
  const findAuthRegion = (sAuthRegionNameQueryParam, mainIndex) => {
    // Method called every time when we change the value of the input
    let myTempAuthRegionsArray = [];
    let myTempBValidateArray = lBValidateAutocomplete;
    if (sAuthRegionNameQueryParam) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${sAuthRegionNameQueryParam.trim()}`, 'i');
      // Setting the filtered film array according the query

      myTempAuthRegionsArray[mainIndex] = lAuthRegions.filter(
        (aR) => aR.sAuthRegion.search(regex) >= 0,
      );

      myTempBValidateArray[mainIndex] = false;

      myTempBValidateArray = myTempBValidateArray.map(
        (singleBooleanArray, validateArrayIndex) => {
          if (
            mainIndex !== validateArrayIndex &&
            singleBooleanArray !== false
          ) {
            singleBooleanArray = true;
          }
          return singleBooleanArray;
        },
      );

      setlFilteredAuthRegions(myTempAuthRegionsArray);
      setlBValidateAutocomplete(myTempBValidateArray);
    } else {
      // If the query is null then return blank
      myTempAuthRegionsArray[mainIndex] = [];
      myTempBValidateArray[mainIndex] = false;
      setlFilteredAuthRegions(myTempAuthRegionsArray);
      setlBValidateAutocomplete(myTempBValidateArray);
    }
  };

  const dispatch = useDispatch();
  const sJwtToken = useSelector((state) => state.GBDetailsReducer.sJwtToken);
  const [showData, setshowData] = useState(true);
  const [successDiv, setSuccessDiv] = useState(false);
  const [receiptData, setReceiptData] = useState(false);
  const [approvalUrl, setapprovalUrl] = useState('');
  const [bPaymentModal, setbPaymentModal] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [bLoader, setbLoader] = useState(true);
  const [bRender, setbRender] = useState(false);
  const [sName, setsName] = useState('');
  const [nPaidUntil, setnPaidUntil] = useState(0);
  const [sGBID, setsGBID] = useState('');
  const [nChatrelLateFeesPercentage, setnChatrelLateFeesPercentage] = useState(
    0,
  );
  const [aGBChatrels, setaGBChatrels] = useState([]);
  const [nGrandTotal, setnGrandTotal] = useState(0);
  const [nAdditionalDonation, setnAdditionalDonation] = useState(0);
  const [nBusinessDonation, setnBusinessDonation] = useState(0);
  const [dataAPI, setDataAPI] = React.useState();
  const [summaryData, setSummaryData] = React.useState();
  const [donationData, setDonationData] = React.useState();
  const [receiptNumber, setReceiptNumber] = React.useState('');
  const [shouldRun, setShouldRun] = React.useState(true);
  const [outstanding, setOutstanding] = React.useState(true);
  const [dollarToRupees, setDollarToRupees] = React.useState(0.0);
  const [nSelectedAuthRegion, setnSelectedAuthregion] = React.useState();
  const [donationNull, setDonationNull] = React.useState(false);
  const [gbChatrelsNull, setGBChatrelsNull] = React.useState(false);
  const [displayFileDispute, setDisplayFileDispute] = React.useState(false);
  const [basicResponse, setBasicResponse] = useState(0);

  ////PAID BY
  const oGBDetails = useSelector((state) => state.GBDetailsReducer.oGBDetails);
  const nUserId = parseInt(oGBDetails.sGBID);
  ////FOR WHOM THE PERSON IS PAYING
  const oCurrentGBDetails = useSelector(
    (state) => state.CurrentGBDetailsReducer.oCurrentGBDetails,
  );
  const [sCountryID, setsCountryID] = useState('');

  const pingPong = () => {
    axios
      .get(`/ChatrelPayment/Ping`)
      .then((resp) => {
        if (resp.status === 200) {
          const oSession = {
            sJwtToken: resp.data.token,
            bSession: true,
          };
          dispatch(storeJWTToken(oSession));
        }
      })
      .catch((error) => {
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
            {cancelable: false},
          );
        }, 1000);
      });
  };

  const modify = (value, index) => {
    let oPayment = [...aGBChatrels];
    let chatrelObj = [...aGBChatrels];
    if (typeof value === 'string') {
      //Those 3
      oPayment[index].nCurrentChatrelSalaryAmt = parseFloat(value)
        ? parseFloat(value)
        : 0;
      setaGBChatrels(oPayment);
      calculateMethod(index);
    } else {
      //Other Than those 3
      if (oPayment[index].nCurrentChatrelSalaryAmt === 0) {
        if (dataAPI.message === 'No Outstandings') {
          for (var forIndex = index; forIndex < chatrelObj.length; forIndex++) {
            //check if it is of those 3 or not
            if (chatrelObj[forIndex].sAuthRegionCurrency === 'USD') {
              chatrelObj[forIndex].nCurrentChatrelSalaryAmt =
                dataAPI.nSalaryUSD;
              calculateMethod(forIndex);
            }
          }
        } else {
          for (var forIndex = index; forIndex < chatrelObj.length; forIndex++) {
            if (chatrelObj[forIndex].sAuthRegionCurrency === 'USD') {
              chatrelObj[forIndex].nCurrentChatrelSalaryAmt =
                chatrelObj[forIndex].nSalaryUSD;
              calculateMethod(forIndex);
            }
          }
        }
      } else {
        for (var forIndex = index; forIndex < chatrelObj.length; forIndex++) {
          if (chatrelObj[forIndex].sAuthRegionCurrency === 'USD') {
            chatrelObj[forIndex].nCurrentChatrelSalaryAmt = 0;
            calculateMethod(forIndex);
          }
        }
        setaGBChatrels(chatrelObj);
        //calculateMethod(index);
      }
    }
  };

  const runOnce = () => {
    if (aGBChatrels && dollarToRupees && shouldRun) {
      if (!outstanding) {
        //for employment & donation issue
        if (
          aGBChatrels[0].nCurrentChatrelSalaryAmt === undefined &&
          aGBChatrels[0].sAuthRegionCurrency === 'USD'
        ) {
          setaGBChatrels(
            aGBChatrels.map((element) => {
              element.nChatrelTotalAmount = 0;
              element.nCurrentChatrelSalaryAmt = 0;
              return element;
            }),
          );
          setnGrandTotal(0.0);
          setGBChatrelsNull(true);
        }
      } else {
        const len = aGBChatrels.length;
        for (var i = 0; i < len; i++) {
          calculateMethod(i);
        }
      }
      setShouldRun(false);
    }
  };

  const updateAuthRegion = (index, value) => {
    let chatrelObj = [...aGBChatrels];
    let value1 = lAuthRegions.find((x) => x.id === value.id);

    for (var forIndex = index; forIndex < chatrelObj.length; forIndex++) {
      chatrelObj[forIndex].nAuthRegionID = value1.id;
      chatrelObj[forIndex].sCountryID = value1.sCountryID;
      chatrelObj[forIndex].sAuthRegionCurrency = value1.sCurrencyCode;
      chatrelObj[forIndex].nChatrelAmount =
        value1.sCurrencyCode === 'INR'
          ? chatrelObj[forIndex].nChatrelINR
          : chatrelObj[forIndex].nChatrelUSD;
      chatrelObj[forIndex].nChatrelMeal =
        value1.sCurrencyCode === 'INR'
          ? chatrelObj[forIndex].nChatrelMealINR
          : chatrelObj[forIndex].nChatrelMealUSD;

      chatrelObj[forIndex].nCurrentChatrelSalaryAmt =
        value1.sCurrencyCode === 'INR'
          ? 0
          : chatrelObj[forIndex].isChild
          ? 0
          : chatrelObj[forIndex].nSalaryUSD;
      setaGBChatrels(chatrelObj);
      calculateMethod(forIndex);
    }
    if (
      value1.sCurrencyCode === 'INR' &&
      !chatrelObj[index].isChild &&
      bDisplayAuthorityRegionOnceOnChange
    ) {
      setbDisplayAuthorityRegionOnceOnChange(false);
      setTimeout(() => {
        Alert.alert(
          sAttentionRequired,
          sINRAuthRegionHelpMessage,
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
  };

  const calculateMethod = (index) => {
    let oPayment = [...aGBChatrels];
    let len = aGBChatrels.length;
    if (index != len - 1) {
      oPayment[index].nChatrelLateFeesValue =
        (oPayment[index].nChatrelAmount +
          oPayment[index].nChatrelMeal +
          oPayment[index].nCurrentChatrelSalaryAmt) *
        (oPayment[index].nChatrelLateFeesPercentage / 100);
      //Removed as per website
      // nChatrelLateFeesPercentage;
      oPayment[index].nArrearsAmount =
        oPayment[index].nChatrelAmount +
        oPayment[index].nChatrelMeal +
        oPayment[index].nChatrelLateFeesValue +
        oPayment[index].nCurrentChatrelSalaryAmt;
    } else {
      oPayment[index].nChatrelLateFeesValue = 0;
    }
    oPayment[index].nChatrelTotalAmount =
      (oPayment[index].nChatrelAmount +
        oPayment[index].nChatrelMeal +
        oPayment[index].nChatrelLateFeesValue +
        oPayment[index].nCurrentChatrelSalaryAmt) *
      (dollarToRupees && oPayment[index].sAuthRegionCurrency === 'INR'
        ? dollarToRupees.toFixed(4)
        : 1);
    oPayment[index].nConversionRate =
      oPayment[index].sAuthRegionCurrency === 'USD'
        ? 1.0
        : parseFloat(dollarToRupees.toFixed(4));
    setaGBChatrels(oPayment);
    calcTotal(oPayment, nAdditionalDonation, nBusinessDonation);
  };

  const calcTotal = (obj, aD, bD) => {
    let temptotal = aD + bD;
    obj.forEach((row) => {
      temptotal += parseFloat(row.nChatrelTotalAmount.toFixed(2));
    });
    setnGrandTotal(temptotal);
  };

  const handleSubmitAfterPayPal = async (paypalObj) => {
    debugger;
    let tempSummaryObj = summaryData;
    let oPayment = [...aGBChatrels];
    let lastindex = oPayment.length - 1;
    let donationObj = donationData;

    if (nBusinessDonation > 0 || nAdditionalDonation > 0) {
      donationObj.nChatrelAdditionalDonationAmt = nAdditionalDonation;
      donationObj.nChatrelBusinessDonationAmt = nBusinessDonation;
      donationObj.nAuthRegionID = oPayment[lastindex].nAuthRegionID;
      donationObj.sCountryID = oPayment[lastindex].sCountryID;
      donationObj.sAuthRegionCurrency = oPayment[lastindex].sAuthRegionCurrency;
      donationObj.sPaidByGBId = oGBDetails.sGBID;
      donationObj.nConversionRate = 1.0;
    } else {
      donationObj = null;
    }

    tempSummaryObj.nArrearsAmount =
      nGrandTotal -
      (oPayment[lastindex].nChatrelTotalAmount +
        nBusinessDonation +
        nAdditionalDonation);
    tempSummaryObj.nChatrelTotalAmount = nGrandTotal;
    tempSummaryObj.nChatrelBusinessDonationAmt = nBusinessDonation;
    tempSummaryObj.nChatrelAdditionalDonationAmt = nAdditionalDonation;
    tempSummaryObj.sPaidByGBId = oGBDetails.sGBID;
    tempSummaryObj.sChatrelReceiptNumber = receiptNumber;

    let chatrel = 0.0;
    let meal = 0.0;
    let salary = 0.0;

    oPayment.forEach((gbchatrel) => {
      chatrel +=
        gbchatrel.sAuthRegionCurrency === 'USD'
          ? gbchatrel.nChatrelAmount
          : gbchatrel.nChatrelAmount * dollarToRupees.toFixed(4);
      meal +=
        gbchatrel.sAuthRegionCurrency === 'USD'
          ? gbchatrel.nChatrelMeal
          : gbchatrel.nChatrelMeal * dollarToRupees.toFixed(4);
      salary +=
        gbchatrel.sAuthRegionCurrency === 'USD'
          ? gbchatrel.nCurrentChatrelSalaryAmt
          : gbchatrel.nCurrentChatrelSalaryAmt * dollarToRupees.toFixed(4);
      gbchatrel.nEnteredBy = nUserId;
      gbchatrel.nUpdatedBy = nUserId;
    });

    tempSummaryObj.nChatrelAmount = chatrel;
    tempSummaryObj.nChatrelMeal = meal;
    tempSummaryObj.nCurrentChatrelSalaryAmt = salary;
    tempSummaryObj.nEnteredBy = nUserId;
    tempSummaryObj.nUpdatedBy = nUserId;
    tempSummaryObj.sPayPal_Status = paypalObj.status;
    tempSummaryObj.sPayPal_ID = paypalObj.id;
    tempSummaryObj.sPayPal_Currency_Code =
      paypalObj.purchase_units[0].amount.currency_code;
    tempSummaryObj.sPayPal_Currency_Value =
      paypalObj.purchase_units[0].amount.value;
    tempSummaryObj.sPayPal_Response_Object = JSON.stringify(paypalObj);

    // if (gbChatrelsNull) {
    //   oPayment = null;
    // }

    if (
      //oPayment[0].nCurrentChatrelSalaryAmt > 0 &&
      oPayment[0].nChatrelAmount === 0 &&
      oPayment.length === 1 &&
      oPayment[0].nCurrentChatrelSalaryAmt === undefined
    ) {
      oPayment = null;
    }

    if (donationNull) {
      //donationObj = null;
    }

    let finalObj = {
      chatrelPayment: tempSummaryObj,
      gbChatrels: oPayment,
      gbChatrelDonation: donationObj,
    };

    console.log('Final Obj:', finalObj);

    setbLoader(true);
    setbRender(false);

    axios
      .post(`/ChatrelPayment/AddNewChatrelPayment`, finalObj)
      .then((resp) => {
        if (resp.status === 200) {
          debugger;
          const oSession = {
            sJwtToken: resp.data.token,
            bSession: true,
          };
          dispatch(storeJWTToken(oSession));
          setbRender(true);
          setbLoader(false);
          setshowData(false);
          setReceiptData(resp.data.message);
          setSuccessDiv(true);
        }
      })
      .catch((error) => {
        debugger;
        setbLoader(false);
        console.error(error.response);
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
              'Cannot Connect to Server, Please save PayPal Transaction ID: ' +
                paypalObj.id +
                '\nand contact CTA at ' +
                sContactEmail,
              [
                {
                  text: sCopyPayPalTransactionID,
                  onPress: () => {
                    Clipboard.setString(paypalObj.id);
                    Toast.show(sPayPalTransactionIDCopied, {
                      duration: Toast.durations.SHORT,
                      position: Toast.positions.BOTTOM,
                      shadow: true,
                      animation: true,
                      hideOnPress: true,
                      delay: 0,
                    });
                    navigation.navigate('Home');
                  },
                  style: 'default',
                },
                {
                  text: 'Close',
                  onPress: () => {
                    navigation.navigate('Home');
                  },
                  style: 'cancel',
                },
              ],
              {
                cancelable: false,
              },
            );
          }, 1000);
        }
      });
  };

  useEffect(() => {
    if (isFocused) {
      setbRender(false);
      setbLoader(true);
      setDisplayFileDispute(false);
      setshowData(true);
      setSuccessDiv(false);
      //AD & BD Making Zero
      setnAdditionalDonation(0);
      setnBusinessDonation(0);
      setnGrandTotal(0);
      setaGBChatrels([]);
      setOutstanding(true);
      setBasicResponse(0);
      setsFailurePayPalWebPageURL('');
      setapprovalUrl('');
      getChatrelDetails();
      setbDisplayAuthorityRegionOnceOnChange(true);
      //setShouldRun(true);
    }
  }, [isFocused]);

  const getChatrelDetails = () => {
    let myTempAuthRegionsToAdd = [];
    let myINRAuthRegion = null;
    axios
      .get(`/AuthRegion/GetAuthRegions`)
      .then((resp) => {
        if (resp.status === 200) {
          setlAuthRegions(resp.data);
          myTempAuthRegionsToAdd = resp.data;
          let myURL =
            props.props === 'Self' ? oGBDetails.sGBID : oCurrentGBDetails.sGBID;

          axios
            .get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=` + myURL)
            .then((resp) => {
              if (resp.status === 200) {
                const oSession = {
                  sJwtToken: resp.data.token,
                  bSession: true,
                };
                dispatch(storeJWTToken(oSession));
                if (resp.data.message === 'Paid Until Missing') {
                  setbLoader(false);
                  setbRender(true);
                  setDisplayFileDispute(true);
                } else {
                  debugger;
                  setsFailurePayPalWebPageURL(resp.data.failureURL);
                  setsCountryID(resp.data?.chatrel?.sCountryID);
                  if (
                    resp.data.chatrel.chatrelPayment.nChatrelTotalAmount === 0
                  ) {
                    setOutstanding(false);
                    setBasicResponse(
                      resp.data.chatrel.gbChatrels[0].nCurrentChatrelSalaryAmt,
                    );
                  }
                  setnChatrelLateFeesPercentage(
                    resp.data.chatrel.chatrelPayment.nChatrelLateFeesPercentage,
                  );
                  let aGBChatrelsUSDEnabled = resp.data.chatrel.gbChatrels.map(
                    (singleChatrel) => {
                      if (
                        singleChatrel.sAuthRegionCurrency === 'USD' &&
                        !singleChatrel.isChild
                      ) {
                        singleChatrel.nCurrentChatrelSalaryAmt =
                          singleChatrel.nSalaryUSD;
                      }
                      return singleChatrel;
                    },
                  );
                  setaGBChatrels(aGBChatrelsUSDEnabled);
                  let tempFilteredAuthRegions = [];
                  let tempBValidateAutocomplete = [];
                  resp.data.chatrel.gbChatrels.forEach((chatrelRecord) => {
                    tempFilteredAuthRegions.push([]);
                  });
                  resp.data.chatrel.gbChatrels.forEach((chatrelRecord) => {
                    tempBValidateAutocomplete.push(true);
                  });
                  setlFilteredAuthRegions(tempFilteredAuthRegions);
                  setlBValidateAutocomplete(tempBValidateAutocomplete);
                  setsName(resp.data.chatrel.sName);
                  setnPaidUntil(resp.data.chatrel.nPaidUntil);
                  setsGBID(resp.data.chatrel.chatrelPayment.sGBId);
                  setDataAPI(resp.data.chatrel);
                  setSummaryData(resp.data.chatrel.chatrelPayment);
                  setDonationData(resp.data.chatrel.gbChatrelDonation);
                  setnSelectedAuthregion(
                    lAuthRegions.find(
                      (x) => x.id === resp.data.chatrel.nAuthRegionID,
                    ),
                  );
                  calcTotal(
                    aGBChatrelsUSDEnabled,
                    nAdditionalDonation,
                    nBusinessDonation,
                  );

                  if (
                    aGBChatrelsUSDEnabled &&
                    resp.data.chatrel.gbChatrels[0].nCurrentChatrelSalaryAmt > 0
                  ) {
                    if (
                      resp.data.chatrel.chatrelPayment.nChatrelTotalAmount === 0
                    ) {
                      //for employment & donation switch issue for undefined
                      if (
                        aGBChatrelsUSDEnabled.length === 1 &&
                        aGBChatrelsUSDEnabled[0].sAuthRegionCurrency ===
                          'USD' &&
                        aGBChatrelsUSDEnabled[0].nCurrentChatrelSalaryAmt ===
                          undefined
                      ) {
                        setaGBChatrels(
                          aGBChatrelsUSDEnabled.map((element) => {
                            element.nChatrelTotalAmount =
                              resp.data.chatrel.nSalaryUSD;
                            element.nCurrentChatrelSalaryAmt =
                              resp.data.chatrel.nSalaryUSD;
                            return element;
                          }),
                        );
                        setnGrandTotal(resp.data.chatrel.nSalaryUSD);
                        setGBChatrelsNull(true);
                        //setbCallRunOnce(true);
                      }
                    }
                  }
                  setbCallRunOnce(true);
                  setbLoader(false);
                  setbRender(true);

                  myINRAuthRegion = myTempAuthRegionsToAdd.find(
                    (x) => x.id === resp.data.chatrel.nAuthRegionID,
                  );
                  fetch(
                    'https://api.ratesapi.io/api/latest?base=INR&symbols=USD',
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      setDollarToRupees(data.rates.USD);
                      if (
                        myINRAuthRegion.sCurrencyCode === 'INR' &&
                        !(
                          resp.data.chatrel.gbChatrels[0]
                            .nCurrentChatrelSalaryAmt > 0
                        )
                      ) {
                        setTimeout(() => {
                          Alert.alert(
                            sAttentionRequired,
                            sINRAuthRegionHelpMessage,
                            [
                              {
                                text: 'Ok',
                                onPress: () => true,
                                style: 'cancel',
                              },
                            ],
                            {cancelable: false},
                          );
                        }, 1000);
                      }
                    });
                }
              }
            })
            .catch((error) => {
              debugger;
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
        }
      })
      .catch((error) => {
        debugger;
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

  useEffect(() => {
    if (isFocused && bCallRunOnce) {
      runOnce();
    }
  }, [dollarToRupees, isFocused, bCallRunOnce]);

  useEffect(() => {
    if (isFocused) {
      lAuthRegions &&
        dataAPI &&
        setnSelectedAuthregion(
          lAuthRegions.find((x) => x.id === dataAPI.nAuthRegionID),
        );
    }
  }, [lAuthRegions, dataAPI, isFocused]);

  const onNavigationStateChange = (webViewState) => {
    //Failure Case
    if (webViewState.url.includes(sFailurePayPalWebPageURL)) {
      setbPaymentModal(false);
      setTimeout(() => {
        Alert.alert(
          sContributionUnsuccessful,
          sSomethingWentWrongPleaseTryAgainLater,
          [
            {
              text: 'Ok',
              onPress: () => true,
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }, 1000);
      return;
    }

    //Get Payer ID & Order ID from URL, if Success
    if (
      (webViewState.title === 'eChatrel' ||
        webViewState.title === 'Success' ||
        webViewState.title === 'Chatrel') &&
      !bFourthDone
    ) {
      setbFourthDone(true);
      var regexp = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        check;
      while ((check = regexp.exec(webViewState.url))) {
        params[check[1]] = check[2];
      }
      console.log('params: ', params);
      debugger;
      axios
        .get(`/PayPalCheckout/CaptureOrder?orderID=${params.token}`)
        .then((resp) => {
          if (resp.status === 200) {
            setbPaymentModal(false);
            handleSubmitAfterPayPal(resp.data);
          }
        })
        .catch((error) => {
          setbPaymentModal(false);
          setbRender(false);
          setbLoader(false);
          setTimeout(() => {
            Alert.alert(
              sAttentionRequired,
              'Cannot verify contribution from PayPal, Please save PayPal Order ID: ' +
                params.token +
                '\nand contact CTA at ' +
                sContactEmail,
              [
                {
                  text: sCopyPayPalPaymentID,
                  onPress: () => {
                    Clipboard.setString(params.token);
                    Toast.show(sPayPalPaymentIDCopied, {
                      duration: Toast.durations.SHORT,
                      position: Toast.positions.BOTTOM,
                      shadow: true,
                      animation: true,
                      hideOnPress: true,
                      delay: 0,
                    });
                    navigation.navigate('Home');
                  },
                  style: 'default',
                },
                {
                  text: 'Close',
                  onPress: () => {
                    navigation.navigate('Home');
                  },
                  style: 'cancel',
                },
              ],
              {
                cancelable: false,
              },
            );
          }, 1000);
        });
    }
  };

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

  const handleDownloadReceiptOnPress = async (sChatrelReceiptNumber) => {
    setbRender(false);
    setbLoader(true);
    const {dirs} = RNFetchBlob.fs;
    axios
      .get(
        `/ChatrelPayment/GetReceipt/?sReceiptNumber=` + sChatrelReceiptNumber,
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

          fPath = `${fPath}/ChatrelReceipt-` + sChatrelReceiptNumber + `.pdf`;

          if (Platform.OS === 'ios') {
            RNFetchBlob.fs.createFile(fPath, resp.data.receipt, 'base64');
          } else {
            RNFetchBlob.fs.writeFile(fPath, resp.data.receipt, 'base64');
          }

          setbRender(true);
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

  if (!bRender) {
    return (
      <>
        <Loader loading={bLoader} />
      </>
    );
  }

  if (displayFileDispute) {
    return (
      <>
        <Card
          title={
            <View style={styles.titleStyleView}>
              <Icon
                color={Colors.white}
                iconStyle={styles.iconStyles}
                iconProps={{}}
                backgroundColor={Colors.websiteLightBlueColor}
                size={40}
                type="font-awesome-5"
                name="briefcase"
                containerStyle={styles.iconContainerStyles}
              />
            </View>
          }
          titleStyle={{}}
          containerStyle={{
            marginBottom: hp(2),
            marginHorizontal: 0,
            width: wp(87.5),
            backgroundColor: Colors.white,
            borderRadius: 15,
            shadowRadius: 15,
            shadowColor: Colors.lightBlueChatrelWebsite,
            shadowOffset: {width: 5, height: 5},
            shadowOpacity: 1,
            elevation: 15,
            overflow: 'visible',
            marginTop: hp(5),
          }}>
          <View style={styles.viewMarginComponent}>
            <Text>
              <Text
                style={{
                  ...styles.greyTextComponent,
                  textAlign: 'left',
                  fontSize: wp(5),
                }}>
                There is no chatrel contribution record in the database. You are
                requested to upload your two year chatrel receipt copy{' '}
              </Text>
              <Text
                style={{
                  ...styles.greyTextComponent,
                  color: Colors.ChatrelInfoBlue,
                  fontSize: wp(5),
                  textAlign: 'left',
                  textDecorationColor: Colors.ChatrelInfoBlue,
                  textDecorationLine: 'underline',
                }}
                onPress={() => {
                  navigation.navigate('FileDispute');
                }}>
                here
              </Text>
            </Text>
          </View>
        </Card>
      </>
    );
  }

  return (
    <>
      {bRender && aGBChatrels && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          style={styles.mainContainer}>
          <Modal
            visible={bPaymentModal}
            onRequestClose={() => setbPaymentModal(false)}>
            <WebView
              source={{
                uri: approvalUrl,
              }}
              onNavigationStateChange={onNavigationStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={false}
              style={{marginTop: hp(5)}}
            />
          </Modal>
          {successDiv && (
            <View>
              <Card
                containerStyle={{
                  marginBottom: hp(2),
                  marginHorizontal: 0,
                  width: wp(87.5),
                  backgroundColor: Colors.white,
                  //Border Stuff
                  borderRadius: 15,
                  //For iOS
                  shadowRadius: 15,
                  shadowColor: Colors.lightBlueChatrelWebsite,
                  shadowOffset: {width: 5, height: 5},
                  shadowOpacity: 1,
                  //For Android
                  elevation: 15,
                  overflow: 'visible',
                }}
                title={
                  <Text
                    style={{
                      ...styles.valueComponent,
                      fontFamily: sHimalayaFontName,
                      fontSize: wp(7),
                      marginBottom: 0,
                    }}>
                    དཔྱ་དངུལ་དྲྭ་ཐོག་གནང་བར་ཐུགས་རྗེ་ཆེ་ཞུ།
                  </Text>
                }
                titleStyle={{}}>
                <View>
                  <Text
                    style={{
                      ...styles.headerComponent,
                      marginBottom: hp(2),
                    }}>
                    Thank you for your chatrel contribution.
                  </Text>
                  <Button
                    title="DOWNLOAD RECEIPT"
                    titleStyle={{
                      fontStyle: 'normal',
                      fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                      fontFamily:
                        Platform.OS === 'android' ? sFontNameBold : sFontName,
                      fontSize: wp(4),
                    }}
                    type={'solid'}
                    onPress={() => {
                      Platform.OS === 'android'
                        ? downloadFile(receiptData)
                        : handleDownloadReceiptOnPress(receiptData);
                    }}
                    buttonStyle={styles.paypalButtonComponent}></Button>
                </View>
              </Card>
            </View>
          )}
          {showData && (
            <View>
              <View>
                <Text style={styles.headerComponent}>PERSONAL DETAILS</Text>
              </View>
              <Card
                //key={year.nChatrelYear}
                containerStyle={{
                  marginBottom: hp(2),
                  marginHorizontal: 0,
                  width: wp(87.5),
                  backgroundColor: Colors.white,
                  //Border Stuff
                  borderRadius: 15,
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
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: hp(1),
                  }}>
                  <View style={styles.labelContainer}>
                    <Badge
                      containerStyle={styles.badgeContainerStyle}
                      badgeStyle={styles.badgeStyle}
                      value={<Text style={styles.labelComponent}>NAME</Text>}
                    />
                    <View style={styles.valueContainer}>
                      <Text style={styles.valueComponent}>{sName}</Text>
                    </View>
                  </View>
                  <View style={styles.labelContainer}>
                    <Badge
                      containerStyle={styles.badgeContainerStyle}
                      badgeStyle={styles.badgeStyle}
                      value={
                        <Text style={styles.labelComponent}>GREEN BOOK ID</Text>
                      }
                    />
                    <View style={styles.valueContainer}>
                      <Text
                        style={{...styles.valueComponent, textAlign: 'right'}}>
                        {sCountryID}
                        {sGBID}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: hp(1),
                  }}>
                  <View style={styles.labelContainer}>
                    <Badge
                      containerStyle={styles.badgeContainerStyle}
                      badgeStyle={styles.badgeStyle}
                      value={
                        <Text style={styles.labelComponent}>PAID UNTIL</Text>
                      }
                    />
                    <View style={styles.valueContainer}>
                      <Text style={{...styles.valueComponent, marginBottom: 0}}>
                        {Moment(nPaidUntil).year()}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.labelContainer}>
                    <Badge
                      containerStyle={styles.badgeContainerStyle}
                      badgeStyle={styles.badgeStyle}
                      value={
                        <Text style={styles.labelComponent}>PAYING FOR</Text>
                      }
                    />
                    <View style={styles.valueContainer}>
                      <Text
                        style={{
                          ...styles.valueComponent,
                          textAlign: 'right',
                          marginBottom: 0,
                        }}>
                        {props.props}
                      </Text>
                    </View>
                  </View>
                </View>
              </Card>
              <View>
                <Text style={styles.headerComponent}>CHATREL BALANCE</Text>
              </View>
              {aGBChatrels.map((year, index) => {
                return (
                  <View key={year.nChatrelYear}>
                    <Card
                      //key={year.nChatrelYear}
                      containerStyle={{
                        marginBottom: hp(2),
                        marginHorizontal: 0,
                        width: wp(87.5),
                        backgroundColor: Colors.white,
                        //Border Stuff
                        borderRadius: 15,
                        //For iOS
                        shadowRadius: 15,
                        shadowColor: Colors.lightBlueChatrelWebsite,
                        shadowOffset: {width: 5, height: 5},
                        shadowOpacity: 1,
                        //For Android
                        elevation: 15,
                        overflow: 'visible',
                      }}
                      title={
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: hp(1),
                          }}>
                          <Text style={styles.chatrelYearComponent}>
                            {year.nChatrelYear}
                          </Text>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                            }}>
                            <Badge
                              //containerStyle={styles.badgeContainerStyle}
                              badgeStyle={{
                                ...styles.badgeStyleChip,
                                backgroundColor:
                                  year.nChatrelLateFeesValue > 0
                                    ? Colors.red
                                    : year.nChatrelLateFeesValue === 0 &&
                                      year.nChatrelTotalAmount === 0
                                    ? Colors.greenBG
                                    : Colors.buttonYellow,
                              }}
                              value={
                                year.nChatrelLateFeesValue > 0 ? (
                                  <Text style={styles.labelComponentChip}>
                                    OVERDUE
                                  </Text>
                                ) : year.nChatrelTotalAmount === 0 &&
                                  year.nChatrelLateFeesValue === 0 ? (
                                  <Text style={styles.labelComponentChip}>
                                    PAID
                                  </Text>
                                ) : (
                                  <Text style={styles.labelComponentChip}>
                                    PENDING
                                  </Text>
                                )
                              }
                            />
                          </View>
                        </View>
                      }
                      titleStyle={{}}>
                      <View style={styles.yearContainer}>
                        {/* <View>
                      <Text style={styles.chatrelYearComponent}>
                        {year.nChatrelYear}
                      </Text>
                    </View> */}
                        <Card.Divider
                          style={{
                            height: 1,
                            backgroundColor: Colors.buttonYellow,
                          }}
                        />
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={styles.authorityRegionContainer}>
                            <Text style={styles.textComponent}>
                              AUTHORITY REGION
                            </Text>
                            {
                              <View
                                key={index}
                                style={{
                                  zIndex: 1,
                                  flex: 1,
                                  backgroundColor: Colors.white,
                                  //paddingBottom: hp(1),
                                }}>
                                <Autocomplete
                                  flatListProps={{
                                    nestedScrollEnabled: true,
                                  }}
                                  editable={outstanding}
                                  autoCapitalize="none"
                                  autoCorrect={false}
                                  inputContainerStyle={{
                                    borderWidth: 0,
                                    paddingHorizontal: 0,
                                  }}
                                  style={
                                    {
                                      // padding: hp(2.5),
                                      // borderWidth:0,
                                      // borderStyle:"dotted",
                                      // borderColor:Colors.white,
                                    }
                                  }
                                  containerStyle={{
                                    paddingHorizontal: 0,
                                  }}
                                  data={
                                    // index ? lFilteredAuthRegions[index] : []
                                    // index===index ? lFilteredAuthRegions : []
                                    lFilteredAuthRegions
                                      ? lFilteredAuthRegions[index]
                                      : []
                                  }
                                  // listContainerStyle={{
                                  //   height:"100%"
                                  // }}
                                  listStyle={{
                                    position: 'relative',
                                    zIndex: 1,
                                    elevation: 5,
                                    maxHeight: 200,
                                    backgroundColor: Colors.white,
                                    borderLeftWidth: 0,
                                    borderRightWidth: 0,
                                    borderTopWidth: 1,
                                    borderBottomWidth: 1,
                                    borderTopColor: Colors.grey,
                                    borderBottomColor: Colors.grey,
                                    paddingHorizontal: wp(1),
                                    marginHorizontal: 0,
                                  }}
                                  // Default value if you want to set something in input
                                  defaultValue={
                                    JSON.stringify(
                                      lAuthRegions.find(
                                        (x) =>
                                          x.id ===
                                          aGBChatrels[index].nAuthRegionID,
                                      ),
                                    ) === '{}'
                                      ? ''
                                      : lAuthRegions.find(
                                          (x) =>
                                            x.id ===
                                            aGBChatrels[index].nAuthRegionID,
                                        ).sAuthRegion
                                  }
                                  renderTextInput={(props) => (
                                    <View key={index}>
                                      <Controller
                                        control={control}
                                        render={({onChange, onBlur, value}) => (
                                          <Input
                                            {...props}
                                            disabled={!outstanding}
                                            disabledInputStyle={{
                                              backgroundColor: Colors.grey,
                                              margin: 0,
                                              padding: 0,
                                            }}
                                            iconRight
                                            icon={{
                                              type: 'font-awesome',
                                              name: 'chevron-down',
                                              color: Colors.black,
                                            }}
                                            //key={index}
                                            placeholderTextColor={Colors.grey}
                                            style={{
                                              fontSize: wp(4),
                                              fontStyle: 'normal',
                                              fontWeight: 'normal',
                                              fontFamily: sFontName,
                                            }}
                                            onBlur={onBlur}
                                            onChangeText={(text) => {
                                              // setbValidateAutocomplete(true);
                                              onChange(text);
                                              findAuthRegion(text, index);
                                            }}
                                            inputContainerStyle={{
                                              borderWidth: 0,
                                              paddingHorizontal: 0,
                                              paddingBottom: 0,
                                              marginBottom: 0,
                                            }}
                                            containerStyle={{
                                              paddingHorizontal: 0,
                                              paddingBottom: 0,
                                              marginBottom: 0,
                                            }}
                                          />
                                        )}
                                        name={`AC[${index}]`}
                                        rules={{
                                          required: true,
                                        }}
                                        defaultValue=""
                                      />
                                      {lBValidateAutocomplete[index] ===
                                        false && (
                                        <View
                                          style={{
                                            ...errorContainer,
                                            marginHorizontal: wp(
                                              Resolution.nWidthMarginValueScreen,
                                            ),
                                            zIndex: 1,
                                            flex: 1,
                                          }}>
                                          <Text
                                            style={{
                                              ...errorComponent,
                                              fontSize: wp(3.5),
                                              paddingHorizontal: 0,
                                              marginHorizontal: 0,
                                            }}>
                                            Please select an option.
                                          </Text>
                                        </View>
                                      )}
                                    </View>
                                  )}
                                  placeholder="Enter Authority Region"
                                  clearButtonMode={'while-editing'}
                                  renderItem={({
                                    item,
                                    indexForSuggestionItem,
                                  }) => (
                                    // For the suggestion view
                                    <TouchableOpacity
                                      style={{
                                        paddingVertical: hp(1),
                                        borderBottomColor: Colors.grey,
                                        borderBottomWidth: 0.5,
                                        borderTopColor: Colors.grey,
                                        borderTopWidth: 0.5,
                                      }}
                                      key={indexForSuggestionItem}
                                      onPress={() => {
                                        //lFilteredAuthRegions[index] = [];
                                        // setbValidateAutocomplete(false);
                                        updateAuthRegion(index, item);
                                        let myTempAuthRegions = lFilteredAuthRegions;
                                        let myTempAutocomplete = lBValidateAutocomplete;

                                        // myTempBValidateArray[mainIndex] = false;

                                        for (
                                          var forIndex = index;
                                          forIndex < myTempAutocomplete.length;
                                          forIndex++
                                        ) {
                                          myTempAutocomplete[forIndex] = true;
                                        }

                                        myTempAuthRegions[index] = [];
                                        // myTempAutocomplete[index] = true;
                                        setlFilteredAuthRegions(
                                          myTempAuthRegions,
                                        );
                                        setlBValidateAutocomplete(
                                          myTempAutocomplete,
                                        );
                                        // setlFilteredAuthRegions([]);
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: wp(4),
                                          fontStyle: 'normal',
                                          fontWeight: 'normal',
                                          fontFamily: sFontName,
                                        }}>
                                        {item.sAuthRegion}
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                />
                              </View>
                            }
                          </View>
                          <View>
                            {/* <Text
                          style={{
                            ...styles.textComponent,
                            textAlign: 'right',
                          }}>
                          Currency
                        </Text>
                        <Text
                          style={{
                            ...styles.textComponentAPI,
                            textAlign: 'right',
                          }}>
                          {year.sAuthRegionCurrency}
                        </Text> */}

                            {year.sAuthRegionCurrency === 'INR' && (
                              <View
                                style={{
                                  ...styles.employementStatusContainerForInput,
                                }}>
                                <Text
                                  style={{
                                    ...styles.textComponent,
                                    marginBottom: 0,
                                    //marginTop: hp(1),
                                    //marginTop:hp(1)
                                    // height: hp(5),
                                    // alignSelf: 'center',
                                    //marginRight: 2.5,
                                  }}>
                                  {/*Employment Status:{' '}*/}
                                  {/* {year.nCurrentChatrelSalaryAmt === 0
                            ? 'Not Employed'
                            : 'Employed'} */}
                                  {'EMPLOYED '}
                                </Text>
                                <View
                                  style={
                                    {
                                      // display: 'flex',
                                      // flexDirection: 'column',
                                      // justifyContent: 'flex-end',
                                    }
                                  }>
                                  <Input
                                    disabled={
                                      basicResponse > 0
                                        ? true
                                        : false || year.isChild
                                    }
                                    disabledInputStyle={{
                                      backgroundColor: Colors.grey,
                                      margin: 0,
                                      padding: 0,
                                    }}
                                    inputContainerStyle={{
                                      margin: 0,
                                      padding: 0,
                                      borderTopWidth: 0,
                                      borderRightWidth: 0,
                                      borderBottomWidth: 1,
                                      borderBottomColor: Colors.black,
                                      paddingBottom: 0,
                                      marginBottom: 0,
                                    }}
                                    containerStyle={{
                                      margin: 0,
                                      padding: 0,
                                      borderRightWidth: 0,
                                      width: hp(7.5),
                                      height: hp(0.25),
                                    }}
                                    style={{
                                      textAlign: 'right',
                                      fontStyle: 'normal',
                                      fontWeight: 'normal',
                                      fontFamily: sFontName,
                                      //flex:1
                                    }}
                                    //placeholder={''}
                                    //placeholderTextColor={Colors.grey}
                                    autoCorrect={false}
                                    clearButtonMode={'never'}
                                    returnKeyType={'done'}
                                    keyboardType={'decimal-pad'}
                                    keyboardAppearance={'default'}
                                    disableFullscreenUI={false}
                                    onChangeText={(value) => {
                                      if (value !== '') {
                                        modify(value, index);
                                      }
                                      if (value === '') {
                                        modify('0', index);
                                      }
                                    }}
                                  />
                                </View>
                              </View>
                            )}
                            {year.sAuthRegionCurrency === 'USD' && (
                              <View style={styles.employementStatusContainer}>
                                <Text
                                  style={{
                                    ...styles.textComponent,
                                    marginBottom: 0,
                                    //marginRight: 2.5,
                                  }}>
                                  {/*Employment Status:{' '}*/}
                                  {/* {year.nCurrentChatrelSalaryAmt === 0
                            ? 'Not Employed'
                            : 'Employed'} */}
                                  {'EMPLOYED '}
                                </Text>
                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignSelf: 'flex-start',
                                    alignItems: 'flex-start',
                                  }}>
                                  <Switch
                                    //style={{marginBottom:hp(10)}}
                                    key={year.nChatrelYear}
                                    trackColor={{
                                      true: Colors.websiteLightBlueColor,
                                      false:
                                        Platform.OS === 'ios'
                                          ? Colors.white
                                          : Colors.grey,
                                    }}
                                    thumbColor={
                                      year.nCurrentChatrelSalaryAmt === 0
                                        ? Colors.websiteLightBlueColor
                                        : Colors.white
                                    }
                                    ios_backgroundColor={Colors.white}
                                    onValueChange={(value) => {
                                      modify(value, index);
                                    }}
                                    value={
                                      year.nCurrentChatrelSalaryAmt > 0 ||
                                      (year.nCurrentChatrelSalaryAmt ===
                                        undefined &&
                                        year.nChatrelTotalAmount === 0)
                                    }
                                    disabled={
                                      basicResponse > 0
                                        ? true
                                        : false || year.isChild
                                    }
                                  />
                                </View>
                              </View>
                            )}
                          </View>
                        </View>
                        {/*<Card.Divider style={{
                      height: 0.75,
                      backgroundColor: Colors.greenBG,
                    }} />*/}
                        {outstanding && (
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              marginBottom: hp(1.25),
                            }}>
                            <View>
                              <Text
                                style={{
                                  ...styles.textComponent,
                                  textAlign: 'left',
                                }}>
                                CHATREL
                              </Text>
                              <Text
                                style={{
                                  ...styles.textComponentAPI,
                                  textAlign: 'left',
                                }}>
                                {year.sAuthRegionCurrency === 'INR'
                                  ? '\u20B9'
                                  : '\u0024'}
                                {year.nChatrelAmount.toFixed(2)}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  ...styles.textComponent,
                                  textAlign: 'center',
                                }}>
                                MEAL
                              </Text>
                              <Text
                                style={{
                                  ...styles.textComponentAPI,
                                  textAlign: 'center',
                                }}>
                                {year.sAuthRegionCurrency === 'INR'
                                  ? '\u20B9'
                                  : '\u0024'}
                                {year.nChatrelMeal.toFixed(2)}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  ...styles.textComponent,
                                  textAlign: 'center',
                                }}>
                                SALARY
                              </Text>
                              <Text
                                style={{
                                  ...styles.textComponentAPI,
                                  textAlign: 'center',
                                }}>
                                {year.sAuthRegionCurrency === 'INR'
                                  ? '\u20B9'
                                  : '\u0024'}
                                {year.nCurrentChatrelSalaryAmt.toFixed(2)}
                              </Text>
                            </View>
                            <View>
                              {year.lateFees !== 0 && (
                                <>
                                  <Text
                                    style={{
                                      ...styles.textComponent,
                                      textAlign: 'right',
                                    }}>
                                    PENALTY
                                  </Text>
                                  <Text
                                    style={{
                                      ...styles.textComponentAPI,
                                      textAlign: 'right',
                                    }}>
                                    {year.sAuthRegionCurrency === 'INR'
                                      ? '\u20B9'
                                      : '\u0024'}
                                    {year.nChatrelLateFeesValue.toFixed(2)}
                                  </Text>
                                </>
                              )}
                            </View>
                          </View>
                        )}
                        <Card.Divider
                          style={{
                            height: 1,
                            backgroundColor: Colors.buttonYellow,
                          }}
                        />
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: hp(1.25),
                          }}>
                          {year.sAuthRegionCurrency !== 'USD' && (
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                              }}>
                              <Text
                                style={{
                                  ...styles.textComponentAPI,
                                  textAlign: 'left',
                                  color: Colors.darkGreyRate,
                                  fontStyle: 'italic',
                                  fontSize: wp(4),
                                }}>
                                Rate &#8377;/$:{' '}
                                {dollarToRupees &&
                                year.sAuthRegionCurrency === 'INR'
                                  ? dollarToRupees.toFixed(4)
                                  : 'NA'}
                              </Text>
                            </View>
                          )}
                          <Text
                            style={{
                              ...styles.textComponent,
                              fontSize: wp(5),
                              color: Colors.black,
                              fontWeight:
                                Platform.OS === 'android' ? 'normal' : 'bold',
                              fontFamily:
                                Platform.OS === 'android'
                                  ? sFontNameBold
                                  : sFontName,
                            }}>
                            TOTAL
                          </Text>
                          <Text
                            style={{
                              ...styles.textComponentAPI,
                              textAlign: 'right',
                              fontSize: wp(5),
                              fontWeight:
                                Platform.OS === 'android' ? 'normal' : 'bold',
                              fontFamily:
                                Platform.OS === 'android'
                                  ? sFontNameBold
                                  : sFontName,
                              color: Colors.black,
                            }}>
                            ${year.nChatrelTotalAmount.toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    </Card>
                  </View>
                );
              })}
              <Card
                //key={year.nChatrelYear}
                containerStyle={{
                  marginBottom: hp(2),
                  marginHorizontal: 0,
                  width: wp(87.5),
                  backgroundColor: Colors.white,
                  //Border Stuff
                  borderRadius: 15,
                  //For iOS
                  shadowRadius: 15,
                  shadowColor: Colors.lightBlueChatrelWebsite,
                  shadowOffset: {width: 5, height: 5},
                  shadowOpacity: 1,
                  //For Android
                  elevation: 15,
                  overflow: 'visible',
                }}>
                <View style={styles.businessDonationContainer}>
                  <Badge
                    containerStyle={styles.badgeContainerStyle}
                    badgeStyle={{
                      ...styles.badgeStyle,
                      alignSelf: 'flex-end',
                    }}
                    value={
                      <Text
                        style={{
                          ...styles.labelComponent,
                          // paddingBottom: Platform.isPad ? hp(1.75) : hp(1.5),
                          paddingBottom:
                            Platform.OS === 'ios'
                              ? Platform.isPad
                                ? hp(1.75)
                                : hp(1.5)
                              : Device.isTablet
                              ? hp(1.5)
                              : hp(1.25),
                        }}>
                        BUSINESS DONATION ($)
                      </Text>
                    }
                  />
                  <Input
                    style={{
                      textAlign: 'right',
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontFamily: sFontName,
                    }}
                    placeholder="Business Donation"
                    placeholderTextColor={Colors.grey}
                    autoCorrect={false}
                    clearButtonMode={'while-editing'}
                    returnKeyType={'done'}
                    keyboardType={'decimal-pad'}
                    keyboardAppearance={'default'}
                    disableFullscreenUI={true}
                    value={nBusinessDonation}
                    onChangeText={(value) => {
                      if (value === '') {
                        calcTotal(aGBChatrels, nAdditionalDonation, 0);
                        setnBusinessDonation(0);
                      } else {
                        calcTotal(
                          aGBChatrels,
                          nAdditionalDonation,
                          parseFloat(value),
                        );
                        setnBusinessDonation(parseFloat(value));
                      }
                    }}
                  />
                </View>
                <View style={styles.additionalDonationContainer}>
                  <Badge
                    containerStyle={styles.badgeContainerStyle}
                    badgeStyle={{
                      ...styles.badgeStyle,
                      alignSelf: 'flex-end',
                    }}
                    value={
                      <Text
                        style={{
                          ...styles.labelComponent,
                          // paddingBottom: Platform.isPad ? hp(1.75) : hp(1.5),
                          paddingBottom:
                            Platform.OS === 'ios'
                              ? Platform.isPad
                                ? hp(1.75)
                                : hp(1.5)
                              : Device.isTablet
                              ? hp(1.5)
                              : hp(1.25),
                        }}>
                        ADDITIONAL DONATION ($)
                      </Text>
                    }
                  />
                  <Input
                    style={{
                      textAlign: 'right',
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontFamily: sFontName,
                    }}
                    placeholder="Additional Donation"
                    placeholderTextColor={Colors.grey}
                    autoCorrect={false}
                    clearButtonMode={'while-editing'}
                    returnKeyType={'done'}
                    keyboardType={'decimal-pad'}
                    keyboardAppearance={'default'}
                    disableFullscreenUI={true}
                    value={nAdditionalDonation}
                    onChangeText={(value) => {
                      if (value === '') {
                        calcTotal(aGBChatrels, 0, nBusinessDonation);
                        setnAdditionalDonation(0);
                      } else {
                        calcTotal(
                          aGBChatrels,
                          parseFloat(value),
                          nBusinessDonation,
                        );
                        setnAdditionalDonation(parseFloat(value));
                      }
                    }}
                  />
                </View>
              </Card>

              <View style={styles.grandTotalContainer}>
                <PricingCard
                  color={Colors.buttonYellow}
                  title="Grand Total"
                  titleStyle={{
                    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                    fontFamily:
                      Platform.OS === 'android' ? sFontNameBold : sFontName,
                  }}
                  containerStyle={{
                    marginBottom: hp(2),
                    marginHorizontal: 0,
                    width: wp(87.5),
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
                  }}
                  price={'$ ' + parseFloat(nGrandTotal.toFixed(2))}
                  button={{
                    title: 'CONTRIBUTE NOW',
                    titleStyle: {
                      fontStyle: 'normal',
                      color: Colors.white,
                      fontSize: wp(4),
                      fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                      fontFamily:
                        Platform.OS === 'android' ? sFontNameBold : sFontName,
                    },
                    disabled:
                      nGrandTotal === 0 ||
                      nGrandTotal === 0.0 ||
                      lBValidateAutocomplete.includes(false),
                    buttonStyle: styles.paypalButtonComponent,
                    onPress: () => {
                      setbLoader(true);
                      setbRender(false);
                      axios
                        .get(
                          `/PayPalCheckout/CreateOrder?amount=${nGrandTotal
                            .toFixed(2)
                            .toString()}`,
                        )
                        .then((resp) => {
                          if (resp.status === 200) {
                            setapprovalUrl(resp.data.payment_link);
                            setbLoader(false);
                            setbRender(true);
                            {
                              /*Render Web View*/
                            }
                            setbPaymentModal(true);
                          }
                        })
                        .catch((error) => {
                          setbLoader(false);
                          setbRender(true);
                          setTimeout(() => {
                            Alert.alert(
                              sAttentionRequired,
                              sPayPalUIErrorMessage,
                              [
                                {
                                  text: 'Ok',
                                  onPress: () => true,
                                  style: 'cancel',
                                },
                              ],
                              {cancelable: false},
                            );
                          }, 1000);
                        });
                    },
                  }}
                />
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerComponent: {
    fontSize: wp(4),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    marginVertical: hp(1),
    color: Colors.blackText,
  },
  textComponent: {
    fontSize: wp(3.25),
    textAlign: 'left',
    marginBottom: hp(1),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.labelColorLight,
    fontFamily: sFontName,
  },

  textComponentAPI: {
    fontSize: wp(4.25),
    textAlign: 'left',
    marginBottom: hp(1),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    fontFamily: sFontName,
  },
  chatrelYearComponent: {
    fontSize: wp(7),
    fontStyle: 'normal',
    textAlign: 'left',
    color: Colors.ChatrelYearGreen,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
  employementStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  employementStatusContainerForInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  employementStatusComponent: {},
  authorityRegionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  authorityRegionComponent: {
    fontFamily: sFontName,
  },
  pickerComponent: {
    height: hp(4),
    width: wp(40),
  },
  pickerComponentIOS: {
    height: 30,
    width: wp(35),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
  yearContainer: {
    marginBottom: 5,
  },
  additionalDonationContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  additionalDonationComponent: {},
  businessDonationContainer: {
    marginBottom: 5,
  },
  businessDonationComponent: {},
  grandTotalComponent: {
    textAlign: 'right',
  },
  grandTotalContainer: {},
  paypalButtonContainer: {
    marginVertical: 10,
  },
  paypalButtonComponent: {
    backgroundColor: Colors.buttonYellow,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.buttonYellow,
  },
  badgeContainerStyle: {
    marginBottom: hp(1.25),
  },
  badgeStyle: {
    alignSelf: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.websiteLightBlueColor,
    padding: hp(2),
    // width: wp(29),
    // height: hp(3.5),
  },
  labelContainer: {
    // width: wp(75),
    // height: hp(2),
  },
  valueContainer: {
    // width: wp(75),
    // height: hp(3),
    // flexDirection: 'row',
    // flexDirection:'row',
    // flex:1
    // flexDirection:'row'
  },
  labelComponent: {
    textAlignVertical: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: wp(3),
    fontStyle: 'normal',
    color: Colors.white,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    paddingBottom: Platform.OS === 'ios' ? hp(1.5) : 0,
  },
  valueComponent: {
    textAlign: 'left',
    fontSize: wp(4.25),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    fontFamily: sFontName,
    marginBottom: wp(5),
    // flex:1
    // flexWrap: 'wrap',
    // flexShrink: 1,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
  },
  badgeStyleChip: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.ChatrelYearGreen,
    padding: hp(2),
    // width: wp(20),
    // height: hp(2.75),
  },
  labelComponentChip: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: wp(3),
    fontStyle: 'normal',
    color: Colors.white,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    paddingBottom: Platform.OS === 'ios' ? hp(1.5) : 0,
  },
  titleStyleView: {
    marginBottom: hp(5.5),
    shadowRadius: 15,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
  },
  iconStyles: {
    backgroundColor: Colors.websiteLightBlueColor,
    margin: hp(2),
  },
  iconContainerStyles: {
    alignSelf: 'center',
    position: 'absolute',
    top: -55,
    // left:20,
    borderRadius: 10,
    elevation: 15,
  },
  boldTextComponent: {
    fontSize: wp(6),
    fontStyle: 'normal',
    textAlign: 'center',
    color: Colors.blackText,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
  greyTextComponent: {
    fontSize: wp(5.25),
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    color: Colors.labelColorLight,
    lineHeight: hp(3.5),
  },
  viewMarginComponent: {
    //width: wp(70),
    //height: hp(33),
    marginBottom: hp(2.5),
  },
});
