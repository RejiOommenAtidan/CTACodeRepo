import Colors from './Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////Local Windows
// export const sAPIBASEURL = "http://10.0.2.2:49700/api";

////Local Mac Mini
// export const sAPIBASEURL = "http://10.0.2.2:5000/api";

////QA
export const sAPIBASEURL = 'https://chatrel-webapi.azurewebsites.net/api';

////UAT
// export const sAPIBASEURL = 'https://chatrel-webapi-uat.azurewebsites.net/api';

////Dev Azure
// export const sAPIBASEURL = 'https://chatrel-webapi-dev.azurewebsites.net/api';

////PROD URL
// export const sAPIBASEURL = "https://chatrelapi.azurewebsites.net/api";

export const sFolderName = 'Chatrel Receipts';

export const sReceiptDownloadMessageAndroid =
  'Chatrel receipts downloaded successfully in Download > Chatrel Receipts folder';

export const sReceiptDownloadMessageIOS =
  'Chatrel receipts downloaded successfully in Document: Files > On My Device > Documents > Chatrel > Chatrel Receipts';

export const sINRAuthRegionHelpMessage =
  'Please enter Employment Contribution manually for your Authority Region';

export const sSnackbarAddMessage = 'Record Added successfully';

export const sSnackbarUpdateMessage = 'Record Updated successfully';

export const sDateFormat = 'DD-MM-YYYY';

export const sDateFormatDatePicker = 'MM/DD/YYYY';

export const sISODateFormat = 'YYYY-MM-DD';

export const sFontName = 'JosefinSans-Regular';

export const sFontNameBold = 'JosefinSans-Bold';

export const sHimalayaFontName = 'MicrosoftHimalaya';

export const errorContainer = {
  marginBottom: hp(1),
};

export const errorComponent = {
  color: Colors.red,
  fontSize: wp(4.25),
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontFamily: sFontName,
  textAlign: 'left',
};

export const oActivityIndicatorStyle = {
  alignItems: 'center',
  bottom: 0,
  color: Colors.black,
  justifyContent: 'center',
  left: 0,
  opacity: 0.5,
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 3,
};

export const oRequiredStyles = {
  color: 'red',
  fontSize: hp(2.5),
  textAlign: 'center',
  textAlignVertical: 'top',
};

export const sMappingURL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdEfQ4CZU16qOMtYSfRnlFiHMXJ4AuG0i4q7JHWsWJVyMFdzQ/viewform';

export const sFAQURL = 'https://chatrel.net/ChatrelFAQ.pdf';

export const sChatrelNetURL = 'www.chatrel.net';

export const sPrivacyPolicyURL = 'https://' + sChatrelNetURL + '/privacy';

export const sVerificationSuccessfulMessage = 'Verification Successful';

export const sVerificationFailedMessage = 'Verification Failed';

export const sPayPalTransactionIDCopied = 'PayPal Transaction ID Copied';
export const sPayPalPaymentIDCopied = 'PayPal Order ID Copied';

export const sCopyPayPalTransactionID = 'Copy PayPal Transaction ID';
export const sCopyPayPalPaymentID = 'Copy PayPal Order ID';

export const sMobilePassphrase = 'HHBawq>%6%?_/7}nz{C`94@f[';

export const sContactEmail = 'chatrelonline@tibet.net';

export const nMaxBatchSize = 5;

export const nInitialBatchSize = 10;

export const sAttentionRequired = 'Attention Required';

export const sSomethingWentWrongPleaseTryAgainLater =
  'Something went wrong, Please try again later';

export const sPayPalUIErrorMessage =
  'Cannot Connect to PayPal, Please try again later';

export const sContributionUnsuccessful = 'Contribution Unsuccessful';

export const sDummyPhotoForiOS =
  'https://icon-library.net/images/avatar-png-icon/avatar-png-icon-9.jpg';

export const sRequestAccessForEmailID =
  'Please remove App from Apple ID in Settings';

export const sSignTypeApple = 'Apple';

export const sSignTypeGoogle = 'Google';

export const sLogoutConfirmation = 'Are you sure you want to logout?';

export const sSessionExpireLoginAgain =
  'Your session has expired. Please login again.';

export const sSessionTimeout = 'Session Timeout';

export const sExitApp = 'Exit App';

export const sExitConfirmation = 'Do you want to exit?';

export const sEnteredDetailsDidntMatchDB =
  "The entered details didn't match our database. Please try again.";

export const sPleaseContactCTA = 'Please Contact CTA';

export const sInvalidDetailsForChatrel = 'Invalid details for Chatrel';

export const sFileDisputeSubmitSuccessMessage =
  'Thanks for uploading. Your details are sent to the CTA Team & they shall get in touch with you soon.';
