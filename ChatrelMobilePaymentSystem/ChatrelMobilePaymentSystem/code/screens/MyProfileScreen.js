import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
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
import {
  sAttentionRequired,
  sDateFormat,
  sFontName,
  sFontNameBold,
  sSomethingWentWrongPleaseTryAgainLater,
} from '../constants/CommonConfig';
import {Avatar, Icon, Card} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from '../components/Loader';
import axios from 'axios';
import {storeJWTToken} from '../store/actions/GBDetailsAction';
import Moment from 'moment';

export const MyProfileScreen = (props) => {
  const isFocused = useIsFocused();
  const [bLoader, setbLoader] = useState(true);
  const [oDataAPI, setoDataAPI] = useState({});
  const dispatch = useDispatch();
  const sJwtToken = useSelector((state) => state.GBDetailsReducer.sJwtToken);

  useEffect(() => {
    if (isFocused) {
      console.log('My Profile Called');
      getChatrelDetails();
    }
  }, [isFocused]);

  const getChatrelDetails = () => {
    setbLoader(true);
    axios
      .get(`/ChatrelPayment/DisplayChatrelPayment/?sGBID=` + oGBDetails.sGBID)
      .then((resp) => {
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
          setTimeout(() => {
            Alert.alert(
              sAttentionRequired,
              sSomethingWentWrongPleaseTryAgainLater,
              [
                {
                  text: 'Ok',
                  onPress: () => true,
                  style: 'cancel',
                },
              ],
              {cancelable: true},
            );
          }, 1000);
        }
      });
  };

  const oGBDetails = useSelector((state) => state.GBDetailsReducer.oGBDetails);

  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Loader loading={bLoader} />
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
        {/*Green Book ID*/}
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
        {/*AUTHORITY REGION*/}
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
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
  },
  headerContainer: {
    height: hp(4),
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 18 : 30,
    width: wp(32),
  },
  headerComponent: {
    color: Colors.blue,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 14.4 : 24,
    height: '100%',
    textAlign: 'left',
    width: '100%',
  },
  badgeStyle: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.websiteLightBlueColor,
    height: hp(4),
    width: wp(29.5),
    textAlignVertical: 'center',
  },
  labelContainer: {},
  labelComponent: {
    color: Colors.labelColorLight,
    fontSize: wp(3.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'center',
  },
  headerFullNameComponent: {
    color: Colors.blackTextAPI,
    fontSize: wp(7.5),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    marginVertical: hp(1),
    textAlign: 'center',
  },
  valueComponent: {
    color: Colors.blackTextAPI,
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    marginBottom: wp(2.5),
    textAlign: 'center',
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
  },
  cardDividerStyle: {
    backgroundColor: Colors.buttonYellow,
    height: 1,
    marginBottom: hp(3),
  },
  coverViewStyles: {
    alignContent: 'center',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp(3.5),
  },
  iconStyle: {
    marginBottom: hp(1),
  },
});
