import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {Dimensions} from 'react-native';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../../code/constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import CTALogo from '../../code/assets/CTALogo.png';
import {
  sDateFormat,
  sDateFormatDatePicker,
  sFontName,
  sFontNameBold,
} from '../constants/CommonConfig';
import {Avatar, Badge, Icon, withBadge, Card} from 'react-native-elements';
import {CustomHeaderRightButton} from '../components/HeaderRightButton';
import {BoxShadow, BorderShadow} from 'react-native-shadow';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from '../components/Loader';
import axios from 'axios';
import {storeJWTToken} from '../store/actions/GBDetailsAction';
import Moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';

export const MyProfileScreen = (props) => {
  // const oUserHardcodedMyProfile = {
  //   sGBID: '7654321',
  //   sName: '12345678901234567890123456789',
  //   nAge: 22,
  //   dtDOB: '01-01-2001',
  //   sEmailAddress: 'a.b@gmail.com',
  //   sAuthorityRegion: 'Thimpu',
  // };
  const isFocused = useIsFocused();
  const [bLoader, setbLoader] = useState(true);
  const [oDataAPI, setoDataAPI] = useState({});
  const dispatch = useDispatch();
  const sJwtToken = useSelector((state) => state.GBDetailsReducer.sJwtToken);

  useEffect(() => {
    if (isFocused) {
      getChatrelDetails();
      console.log('My Profile Called');
      debugger;
    }
  }, [isFocused]);

  const getChatrelDetails = () => {
    setbLoader(true);
    axios
      .get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=` + oGBDetails.sGBID)
      .then((resp) => {
        console.log(resp.data);
        setoDataAPI(resp.data);
        const oSession = {
          sJwtToken: resp.data.token,
          bSession: true,
        };
        dispatch(storeJWTToken(oSession));
        setbLoader(false);
      })
      .catch((error) => {
        setbLoader(false);
        if (error.response.status === 401) {
          // const oSession = {
          //   sJwtToken: '',
          //   bSession: false,
          // };
          // dispatch(storeJWTToken(oSession));
        } else {
          // setbLoader(false);
          alert('Something went wrong, please try again later.');
        }
      });
  };

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
      //try {
      //let file = await RNHTMLtoPDF.convert({
      //html: sMyHTML,
      // fileName: 'Test',
      // directory: 'Download',
      //fonts: ['../../code/assets/fonts/Microsoft Himalaya.ttf'],
      //});
      //alert(file.filePath);
      //} catch (err) {
      //console.error(err);
      //}
    }
  };

  const oGBDetails = useSelector((state) => state.GBDetailsReducer.oGBDetails);

  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);

  ////for large
  const nBadgeSize = 12.5;

  // //for xlarge
  // const nBadgeSize = 25;

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Loader loading={bLoader} />
      {/*<View style={styles.headerContainer}>
                <Text style={styles.headerComponent}>
                    My Profile
                </Text>
    </View>*/}
      {/*Avatar*/}
      {/*{Platform.OS === 'android' && (
        <BoxShadow setting={shadowOpt}>
          <Card
            containerStyle={{
              backgroundColor: Colors.white,
              // width:wp(90),
              // height:hp(80),
              //Border Stuff
              borderRadius: 15,
              // borderColor: Colors.black,
              // borderStyle: 'solid',
              // borderWidth: 1,
            }}>
            <View>
              <Avatar
                rounded
                size="xlarge"
                containerStyle={{
                  alignSelf: 'center',
                  marginTop: hp(1),
                  marginBottom: hp(5),
                }}
                source={{
                  uri: oGoogle.photo,
                }}
              />
              <Badge
                badgeStyle={{
                  width: nBadgeSize,
                  height: nBadgeSize,
                  borderRadius: nBadgeSize / 2,
                }}
                status="success"
                containerStyle={{
                  position: 'absolute',
                  top: 130,
                  right: 97.5,
                }}
              />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.labelComponent}>FULL NAME</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueComponent}>
                {oGoogle.givenName + ' ' + oGoogle.familyName}
              </Text>
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.labelComponent}>GREEN BOOK ID</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueComponent}>{oGBDetails.sGBID}</Text>
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.labelComponent}>DATE OF BIRTH</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueComponent}>{oGBDetails.dtDOB}</Text>
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.labelComponent}>EMAIL ADDRESS</Text>
            </View>
            <View
              style={styles.valueContainer}
            >
              <Text style={styles.valueComponent}>{oGoogle.email}</Text>
            </View>
          </Card>
        </BoxShadow>
              )}*/}
      <Card
        containerStyle={styles.cardContainerStyle}
        title={
          <View style={styles.titleViewStyle}>
            <Avatar
              rounded
              size="large"
              containerStyle={styles.avatarContainerStyle}
              source={{
                uri: oGoogle.user.photo,
              }}
            />
            {/*<Badge
              badgeStyle={{
                width: nBadgeSize,
                height: nBadgeSize,
                borderRadius: nBadgeSize / 2,
              }}
              status="success"
              containerStyle={styles.badgeContainerStyle}
            />*/}
            <Text style={styles.headerFullNameComponent}>
              {oGoogle.user.givenName + ' ' + oGoogle.user.familyName}
            </Text>
          </View>
        }
        titleStyle={{}}>
        <Card.Divider style={styles.cardDividerStyle} />
        {/*EMAIL ADDRESS*/}
        <View style={styles.coverViewStyles}>
          <View style={styles.labelContainer}>
            {/* <Text style={styles.labelComponent}>FULL NAME</Text> */}
            {/* <Text style={styles.valueComponent}>
              {oGoogle.user.givenName + ' ' + oGoogle.user.familyName}
            </Text> */}
            <Icon
              style={styles.iconStyle}
              name="envelope"
              type="font-awesome"
              color={Colors.MyProfileEmailColor}
            />
            <Text
              style={{
                ...styles.valueComponent,
              }}>
              {oGoogle.user.email}
            </Text>
            <Text
              style={{
                ...styles.labelComponent,
              }}>
              EMAIL ADDRESS
            </Text>
          </View>
        </View>
        {/*GB ID*/}
        <View style={styles.coverViewStyles}>
          <View style={styles.labelContainer}>
            <Icon
              name="id-card"
              style={styles.iconStyle}
              type="font-awesome"
              color={Colors.MyProfileGBIDColor}
            />
            <Text style={{...styles.valueComponent}}>
              {oDataAPI?.chatrel?.sCountryID}
              {''}
              {oGBDetails.sGBID}
            </Text>
            <Text style={{...styles.labelComponent}}>GREEN BOOK ID</Text>
          </View>
        </View>
        {/*AGE*/}
        <View style={styles.coverViewStyles}>
          <View style={styles.labelContainer}>
            <Icon
              style={styles.iconStyle}
              name="calendar-day"
              type="font-awesome-5"
              color={Colors.MyProfileAgeColor}
            />
            <Text style={{...styles.valueComponent}}>
              {Moment(new Date(), sDateFormat).diff(
                Moment(oGBDetails.dtDOB, sDateFormat),
                'years',
              )}
            </Text>
            <Text style={styles.labelComponent}>AGE</Text>
          </View>
        </View>
        {/*AUTH REGION*/}
        <View style={styles.coverViewStyles}>
          <View style={styles.labelContainer}>
            <Icon
              style={styles.iconStyle}
              name="map-marker-alt"
              type="font-awesome-5"
              color={Colors.MyProfileAuthorityRegionColor}
            />
            <Text
              style={{
                ...styles.valueComponent,
              }}>
              {oDataAPI?.chatrel?.authRegionProfile}
            </Text>
            <Text
              style={{
                ...styles.labelComponent,
                marginBottom: 0,
              }}>
              AUTHORITY REGION
            </Text>
          </View>
        </View>
        {/*<View style={styles.ageLabelContainer}>
      <Text style={styles.ageLabelComponent}>AGE</Text>
    </View>
    <View style={styles.ageValueContainer}>
      <Text style={styles.ageValueComponent}>
        {oUserHardcodedMyProfile.nAge}
      </Text>
</View>*/}

        {/*<View style={styles.sAuthRegionLabelContainer}>
      <Text style={styles.sAuthRegionLabelComponent}>AUTHORITY REGION</Text>
    </View>
    <View style={styles.sAuthRegionValueContainer}>
      <Text style={styles.sAuthRegionValueComponent}>
        {oUserHardcodedMyProfile.sAuthorityRegion}
      </Text>
</View>*/}
      </Card>
    </ScrollView>
  );
};

export const MyProfileScreenOptions = (navData) => {
  return {
    headerTitle: 'MY PROFILE',
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
    // headerRight: CustomHeaderRightButton,
    cardStyle: {backgroundColor: Colors.white},
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // marginHorizontal:
    //   Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
  },
  headerContainer: {
    width: wp(32),
    height: hp(4),
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
    fontFamily: sFontName,
  },
  badgeContainerStyle: {
    position: 'absolute',
    //for large
    top: 67.5,
    right: 145,

    ////for xlarge
    // top: 130,
    // right: 120,
  },
  badgeStyle: {
    alignSelf: 'flex-start',
    textAlignVertical: 'center',
    width: wp(29.5),
    height: hp(4),
    backgroundColor: Colors.websiteLightBlueColor,
  },
  labelContainer: {
    // marginBottom: hp(1),
  },
  labelComponent: {
    fontSize: wp(3.5),
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.labelColorLight,
    fontFamily: sFontName,
    // marginBottom: hp(1),
  },
  headerFullNameContainer: {
    // width: wp(32),
    // height: hp(4),
    // marginBottom:
    //   Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 18 : 30,
  },
  headerFullNameComponent: {
    textAlign: 'center',
    fontSize: wp(7.5),
    fontStyle: 'normal',
    marginVertical: hp(1),
    color: Colors.blackTextAPI,
    // marginBottom: wp(5),
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
  valueContainer: {
    // width: wp(75),
    // height: hp(3),
    // flexDirection: 'row',
    // flexDirection:'row',
    // flex:1
    // flexDirection:'row'
  },
  valueComponent: {
    textAlign: 'center',
    fontSize: wp(5),
    fontStyle: 'normal',
    color: Colors.blackTextAPI,
    fontFamily: sFontName,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    marginBottom: wp(2.5),
    // flex:1
    // flexWrap: 'wrap',
    // flexShrink: 1,
  },

  cardContainerStyle: {
    width: wp(92.5),
    backgroundColor: Colors.white,

    //Border Stuff
    borderRadius: 15,
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS
    shadowRadius: 25,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,

    //For Android
    elevation: 25,
    overflow: 'visible',
    marginBottom: hp(1),
  },

  titleViewStyle: {
    marginBottom: hp(1),
  },

  avatarContainerStyle: {
    alignSelf: 'center',
    // marginTop: hp(1),

    // backgroundColor: Colors.white,

    //Border Stuff
    // borderRadius: 15,
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    // //For iOS
    // shadowRadius: 25,
    // shadowColor: Colors.lightBlueChatrelWebsite,
    // shadowOffset: {width: 5, height: 5},
    // shadowOpacity: 1,

    // //For Android
    // elevation: 25,
    // overflow: 'visible',
  },
  cardDividerStyle: {
    height: 1,
    backgroundColor: Colors.buttonYellow,
    marginBottom: hp(3),
  },
  coverViewStyles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginBottom: hp(3.5),
  },
  iconStyle: {
    marginBottom: hp(1),
  },
});
