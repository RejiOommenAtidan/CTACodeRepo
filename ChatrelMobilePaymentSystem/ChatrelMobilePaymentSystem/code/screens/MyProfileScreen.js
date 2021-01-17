import React from 'react';
import {Text, View, StyleSheet, PermissionsAndroid} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {Dimensions} from 'react-native';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../../code/constants/Colors';
import {CustomHeaderRightButton} from '../components/HeaderRightButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CTALogo from '../../code/assets/CTALogo.png';

export const MyProfileScreen = (props) => {
  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Store data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async (paypalObj) => {
    if (await isPermitted()) {
      let sMyHTML = `
      <table
                    /*ref={ref}*/ id="mytable"
                    className="mytable"
                    cellspacing="0"
                    style={{
                      border: '3px solid #000000',
                      background: \`linear-gradient(rgba(255,255,255,.7), rgba(255,255,255,.7)),url(${CTALogo})\`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}>
                    <tr>
                      <td width="20"></td>
                      <td width="200"></td>
                      <td width="175"></td>
                      <td width="175"></td>

                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="2" height="35" align="left" valign="middle">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={5}
                            color="#000000">
                            ༄༅། །བཙན་བྱོལ་བོད་མིའི་དཔྱ་དངུལ་བྱུང་འཛིན་ཨང་།
                          </font>
                        </b>
                      </td>

                      <td align="right">
                        <img
                          width="75px"
                          height="75px"
                          src={'data:image/png;base64,' + receiptData.qrcode}
                        />
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colspan="2" height="28" align="left" valign="middle">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            མིང་།
                          </font>
                          <font size={4} color="#000000">
                            {' '}
                            {receiptData.receipt.sFirstName}
                          </font>
                        </b>
                      </td>
                      <td align="right" valign="middle">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            རང་ལོ། {receiptData.receipt.nAge}
                          </font>
                        </b>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td
                        colspan="5"
                        /* style={{borderRight:"3px solid #000000"}}*/ height="27"
                        align="left"
                        valign="top">
                        <table>
                          <tr>
                            <td
                              style={{
                                width: '200px',
                                paddingLeft: '20px',
                                borderTop: '3px solid #000000'
                              }}>
                              <b>
                                <font
                                  face="Microsoft Himalaya"
                                  size={4}
                                  color="#000000">
                                  {' '}
                                  དཔྱ་དེབ་ཨང་།
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{ border: '3px solid #000000' }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  X
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  X
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(0)}
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(1)}
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(2)}
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(3)}
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(4)}
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(5)}
                                </font>
                              </b>
                            </td>
                            <td
                              align="center"
                              style={{
                                borderTop: '3px solid #000000',
                                borderBottom: '3px solid #000000',
                                borderRight: '3px solid #000000'
                              }}
                              width="32">
                              <b>
                                <font size={4} color="#000000">
                                  {receiptData.receipt.sGBID.charAt(6)}
                                </font>
                              </b>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="7" align="left" valign="top">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000"></font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td
                        width="20"
                        height="26"
                        style={{ borderBottom: '1px solid #000000' }}></td>
                      <td
                        colspan="2"
                        style={{ borderBottom: '1px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            ༡། དཔྱ་དངུལ།
                          </font>
                        </b>
                      </td>
                      <td
                        style={{ borderBottom: '2px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར།{' '}
                            {receiptData.receipt.nChatrelAmount.toFixed(2)}
                          </font>
                        </b>
                      </td>
                      <td
                        width="20"
                        style={{ borderBottom: '2px solid #000000' }}></td>
                    </tr>
                    <tr>
                      <td
                        width="20"
                        style={{ borderBottom: '1px solid #000000' }}
                        height="26"></td>
                      <td
                        colspan="2"
                        style={{ borderBottom: '1px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            ༢། ཟས་བཅད་དོད།
                          </font>
                        </b>
                      </td>
                      <td
                        style={{ borderBottom: '2px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར། {receiptData.receipt.nChatrelMeal.toFixed(2)}
                          </font>
                        </b>
                      </td>
                      <td
                        width="20"
                        style={{ borderBottom: '2px solid #000000' }}></td>
                    </tr>
                    <tr>
                      <td
                        width="20"
                        style={{ borderBottom: '1px solid #000000' }}
                        height="26"></td>
                      <td
                        colspan="2"
                        style={{ borderBottom: '1px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            ༣། ཕོགས་འབབ།
                          </font>
                        </b>
                      </td>
                      <td
                        style={{ borderBottom: '2px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར།{' '}
                            {receiptData.receipt.nCurrentChatrelSalaryAmt.toFixed(
                              2
                            )}
                          </font>
                        </b>
                      </td>
                      <td
                        width="20"
                        style={{ borderBottom: '2px solid #000000' }}></td>
                    </tr>
                    <tr>
                      <td
                        width="20"
                        style={{ borderBottom: '1px solid #000000' }}
                        height="26"></td>
                      <td
                        colspan="2"
                        style={{ borderBottom: '1px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            ༤། ཚོང་ཁེའི་བློས་བཅད་ཞལ་འདེབས།
                          </font>
                        </b>
                      </td>
                      <td
                        style={{ borderBottom: '2px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར།{' '}
                            {receiptData.receipt.nChatrelBusinessDonationAmt
                              ? receiptData.receipt.nChatrelBusinessDonationAmt.toFixed(
                                  2
                                )
                              : 0}
                          </font>
                        </b>
                      </td>
                      <td
                        width="20"
                        style={{ borderBottom: '2px solid #000000' }}></td>
                    </tr>
                    <tr>
                      <td
                        width="20"
                        style={{ borderBottom: '1px solid #000000' }}
                        height="26"></td>
                      <td
                        colspan="2"
                        style={{ borderBottom: '1px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            ༥། དཔྱ་དངུལ་འབུལ་ཆད་འབབ།
                          </font>
                        </b>
                      </td>
                      <td
                        style={{ borderBottom: '2px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར།{' '}
                            {(
                              receiptData.receipt.nArrears +
                              receiptData.receipt.nLateFees
                            ).toFixed(2)}{' '}
                            ({receiptData.receipt.dtArrearsFrom.split('-')[0]}-
                            {receiptData.receipt.dtArrearsTo.split('-')[0]})
                          </font>
                        </b>
                      </td>
                      <td
                        width="20"
                        style={{ borderBottom: '2px solid #000000' }}></td>
                    </tr>
                    <tr>
                      <td
                        width="20"
                        style={{ borderBottom: '1px solid #000000' }}
                        height="26"></td>
                      <td
                        colspan="2"
                        style={{ borderBottom: '1px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            ༦། འཕར་འབུལ་ཞལ་འདེབས།
                          </font>
                        </b>
                      </td>
                      <td
                        style={{ borderBottom: '2px solid #000000' }}
                        align="left"
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར།{' '}
                            {receiptData.receipt.nChatrelAddtionalDonationAmt
                              ? receiptData.receipt.nChatrelAddtionalDonationAmt.toFixed(
                                  2
                                )
                              : 0}
                          </font>
                        </b>
                      </td>
                      <td
                        width="20"
                        style={{ borderBottom: '2px solid #000000' }}></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="10" align="left" valign="top">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000"></font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20" height="34"></td>
                      <td colspan="2" align="left" valign="bottom">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000">
                          <b>བཅས་བསྡོམས་</b>{' '}
                          US$/CA$/AU$/NT$/CHF/EURO/GBP/YEN/RR/
                        </font>
                      </td>
                      <td
                        align="left"
                        style={{ paddingLeft: '30px' }}
                        valign="bottom">
                        <b>
                          <font
                            face="Microsoft Himalaya"
                            size={4}
                            color="#000000">
                            སྒོར{' '}
                          </font>
                          <font size={4} color="#000000">
                            {(
                              receiptData.receipt.nChatrelAmount +
                              receiptData.receipt.nChatrelMeal +
                              receiptData.receipt.nCurrentChatrelSalaryAmt +
                              receiptData.receipt.nArrears +
                              receiptData.receipt.nLateFees +
                              receiptData.receipt.nChatrelAddtionalDonationAmt +
                              receiptData.receipt.nChatrelBusinessDonationAmt
                            ).toFixed(2)}
                          </font>{' '}
                        </b>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20" height="31"></td>
                      <td colspan="3" align="left" valign="middle">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000">
                          <b>
                            ཕྱི་ལོ་༌་་་་་་་་་་་་་་༌༌༌༌༌་་་་་་་་་་་་༌༌༌༌༌༌༌༌༌༌༌ལོའི་དཔྱ་དངུལ་འབུལ་འབབ་རྩིས་འབུལ་བྱུང་བའི་འཛིན་དུ།{' '}
                          </b>
                        </font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="32" align="left" valign="top">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000"></font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20" height="33"></td>
                      <td colspan="3" align="left" valign="middle">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000">
                          <b>
                            བོད་རིགས་སྤྱི་མཐུན་ཚོགས་པའམ་བོད་རིགས་ཚོགས་པའི་ལས་དམ་དང་མཚན་རྟགས།
                            &nbsp;&nbsp;&nbsp; ཕྱི་ལོ༌
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ཟླ་
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ཚེས་
                            &nbsp;&nbsp;&nbsp; ལ།
                          </b>
                        </font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="16" align="left" valign="top">
                        <font size={2} color="#000000">
                          This is computer generated Chatrel receipt, no
                          signature required.
                        </font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="16" align="left" valign="top">
                        <font size={2} color="#000000">
                          You are advised to update chatrel contribution on your
                          Greenbook from Office of Tibet or
                        </font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="16" align="left" valign="top">
                        <font size={2} color="#000000">
                          concerned Tibetan Association/Tibetan Community.
                        </font>
                      </td>
                      <td width="20"></td>
                    </tr>
                    <tr>
                      <td width="20"></td>
                      <td colSpan="3" height="16" align="left" valign="top">
                        <font
                          face="Microsoft Himalaya"
                          size={4}
                          color="#000000"></font>
                      </td>
                      <td width="20"></td>
                    </tr>
                  </table>`;
      try {
        let file = await RNHTMLtoPDF.convert({
          html: sMyHTML,
          fileName: 'Test',
          directory: 'Download',
          fonts: ['../../code/assets/fonts/Microsoft Himalaya.ttf'],
        });
        alert(file.filePath);
      } catch (err) {
        console.error(err);
      }
    }

    //let file;
    // console.log(file.filePath);
  };
  const oGBDetails = useSelector((state) => state.GBDetailsReducer.oGBDetails);
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  // const oUserHardcodedMyProfile = {
  //   sGBID: '7654321',
  //   sName: 'ABCD DEFG',
  //   nAge: 22,
  //   dtDOB: '01-01-2001',
  //   sEmailAddress: 'a.b@gmail.com',
  //   sAuthorityRegion: 'Thimpu',
  // };
  return (
    <View style={styles.mainContainer}>
      {/*<View style={styles.headerContainer}>
                <Text style={styles.headerComponent}>
                    My Profile
                </Text>
    </View>*/}
      {/*FULL NAME*/}
      <View style={styles.nameLabelContainer}>
        <Text style={styles.nameLabelComponent}>FULL NAME</Text>
      </View>
      <View style={styles.nameValueContainer}>
        <Text style={styles.nameValueComponent}>
          {oGoogle.givenName + ' ' + oGoogle.familyName}
        </Text>
      </View>
      {/*GBID*/}
      <View style={styles.gbidLabelContainer}>
        <Text style={styles.gbidLabelComponent}>GREEN BOOK ID</Text>
      </View>
      <View style={styles.gbidValueContainer}>
        <Text style={styles.gbidValueComponent}>{oGBDetails.sGBID}</Text>
      </View>
      {/*DOB*/}
      <View style={styles.dtDOBLabelContainer}>
        <Text style={styles.dtDOBLabelComponent}>DATE OF BIRTH</Text>
      </View>
      <View style={styles.dtDOBValueContainer}>
        <Text style={styles.dtDOBValueComponent}>{oGBDetails.dtDOB}</Text>
      </View>
      {/*AGE*/}
      {/*<View style={styles.ageLabelContainer}>
        <Text style={styles.ageLabelComponent}>AGE</Text>
      </View>
      <View style={styles.ageValueContainer}>
        <Text style={styles.ageValueComponent}>
          {oUserHardcodedMyProfile.nAge}
        </Text>
  </View>*/}
      {/*AUTHREGION*/}
      {/*<View style={styles.sAuthRegionLabelContainer}>
        <Text style={styles.sAuthRegionLabelComponent}>AUTHORITY REGION</Text>
      </View>
      <View style={styles.sAuthRegionValueContainer}>
        <Text style={styles.sAuthRegionValueComponent}>
          {oUserHardcodedMyProfile.sAuthorityRegion}
        </Text>
</View>*/}
      {/*EMAIL ADDRESS*/}
      <View style={styles.emailIDLabelContainer}>
        <Text style={styles.emailIDLabelComponent}>EMAIL ADDRESS</Text>
      </View>
      <View
        style={styles.emailIDValueContainer}
        //onPress={createPDF}
        >
        <Text style={styles.emailIDValueComponent}>{oGoogle.email}</Text>
      </View>
    </View>
  );
};

export const MyProfileScreenOptions = (navData) => {
  return {
    headerTitle: 'My Profile',
    headerStyle: {
      backgroundColor: Colors.primary,
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          //iconName={Platform.OS === 'android' ? 'menu' : 'md-menu'}
          iconName={'menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: CustomHeaderRightButton,
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginHorizontal:
      Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
  },
  headerContainer: {
    width: wp(32),
    height: hp(4),
    //marginTop: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 18 : 30,
  },
  headerComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 14.4 : 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blue,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  nameLabelContainer: {
    width: wp(75),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  nameLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  nameValueContainer: {
    width: wp(75),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.2
        : 27,
  },
  nameValueComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.8 : 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  gbidLabelContainer: {
    width: wp(75),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  gbidLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  gbidValueContainer: {
    width: wp(75),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.2
        : 27,
  },
  gbidValueComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.8 : 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  ageLabelContainer: {
    width: wp(75),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  ageLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  ageValueContainer: {
    width: wp(75),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.2
        : 27,
  },
  ageValueComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.8 : 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  dtDOBLabelContainer: {
    width: wp(75),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  dtDOBLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  dtDOBValueContainer: {
    width: wp(75),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.2
        : 27,
  },
  dtDOBValueComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.8 : 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  emailIDLabelContainer: {
    width: wp(75),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  emailIDLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  emailIDValueContainer: {
    width: wp(75),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.2
        : 27,
  },
  emailIDValueComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.8 : 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },

  sAuthRegionLabelContainer: {
    width: wp(75),
    height: hp(2),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2,
  },
  sAuthRegionLabelComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 7.2 : 12,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
  sAuthRegionValueContainer: {
    width: wp(75),
    height: hp(3),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.2
        : 27,
  },
  sAuthRegionValueComponent: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 10.8 : 18,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackTextAPI,
    //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
    //letterSpacing: Resolution.nLetterSpacing,
    fontFamily: 'Kanit-Regular',
  },
});
