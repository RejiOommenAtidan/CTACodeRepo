import { Dimensions, Platform } from 'react-native';
import Colors from './Colors';
import Resolution from './ResolutionBreakpoint';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
////Local Windows
export const sAPIBASEURL = "http://10.0.2.2:49700/api";

////Local mac
// export const sAPIBASEURL = "http://10.0.2.2:5000/api";

////QA
// export const sAPIBASEURL = 'https://chatrel-webapi.azurewebsites.net/api';

////Dev Azure (For Mobile App)
// export const sAPIBASEURL = 'https://chatrel-webapi-dev.azurewebsites.net/api';


export const sAdminEmail = 'admin@CTA.com';
export const sSnackbarAddMessage = 'Record Added successfully';
export const sSnackbarUpdateMessage = 'Record Updated successfully';
export const sDateFormat = 'DD-MM-YYYY';
export const sDateFormatDatePicker = 'MM/DD/YYYY';
export const sISODateFormat = 'YYYY-MM-DD';
export const sClientIDAndroid =
  '1071046831303-1naot2q7pull58cpifp3rosfn65bdrsc.apps.googleusercontent.com';
export const sClientIDIOS = '1071046831303-84cupk037kmsgsdu94v1c79c069kv9ki.apps.googleusercontent.com';
export const sPayPalClientID =
  'AeIfCd7BHacsWwdqkIYfxmPQrN8UZU2Sap_dor00t7Z8Y9pLLJiwK_v2-lNy8vIhaSU9AFAiC5l8l7Gx';
export const sFontName = 'JosefinSans-Regular';
export const sFontNameBold = 'JosefinSans-Bold';
export const errorContainer = {
  marginBottom: hp(1),
};
export const errorComponent = {
  textAlign: 'left',
  fontSize:
    Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9 : 15,
  fontStyle: 'normal',
  fontWeight: 'normal',
  color: Colors.red,
  fontFamily: sFontName,
};

export const oActivityIndicatorStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  color: Colors.black,
  // backsgroundColor: Colors.black,
  zIndex: 3,
  // elevation: 3,
  opacity: 0.5,
};

export const oRequiredStyles = {
  color: 'red',
  textAlignVertical: 'top',
  fontSize: hp(2.5),
  textAlign: 'center',
  // lineHeight:hp(5)
};
