import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { sPayPalBASEURL } from "../constants/CommonConfig";

export const MyWebView = props => {
    const { route, navigation } = props;
    let sPayerID = null;
    const { approvalUrl, paymentID, sAccessToken } = route.params;
    // const payerId = navigation.getParam('payerId');
    const onNavigationStateChange = (webViewState) => {
        console.log(webViewState);
        // get payer from of the url
        if (webViewState.title === "eChatrel") {

            // const params = new URL(webViewState.url).searchParams;
            var regexp = /[?&]([^=#]+)=([^&#]*)/g, params = {}, check;
            while (check = regexp.exec(webViewState.url)) {
                params[check[1]] = check[2];
            }
            console.log("params", params);
            sPayerID = params.PayerID;

            var axios = require('axios');
            var data = JSON.stringify({ "payer_id": sPayerID });

            var config = {
                baseURL: sPayPalBASEURL,
                method: 'post',
                url: '/v1/payments/payment/' + paymentID + '/execute/',
                headers: {
                    'Authorization': 'Bearer ' + sAccessToken,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            //debugger;
            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify("Successful Payment Obj: " + JSON.stringify(response.data)));
                    // navigation.navigate('SelfChatrel');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    };
    return (
        <WebView
            source={{ uri: approvalUrl }}
            onNavigationStateChange={onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            // injectedJavaScript={this.state.cookie}
            startInLoadingState={false}
            style={{ marginTop: 20 }}
        />
    );
};

export const MyWebViewOptions = (navData) => {
    return {
        headerShown: false,
        headerLeft: null,
        headerRight: null,
        headerBackTitleVisible: false,
    };
};

