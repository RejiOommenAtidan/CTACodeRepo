import React, { useEffect, useRef, useState } from 'react';
import {
  Switch,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Linking
} from 'react-native';
import { Picker, PickerIOS } from '@react-native-picker/picker';
import IOSPicker from 'react-native-ios-picker';
import { sFontName, sFontNameBold } from '../constants/CommonConfig';
import { useIsFocused } from '@react-navigation/native';
import { Loader } from '../components/Loader';
// import DropDownPicker from 'react-native-dropdown-picker';
// import Icon from 'react-native-vector-icons/Feather';
// import ModalDropdown from 'react-native-modal-dropdown';

import { useSelector } from 'react-redux';
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
import RNPaypal from 'react-native-paypal-lib';
import {
  sPayPalClientID,
  oActivityIndicatorStyle,
} from '../constants/CommonConfig';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Chatrel = (props) => {
  const isFocused = useIsFocused();
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

  ////PAID BY
  const oGBDetails = useSelector((state) => state.GBDetailsReducer.oGBDetails);
  const nUserId = parseInt(oGBDetails.sGBID);
  ////FOR WHOM THE PERSON IS PAYING
  const oCurrentGBDetails = useSelector(
    (state) => state.CurrentGBDetailsReducer.oCurrentGBDetails,
  );

  const modify = (value, index) => {
    let oPayment = [...aGBChatrels];
    if (typeof value === 'string') {
      oPayment[index].nCurrentChatrelSalaryAmt = parseFloat(value)
        ? parseFloat(value)
        : 0;
    } else {
      if (oPayment[index].nCurrentChatrelSalaryAmt === 0) {
        oPayment[index].nCurrentChatrelSalaryAmt = oPayment[index].nSalaryUSD;
        //setPaymentData(payObj);
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
      if (!outstanding) {
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
      } else {
        //console.log('we have outstanding');
        const len = aGBChatrels.length;
        for (var i = 0; i < len; i++) {
          calculateMethod(i);
        }
      }
      setShouldRun(false);
    }
  };

  const updateAuthRegionIOS = (e, value) => {
    const index = e;
    let chatrelObj = [...aGBChatrels];

    let value1 = lAuthRegions.find((x) => x.id === parseInt(value));

    //var a  = document.getElementById(e);
    //console.info(pickerRef);

    // pickerRef.current.props.selectedValue = value;

    chatrelObj[index].nAuthRegionID = value1.id;
    chatrelObj[index].sCountryID = value1.sCountryID;
    chatrelObj[index].sAuthRegionCurrency = value1.sCurrencyCode;
    chatrelObj[index].nChatrelAmount =
      value1.sCurrencyCode === 'INR'
        ? chatrelObj[index].nChatrelINR
        : chatrelObj[index].nChatrelUSD;
    chatrelObj[index].nChatrelMeal =
      value1.sCurrencyCode === 'INR'
        ? chatrelObj[index].nChatrelMealINR
        : chatrelObj[index].nChatrelMealUSD;

    chatrelObj[index].nCurrentChatrelSalaryAmt = 0;
    setaGBChatrels(chatrelObj);
    calculateMethod(index);
  };

  const updateAuthRegion = (e, value) => {
    debugger;
    console.log(e);
    console.log(value);
    const index = e;
    let chatrelObj = [...aGBChatrels];

    // let value1  = lAuthRegions.find((x) => x.id === value)

    //var a  = document.getElementById(e);
    //console.info(pickerRef);

    // pickerRef.current.props.selectedValue = value;

    chatrelObj[index].nAuthRegionID = value.id;
    chatrelObj[index].sCountryID = value.sCountryID;
    chatrelObj[index].sAuthRegionCurrency = value.sCurrencyCode;
    chatrelObj[index].nChatrelAmount =
      value.sCurrencyCode === 'INR'
        ? chatrelObj[index].nChatrelINR
        : chatrelObj[index].nChatrelUSD;
    chatrelObj[index].nChatrelMeal =
      value.sCurrencyCode === 'INR'
        ? chatrelObj[index].nChatrelMealINR
        : chatrelObj[index].nChatrelMealUSD;

    chatrelObj[index].nCurrentChatrelSalaryAmt = 0;
    //for setting extra in mobile app
    //setnSelectedAuthregion(value);
    setaGBChatrels(chatrelObj);
    calculateMethod(index);
  };

  const calculateMethod = (index) => {
    debugger;
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

  const handlSubmitAfterPayPal = async (paypalObj) => {
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
    tempSummaryObj.sPayPal_Status = paypalObj.response.state;
    tempSummaryObj.sPayPal_ID = paypalObj.response.id;
    tempSummaryObj.sPayPal_Currency_Code = 'USD';
    tempSummaryObj.sPayPal_Currency_Value = nGrandTotal.toString();
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

    axios
      .post(`/ChatrelPayment/AddNewChatrelPayment`, finalObj)
      .then((resp) => {
        if (resp.status === 200) {
          setbLoader(false);
          //alert(resp.data);
          console.log(resp.data);


          // setBackdrop(false);
          // setAlertMessage('Chatrel recorded successfully.');
          // setAlertType('success');
          // snackbarOpen();
          // setReceiptData(resp.data);

          // setPaymentDiv(false);
          // setSuccessDiv(true);
          /* history.goBack();
      console.log(resp.data); */
        }
      })
      .catch((error) => {
        console.log(error.config);
        console.log(error.message);
        console.log(error.response);
        setbLoader(false);
        alert("Something went wrong, please try again later");
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
      console.log('Chatrel Component Called');
      setbRender(false);
      setbLoader(true);
      getChatrelDetails();
    }
  }, [isFocused]);

  const getChatrelDetails = () => {
    axios
      .get(`/AuthRegion/GetAuthRegions`)
      .then((resp) => {
        if (resp.status === 200) {
          //console.log(resp.data);
          // resp.data.forEach(x=>x.label=x.sAuthRegion);
          setlAuthRegions(resp.data);

          axios
            .get(
              `/ChatrelPayment/DisplayChatrelPayment/?sGBID=` +
              oCurrentGBDetails.sGBID,
            )
            .then((resp) => {
              if (resp.status === 200) {
                console.log(resp.data);
                if (resp.data.chatrelPayment.nChatrelTotalAmount === 0) {
                  setOutstanding(false);
                }
                setnChatrelLateFeesPercentage(
                  resp.data.chatrelPayment.nChatrelLateFeesPercentage,
                );
                setaGBChatrels(resp.data.gbChatrels);
                setsName(resp.data.sName);
                setnPaidUntil(resp.data.nPaidUntil);
                setsGBID(resp.data.chatrelPayment.sGBId);
                setDataAPI(resp.data);
                setSummaryData(resp.data.chatrelPayment);
                setDonationData(resp.data.gbChatrelDonation);
                setnSelectedAuthregion(
                  lAuthRegions.find((x) => x.id === resp.data.nAuthRegionID),
                );
                calcTotal(
                  resp.data.gbChatrels,
                  nAdditionalDonation,
                  nBusinessDonation,
                );
                setbLoader(false);
                setbRender(true);
                fetch('https://api.ratesapi.io/api/latest?base=INR&symbols=USD')
                  .then((response) => response.json())
                  .then((data) => {
                    console.log('currency', data.rates.USD);
                    setDollarToRupees(data.rates.USD);
                  });
              }
            })
            .catch((error) => {
              console.log(error.message);
              console.log(error.config);
            });
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.config);
      });
  };

  useEffect(() => {
    runOnce();
  }, [dollarToRupees]);

  useEffect(() => {
    lAuthRegions &&
      dataAPI &&
      setnSelectedAuthregion(
        lAuthRegions.find((x) => x.id === dataAPI.nAuthRegionID),
      );
  }, [lAuthRegions, dataAPI]);

  if (!bRender) {
    return (
      <>
        <Loader
          loading={bLoader} />
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
                  <Text style={{ ...styles.valueComponent, textAlign: 'right' }}>
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
                  value={<Text style={styles.labelComponent}>PAID UNTIL</Text>}
                />
                <View style={styles.valueContainer}>
                  <Text style={{ ...styles.valueComponent, marginBottom: 0 }}>
                    {Moment(nPaidUntil).year()}
                  </Text>
                </View>
              </View>
              <View style={styles.labelContainer}>
                <Badge
                  containerStyle={styles.badgeContainerStyle}
                  badgeStyle={styles.badgeStyle}
                  value={<Text style={styles.labelComponent}>PAYING FOR</Text>}
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
                    shadowOffset: { width: 5, height: 5 },
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
                            //enabled={outstanding}
                            collapsable={true}
                            mode={'dialog'}
                            prompt={'AUTHORITY REGION'}
                            key={index}
                            // itemStyle={{
                            //   //height: 50,
                            //   width: 20,
                            // }}
                            //
                            //doesn't work for android
                            //style={{ height: 75, width: 500 }}
                            selectedValue={lAuthRegions.find(
                              (x) => x.id === aGBChatrels[index].nAuthRegionID,
                            )}
                            style={styles.pickerComponent}
                            onValueChange={(itemValue, itemIndex) =>
                              updateAuthRegion(index, itemValue)
                            }>
                            {lAuthRegions.map((singleAuthregion, key) => (
                              <Picker.Item
                                label={singleAuthregion.sAuthRegion}
                                value={singleAuthregion}
                                key={singleAuthregion.id}
                              />
                            ))}
                          </Picker>
                        )}

                        {Platform.OS === 'ios' && (
                          <IOSPicker
                            //data={lAuthRegions}
                            mode={'modal'} //collapse
                            //key={index}
                            // itemStyle={{
                            //   height: 50,
                            //   width: 50,
                            //   fontFamily: sFontName,
                            // }}
                            selectedValue={
                              lAuthRegions.find(
                                (x) =>
                                  x.id === aGBChatrels[index].nAuthRegionID,
                              ).sAuthRegion
                            }
                            itemStyle={{
                              borderColor: Colors.black,
                              borderWidth: 1,
                              borderRadius: 15,
                              borderStyle: 'solid',
                            }}
                            style={styles.pickerComponentIOS}
                            onValueChange={(itemValue, itemIndex) =>
                              updateAuthRegionIOS(index, itemValue)
                            }>
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
                            style={styles.employementStatusContainerForInput}>
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
                                clearButtonMode={'while-editing'}
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
                                  true: Colors.buttonYellow,
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
                                value={year.nCurrentChatrelSalaryAmt !== 0}
                                disabled={year.isChild}
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
          <View>
            <Text style={styles.headerComponent}>ADDITIONAL CHATREL</Text>
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
            }}>
            <View style={styles.businessDonationContainer}>
              <Badge
                containerStyle={styles.badgeContainerStyle}
                badgeStyle={{
                  ...styles.badgeStyle,
                  alignSelf: 'flex-end',
                  // height:hp(),
                  width: wp(45),
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
                keyboardType={'number-pad'}
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
                      parseInt(value),
                    );
                    setnBusinessDonation(parseInt(value));
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
                  width: wp(45),
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
                keyboardType={'number-pad'}
                keyboardAppearance={'default'}
                disableFullscreenUI={true}
                onChangeText={(value) => {
                  if (value === '') {
                    calcTotal(aGBChatrels, 0, nBusinessDonation);
                    setnAdditionalDonation(0);
                  } else {
                    calcTotal(aGBChatrels, parseInt(value), nBusinessDonation);
                    setnAdditionalDonation(parseInt(value));
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
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 1,

                //For Android
                elevation: 15,
                overflow: 'visible',
              }}
              price={'$ ' + parseFloat(nGrandTotal.toFixed(2))}
              button={{
                title: 'PAY NOW',
                titleStyle: {
                  fontStyle: 'normal',
                  color: Colors.white,
                  fontSize: wp(4),
                  fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                  fontFamily:
                    Platform.OS === 'android' ? sFontNameBold : sFontName,
                },
                buttonStyle: styles.paypalButtonComponent,
                onPress: () => {
                  // Linking.openURL('https://5f99d5ac2fc8.ngrok.io/PaypalTest');
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
                  //     setbLoader(true);
                  //     //alert(response);
                  //     console.log(response);
                  //     //TODO: OUR CALLS
                  //     handlSubmitAfterPayPal(response);
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
                    handlSubmitAfterPayPal(response);
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
    fontSize: wp(5),
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
  chatrelTextComponent: {
    marginTop: 15,
    textAlign: 'left',
    fontSize: 24,
    fontStyle: 'normal',
    color: Colors.ChatrelInfoBlue,
    marginBottom: 10,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.buttonYellow,
    color: Colors.buttonYellow,
  },
  badgeContainerStyle: {
    marginBottom: hp(1.25),
  },
  badgeStyle: {
    alignSelf: 'flex-start',
    textAlignVertical: 'center',
    width: wp(29),
    height: hp(3.5),
    backgroundColor: Colors.websiteLightBlueColor,
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
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: wp(3),
    fontStyle: 'normal',
    color: Colors.white,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
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
    width: wp(20),
    height: hp(2.75),
    backgroundColor: Colors.ChatrelYearGreen,
  },
  labelComponentChip: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: wp(3),
    fontStyle: 'normal',
    color: Colors.white,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
});
