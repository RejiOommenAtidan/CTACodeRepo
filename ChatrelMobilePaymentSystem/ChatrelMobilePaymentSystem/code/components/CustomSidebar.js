import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Platform,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../code/constants/Colors';
import {sFontName, sFontNameBold} from '../constants/CommonConfig';
import {GoogleSignin} from '@react-native-community/google-signin';
import {useDispatch} from 'react-redux';
import {removeGoogleCreds} from '../store/actions/GLoginAction';
import {removeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import {
  removeGBDetails,
  removeJWTToken,
} from '../store/actions/GBDetailsAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {sAPIBASEURL} from '../constants/CommonConfig';
import {decode as atob, decode, encode as btoa} from 'base-64';
// import {useNavigation} from '@react-navigation/native';

export const CustomSidebarMenu = (props) => {
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const {
    state,
    descriptors,
    navigation,
    inactiveTintColor,
    labelStyle,
    activeTintColor,
    itemStyle,
  } = props;
  let lastGroupName = '';
  let keysToRemove = ['oUserInfo', 'oGBInfo'];
  const dispatch = useDispatch();
  let newGroup = true;
  // const navigation = useNavigation();
  const handleLogoutButtonPress = () => {
    navigation.closeDrawer();
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'No',
          onPress: () => true,
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => removeCompleteDetails()},
      ],
      {cancelable: false},
    );
    const removeCompleteDetails = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await AsyncStorage.multiRemove(keysToRemove, (err) => {
          dispatch(removeGoogleCreds);
          dispatch(removeGBDetails);
          dispatch(removeJWTToken);
          dispatch(removeCurrentGBDetails);
          navigation.navigate('Login');
        });
      } catch (error) {
        console.error(error);
        navigation.navigate('Login');
      }
    };
  };
  axios.defaults.baseURL = sAPIBASEURL;
  const [sessionTimeout, setSessionTimeout] = React.useState(false);
  const [timerId, setTimerId] = React.useState(null);
  const sJwtToken = useSelector((state) => state.GBDetailsReducer.sJwtToken);
  if (
    sJwtToken?.sJwtToken !== null &&
    sJwtToken?.sJwtToken !== undefined &&
    sJwtToken?.sJwtToken !== ''
  ) {
    let oldToken = axios.defaults.headers.common['Authorization'];
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${sJwtToken.sJwtToken}`;

    if (!sJwtToken.bSession) {
      console.log('bSession');
      setSessionTimeout(true);
    }

    console.log('old', oldToken);
    console.log('new', 'Bearer ' + sJwtToken.sJwtToken);
    axios.defaults.headers.common['Authorization'] =
      'Bearer ' + sJwtToken.sJwtToken;

    if (oldToken !== 'Bearer ' + sJwtToken.sJwtToken) {
      console.log('Timer Reset', timerId);

      var base64Url = sJwtToken.sJwtToken.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(
        decode(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(''),
      );
      const jwtObject = JSON.parse(jsonPayload);

      console.log('JWT Token:', JSON.parse(jsonPayload));

      if (timerId) {
        clearTimeout(timerId);
      }

      console.log(timerId);

      console.log(Math.floor(Date.now() / 1000) - jwtObject.exp);
      console.log(Date.now() - jwtObject.exp * 1000);
      const timer = () =>
        setTimeout(() => {
          setSessionTimeout(true);
          Alert.alert(
            'Session Timeout',
            'Your session has expired. Please login again.',
            [
              {
                text: 'Ok',
                onPress: async () => {
                  try {
                    await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();
                    await AsyncStorage.multiRemove(keysToRemove, (err) => {
                      dispatch(removeGoogleCreds);
                      dispatch(removeGBDetails);
                      dispatch(removeJWTToken);
                      dispatch(removeCurrentGBDetails);
                      navigation.navigate('Login');
                    });
                  } catch (error) {
                    navigation.navigate('Login');
                  }
                },
                style: 'default',
              },
            ],
            {cancelable: false},
          );
        }, jwtObject.exp * 1000 - Date.now());
      setTimerId(timer());
    }
    console.log('Token changed:', sJwtToken.sJwtToken);
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Avatar*/}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginLeft: hp(1),
          marginTop: hp(2.5),
          marginBottom: hp(1.5),
        }}>
        <Avatar
          rounded
          size="medium"
          containerStyle={
            {
              //borderColor: Colors.black,
              //borderWidth: 0.75,
              //alignSelf: 'center',
              //justifyContent:"flex-start"
            }
          }
          source={{
            uri: oGoogle?.user.photo,
          }}
        />
        <View
          style={{
            alignContent: 'space-between',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minWidth: wp(25),
            maxWidth: wp(45),
            marginHorizontal: hp(1.5),
            //alignItems:"center",
            //alignSelf:"center"
          }}>
          <Text
            style={{
              color: Colors.blackTextAPI,
              fontSize: wp(5),
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontFamily: sFontName,
              textAlign: 'left',
            }}>
            {oGoogle?.user.givenName + ' ' + oGoogle?.user.familyName}
          </Text>
          <Text
            style={{
              color: Colors.blackTextAPI,
              fontSize: wp(3.75),
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontFamily: sFontName,
              textAlign: 'left',
            }}>
            {oGoogle?.user.email}
          </Text>
        </View>
      </View>
      {/* <View
        style={{
          //marginLeft: hp(1.5),
          //marginTop: hp(2.5),
          marginBottom: hp(1.5),
          marginHorizontal: hp(1.5),
          maxWidth: 210,
          //marginRight: hp(2.5),
          //minWidth:100,
          //maxWidth:150,
          //flexDirection: 'row',
          //justifyContent: 'space-between',
        }}>
      </View> */}
      <View
        style={{
          backgroundColor: Colors.separatorColor,
          height: 1,
          marginTop: hp(1.25),
          marginBottom: hp(1.25),
          width: '100%',
        }}
      />
      <DrawerContentScrollView {...props}>
        {state.routes.map((route) => {
          const {
            drawerLabel,
            activeTintColor,
            groupName,
            drawerIcon,
          } = descriptors[route.key].options;
          if (lastGroupName !== groupName) {
            newGroup = true;
            lastGroupName = groupName;
          } else newGroup = false;
          return (
            <DrawerItem
              //labelStyle={labelStyle}
              inactiveTintColor={inactiveTintColor}
              icon={drawerIcon}
              key={route.key}
              label={({color, focused}) => (
                <Text
                  style={{
                    ...labelStyle,
                    fontWeight: focused
                      ? Platform.OS === 'android'
                        ? 'normal'
                        : 'bold'
                      : 'normal',
                    fontFamily: focused
                      ? Platform.OS === 'android'
                        ? sFontNameBold
                        : sFontName
                      : sFontName,
                    color: focused ? Colors.blue : Colors.black,
                  }}>
                  {drawerLabel}
                </Text>
              )}
              focused={
                // Old Now
                // state.routes.findIndex((e) => e.key === route.key)
                // === state.index
                //0 LS (NA)
                //1 GDS (NA)
                //2 HS (0)
                //3 Self (1)
                //4 Fam IS (2)
                //5 Fam (NA)
                //6 Friend IS (3)
                //7 Friend (NA)
                //8 CHS (4)
                //9 FDS (5)
                //10 MPS (6)
                // state.routes.findIndex((e) => e.key === route.key).id
                // === state.id
                state.routeNames[state.index] === route.name
              }
              activeTintColor={activeTintColor}
              onPress={() => navigation.navigate(route.name)}
              style={styles.drawerItemStyles}
            />
          );
        })}
        <View
          style={{
            backgroundColor: Colors.separatorColor,
            height: 1,
            marginTop: hp(1),
            width: '100%',
          }}
        />
        <DrawerItem
          labelStyle={{
            ...styles.logoutLabelStyles,
            //backgroundColor: Colors.white,
            // marginLeft:0,
            // paddingLeft:0
          }}
          label="LOGOUT"
          style={{
            ...styles.drawerItemStyles,
          }}
          onPress={handleLogoutButtonPress}
          icon={(focused, size, color) => (
            <MaterialIcons
              name="logout"
              size={23}
              color={Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2.5),
              }}
            />
          )}
        />
      </DrawerContentScrollView>
      {/*<View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL('https://cta-portal-webapi.azurewebsites.net/weatherforecast');
            }}>
            Rate Us
          </Text>
          <Image
            source={{uri: BASE_PATH + 'star_filled.png'}}
            style={styles.iconStyle}
          />
          </View>*/}
      {/* <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey',
        }}>
        www.aboutreact.com
      </Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLine: {
    backgroundColor: Colors.grey,
    flex: 1,
    height: 1,
    marginLeft: 10,
    marginRight: 20,
  },
  logoutLabelStyles: {
    alignSelf: 'flex-start',
    color: Colors.black,
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: wp(3.75),
  },
  drawerItemStyles: {
    justifyContent: 'flex-start',
    marginBottom: hp(1),
    marginHorizontal: 0,
    //backgroundColor: Colors.white,
    //borderBottomColor:Colors.black,
    //borderBottomWidth:1,
  },
});
