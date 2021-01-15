import React, {useEffect, useRef, useState} from 'react';
import {
  Switch,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import {Picker, PickerIOS} from '@react-native-picker/picker';
import IOSPicker from 'react-native-ios-picker';
// import DropDownPicker from 'react-native-dropdown-picker';
// import Icon from 'react-native-vector-icons/Feather';
// import ModalDropdown from 'react-native-modal-dropdown';

import {useSelector} from 'react-redux';
import {Input, Button, Card} from 'react-native-elements';
import axios from 'axios';
import Moment from 'moment';
import Colors from '../constants/Colors';
import RNPaypal from 'react-native-paypal-lib';
// import { requestOneTimePayment, requestBillingAgreement } from 'react-native-paypal';
import {sPayPalClientID} from '../constants/CommonConfig';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Chatrel = (props) => {
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
  const [paymentData, setPaymentData] = React.useState();
  const [donationData, setDonationData] = React.useState();
  const [receiptNumber, setReceiptNumber] = React.useState('');
  const [shouldRun, setShouldRun] = React.useState(true);
  const [outstanding, setOutstanding] = React.useState(true);
  const [dollarToRupees, setDollarToRupees] = React.useState(0.0);
  const [nSelectedAuthRegion, setnSelectedAuthregion] = React.useState();
  const [donationNull, setDonationNull] = React.useState(false);
  const [gbChatrelsNull, setGBChatrelsNull] = React.useState(false);

  const pickerRef = useRef();

  ////PAID BY
  const oGBDetails = useSelector((state) => state.GBDetailsReducer.oGBDetails);
  const nUserId = parseInt(oGBDetails.sGBID);
  ////FOR WHOM THE PERSON IS PAYING
  const oCurrentGBDetails = useSelector(
    (state) => state.CurrentGBDetailsReducer.oCurrentGBDetails,
  );

  const modify = (value, index) => {
    console.log(value);
    console.log(id);
    debugger;
    let oPayment = [...aGBChatrels];
    //let index;
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

  const toggleSwitch = (index, year) => {
    let oPayment = [...aGBChatrels];
    if (year.nCurrentChatrelSalaryAmt === 0) {
      oPayment[index].nCurrentChatrelSalaryAmt = oPayment[index].nSalaryUSD;
    } else {
      oPayment[index].nCurrentChatrelSalaryAmt = 0;
    }
    setaGBChatrels(oPayment);
    calculateMethod(index);
  };

  const runOnce = () => {
    //Co-ordinate with aayush
    if (aGBChatrels && dollarToRupees && shouldRun) {
      const len = aGBChatrels.length;
      for (var i = 0; i < len; i++) {
        calculateMethod(i);
      }
      setShouldRun(false);
    }
  };

  const updateAuthRegionIOS = (e, value) => {
    //debugger;
    console.log(e);
    console.log(value);
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
      oPayment[index].nChatrelAmount +
      oPayment[index].nChatrelMeal +
      oPayment[index].nChatrelLateFeesValue +
      oPayment[index].nCurrentChatrelSalaryAmt *
        (dollarToRupees && oPayment[index].sCurrencyCode === 'INR'
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
      temptotal += row.nChatrelTotalAmount;
    });
    setnGrandTotal(temptotal);
  };

  const handlSubmit = async (paypalObj) => {
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
      (payObj[lastindex].nChatrelTotalAmount +
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
      payObj = null;
    }

    if (donationNull) {
    }

    let finalObj = {
      chatrelPayment: tempSummaryObj,
      gbChatrels: payObj,
      gbChatrelDonation: donationObj,
    };

    console.log('Final Obj:', finalObj);

    // RNPaypal.paymentRequest({
    //   clientId: sPayPalClientID,
    //   environment: RNPaypal.ENVIRONMENT.NO_NETWORK,
    //   intent: RNPaypal.INTENT.SALE,
    //   price: 106.23,
    //   currency: 'ILS',
    //   description: `Android Testing`,
    //   acceptCreditCards: true,
    // })
    //   .then((response) => {
    //     alert(response);
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     if (err == RNPaypal.USER_CANCELLED) {
    //       // User didn't complete the payment
    //       alert('User cancelled');
    //     } else if (err == RNPaypal.INVALID_CONFIG) {
    //       alert('Invalid Details Sent to PayPal');
    //     }
    //   });

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
    calcTotal(aGBChatrels, nAdditionalDonation, nBusinessDonation);
  });

  useEffect(() => {
    getChatrelDetails();
  }, []);

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
                //console.log(resp.data);
                setnChatrelLateFeesPercentage(
                  resp.data.chatrelPayment.nChatrelLateFeesPercentage,
                );
                setaGBChatrels(resp.data.gbChatrels);
                setsName(resp.data.sName);
                setnPaidUntil(resp.data.nPaidUntil);
                setsGBID(resp.data.chatrelPayment.sGBId);
                setDataAPI(resp.data);
                setSummaryData(resp.data.chatrelPayment);
                setnSelectedAuthregion(
                  lAuthRegions.find((x) => x.id === resp.data.nAuthRegionID),
                );
                setbRender(true);
                fetch('https://api.ratesapi.io/api/latest?base=INR&symbols=USD')
                  .then((response) => response.json())
                  .then((data) => {
                    //console.log("currency", data.rates.USD);
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

  let controller;

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

  console.log(props);
  return (
    <>
      {bRender && aGBChatrels && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainContainer}>
          <View>
            <Text style={styles.headerComponent}>PERSONAL INFORMATION</Text>
          </View>
          <View>
            <Text style={styles.textComponent}>GREEN BOOK ID</Text>
          </View>
          <View>
            <Text style={styles.textComponentAPI}>{sGBID}</Text>
          </View>
          <View>
            <Text style={styles.textComponent}>DATE OF BIRTH</Text>
          </View>
          <View>
            <Text style={styles.textComponentAPI}>{oGBDetails.dtDOB}</Text>
          </View>
          <View>
            <Text style={styles.textComponent}>NAME</Text>
          </View>
          <View>
            <Text style={styles.textComponentAPI}>{sName}</Text>
          </View>
          <View>
            <Text style={styles.textComponent}>YEAR OF LAST CHATREL</Text>
          </View>
          <View>
            <Text style={styles.textComponentAPI}>
              {Moment(nPaidUntil).year()}
            </Text>
          </View>
          <View>
            <Text style={styles.textComponent}>CHATREL OF YEARS DUE</Text>
          </View>
          <View>
            <Text style={styles.textComponentAPI}>
              {Moment().diff(nPaidUntil, 'years')} Years
            </Text>
          </View>
          <View>
            <Text style={styles.chatrelTextComponent}>Chatrel Information</Text>
          </View>
          {aGBChatrels.map((year, index) => {
            return (
              <Card
                key={year.nChatrelYear}
                containerStyle={{
                  width: wp(82.5),
                  borderRadius: 15,
                  borderColor: Colors.white,
                  backgroundColor: Colors.white,
                }}>
                <View style={styles.yearContainer}>
                  <View>
                    <Text style={styles.chatrelYearComponent}>
                      {year.nChatrelYear}
                    </Text>
                  </View>
                  {year.sAuthRegionCurrency === 'USD' && (
                    <View style={styles.employementStatusContainer}>
                      <Text style={styles.textComponentAPI}>
                        Employment Status:{' '}
                        {year.nCurrentChatrelSalaryAmt === 0
                          ? 'Not Employed'
                          : 'Employed'}
                      </Text>
                      <Switch
                        key={year.nChatrelYear}
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={
                          year.nCurrentChatrelSalaryAmt === 0
                            ? '#f4f3f4'
                            : '#f5dd4b'
                        }
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => {
                          modify(value, index);
                        }}
                        value={year.nCurrentChatrelSalaryAmt !== 0}
                        disabled={year.isChild}
                      />
                    </View>
                  )}
                  {year.sAuthRegionCurrency === 'INR' && (
                    <View style={styles.employementStatusContainer}>
                      <Text style={styles.textComponentAPI}>
                        Employment Status:{' '}
                        {year.nCurrentChatrelSalaryAmt === 0
                          ? 'Not Employed'
                          : 'Employed'}
                      </Text>
                      {/* <Switch
                        key={year.nChatrelYear}
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={
                          year.nCurrentChatrelSalaryAmt === 0 ? '#f4f3f4' : '#f5dd4b'
                        }
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => {
                          toggleSwitch(index, year);
                        }}
                        value={year.nCurrentChatrelSalaryAmt !== 0}
                        disabled={year.isChild}
                      /> */}
                      <Input
                        // label="Business Donation"
                        //placeholder="Business Donation"
                        autoCorrect={false}
                        clearButtonMode={'while-editing'}
                        keyboardType={'number-pad'}
                        keyboardAppearance={'default'}
                        disableFullscreenUI={false}
                        onChangeText={(value) => {
                          //console.log(value);
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
                  )}
                  <View style={styles.authorityRegionContainer}>
                    <Text style={styles.textComponent}>AUTHORITY REGION</Text>

                    {Platform.OS === 'android' && (
                      <Picker
                        collapsable={true}
                        mode={'dropdown'}
                        prompt={'Authority Region'}
                        key={index}
                        itemStyle={{height: 50, width: 50}}
                        selectedValue={lAuthRegions.find(
                          (x) => x.id === aGBChatrels[index].nAuthRegionID,
                        )}
                        style={styles.pickerComponent}
                        onValueChange={(itemValue, itemIndex) =>
                          updateAuthRegion(index, itemValue)
                        }>
                        {/*<Picker.Item label="Java" value="java" />
                                            <Picker.Item label="JavaScript" value="js" />*/}
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
                        itemStyle={{height: 50, width: 50}}
                        selectedValue={
                          lAuthRegions.find(
                            (x) => x.id === aGBChatrels[index].nAuthRegionID,
                          ).sAuthRegion
                        }
                        style={styles.pickerComponent}
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
                    <Text style={styles.textComponent}>
                      Currency Code:{' '}
                      <Text style={styles.textComponentAPI}>
                        {year.sAuthRegionCurrency}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.textComponent}>
                      Basic:{' '}
                      <Text style={styles.textComponentAPI}>
                        {year.nChatrelAmount}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.textComponent}>
                      Meal:{' '}
                      <Text style={styles.textComponentAPI}>
                        {year.nChatrelMeal}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    {year.lateFees !== 0 && (
                      <Text style={styles.textComponent}>
                        Late Fees:{' '}
                        <Text style={styles.textComponentAPI}>
                          {year.nChatrelLateFeesValue.toFixed(2)}
                        </Text>
                      </Text>
                    )}
                  </View>
                  <View>
                    <Text style={styles.textComponent}>
                      Total:{' '}
                      <Text style={styles.textComponentAPI}>
                        {year.nChatrelTotalAmount}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.textComponent}>
                      Conversion Rate &#8377;/$ :{' '}
                      {dollarToRupees && year.sAuthRegionCurrency === 'INR'
                        ? dollarToRupees.toFixed(4)
                        : 'NA'}
                    </Text>
                  </View>
                </View>
              </Card>
            );
          })}
          <View style={styles.additionalDonationContainer}>
            <Input
              // label="Additional Donation"
              placeholder="Additional Donation"
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
          <View style={styles.businessDonationContainer}>
            <Input
              // label="Business Donation"
              placeholder="Business Donation"
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
                  calcTotal(aGBChatrels, nAdditionalDonation, parseInt(value));
                  setnBusinessDonation(parseInt(value));
                }
              }}
              value={nBusinessDonation}
            />
          </View>
          <View style={styles.grandTotalCotainer}>
            <Text>{nGrandTotal.toFixed(2)}</Text>
          </View>
          <View style={styles.paypalButtonContainer}>
            <Button
              title="MAKE PAYMENT"
              type={'solid'}
              onPress={() => {
                handlSubmit();
              }}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    //margin: 15
  },
  headerComponent: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    marginBottom: 10,
    color: Colors.blackText,
  },
  textComponent: {
    fontSize: 10.5,
    textAlign: 'left',
    marginBottom: 15,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
  },
  textComponentAPI: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
  },
  chatrelTextComponent: {
    marginTop: 25,
    textAlign: 'left',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.ChatrelInfoBlue,
    marginBottom: 10,
  },
  chatrelYearComponent: {
    marginBottom: 15,
    fontSize: 28,
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'left',
    color: Colors.ChatrelYearGreen,
  },
  employementStatusContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  employementStatusComponent: {},
  authorityRegionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  authorityRegionComponent: {},
  pickerComponent: {
    height: 50,
    width: 200,
  },
  yearContainer: {
    marginBottom: 5,
  },
  additionalDonationContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  additionalDonationComponent: {},
  businessDonationContainer: {
    marginBottom: 5,
  },
  businessDonationComponent: {},
  grandTotalComponent: {},
  grandTotalCotainer: {
    marginBottom: 10,
  },
  paypalButtonContainer: {
    marginVertical: 10,
  },
  paypalButtonComponent: {},
});
