import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import Spinner from "./Spinner";
const CLIENT = {
  sandbox:
    process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
  production: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX
};

//const CLIENT_ID = process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;
const CLIENT_ID = CLIENT.sandbox;

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }
  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: +"Mercedes Maybach",
          amount: {
            currency_code: "USD",
            value: 200
          }
        }
      ]
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;
    const ourStyles = {
      layout: 'vertical',
      color: 'gold',
      shape: 'pill',
      //pill is much better than rect
      label: 'paypal',
      size: 'responsive'
      //height:'small',
      //fundingicons:true
      //tagline:true
    }
    return (
      <div className="main">
        {loading && <Spinner />}

        {showButtons && (
          <div>
            <div>
              <img alt="Mercedes G-Wagon" src={"data:image/jpeg;base64,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"} />
              <h2>Items: Mercedes Maybach</h2>
              <h2>Total checkout Amount $200</h2>
            </div>
          
            <PayPalButton
              style={ourStyles}
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
              onSuccess={()=>{alert("OnSuccess")}}
              onCancel={()=>{alert("onCancel")}}
              onError={()=>{alert("onError")}}
              onButtonReady={()=>{alert("onButtonReady")}}
              catchError={()=>{alert("catchError")}}
              onShippingChange={()=>{alert("onShippingChange")}}
            />

          </div>
        )}

        {paid && (
          <div className="main">
            <h2>
              Congrats! you just paid for that picture. Work a little harder and
              you'll be able to afford the car itself{" "}
              <span role="img" aria-label="emoji">
                {" "}
                😉
              </span>
            </h2>
          </div>
        )}
      </div>
    );
  }
}


export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);