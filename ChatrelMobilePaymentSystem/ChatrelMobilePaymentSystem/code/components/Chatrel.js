import React, {useEffect, useRef, useState} from 'react';
import {
  Switch,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Modal,
  PermissionsAndroid,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';

import {Picker, PickerIOS} from '@react-native-picker/picker';
import IOSPicker from '../components/IOSPicker';
import {
  sFailurePayPalWebPageURL,
  sFontName,
  sFontNameBold,
  sPayPalBASEURL,
  sSuccessPayPalWebPageURL,
  sFolderName,
  sReceiptDownloadMessageAndroid,
  sReceiptDownloadMessageIOS,
} from '../constants/CommonConfig';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from '../components/Loader';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

// import http from 'https';
// import qs from "querystring";
// import DropDownPicker from 'react-native-dropdown-picker';
// import Icon from 'react-native-vector-icons/Feather';
// import ModalDropdown from 'react-native-modal-dropdown';

import {useSelector, useDispatch} from 'react-redux';
import {
  Input,
  Button,
  Card,
  PricingCard,
  Icon,
  Badge,
  withBadge,
} from 'react-native-elements';
import axios from 'axios';
import Moment from 'moment';
import Colors from '../constants/Colors';
import {
  storeJWTToken,
  removeGBDetails,
  removeJWTToken,
} from '../store/actions/GBDetailsAction';
// import RNPaypal from 'react-native-paypal-lib';
import {
  sPayPalClientID,
  sClientSecret,
  sHimalayaFontName,
  sAPIBASEURL,
  oActivityIndicatorStyle,
} from '../constants/CommonConfig';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import base64 from 'react-native-base64';
import RNFetchBlob from 'react-native-fetch-blob';
import Toast from 'react-native-root-toast';

export const Chatrel = (props) => {
  // let approvalUrl = null;
  // let sAccessToken = null;
  // let sPayerID = null;
  // let paymentID = null;
  const dispatch = useDispatch();
  const sJwtToken = useSelector((state) => state.GBDetailsReducer.sJwtToken);
  const [showData, setshowData] = useState(true);
  const [successDiv, setSuccessDiv] = useState(false);
  const [receiptData, setReceiptData] = useState(false);
  const [approvalUrl, setapprovalUrl] = useState(null);
  const [sAccessToken, setsAccessToken] = useState('');
  const [paymentID, setpaymentID] = useState('');
  const [sPayerID, setsPayerID] = useState('');
  const [bPaymentModal, setbPaymentModal] = useState(false);
  // const [sAccessToken, setsAccessToken] = useState('');
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
  const [lAuthRegions, setlAuthRegions] = React.useState([]);
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
          console.log(resp.data);
          const oSession = {
            sJwtToken: resp.data.token,
            bSession: true,
          };
          dispatch(storeJWTToken(oSession));
        }
      })
      .catch((error) => {
        console.log('Error ', error.response);
        if (error.response) {
          console.error(error.response);
        } else if (error.request) {
          console.warn(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.log(error.config);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };

  const modify = (value, index) => {
    debugger;
    let oPayment = [...aGBChatrels];
    if (typeof value === 'string') {
      oPayment[index].nCurrentChatrelSalaryAmt = parseFloat(value)
        ? parseFloat(value)
        : 0;
    } else {
      if (oPayment[index].nCurrentChatrelSalaryAmt === 0) {
        // oPayment[index].nCurrentChatrelSalaryAmt = oPayment[index].nSalaryUSD;
        //setPaymentData(payObj);

        if (dataAPI.message === 'No Outstandings') {
          oPayment[index].nCurrentChatrelSalaryAmt = dataAPI.nSalaryUSD;
        } else {
          oPayment[index].nCurrentChatrelSalaryAmt = oPayment[index].nSalaryUSD;
        }
      } else {
        oPayment[index].nCurrentChatrelSalaryAmt = 0;
      }
    }
    setaGBChatrels(oPayment);
    calculateMethod(index);
  };

  // const toggleSwitch = (index, year) => {
  //   let oPayment = [...aGBChatrels];
  //   if (year.nCurrentChatrelSalaryAmt === 0) {
  //     oPayment[index].nCurrentChatrelSalaryAmt = oPayment[index].nSalaryUSD;
  //   } else {
  //     oPayment[index].nCurrentChatrelSalaryAmt = 0;
  //   }
  //   setaGBChatrels(oPayment);
  //   calculateMethod(index);
  // };

  const runOnce = () => {
    //Co-ordinate with aayush
    if (aGBChatrels && dollarToRupees && shouldRun) {
      //if (!outstanding) {
      if (aGBChatrels[0].nCurrentChatrelSalaryAmt > 0) {
        // const checkBox = document.getElementById('employed');
        // const rateField = document.getElementById('rate');
        // const totalField = document.getElementById('total');
        //if (checkBox) {
        // rateField.innerText = '';
        // checkBox.checked = true;
        // checkBox.disabled = true;
        setaGBChatrels(
          aGBChatrels.map((element) => {
            element.nChatrelTotalAmount = 0;
            element.nCurrentChatrelSalaryAmt = 0;
            return element;
          }),
        );

        //totalField.innerText = '';
        setnGrandTotal(0.0);
        setGBChatrelsNull(true);
        //}
      }
      //}
      //else {
      //console.log('we have outstanding');
      const len = aGBChatrels.length;
      for (var i = 0; i < len; i++) {
        calculateMethod(i);
      }
      //}
      setShouldRun(false);
    }
  };

  const updateAuthRegionIOS = (index, value) => {
    debugger;
    //let index = e;
    let chatrelObj = [...aGBChatrels];
    let value1 = lAuthRegions.find((x) => x.sAuthRegion === value);

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

      chatrelObj[forIndex].nCurrentChatrelSalaryAmt = 0;
      setaGBChatrels(chatrelObj);
      calculateMethod(forIndex);
    }
  };

  const updateAuthRegion = (index, value) => {
    debugger;

    //const index = e;
    let chatrelObj = [...aGBChatrels];
    //let forIndex = index;
    // let value1  = lAuthRegions.find((x) => x.id === value)
    //var a  = document.getElementById(e);
    //console.info(pickerRef);
    // pickerRef.current.props.selectedValue = value;

    for (var forIndex = index; forIndex < chatrelObj.length; forIndex++) {
      chatrelObj[forIndex].nAuthRegionID = value.id;
      chatrelObj[forIndex].sCountryID = value.sCountryID;
      chatrelObj[forIndex].sAuthRegionCurrency = value.sCurrencyCode;
      chatrelObj[forIndex].nChatrelAmount =
        value.sCurrencyCode === 'INR'
          ? chatrelObj[forIndex].nChatrelINR
          : chatrelObj[forIndex].nChatrelUSD;
      chatrelObj[forIndex].nChatrelMeal =
        value.sCurrencyCode === 'INR'
          ? chatrelObj[forIndex].nChatrelMealINR
          : chatrelObj[forIndex].nChatrelMealUSD;

      chatrelObj[forIndex].nCurrentChatrelSalaryAmt = 0;
      setaGBChatrels(chatrelObj);
      calculateMethod(forIndex);
    }
  };

  const calculateMethod = (index) => {
    console.log('Calculate Method Index: ' + index);
    let oPayment = [...aGBChatrels];
    let len = aGBChatrels.length;
    if (index != len - 1) {
      oPayment[index].nChatrelLateFeesValue =
        (oPayment[index].nChatrelAmount +
          oPayment[index].nChatrelMeal +
          oPayment[index].nCurrentChatrelSalaryAmt) *
        (oPayment[index].nChatrelLateFeesPercentage / 100);
      //Rmoved as per website
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
    //console.log(oPayment[index].nChatrelTotalAmount);
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

  // const handleDownloadReceiptOnPress = (sChatrelReceiptNumber) => {
  //   const {dirs} = RNFetchBlob.fs;
  //   RNFetchBlob.config({
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       useDownloadManager: true,
  //       notification: true,
  //       mediaScannable: true,
  //       title: `Receipt.pdf`,
  //       path: `${dirs.DownloadDir}/Receipt.pdf`,
  //     },
  //   })
  //     .fetch(
  //       'GET',
  //       sAPIBASEURL +
  //         '/ChatrelPayment/GetReceipt/?sReceiptNumber=' +
  //         sChatrelReceiptNumber,
  //       {
  //         Authorization: 'Bearer ' + sJwtToken,
  //       },
  //     )
  //     .then((resp) => {
  //       console.log(resp);
  //       //TODO: iOS
  //       Platform.OS === 'android'
  //         ? ToastAndroid.show(
  //             'Receipt Downloaded Successfully',
  //             ToastAndroid.SHORT,
  //             ToastAndroid.CENTER,
  //           )
  //         : null;
  //     })
  //     .catch((error) => {
  //       console.log('Error ', error.response);
  //       if (error.response) {
  //         console.error(error.response);
  //         console.error(error.response.data);
  //         console.error(error.response.status);
  //         console.error(error.response.headers);
  //       } else if (error.request) {
  //         console.warn(error.request);
  //       } else {
  //         console.error('Error', error.message);
  //       }
  //       console.log(error.config);
  //     })
  //     .then((release) => {
  //       //console.log(release); => udefined
  //     });
  // };

  const handleSubmitAfterPayPal = async (paypalObj) => {
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

    if (gbChatrelsNull) {
      oPayment = null;
    }

    if (donationNull) {
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
        setbLoader(false);
        console.error(error.config);
        if (error.response.status === 401) {
          // const oSession = {
          //   sJwtToken: '',
          //   bSession: false,
          // };
          // dispatch(storeJWTToken(oSession));
        } else {
          alert('Something went wrong, please try again later');
        }
      });

    // const {
    //     nonce,
    //     payerId,
    //     email,
    //     firstName,
    //     lastName,
    //     phone
    // } = await requestOneTimePayment(
    //   sPayPalClientID,
    //   {
    //     amount: '5', // required
    //     // any PayPal supported currency (see here: https://developer.paypal.com/docs/integration/direct/rest/currency-codes/#paypal-account-payments)
    //     currency: 'USD',
    //     // any PayPal supported locale (see here: https://braintree.github.io/braintree_ios/Classes/BTPayPalRequest.html#/c:objc(cs)BTPayPalRequest(py)localeCode)
    //     localeCode: 'en_GB',
    //     shippingAddressRequired: false,
    //     userAction: 'commit', // display 'Pay Now' on the PayPal review page
    //     // one of 'authorize', 'sale', 'order'. defaults to 'authorize'. see details here: https://developer.paypal.com/docs/api/payments/v1/#payment-create-request-body
    //     intent: 'sale',
    //   }
    // );
  };

  useEffect(() => {
    if (isFocused) {
      getChatrelDetails();
      console.log('Chatrel Common Component Called');
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
      setbRender(false);
      setbLoader(true);
      //setShouldRun(true);
    }
  }, [isFocused]);

  const getChatrelDetails = () => {
    axios
      .get(`/AuthRegion/GetAuthRegions`)
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data);
          setlAuthRegions(resp.data);

          let myURL =
            props.props === 'Self' ? oGBDetails.sGBID : oCurrentGBDetails.sGBID;

          axios
            .get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=` + myURL)
            .then((resp) => {
              if (resp.status === 200) {
                //console.log(resp.data);
                const oSession = {
                  sJwtToken: resp.data.token,
                  bSession: true,
                };
                dispatch(storeJWTToken(oSession));
                if (resp.data.message === 'Paid Until Missing') {
                  //console.log("Inside File Dispute Condition");
                  setbLoader(false);
                  setbRender(true);
                  setDisplayFileDispute(true);
                  // setbRender(true);
                  // setbRender(true);
                } else {
                  setsCountryID(resp.data?.chatrel?.sCountryID);
                  if (
                    resp.data.chatrel.chatrelPayment.nChatrelTotalAmount === 0
                  ) {
                    setOutstanding(false);
                    debugger;
                    console.log(
                      resp.data.chatrel.gbChatrels[0].nCurrentChatrelSalaryAmt,
                    );
                    setBasicResponse(
                      resp.data.chatrel.gbChatrels[0].nCurrentChatrelSalaryAmt,
                    );
                  }
                  setnChatrelLateFeesPercentage(
                    resp.data.chatrel.chatrelPayment.nChatrelLateFeesPercentage,
                  );
                  setaGBChatrels(resp.data.chatrel.gbChatrels);
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
                    resp.data.chatrel.gbChatrels,
                    nAdditionalDonation,
                    nBusinessDonation,
                  );
                  setbLoader(false);
                  setbRender(true);
                  fetch(
                    'https://api.ratesapi.io/api/latest?base=INR&symbols=USD',
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      console.log('currency', data.rates.USD);
                      setDollarToRupees(data.rates.USD);
                    });
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
                alert('Something went wrong, please try again later');
              }
            });
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
          alert('Something went wrong, please try again later');
        }
      });
  };

  useEffect(() => {
    if (isFocused) {
      runOnce();
    }
  }, [dollarToRupees, isFocused]);

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
    console.log(webViewState.title);
    // get payer from of the url
    if (webViewState.title === 'eChatrel' || webViewState.title === 'Success') {
      // const params = new URL(webViewState.url).searchParams;
      var regexp = /[?&]([^=#]+)=([^&#]*)/g,
        params = {},
        check;
      while ((check = regexp.exec(webViewState.url))) {
        params[check[1]] = check[2];
      }
      //console.log("params", params);
      // setsPayerID(params.PayerID);
      // sPayerID = params.PayerID;

      {
        /*Fourth Step: Capture payment Request*/
      }
      debugger;
      var axios = require('axios');
      var dataFourth = JSON.stringify({payer_id: params.PayerID});

      var fourthConfig = {
        baseURL: sPayPalBASEURL,
        method: 'post',
        url: '/v2/checkout/orders/' + paymentID + '/capture',
        headers: {
          Authorization: 'Bearer ' + sAccessToken,
          'Content-Type': 'application/json',
        },
        data: dataFourth,
      };
      debugger;
      axios(fourthConfig)
        .then(function (response) {
          {
            /*Fifth Step: Payment verification Request*/
          }
          debugger;
          var fifthConfig = {
            baseURL: sPayPalBASEURL,
            method: 'get',
            url: '/v2/checkout/orders/' + paymentID,
            headers: {
              'content-type': 'application/json',
              Authorization: 'Bearer ' + sAccessToken,
            },
          };
          debugger;
          axios(fifthConfig)
            .then(function (response) {
              console.log(response);
              setbPaymentModal(false);
              handleSubmitAfterPayPal(response.data);
            })
            .catch(function (error) {
              //TODO: Ask Team
              console.log(error);
            });
        })
        .catch(function (error) {
          //TODO: Ask Team
          console.log(error);
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
    console.log(sChatrelReceiptNumber);
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

          fPath = `${fPath}/ChatrelReceipt-` + sChatrelReceiptNumber + `.pdf`;

          if (Platform.OS === 'ios') {
            RNFetchBlob.fs.createFile(fPath, resp.data.receipt, 'base64');
          } else {
            RNFetchBlob.fs.writeFile(fPath, resp.data.receipt, 'base64');
          }

          setbLoader(false);

          Platform.OS === 'android'
            ? ToastAndroid.show(
                sReceiptDownloadMessageAndroid,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              )
            : Toast.show(sReceiptDownloadMessageIOS, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                // onShow: () => {
                //     // calls on toast\`s appear animation start
                // },
                // onShown: () => {
                //     // calls on toast\`s appear animation end.
                // },
                // onHide: () => {
                //     // calls on toast\`s hide animation start.
                // },
                // onHidden: () => {
                //     // calls on toast\`s hide animation end.
                // }
              });
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
  };

  if (!bRender) {
    return (
      <>
        <Loader loading={bLoader} />
      </>
    );
  }

  if (displayFileDispute) {
    //debugger;
    return (
      <>
        <Card
          title={
            <View style={styles.titleStyleView}>
              <Icon
                color={Colors.white}
                iconStyle={styles.iconStyles}
                iconProps={{}}
                //underlayColor={Colors.websiteLightBlueColor}
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
            marginTop: hp(5),
          }}>
          <View style={styles.viewMarginComponent}>
            <Text style={styles.boldTextComponent}>
              Last paid chatrel date not available.
            </Text>
          </View>
          <View style={styles.viewMarginComponent}>
            <Text style={styles.greyTextComponent}>
              Please Contact CTA or file a dispute.
            </Text>
          </View>
          <Button
            title="FILE A DISPUTE"
            titleStyle={{
              color: Colors.white,
              textAlign: 'center',
              fontStyle: 'normal',
              fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
              fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
            }}
            buttonStyle={{
              backgroundColor: Colors.websiteLightBlueColor,
              borderRadius: 15,
            }}
            onPress={() => {
              navigation.navigate('FileDispute');
            }}
          />
        </Card>
        {/* {Alert.alert(
          'Attention Required',
          'Last paid chatrel date not available. Please Contact CTA or file a dispute.',
          [
            {
              text: 'File a Dispute',
              onPress: () => {
                setDisplayFileDispute(false);
                navigation.navigate('FileDispute');
              },
              style: 'cancel',
            },
          ],
          {cancelable: false},
        )} */}
      </>
    );
  }

  return (
    <>
      {bRender && aGBChatrels && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.mainContainer}>
          <Modal
            visible={bPaymentModal}
            onRequestClose={() => setbPaymentModal(false)}>
            <WebView
              source={{uri: approvalUrl}}
              onNavigationStateChange={onNavigationStateChange}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              // injectedJavaScript={this.state.cookie}
              startInLoadingState={false}
              //style={{marginTop: 20}}
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
                  {/* <Text
                    style={{
                      ...styles.valueComponent,
                      fontFamily: sHimalayaFontName,
                      fontSize: Platform.OS === 'android' ? wp(4.75) : wp(5),
                    }}>
                    བོད་མིའི་སྒྲིག་འཛུགས་དཔལ་འབྱོར་ལས་ཁུངས་ནས།
                  </Text> */}
                  <Button
                    //disabled={true}
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
              {/* <View>
            <Text style={styles.textComponent}>DATE OF BIRTH</Text>
          </View>
          <View>
            <Text style={styles.textComponentAPI}>{oGBDetails.dtDOB}</Text>
          </View> */}
              {/* <View>
            <Text style={styles.textComponent}>CHATREL OF YEARS DUE</Text>
          </View>
          <View>
            <Text style={styles.textComponentAPI}>
              {Moment().diff(nPaidUntil, 'years')} Years
            </Text>
          </View> */}
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
                      title={
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: hp(1),
                            // paddingTop:10
                          }}>
                          <Text style={styles.chatrelYearComponent}>
                            {year.nChatrelYear}
                          </Text>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              //marginBottom: hp(2),
                            }}>
                            <Badge
                              //containerStyle={styles.badgeContainerStyle}
                              badgeStyle={{
                                ...styles.badgeStyleChip,
                                backgroundColor:
                                  year.nChatrelLateFeesValue > 0
                                    ? Colors.red
                                    : year.nChatrelLateFeesValue === 0
                                    ? Colors.ChatrelYearGreen
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
                            //marginBottom: hp(1.25),
                          }}>
                          <View style={styles.authorityRegionContainer}>
                            <Text style={styles.textComponent}>
                              AUTHORITY REGION
                            </Text>
                            {Platform.OS === 'android' && (
                              <Picker
                                enabled={outstanding}
                                collapsable={true}
                                mode={'dialog'}
                                //prompt={'AUTHORITY REGION'}
                                key={index}
                                // itemStyle={{
                                //   //height: 50,
                                //   width: 20,
                                // }}
                                //
                                //doesn't work for android
                                //style={{ height: 75, width: 500 }}
                                selectedValue={lAuthRegions.find(
                                  (x) =>
                                    x.id === aGBChatrels[index].nAuthRegionID,
                                )}
                                style={styles.pickerComponent}
                                onValueChange={(itemValue, itemIndex) =>
                                  updateAuthRegion(index, itemValue)
                                }>
                                {lAuthRegions.map((singleAuthregion, key) => (
                                  <Picker.Item
                                    label={singleAuthregion.sAuthRegion}
                                    value={singleAuthregion}
                                    key={key}
                                  />
                                ))}
                              </Picker>
                            )}

                            {Platform.OS === 'ios' && (
                              <View
                                pointerEvents={outstanding ? 'auto' : 'none'}>
                                <IOSPicker
                                  //data={lAuthRegions}
                                  mode={'modal'} //collapse
                                  //key={index}
                                  // itemStyle={{
                                  //   height: 50,
                                  //   width: 50,
                                  //   fontFamily: sFontName,
                                  // }}
                                  //enabled={!outstanding}
                                  selectedValue={
                                    lAuthRegions.find(
                                      (x) =>
                                        x.id ===
                                        aGBChatrels[index].nAuthRegionID,
                                    ).sAuthRegion
                                  }
                                  itemStyle={{
                                    borderColor: Colors.black,
                                    borderWidth: 1,
                                    borderRadius: 15,
                                    borderStyle: 'solid',
                                  }}
                                  style={styles.pickerComponentIOS}
                                  onValueChange={(itemValue, itemIndex) => {
                                    //itemValue is data
                                    //itemindex is index
                                    console.log('Inchatrel');
                                    updateAuthRegionIOS(index, itemValue);
                                  }}>
                                  {lAuthRegions.map(
                                    (singleAuthregionIOS, authRegionIndex) => (
                                      <Picker.Item
                                        label={singleAuthregionIOS.sAuthRegion}
                                        value={singleAuthregionIOS.sAuthRegion}
                                        key={authRegionIndex}
                                      />
                                    ),
                                  )}
                                </IOSPicker>
                              </View>
                            )}
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
                                style={
                                  styles.employementStatusContainerForInput
                                }>
                                <Text
                                  style={{
                                    ...styles.textComponent,
                                    marginBottom: 0,
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
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    //marginBottom: hp(2),
                                  }}>
                                  <Input
                                    disabled={
                                      basicResponse > 0
                                        ? true
                                        : false || year.isChild
                                    }
                                    // label="Business Donation"
                                    //placeholder="Business Donation"
                                    inputContainerStyle={{
                                      //borderBottomWidth:0,
                                      //borderTopWidth:0,
                                      //width:wp(60),
                                      //align
                                      //padding:0
                                      height: hp(2),
                                      width: wp(10),
                                      margin: 0,
                                      padding: 0,
                                      borderRightWidth: 0,
                                      borderBottomWidth: 1,
                                    }}
                                    containerStyle={{
                                      // height:hp(5),
                                      margin: 0,
                                      padding: 0,
                                      borderRightWidth: 0,
                                      // borderBottomWidth: 1,
                                      // //height:hp(10)
                                      //paddingHorizontal:0,
                                      //borderTopWidth:0,
                                      //borderBottomWidth:0
                                    }}
                                    style={{
                                      textAlign: 'right',
                                      fontStyle: 'normal',
                                      fontWeight: 'normal',
                                      fontFamily: sFontName,
                                      //width:wp(1)
                                    }}
                                    //placeholder={''}
                                    //placeholderTextColor={Colors.grey}
                                    autoCorrect={false}
                                    clearButtonMode={'never'}
                                    keyboardType={'number-pad'}
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
                                    //value={nBusinessDonation}
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
                                    // marginBottom: hp(1),
                                  }}>
                                  <Switch
                                    //style={{marginBottom:hp(10)}}
                                    key={year.nChatrelYear}
                                    trackColor={{
                                      false: '#767577',
                                      true: Colors.grey,
                                    }}
                                    thumbColor={
                                      year.nCurrentChatrelSalaryAmt === 0
                                        ? '#f4f3f4'
                                        : Colors.blue
                                    }
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={(value) => {
                                      modify(value, index);
                                    }}
                                    value={year.nCurrentChatrelSalaryAmt > 0}
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
                                //marginBottom: hp(1.25),
                              }}>
                              <Text
                                style={{
                                  ...styles.textComponentAPI,
                                  textAlign: 'left',
                                  color: Colors.grey,
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
                              //textAlign: 'left',
                              fontSize: wp(5),
                              //fontStyle: 'normal',
                              //fontWeight: 'bold',
                              color: Colors.blue,
                              fontWeight:
                                Platform.OS === 'android' ? 'normal' : 'bold',
                              fontFamily:
                                Platform.OS === 'android'
                                  ? sFontNameBold
                                  : sFontName,
                              // marginLeft: wp(12.5),
                            }}>
                            TOTAL
                          </Text>
                          <Text
                            style={{
                              ...styles.textComponentAPI,
                              textAlign: 'right',
                              //textAlign: 'center',
                              fontSize: wp(5),
                              //fontStyle: 'normal',
                              fontWeight:
                                Platform.OS === 'android' ? 'normal' : 'bold',
                              fontFamily:
                                Platform.OS === 'android'
                                  ? sFontNameBold
                                  : sFontName,
                              color: Colors.blue,
                            }}>
                            ${year.nChatrelTotalAmount.toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    </Card>
                  </View>
                );
              })}
              {/* <View>
                <Text style={styles.headerComponent}>ADDITIONAL CHATREL</Text>
              </View> */}
              <Card
                //key={year.nChatrelYear}
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
                }}>
                <View style={styles.businessDonationContainer}>
                  <Badge
                    containerStyle={styles.badgeContainerStyle}
                    badgeStyle={{
                      ...styles.badgeStyle,
                      alignSelf: 'flex-end',
                      // height:hp(),
                      //width: wp(45),
                    }}
                    value={
                      <Text style={styles.labelComponent}>
                        BUSINESS DONATION ($)
                      </Text>
                    }
                  />
                  <Input
                    style={{
                      textAlign: 'right',
                      // fontSize:
                      //   Dimensions.get('window').width < Resolution.nWidthBreakpoint
                      //     ? 10.5
                      //     : 17.5,
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontFamily: sFontName,
                    }}
                    placeholder="Business Donation"
                    placeholderTextColor={Colors.grey}
                    autoCorrect={false}
                    clearButtonMode={'while-editing'}
                    keyboardType={'decimal-pad'}
                    keyboardAppearance={'default'}
                    disableFullscreenUI={true}
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
                    value={nBusinessDonation}
                  />
                </View>
                <View style={styles.additionalDonationContainer}>
                  <Badge
                    containerStyle={styles.badgeContainerStyle}
                    badgeStyle={{
                      ...styles.badgeStyle,
                      alignSelf: 'flex-end',
                      // height:hp(),
                      //width: wp(45),
                    }}
                    value={
                      <Text style={styles.labelComponent}>
                        ADDITIONAL DONATION ($)
                      </Text>
                    }
                  />
                  <Input
                    style={{
                      textAlign: 'right',
                      // fontSize:
                      //   Dimensions.get('window').width < Resolution.nWidthBreakpoint
                      //     ? 10.5
                      //     : 17.5,
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontFamily: sFontName,
                    }}
                    placeholder="Additional Donation"
                    placeholderTextColor={Colors.grey}
                    autoCorrect={false}
                    clearButtonMode={'while-editing'}
                    keyboardType={'decimal-pad'}
                    keyboardAppearance={'default'}
                    disableFullscreenUI={true}
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
                    value={nAdditionalDonation}
                  />
                </View>
              </Card>

              <View style={styles.grandTotalContainer}>
                {/* <Text style={styles.grandTotalComponent}>
              {nGrandTotal.toFixed(2)}
            </Text> */}
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
                    disabled: nGrandTotal === 0 || nGrandTotal === 0.0,
                    buttonStyle: styles.paypalButtonComponent,
                    onPress: () => {
                      // // var qs = require('querystring');
                      // // var http = require('https');

                      // var options = {
                      //   method: 'POST',
                      //   hostname: 'api.sandbox.paypal.com',
                      //   port: null,
                      //   path: '/v1/oauth2/token',
                      //   headers: {
                      //     accept: 'application/json',
                      //     'accept-language': 'en_US',
                      //     'content-type': 'application/x-www-form-urlencoded',
                      //     authorization:
                      //       'basic ' +
                      //       base64.encode(sPayPalClientID + ':' + sClientSecret),
                      //   },
                      // };

                      // const rawResponse = fetch(
                      //   'https://api.sandbox.paypal.com/v1/oauth2/token',
                      //   {
                      //     method: 'POST',
                      //     headers: {
                      //       'accept': 'application/json',
                      //       'accept-language': 'en_US',
                      //       'content-type': 'application/x-www-form-urlencoded',
                      //       authorization:
                      //         'basic ' +
                      //         base64.encode(sPayPalClientID + ':' + sClientSecret),
                      //     },
                      //     body: JSON.stringify({grant_type: 'client_credentials'}),
                      //   },
                      // )
                      //   .then((res) => res.json())
                      //   .then((res) => console.log(res));
                      // const content = rawResponse.json();

                      // console.log(content);

                      //axios.post();

                      // var req = http.request(options, function (res) {
                      //   var chunks = [];

                      //   res.on('data', function (chunk) {
                      //     chunks.push(chunk);
                      //   });

                      //   res.on('end', function () {
                      //     var body = Buffer.concat(chunks);
                      //     console.log(body.toString());
                      //   });
                      // });

                      // req.write(qs.stringify({grant_type: 'client_credentials'}));
                      // req.end();

                      setbLoader(true);
                      setbRender(false);
                      {
                        /*Step 1: Get Access Token*/
                      }
                      var axios = require('axios');
                      var qs = require('qs');
                      var data = qs.stringify({
                        grant_type: 'client_credentials',
                      });
                      var stepOneConfig = {
                        baseURL: sPayPalBASEURL,
                        method: 'post',
                        url: '/v1/oauth2/token',
                        headers: {
                          accept: 'application/json',
                          'accept-language': 'en_US',
                          'content-type': 'application/x-www-form-urlencoded',
                          Authorization:
                            'Basic ' +
                            base64.encode(
                              sPayPalClientID + ':' + sClientSecret,
                            ),
                        },
                        data: data,
                      };

                      axios(stepOneConfig)
                        .then(function (response) {
                          setsAccessToken(response.data.access_token);
                          // setsAccessToken = response.data.access_token;
                          console.log(sAccessToken);
                          {
                            /*Step 2: Create Order*/
                          }
                          // var dataDetail = JSON.stringify({
                          //   intent: 'sale',
                          //   payer: {
                          //     payment_method: 'paypal',
                          //   },
                          //   transactions: [
                          //     {
                          //       amount: {
                          //         total: nGrandTotal.toString(),
                          //         currency: 'USD',
                          //         // "details": {
                          //         // "subtotal": "30.00",
                          //         // "tax": "0.07",
                          //         // "shipping": "0.03",
                          //         // "handling_fee": "1.00",
                          //         // "shipping_discount": "-1.00",
                          //         // "insurance": "0.01"
                          //         // }
                          //       },
                          //       description: 'CTA Chatrel',
                          //       // "custom": "EBAY_EMS_90048630024435",
                          //       // "invoice_number": "48787589672",
                          //       payment_options: {
                          //         allowed_payment_method:
                          //           'INSTANT_FUNDING_SOURCE',
                          //       },
                          //       // "soft_descriptor": "ECHI5786786",
                          //       // "item_list": {
                          //       // "items": [
                          //       // {
                          //       // "name": "hat",
                          //       // "description": "Brown hat.",
                          //       // "quantity": "5",
                          //       // "price": "3",
                          //       // "tax": "0.01",
                          //       // "sku": "1",
                          //       // "currency": "USD"
                          //       // },
                          //       // {
                          //       // "name": "handbag",
                          //       // "description": "Black handbag.",
                          //       // "quantity": "1",
                          //       // "price": "15",
                          //       // "tax": "0.02",
                          //       // "sku": "product34",
                          //       // "currency": "USD"
                          //       // }
                          //       //],
                          //       // "shipping_address": {
                          //       // "recipient_name":sName,
                          //       // "line1": "4th Floor",
                          //       // "line2": "Unit #34",
                          //       // "city": "San Jose",
                          //       // "country_code": "US",
                          //       // "postal_code": "95131",
                          //       // "phone": "011862212345678",
                          //       // "state": "CA"
                          //       // }
                          //       // }
                          //     },
                          //   ],
                          //   note_to_payer:
                          //     'Contact us for any questions on your Chatrel.',
                          //   redirect_urls: {
                          //     return_url:
                          //       'https://chatrel-webapp.azurewebsites.net/Success',
                          //     cancel_url:
                          //       'https://chatrel-webapp.azurewebsites.net/Failure',
                          //   },
                          // });

                          var dataDetail = {
                            intent: 'CAPTURE',
                            purchase_units: [
                              {
                                reference_id: 'PUHF',
                                amount: {
                                  currency_code: 'USD',
                                  value: nGrandTotal.toString(),
                                },
                              },
                            ],
                            application_context: {
                              return_url: sSuccessPayPalWebPageURL,
                              cancel_url: sFailurePayPalWebPageURL,
                            },
                          };

                          var stepTwoConfig = {
                            baseURL: sPayPalBASEURL,
                            method: 'post',
                            url: '/v2/checkout/orders',
                            headers: {
                              Authorization:
                                'Bearer ' + response.data.access_token,
                              Accept: 'application/json',
                              'accept-language': 'en_US',
                              'Content-Type': 'application/json',
                            },
                            data: dataDetail,
                          };
                          axios(stepTwoConfig)
                            .then(function (response) {
                              console.log(JSON.stringify(response.data));
                              setpaymentID(response.data.id);
                              pingPong();
                              // paymentID = response.data.id;
                              const aLinks = response.data.links;
                              let myApprovalLink = aLinks.find(
                                (link) => link.rel === 'approve',
                              );
                              setapprovalUrl(myApprovalLink.href);
                              // navigation.navigate('MyWebView', {
                              //   approvalUrl: myApprovalHref,
                              //   payerId: paymentID,
                              // });
                              // navigation.navigate('MyWebView', {
                              //   screen: 'MyWebView',
                              //   params: {
                              //     approvalUrl: myApprovalHref,
                              //     paymentID: paymentID,
                              //     sAccessToken: sAccessToken,
                              //   },
                              // });
                              //setbLoader(false);
                              setbLoader(false);
                              setbRender(true);
                              {
                                /*Step 3: Web View*/
                              }
                              setbPaymentModal(true);
                            })
                            .catch(function (error) {
                              setbLoader(false);
                              setbRender(true);
                              Alert.alert(
                                'Attention Required',
                                'Cannot Connect to PayPal, Please try again later.',
                                [
                                  {
                                    text: 'Ok',
                                    onPress: () => true,
                                    style: 'cancel',
                                  },
                                ],
                              );
                              console.log(error);
                            });
                        })
                        .catch(function (error) {
                          setbLoader(false);
                          setbRender(true);
                          Alert.alert(
                            'Attention Required',
                            'Cannot Connect to PayPal, Please try again later.',
                            [
                              {
                                text: 'Ok',
                                onPress: () => true,
                                style: 'cancel',
                              },
                            ],
                            {cancelable: false},
                          );
                          console.log(error);
                        });
                      // // Linking.openURL('https://5f99d5ac2fc8.ngrok.io/PaypalTest');
                      // RNPaypal.paymentRequest({
                      //   clientId: sPayPalClientID,
                      //   environment: RNPaypal.ENVIRONMENT.NO_NETWORK,
                      //   intent: RNPaypal.INTENT.ORDER,
                      //   price: nGrandTotal,
                      //   currency: 'USD',
                      //   description: `GRAND TOTAL`,
                      //   acceptCreditCards: true,
                      // })
                      //   .then((response) => {
                      //     //setbLoader(true);
                      //     //alert(response);
                      //     console.log(response);
                      //     //TODO: OUR CALLS
                      //     //handleSubmitAfterPayPal(response);
                      //   })
                      //   .catch((err) => {
                      //     console.log(err);
                      //     if (err == RNPaypal.USER_CANCELLED) {
                      //       // User didn't complete the payment
                      //       console.info('User cancelled');
                      //     } else if (err == RNPaypal.INVALID_CONFIG) {
                      //       console.info('Invalid Details Sent to PayPal');
                      //     }
                      //   });
                    },
                  }}
                />
              </View>
              {/* <View style={styles.paypalButtonContainer}>
            <Button
              title="MAKE PAYMENT"
              titleStyle={{
                fontFamily: sFontName,
              }}
              type={'solid'}
              onPress={() => {
                RNPaypal.paymentRequest({
                  clientId: sPayPalClientID,
                  environment: RNPaypal.ENVIRONMENT.NO_NETWORK,
                  intent: RNPaypal.INTENT.SALE,
                  price: nGrandTotal,
                  currency: 'USD',
                  description: `CTA Chatrel`,
                  acceptCreditCards: true,
                })
                  .then((response) => {
                    //alert(response);
                    //console.log(response);
                    //TODO: OUR CALLS
                    handleSubmitAfterPayPal(response);
                  })
                  .catch((err) => {
                    console.log(err);
                    if (err == RNPaypal.USER_CANCELLED) {
                      // User didn't complete the payment
                      console.info('User cancelled');
                    } else if (err == RNPaypal.INVALID_CONFIG) {
                      console.info('Invalid Details Sent to PayPal');
                    }
                  });
              }}
              buttonStyle={styles.paypalButtonComponent}
            />
          </View> */}
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
    //margin: 15
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
  // chatrelTextComponent: {
  //   marginTop: 15,
  //   textAlign: 'left',
  //   fontSize: 24,
  //   fontStyle: 'normal',
  //   color: Colors.ChatrelInfoBlue,
  //   marginBottom: 10,
  //   fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
  //   fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  // },
  chatrelYearComponent: {
    // marginBottom: 15,
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
    // marginBottom: 10,
  },
  employementStatusContainerForInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10,
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
    //fontSize: 28,
    // fontWeight: 'bold',
    // fontStyle: 'normal',
    //color: Colors.ChatrelYearGreen,
  },
  grandTotalContainer: {
    //marginBottom: 10,
    //width:"",
    //height: hp(7.5),
  },
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
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
  },
  valueComponent: {
    // width: '100%',
    // height: '100%',
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
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
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
    // backgroundColor:Colors.white,
    alignSelf: 'center',
    position: 'absolute',
    top: -55,
    // left:20,
    //Border Stuff
    borderRadius: 10,
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS

    //For Android
    elevation: 15,
    // overflow: 'visible',
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
    //lessen from 5 to 3.5
    lineHeight: hp(3.5),
  },
  viewMarginComponent: {
    //width: wp(70),
    //height: hp(33),
    marginBottom: hp(2.5),
  },
});
