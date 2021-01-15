import React, { useEffect, useState } from 'react';
import { Switch, Text, View, ScrollView, StyleSheet, Platform } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import { useSelector } from 'react-redux';
import { Input, Button, Card } from 'react-native-elements';
import axios from 'axios';
import Moment from 'moment';
import Colors from '../constants/Colors';
// import { sDateFormat } from '../constants/CommonConfig';
import RNPaypal from 'react-native-paypal-lib';
// import { requestOneTimePayment, requestBillingAgreement } from 'react-native-paypal';
import { sPayPalClientID } from '../constants/CommonConfig';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export const Chatrel = props => {
    const [sName, setsName] = useState("");
    const [nPaidUntil, setnPaidUntil] = useState(0);
    const [sGBID, setsGBID] = useState("");
    const [nChatrelLateFeesPercentage, setnChatrelLateFeesPercentage] = useState(0);
    const [aGBChatrels, setaGBChatrels] = useState([]);
    const [nGrandTotal, setnGrandTotal] = useState(0);
    const [nAdditionalDonation, setnAdditionalDonation] = useState(0);
    const [nBusinessDonation, setnBusinessDonation] = useState(0);
    const [lAuthRegions, setlAuthRegions] = React.useState(null);
    const [dataAPI, setDataAPI] = React.useState();
    const [summaryData, setSummaryData] = React.useState();
    const [shouldRun, setShouldRun] = React.useState(true);
    const [dollarToRupees, setDollarToRupees] = React.useState();
    const [nSelectedAuthRegion, setnSelectedAuthregion] = React.useState();

    const oGBDetails = useSelector(state => state.GBDetailsReducer.oGBDetails);
    const oCurrentGBDetails = useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails);

    const toggleSwitch = (index, year) => {
        let oPayment = [...aGBChatrels];
        if (year.nChatrelSalaryAmt === 0) {
            oPayment[index].nChatrelSalaryAmt = oPayment[index].nSalaryUSD;
        }
        else {
            oPayment[index].nChatrelSalaryAmt = 0;
        }
        setaGBChatrels(oPayment);
        calculateMethod(index);
    };

    const runOnce = () => {
        if (aGBChatrels && dollarToRupees && shouldRun) {
            const len = aGBChatrels.length;
            for (var i = 0; i < len; i++) {
                calculateMethod(i);
            }
            setShouldRun(false);
        }
    };

    const updateAuthRegion = (e, value) => {
        const index = e;
        let chartelObj = [...aGBChatrels];
        chartelObj[index].nAuthRegionID = value.id;
        chartelObj[index].sCountryID = value.sCountryID;
        chartelObj[index].sCurrencyCode = value.sCurrencyCode;
        chartelObj[index].nChatrelAmount = value.sCurrencyCode === 'INR' ? chartelObj[index].nChatrelINR : chartelObj[index].nChatrelUSD;
        chartelObj[index].nChatrelMeal = value.sCurrencyCode === 'INR' ? chartelObj[index].nChatrelMealINR : chartelObj[index].nChatrelMealUSD;

        setnSelectedAuthregion(value);
        setaGBChatrels(chartelObj);
        calculateMethod(index);
    };

    const calculateMethod = (index) => {
        let oPayment = [...aGBChatrels];
        let len = aGBChatrels.length;
        if (index != len - 1) {
            oPayment[index].lateFees =
                (oPayment[index].nChatrelAmount + oPayment[index].nChatrelMeal + oPayment[index].nChatrelSalaryAmt) / nChatrelLateFeesPercentage;
        }
        oPayment[index].nChatrelTotalAmount = oPayment[index].nChatrelAmount + oPayment[index].nChatrelMeal + oPayment[index].lateFees + oPayment[index].nChatrelSalaryAmt * ((dollarToRupees && oPayment[index].sCurrencyCode === 'INR') ? dollarToRupees.toFixed(4) : 1);
        setaGBChatrels(oPayment);
        calcTotal(oPayment, nAdditionalDonation, nBusinessDonation);
    };

    const calcTotal = (obj, aD, bD) => {
        let temptotal = aD + bD;
        obj.forEach((row) => {
            temptotal += row.nChatrelTotalAmount;
        })
        setnGrandTotal(temptotal);
    };

    const handlSubmit = async () => {
        // let tempSummaryObj = {};
        // let oPayment = [...aGBChatrels];
        // let lastindex = oPayment.length - 1;

        // tempSummaryObj.nArrearsAmount = nGrandTotal - (oPayment[lastindex].nChatrelDue + nBusinessDonation + nAdditionalDonation);
        // tempSummaryObj.nChatrelTotalAmount = nGrandTotal;
        // tempSummaryObj.nChatrelSalaryAmt = oPayment[lastindex].nChatrelSalaryAmt;
        // tempSummaryObj.nChatrelBusinessDonationAmt = nBusinessDonation;
        // tempSummaryObj.nChatrelAdditionalDonationAmt = nAdditionalDonation;
        // tempSummaryObj.sPaidByGBId = "1234567";

        // let finalObj = {
        //     "chatrelPayment": tempSummaryObj,
        //     "gbChatrels": aGBChatrels
        // }
        // console.log("Final Obj:", finalObj)

        RNPaypal.paymentRequest({
            clientId: sPayPalClientID,
            environment: RNPaypal.ENVIRONMENT.NO_NETWORK,
            intent: RNPaypal.INTENT.SALE,
            price: 106.23,
            currency: 'ILS',
            description: `Android Testing`,
            acceptCreditCards: true
        }).then(response => {
            alert(response);
            console.log(response);
        }).catch(err => {
            console.log(err);
            if (err == RNPaypal.USER_CANCELLED) {
                // User didn't complete the payment
                alert("User cancelled");
            } else if (err == RNPaypal.INVALID_CONFIG) {
                alert("Invalid Details Sent to PayPal");
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
        calcTotal(aGBChatrels, nAdditionalDonation, nBusinessDonation)
    });

    useEffect(() => {
        getChatrelDetails();
    }, []);

    const getChatrelDetails = () => {
        axios.get(`/AuthRegion/GetAuthRegions`)
            .then(resp => {
                if (resp.status === 200) {
                    setlAuthRegions(resp.data);
                    axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=` + oCurrentGBDetails.sGBID)
                        .then(resp => {
                            if (resp.status === 200) {
                                console.log(resp.data);
                                setnChatrelLateFeesPercentage(resp.data.chatrelPayment.nChatrelLateFeesPercentage);
                                setaGBChatrels(resp.data.gbChatrels);
                                setsName(resp.data.sName);
                                setnPaidUntil(resp.data.nPaidUntil);
                                setsGBID(resp.data.chatrelPayment.sGBId);
                                setDataAPI(resp.data);
                                setSummaryData(resp.data.chatrelPayment);
                                // setnSelectedAuthregion(resp.data.chatrelPayment.nAuthRegionID);
                                setnSelectedAuthregion(
                                    lAuthRegions.find((x) => x.id === resp.data.chatrelPayment.nAuthRegionID)
                                );
                                fetch('https://api.ratesapi.io/api/latest?base=INR&symbols=USD')
                                    .then(response => response.json())
                                    .then(data => {
                                        //console.log("currency", data.rates.USD);
                                        setDollarToRupees(data.rates.USD);
                                    });
                            }
                        })
                        .catch(error => {
                            console.log(error.message);
                            console.log(error.config);
                        });
                }
            }).catch(error => {
                console.log(error.message);
                console.log(error.config);
            });
    };

    useEffect(() => {
        runOnce();
    }, [dollarToRupees]);

    useEffect(() => {
        (lAuthRegions && summaryData &&
            setnSelectedAuthregion(lAuthRegions.find((x) => x.id === summaryData.nAuthRegionID)));
    }, [lAuthRegions, summaryData]);

    return (
        <>
            {aGBChatrels &&
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
                        <Text style={styles.textComponentAPI}>{Moment(nPaidUntil).year()}</Text>
                    </View>
                    <View>
                        <Text style={styles.textComponent}>CHATREL OF YEARS DUE</Text>
                    </View>
                    <View>
                        <Text style={styles.textComponentAPI}>{Moment().diff(nPaidUntil, 'years')} Years</Text>
                    </View>
                    <View>
                        <Text style={styles.chatrelTextComponent}>Chatrel Information</Text>
                    </View>
                    {aGBChatrels.map((year, index) => {
                        return (
                            <Card key={year.nChatrelYear}>
                                <View style={styles.yearContainer}>
                                <View>
                                    <Text style={styles.chatrelYearComponent}>{year.nChatrelYear}</Text>
                                </View>
                                <View style={styles.employementStatusContainer}>
                                    <Text style={styles.textComponentAPI}>Employment Status: {year.nChatrelSalaryAmt === 0 ? "Not Employed" : "Employed"}</Text>
                                    <Switch
                                        key={year.nChatrelYear}
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={year.nChatrelSalaryAmt === 0 ? "#f4f3f4" : "#f5dd4b"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => { toggleSwitch(index, year) }}
                                        value={year.nChatrelSalaryAmt !== 0}
                                        disabled={year.isChild}
                                    />
                                </View>
                                <View style={styles.authorityRegionContainer}>
                                    <Text style={styles.textComponent}>AUTHORITY REGION</Text>
                                        <Picker
                                        itemStyle={{height:50}}
                                        selectedValue={nSelectedAuthRegion}
                                        style={styles.pickerComponent}
                                        onValueChange={(itemValue, itemIndex) =>
                                            updateAuthRegion(index, itemValue)
                                        }>
                                        {/*<Picker.Item label="Java" value="java" />
                                            <Picker.Item label="JavaScript" value="js" />*/}
                                        {lAuthRegions.map((singleAuthregion, key) => (
                                            <Picker.Item label={singleAuthregion.sAuthRegion} value={singleAuthregion} key={key} />)
                                        )}
                                    </Picker>
                                </View>
                                <View>
                                    <Text style={styles.textComponent}>Currency Code: <Text style={styles.textComponentAPI}>{year.sCurrencyCode}</Text></Text>
                                </View>
                                <View>
                                    <Text style={styles.textComponent}>Basic: <Text style={styles.textComponentAPI}>{year.nChatrelAmount}</Text></Text>
                                </View>
                                <View>
                                    <Text style={styles.textComponent}>Meal: <Text style={styles.textComponentAPI}>{year.nChatrelMeal}</Text></Text>
                                </View>
                                <View>
                                    {year.lateFees !== 0 && <Text style={styles.textComponent}>Late Fees: <Text style={styles.textComponentAPI}>{year.lateFees}</Text></Text>}
                                </View>
                                <View>
                                    <Text style={styles.textComponent}>Total: <Text style={styles.textComponentAPI}>{year.nChatrelTotalAmount}</Text></Text>
                                </View>
                                <View>
                                    <Text style={styles.textComponent}>Conversion Rate &#8377;/$ : {(dollarToRupees && year.sCurrencyCode === 'INR') ? dollarToRupees.toFixed(4) : 'NA'}</Text>
                                </View>
                            </View>
                            </Card>
                        )
                    })}
                    <View style={styles.additionalDonationContainer}>
                        <Input
                            // label="Additional Donation"
                            placeholder="Additional Donation"
                            autoCorrect={false}
                            clearButtonMode={"while-editing"}
                            keyboardType={"number-pad"}
                            keyboardAppearance={"default"}
                            disableFullscreenUI={true}
                            onChangeText={(value) => {
                                if (value === "") {
                                    calcTotal(aGBChatrels, 0, nBusinessDonation);
                                    setnAdditionalDonation(0);
                                }
                                else {
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
                            clearButtonMode={"while-editing"}
                            keyboardType={"number-pad"}
                            keyboardAppearance={"default"}
                            disableFullscreenUI={true}
                            onChangeText={(value) => {
                                if (value === "") {
                                    calcTotal(aGBChatrels, nAdditionalDonation, 0);
                                    setnBusinessDonation(0);
                                }
                                else {
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
                            title="Make Payment"
                            type={"solid"}
                            onPress={() => { handlSubmit() }}
                        />
                    </View>
                </ScrollView>
            }
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
        fontStyle: "normal",
        fontWeight: "normal",
        marginBottom: 10,
        color: Colors.blackText
    },
    textComponent: {
        fontSize: 10.5,
        textAlign: "left",
        marginBottom: 15,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackText
    },
    textComponentAPI: {
        fontSize: 16,
        textAlign: "left",
        marginBottom: 10,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackTextAPI
    },
    chatrelTextComponent: {
        marginTop: 25,
        textAlign: "left",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.ChatrelInfoBlue,
        marginBottom: 10
    },
    chatrelYearComponent: {
        marginBottom: 15,
        fontSize: 28,
        fontWeight: "500",
        fontStyle: "normal",
        textAlign: "left",
        color: Colors.ChatrelYearGreen,
    },
    employementStatusContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    employementStatusComponent: {},
    authorityRegionContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginBottom: 10
    },
    authorityRegionComponent: {},
    pickerComponent: {
        height: 25,
        width: 175
    },
    yearContainer: {
        marginBottom: 5
    },
    additionalDonationContainer: {
        marginTop: 5,
        marginBottom: 5
    },
    additionalDonationComponent: {},
    businessDonationContainer: {
        marginBottom: 5
    },
    businessDonationComponent: {},
    grandTotalComponent: {},
    grandTotalCotainer: {
        marginBottom: 10
    },
    paypalButtonContainer: {
        marginVertical: 10
    },
    paypalButtonComponent: {}
});