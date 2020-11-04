import React, { useEffect, useState } from 'react';
import { Switch, Platform, Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import { sDateFormat } from '../constants/CommonConfig';
import Moment from 'moment';

const oHardcoded = {
    dtDOB: "01-01-2001",
    sName: "Malay Doshi",
    sPaidUntil: "2017",
    sYearsDue: "3 Years"
};

const aRemainingYearsHardcoded = [
    {
        nChatrelYear: 2018,
        nChatrelMeal: 10,
        nChatrelBasic: 36,
        nChatrelLateFeesPercentage: 10,
        nChatrelLateFees: 4.6,
        nArrearsAmount: 50.6,
        nChatrelSalaryAmt: 50,
        nChatrelDue: 50.6,
        isEmployed: false
    },
    {
        nChatrelYear: 2019,
        nChatrelMeal: 10,
        nChatrelBasic: 36,
        nChatrelLateFeesPercentage: 10,
        nChatrelLateFees: 4.6,
        nArrearsAmount: 50.6,
        nChatrelSalaryAmt: 50,
        nChatrelDue: 50.6,
        isEmployed: false
    },
    {
        nChatrelYear: 2020,
        nChatrelMeal: 10,
        nChatrelBasic: 36,
        nChatrelLateFeesPercentage: 10,
        nChatrelLateFees: 0,
        nArrearsAmount: 46,
        nChatrelDue: 46,
        nChatrelSalaryAmt: 50,
        isEmployed: false
    }
];

export const Chatrel = props => {
    const [aRemainingYears, setaRemainingYears] = useState(aRemainingYearsHardcoded);
    // const [nYearsTotal, setnYearsTotal] = useState("");
    const [nGrandTotal, setnGrandTotal] = useState(0);
    const [nAdditionalDonation, setnAdditionalDonation] = useState(0);
    const [nBusinessDonation, setnBusinessDonation] = useState(0);
    // var nCurrentYear = Moment().year();
    //console.log(nCurrentYear);
    const oCurrentGBDetails = useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails);
    //console.log(nYearsTotal);
    const toggleSwitch = (index, year) => {
        ////debugger;
        let payObj = [...aRemainingYears];
        // let len = aRemainingYears.length;
        if (year.isEmployed) {
            // setnTotalForaYear(year.nArrearsAmount);
            // setnYearsTotal(previousState=>previousState+year.nArrearsAmount);
            payObj[index].isEmployed = false;
            // payObj[index].nChatrelDue = payObj[index].nChatrelDue - payObj[index].nChatrelSalaryAmt;
        }
        else {
            // setnTotalForaYear(year.nArrearsAmount + year.nChatrelSalaryAmt);
            // setnYearsTotal(previousState=>previousState+year.nArrearsAmount + year.nChatrelSalaryAmt);
            payObj[index].isEmployed = true;
            // payObj[index].nChatrelDue = payObj[index].nChatrelDue + payObj[index].nChatrelSalaryAmt;

        }
        setaRemainingYears(payObj);
        calculate(index);
        //setIsEnabled(previousState => !previousState);
    };

    const calculate = (index) => {
        let payObj = [...aRemainingYears];
        let len = aRemainingYears.length;
        let nSalDecider = payObj[index].isEmployed ? payObj[index].nChatrelSalaryAmt : 0;
        if (index != len - 1) {
            payObj[index].nChatrelLateFees =
                (payObj[index].nChatrelBasic + payObj[index].nChatrelMeal + nSalDecider) / payObj[index].nChatrelLateFeesPercentage;
        }
        payObj[index].nChatrelDue = payObj[index].nChatrelBasic + payObj[index].nChatrelMeal + payObj[index].nChatrelLateFees + nSalDecider;
        setaRemainingYears(payObj);
        calcTotal(payObj, nAdditionalDonation, nBusinessDonation);

    };
    const calcTotal = (obj, aD, bD) => {
        //debugger;
        let temptotal = aD + bD;
        obj.forEach((row) => {
            temptotal += row.nChatrelDue;
        })
        setnGrandTotal(temptotal);
    };

    const handlSubmit = () => {
        let tempSummaryObj = {};
        let payObj = [...aRemainingYears];
        let lastindex = payObj.length - 1;
    
        tempSummaryObj.nArrearsAmount = nGrandTotal - (payObj[lastindex].nChatrelDue + nBusinessDonation + nAdditionalDonation);
        tempSummaryObj.nChatrelTotalAmount = nGrandTotal;
        tempSummaryObj.nChatrelSalaryAmt = payObj[lastindex].nChatrelSalaryAmt;
        tempSummaryObj.nChatrelBusinessDonationAmt = nBusinessDonation;
        tempSummaryObj.nChatrelAdditionalDonationAmt = nAdditionalDonation;
        tempSummaryObj.sPaidByGBId = "1234567";
    
        let finalObj = {
          "chatrelPayment": tempSummaryObj,
          "gbChatrels": aRemainingYears
        }
    
        console.log("Final Obj:", finalObj)
      }

    useEffect(() => {
        calcTotal(aRemainingYearsHardcoded, nAdditionalDonation, nBusinessDonation)
    });

    return (
        <ScrollView>
            <Text>PERSONAL INFORMATION</Text>
            <Text>Greenbook ID</Text>
            <Text>{oCurrentGBDetails.sGBID}</Text>
            <Text>Date of Birth</Text>
            <Text>{oHardcoded.dtDOB}</Text>
            <Text>Name</Text>
            <Text>{oHardcoded.sName}</Text>
            <Text>Year of Last Chatrel</Text>
            <Text>{oHardcoded.sPaidUntil}</Text>
            <Text>Chatrel of Years Due</Text>
            <Text>{oHardcoded.sYearsDue}</Text>
            <Text>Chatrel Information</Text>
            {aRemainingYears.map((year, index) => {
                //const [isEnabled, setIsEnabled] = useState(year.isEmployed);
                //const [nTotalForaYear, setnTotalForaYear] = useState(year.nArrearsAmount);
                return (
                    <View key={year.nChatrelYear}>
                        <Text>Employment Status: {year.isEmployed ? "Employed" : "Not Employed"}</Text>
                        <Switch
                            key={year.nChatrelYear}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={year.isEmployed ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => { toggleSwitch(index, year) }}
                            value={year.isEmployed}
                        />
                        <Text>{year.nChatrelYear}</Text>
                        <Text>Basic: {year.nChatrelBasic}</Text>
                        <Text>Meal: {year.nChatrelMeal}</Text>
                        <Text>Total: {year.nChatrelDue}</Text>
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
                        calcTotal(aRemainingYears, 0, nBusinessDonation);
                        setnAdditionalDonation(0);
                    }
                    else {
                        calcTotal(aRemainingYears, parseInt(value), nBusinessDonation);
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
                        calcTotal(aRemainingYears, nAdditionalDonation, 0);
                        setnBusinessDonation(0);
                    }
                    else {
                        calcTotal(aRemainingYears, nAdditionalDonation, parseInt(value));
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
