import React, { useEffect, useState } from 'react';
import { Switch, Text, View, ScrollView } from 'react-native';
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

    const calculateMethod = (index) => {
        let oPayment = [...aGBChatrels];
        let len = aGBChatrels.length;
        if (index != len - 1) {
            oPayment[index].lateFees =
                (oPayment[index].nChatrelAmount + oPayment[index].nChatrelMeal + oPayment[index].nChatrelSalaryAmt) / nChatrelLateFeesPercentage;
        }
        oPayment[index].nChatrelTotalAmount = oPayment[index].nChatrelAmount + oPayment[index].nChatrelMeal + oPayment[index].lateFees + oPayment[index].nChatrelSalaryAmt;
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
        axios.get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=` + oCurrentGBDetails.sGBID)
            .then(resp => {
                if (resp.status === 200) {
                    console.log(resp.data);
                    setnChatrelLateFeesPercentage(resp.data.chatrelPayment.nChatrelLateFeesPercentage);
                    setaGBChatrels(resp.data.gbChatrels);
                    setsName(resp.data.sName);
                    setnPaidUntil(resp.data.nPaidUntil);
                    setsGBID(resp.data.chatrelPayment.sGBId);
                }
            })
            .catch(error => {
                console.log(error.message);
                console.log(error.config);
            });
    };

    return (
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
                        <Text>Basic: $ {year.nChatrelAmount}</Text>
                        <Text>Meal: $ {year.nChatrelMeal}</Text>
                        {year.lateFees !== 0 && <Text>Late Fees: {year.lateFees}</Text>}
                        <Text>Total: $ {year.nChatrelTotalAmount}</Text>
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
    );
};
