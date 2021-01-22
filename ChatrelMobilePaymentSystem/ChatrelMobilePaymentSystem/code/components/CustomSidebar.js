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

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../code/constants/Colors';
import {sFontName} from '../constants/CommonConfig';
import {GoogleSignin} from '@react-native-community/google-signin';
import {useDispatch} from 'react-redux';
import {removeGoogleCreds} from '../store/actions/GLoginAction';
import {removeCurrentGBDetails} from '../store/actions/CurrentGBDetailsAction';
import {removeGBDetails} from '../store/actions/GBDetailsAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';

export const CustomSidebarMenu = (props) => {
  console.log();
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  // let {activeTintColor, activeBackgroundColor} = props;
  let keysToRemove = ['oUserInfo', 'oGBInfo'];
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const handleLogoutButtonPress = () => {
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
          dispatch(removeCurrentGBDetails);
          props.navigation.closeDrawer();
          props.navigation.navigate('Login');
        });
      } catch (error) {
        console.error(error);
      }
    };
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      {/* <Image
        source={{uri: BASE_PATH + proileImage}}
        style={styles.sideMenuProfileIcon}
      /> */}
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
            uri: oGoogle?.photo,
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
              fontSize: wp(4),
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: Colors.blackTextAPI,
              fontFamily: sFontName,
            }}>
            {oGoogle?.givenName + ' ' + oGoogle?.familyName}
          </Text>
          <Text
            style={{
              textAlign: 'left',
              fontSize: wp(3),
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: Colors.blackTextAPI,
              fontFamily: sFontName,
            }}>
            {oGoogle?.email}
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
          marginBottom: 0,
        }}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        {/* <View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            Rate Us
          </Text>
          <Image
            source={{uri: BASE_PATH + 'star_filled.png'}}
            style={styles.iconStyle}
          />
        </View> */}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: Colors.separatorColor,
            marginTop: Platform.OS === 'android' ? hp(1) : hp(1),
          }}
        />
      </DrawerContentScrollView>
      <DrawerItem label="LOGOUT" onPress={handleLogoutButtonPress} />
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
