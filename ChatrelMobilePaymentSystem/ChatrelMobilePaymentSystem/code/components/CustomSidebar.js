import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Platform,
  Alert,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { Avatar } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../code/constants/Colors';
import { sFontName, sFontNameBold } from '../constants/CommonConfig';
import { GoogleSignin } from '@react-native-community/google-signin';
import { useDispatch } from 'react-redux';
import { removeGoogleCreds } from '../store/actions/GLoginAction';
import { removeCurrentGBDetails } from '../store/actions/CurrentGBDetailsAction';
import { removeGBDetails } from '../store/actions/GBDetailsAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';

export const CustomSidebarMenu = (props) => {
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const {
    state,
    descriptors,
    navigation,
    activeTintColor,
    inactiveTintColor,
    itemStyle,
    labelStyle,
  } = props;
  let lastGroupName = '';
  let newGroup = true;
  let keysToRemove = ['oUserInfo', 'oGBInfo'];
  const dispatch = useDispatch();
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
        { text: 'Yes', onPress: () => removeCompleteDetails() },
      ],
      { cancelable: false },
    );
    const removeCompleteDetails = async () => {
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        await AsyncStorage.multiRemove(keysToRemove, (err) => {
          dispatch(removeGoogleCreds);
          dispatch(removeGBDetails);
          dispatch(removeCurrentGBDetails);
          navigation.navigate('Login');
        });
      } catch (error) {
        console.error(error);
        navigation.navigate('Login');
      }
    };
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Avatar*/}
      <View
        style={{
          marginLeft: hp(1),
          marginTop: hp(2.5),
          marginBottom: hp(1.5),
          flexDirection: 'row',
          justifyContent: 'flex-start',
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
            minWidth: wp(25),
            maxWidth: wp(45),
            marginHorizontal: hp(1.5),
            flexDirection: 'column',
            justifyContent: 'space-between',
            //alignItems:"center",
            alignContent: 'space-between',

            //alignItems:"center",
            //alignSelf:"center"
          }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: wp(5),
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: Colors.blackTextAPI,
              fontFamily: sFontName,
            }}>
            {oGoogle?.user.givenName + ' ' + oGoogle?.user.familyName}
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: wp(3.75),
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: Colors.blackTextAPI,
              fontFamily: sFontName,
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
          width: '100%',
          height: 1,
          backgroundColor: Colors.separatorColor,
          marginTop: hp(1.25),
          marginBottom: hp(1.25),
        }}
      />
      <DrawerContentScrollView {...props}>
        {/* {console.log(props)} */}
        {/* <DrawerItemList {...props} /> */}
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
        {state.routes.map((route) => {
          const {
            drawerLabel,
            activeTintColor,
            groupName,
            drawerIcon,
          } = descriptors[route.key].options;
          // console.log(route);
          // console.log(activeTintColor);
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
              label={({ color, focused }) => (
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
            width: '100%',
            height: 1,
            backgroundColor: Colors.separatorColor,
            marginTop: hp(1),
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
            // margin:0
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

// const styles = StyleSheet.create({
//   sideMenuProfileIcon: {
//     resizeMode: 'center',
//     width: 100,
//     height: 100,
//     borderRadius: 100 / 2,
//     alignSelf: 'center',
//   },
//   iconStyle: {
//     width: 15,
//     height: 15,
//     marginHorizontal: 5,
//   },
//   customItem: {
//     padding: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
  },
  sectionLine: {
    backgroundColor: Colors.grey,
    flex: 1,
    height: 1,
    marginLeft: 10,
    marginRight: 20,
  },
  logoutLabelStyles: {
    fontFamily: sFontName,
    fontStyle: 'normal',
    fontWeight: 'normal',
    alignSelf: 'flex-start',
    fontSize: wp(3.75),
    color: Colors.black,
  },
  drawerItemStyles: {
    justifyContent: 'flex-start',
    marginBottom: hp(1),
    //backgroundColor: Colors.white,
    // borderBottomColor:Colors.black,
    // borderBottomWidth:1,
    marginHorizontal: 0,
  },
});
