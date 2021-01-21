import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
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

export const CustomSidebarMenu = (props) => {
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  let {activeTintColor, activeBackgroundColor} = props;
  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      {/* <Image
        source={{uri: BASE_PATH + proileImage}}
        style={styles.sideMenuProfileIcon}
      /> */}
      <View
        style={{
          marginLeft: hp(1.5),
          marginTop: hp(2.5),
          marginBottom: hp(1.5),
          flexDirection: 'row',
          justifyContent: 'space-between',
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
            minWidth: 100,
            maxWidth: 150,
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
              fontSize: wp(4.25),
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: Colors.blackTextAPI,
              fontFamily: sFontName,
            }}>
            {oGoogle?.givenName + ' ' + oGoogle?.familyName}
          </Text>
        </View>
      </View>
      <View
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
        <Text
          style={{
            textAlign: 'left',
            fontSize: wp(3.5),
            fontStyle: 'normal',
            fontWeight: 'normal',
            color: Colors.blackTextAPI,
            fontFamily: sFontName,
          }}>
          {oGoogle?.email}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: Colors.separatorColor,
          marginBottom: hp(1.25),
        }}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* <DrawerItem
          label="Visit Us"
          onPress={() => Linking.openURL('https://aboutreact.com/')}
        /> */}
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
            marginTop: hp(1.25),
          }}
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
