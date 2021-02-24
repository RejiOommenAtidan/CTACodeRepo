import Colors from './Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Dimensions, Platform} from 'react-native';
import Resolution from './ResolutionBreakpoint';

////Local Windows
// export const sAPIBASEURL = "http://10.0.2.2:49700/api";

////Local mac
// export const sAPIBASEURL = "http://10.0.2.2:5000/api";

////QA
export const sAPIBASEURL = 'https://chatrel-webapi.azurewebsites.net/api';

////UAT
// export const sAPIBASEURL = 'https://chatrel-webapi-uat.azurewebsites.net/api';

////Dev Azure
// export const sAPIBASEURL = 'https://chatrel-webapi-dev.azurewebsites.net/api';

export const sFolderName = 'Chatrel Receipts';
export const sReceiptDownloadMessageAndroid =
  'Chatrel receipts downloaded successfully in Download>Chatrel Receipts folder';
export const sReceiptDownloadMessageIOS =
  'Chatrel receipts downloaded successfully in Document>Chatrel Receipts folder';

export const sAdminEmail = 'admin@CTA.com';
export const sSnackbarAddMessage = 'Record Added successfully';
export const sSnackbarUpdateMessage = 'Record Updated successfully';
export const sDateFormat = 'DD-MM-YYYY';
export const sDateFormatDatePicker = 'MM/DD/YYYY';
export const sISODateFormat = 'YYYY-MM-DD';
export const sClientIDAndroid =
  '987929460767-jf4d713glngd3o109vdqj6mt3c2e0fju.apps.googleusercontent.com';
export const sClientIDIOS =
  '987929460767-gfij1cqojpciksu9i69j4q20rjoe2j41.apps.googleusercontent.com';
export const sPayPalBASEURL = 'https://api.sandbox.paypal.com';
export const sPayPalClientID =
  'AdqxwGp5tKswa3OfXdw5dcCp5SQNtAEkDmPI9InDri3FcXnGCfWfpwhBsLRenYqMwrUrUTLLbnGTOM14';
export const sClientSecret =
  'ECrAFFlN_jB_Z62_rc9Ukt2Mv7Yeov2saaDbNCT3Ef_bP9JS2ke9y_G-8VGqQiTB7o3sGJRGFeBF-QKD';

//Add "-uat" after webapp
export const sSuccessPayPalWebPageURL =
  'https://chatrel-webapp.azurewebsites.net/Success';
//Add "-uat" after webapp
export const sFailurePayPalWebPageURL =
  'https://chatrel-webapp.azurewebsites.net/Failure';
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
  // backsgroundColor: Colors.black,
  // elevation: 3,
};

export const oRequiredStyles = {
  color: 'red',
  fontSize: hp(2.5),
  textAlign: 'center',
  textAlignVertical: 'top',
  // lineHeight:hp(5)
};

export const sMappingURL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdEfQ4CZU16qOMtYSfRnlFiHMXJ4AuG0i4q7JHWsWJVyMFdzQ/viewform';
