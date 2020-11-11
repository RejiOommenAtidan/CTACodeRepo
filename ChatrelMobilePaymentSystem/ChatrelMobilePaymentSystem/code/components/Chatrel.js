import React, { useEffect, useState } from 'react';
import { Switch, Text, View, ScrollView, Picker } from 'react-native';
import { useSelector } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';
import Moment from 'moment';
// import { sDateFormat } from '../constants/CommonConfig';

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
        // debugger
        if (aGBChatrels && dollarToRupees && shouldRun) {
            const len = aGBChatrels.length;
            for (var i = 0; i < len; i++) {
                calculateMethod(i);
            }
            setShouldRun(false);
        }
    };

    const updateAuthRegion = (e, value) => {
        //console.log(value.id, e.currentTarget.id.substring(0, e.currentTarget.id.indexOf('_')));
        // const index = e.currentTarget.id.substring(0, e.currentTarget.id.indexOf('_'));
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

    const handlSubmit = () => {
        let tempSummaryObj = {};
        let oPayment = [...aGBChatrels];
        let lastindex = oPayment.length - 1;

        tempSummaryObj.nArrearsAmount = nGrandTotal - (oPayment[lastindex].nChatrelDue + nBusinessDonation + nAdditionalDonation);
        tempSummaryObj.nChatrelTotalAmount = nGrandTotal;
        tempSummaryObj.nChatrelSalaryAmt = oPayment[lastindex].nChatrelSalaryAmt;
        tempSummaryObj.nChatrelBusinessDonationAmt = nBusinessDonation;
        tempSummaryObj.nChatrelAdditionalDonationAmt = nAdditionalDonation;
        tempSummaryObj.sPaidByGBId = "1234567";

        let finalObj = {
            "chatrelPayment": tempSummaryObj,
            "gbChatrels": aGBChatrels
        }
        console.log("Final Obj:", finalObj)
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
                                //console.log(resp.data);
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
                <ScrollView>
                    <Text>PERSONAL INFORMATION</Text>
                    <Text>Greenbook ID</Text>
                    <Text>{sGBID}</Text>
                    <Text>Date of Birth</Text>
                    <Text>{oGBDetails.dtDOB}</Text>
                    <Text>Name</Text>
                    <Text>{sName}</Text>
                    <Text>Year of Last Chatrel</Text>
                    <Text>{Moment(nPaidUntil).year()}</Text>
                    <Text>Chatrel of Years Due</Text>
                    <Text>{Moment().diff(nPaidUntil, 'years')} Years</Text>
                    <Text>Chatrel Information</Text>
                    {aGBChatrels.map((year, index) => {
                        return (
                            <View key={year.nChatrelYear}>
                                <Text>Employment Status: {year.nChatrelSalaryAmt === 0 ? "Not Employed" : "Employed"}</Text>
                                <Switch
                                    key={year.nChatrelYear}
                                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                                    thumbColor={year.nChatrelSalaryAmt === 0 ? "#f4f3f4" : "#f5dd4b"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => { toggleSwitch(index, year) }}
                                    value={year.nChatrelSalaryAmt !== 0}
                                    disabled={year.isChild}
                                />
                                <Text>{year.nChatrelYear}</Text>
                                <Picker
                                    selectedValue={nSelectedAuthRegion}
                                    style={{ height: 50, width: 200 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        updateAuthRegion(index, itemValue)
                                    }>
                                    {/*<Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />*/}
                                    {lAuthRegions.map((singleAuthregion, key) => (
                                        <Picker.Item label={singleAuthregion.sAuthRegion} value={singleAuthregion} key={key} />)
                                    )}
                                </Picker>
                                <Text>Currency Code: {year.sCurrencyCode}</Text>
                                <Text>Basic:  {year.nChatrelAmount}</Text>
                                <Text>Meal:  {year.nChatrelMeal}</Text>
                                {year.lateFees !== 0 && <Text>Late Fees: {year.lateFees}</Text>}
                                <Text>Total: {year.nChatrelTotalAmount}</Text>
                                <Text>Conversion Rate &#8377;/$ : {(dollarToRupees && year.sCurrencyCode === 'INR') ? dollarToRupees.toFixed(4) : 'NA'}</Text>
                            </View>
                        )
                    })}
                    <Input
                        label="Additional Donation"
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
                    <Input
                        label="Business Donation"
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
                    <Text>{nGrandTotal.toFixed(2)}</Text>
                    <Button
                        title="PayPal Button"
                        type={"outline"}
                        onPress={() => { handlSubmit() }}
                    />
                </ScrollView>
            }
        </>
    );
};
