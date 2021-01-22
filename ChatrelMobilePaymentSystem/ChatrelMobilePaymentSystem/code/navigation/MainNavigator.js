import React from 'react';
import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  ChatrelHistoryScreen,
  ChatrelHistoryScreenOptions,
} from '../screens/ChatrelHistoryScreen';
import {
  FileDisputeScreen,
  FileDisputeScreenOptions,
} from '../screens/FileDisputeScreen';
import {
  MyProfileScreen,
  MyProfileScreenOptions,
} from '../screens/MyProfileScreen';
import {GBDetailScreen, GBDetailScreenOptions} from '../screens/GBDetailScreen';
import HomeScreen, {HomeScreenOptions} from '../screens/HomeScreen';
import {
  SelfChatrelScreen,
  SelfChatrelScreenOptions,
} from '../screens/SelfChatrel';
import {
  FriendChatrelIntermediateScreen,
  FriendChatrelIntermediateScreenOptions,
} from '../screens/FriendChatrelIntermediate';
import {
  FriendChatrelScreen,
  FriendChatrelScreenOptions,
} from '../screens/FriendChatrelScreen';
import {
  FamilyChatrelScreen,
  FamilyChatrelScreenOptions,
} from '../screens/FamilyChatrel';
import {
  FamilyChatrelIntermediateScreen,
  FamilyChatrelIntermediateScreenOptions,
} from '../screens/FamilyChatrelIntermediateScreen';
import {LoginScreen, LoginScreenOptions} from '../screens/LoginScreen';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {sFontName} from '../constants/CommonConfig';
import {CustomSidebarMenu} from '../components/CustomSidebar';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {GLogout} from '../components/GLogout';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === 'android' ? Colors.primary : Colors.primary,
  },
  headerTitleStyle: {
    fontFamily: sFontName,
  },
  headerBackTitleStyle: {
    fontFamily: sFontName,
  },
  headerTitleAlign: 'center',
  headerTintColor: Platform.OS === 'android' ? 'white' : 'white',
  headerPressColorAndroid: Colors.white,
  animationTypeForReplace: 'pop',
  animationEnabled: true,
  cardShadowEnabled: true,
};

const LoginStackNavigator = createStackNavigator();

const LoginNavigator = () => {
  return (
    <LoginStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <LoginStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={LoginScreenOptions}>
          
        </LoginStackNavigator.Screen>
    </LoginStackNavigator.Navigator>
  );
};

const HomeStackNavigator = createStackNavigator();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <HomeStackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={HomeScreenOptions}></HomeStackNavigator.Screen>
    </HomeStackNavigator.Navigator>
  );
};

const GBDetailStackNavigator = createStackNavigator();

const GBDetailNavigator = () => {
  return (
    <GBDetailStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <GBDetailStackNavigator.Screen
        name="GBDetail"
        component={GBDetailScreen}
        options={GBDetailScreenOptions}></GBDetailStackNavigator.Screen>
    </GBDetailStackNavigator.Navigator>
  );
};

const SelfChatrelStackNavigator = createStackNavigator();

const SelfChatrelNavigator = () => {
  return (
    <SelfChatrelStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <SelfChatrelStackNavigator.Screen
        name="SelfChatrel"
        component={SelfChatrelScreen}
        options={SelfChatrelScreenOptions}></SelfChatrelStackNavigator.Screen>
    </SelfChatrelStackNavigator.Navigator>
  );
};

const FamilyChatrelIntermediateStackNavigator = createStackNavigator();

const FamilyChatrelIntermediateNavigator = () => {
  return (
    <FamilyChatrelIntermediateStackNavigator.Navigator
      screenOptions={defaultStackNavOptions}>
      <FamilyChatrelIntermediateStackNavigator.Screen
        name="FamilyChatrelIntermediate"
        component={FamilyChatrelIntermediateScreen}
        options={
          FamilyChatrelIntermediateScreenOptions
        }></FamilyChatrelIntermediateStackNavigator.Screen>
    </FamilyChatrelIntermediateStackNavigator.Navigator>
  );
};

const FamilyChatrelStackNavigator = createStackNavigator();

const FamilyChatrelNavigator = () => {
  return (
    <FamilyChatrelStackNavigator.Navigator
      screenOptions={defaultStackNavOptions}>
      <FamilyChatrelStackNavigator.Screen
        name="FamilyChatrel"
        component={FamilyChatrelScreen}
        options={
          FamilyChatrelScreenOptions
        }></FamilyChatrelStackNavigator.Screen>
    </FamilyChatrelStackNavigator.Navigator>
  );
};

const FriendChatrelIntermediateStackNavigator = createStackNavigator();

const FriendChatrelIntermediateNavigator = () => {
  return (
    <FriendChatrelIntermediateStackNavigator.Navigator
      screenOptions={defaultStackNavOptions}>
      <FriendChatrelIntermediateStackNavigator.Screen
        name="FriendChatrelIntermediate"
        component={FriendChatrelIntermediateScreen}
        options={
          FriendChatrelIntermediateScreenOptions
        }></FriendChatrelIntermediateStackNavigator.Screen>
    </FriendChatrelIntermediateStackNavigator.Navigator>
  );
};

const FriendChatrelStackNavigator = createStackNavigator();

const FriendChatrelNavigator = () => {
  return (
    <FriendChatrelStackNavigator.Navigator
      screenOptions={defaultStackNavOptions}>
      <FriendChatrelStackNavigator.Screen
        name="FriendChatrel"
        component={FriendChatrelScreen}
        options={
          FriendChatrelScreenOptions
        }></FriendChatrelStackNavigator.Screen>
    </FriendChatrelStackNavigator.Navigator>
  );
};

const ChatrelHistoryStackNavigator = createStackNavigator();

const ChatrelHistoryNavigator = () => {
  return (
    <ChatrelHistoryStackNavigator.Navigator
      screenOptions={defaultStackNavOptions}>
      <ChatrelHistoryStackNavigator.Screen
        name="ChatrelHistory"
        component={ChatrelHistoryScreen}
        options={
          ChatrelHistoryScreenOptions
        }></ChatrelHistoryStackNavigator.Screen>
    </ChatrelHistoryStackNavigator.Navigator>
  );
};

const MyProfileStackNavigator = createStackNavigator();

const MyProfileNavigator = () => {
  return (
    <MyProfileStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <MyProfileStackNavigator.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={MyProfileScreenOptions}></MyProfileStackNavigator.Screen>
    </MyProfileStackNavigator.Navigator>
  );
};

const FileDisputeStackNavigator = createStackNavigator();

const FileDisputeNavigator = () => {
  return (
    <FileDisputeStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <FileDisputeStackNavigator.Screen
        name="FileDispute"
        component={FileDisputeScreen}
        options={FileDisputeScreenOptions}></FileDisputeStackNavigator.Screen>
    </FileDisputeStackNavigator.Navigator>
  );
};

const MainDrawerNavigator = createDrawerNavigator();

export const MainNavigator = () => {
  return (
    <MainDrawerNavigator.Navigator
      drawerStyle={{
        backgroundColor: Colors.white,
        width: wp(62.5),
      }}
      initialRouteName={'Login'}
      drawerPosition={'left'}
      drawerType={'front'}
      hideStatusBar={Platform.OS === 'ios' ? true : false}
      statusBarAnimation={'slide'}
      keyboardDismissMode={'on-drag'}
      lazy={true}
      openByDefault={false}
      drawerContent={(props) => {
        const filteredProps = {
          ...props,
          state: {
            ...props.state,
            routeNames: props.state.routeNames.filter(
              (routeName) =>
                routeName !== 'Login' &&
                routeName !== 'GBDetail' &&
                routeName !== 'FamilyChatrel' &&
                routeName !== 'FriendChatrel',
            ),
            routes: props.state.routes.filter(
              (route) =>
                route.name !== 'Login' &&
                route.name !== 'GBDetail' &&
                route.name !== 'FamilyChatrel' &&
                route.name !== 'FriendChatrel',
            ),
          },
        };
        return <CustomSidebarMenu {...filteredProps} />;
      }}
      drawerContentOptions={{
        itemStyle: {
          //borderBottomWidth:0.75,
          //borderBottomColor:Colors.black,
          justifyContent: 'flex-start',
          marginBottom: hp(1),
          backgroundColor: Colors.white,
          // borderBottomColor:Colors.black,
          // borderBottomWidth:1,
          marginHorizontal: 0,
          // marginLeft:wp(2)
          //alignContent:"center",
          //alignSelf:"center"
        },
        // activeBackgroundColor:Colors.blue,
        // inactiveTintColor:Colors.blue,
        // contentContainerStyle:{
        //
        // },
        activeTintColor: Colors.black,
        inactiveTintColor: Colors.black,
        labelStyle: {
          fontFamily: sFontName,
          fontStyle: 'normal',
          fontWeight: 'normal',
          alignSelf: 'flex-start',
          fontSize: wp(3.75),
        },
      }}>
      {/*Login*/}
      <MainDrawerNavigator.Screen
        name={'Login'}
        component={LoginNavigator}
        options={{
          //Make it false after dev ends
          gestureEnabled: false,
          swipeEnabled: false,
        }}></MainDrawerNavigator.Screen>
      {/*GBDetails*/}
      <MainDrawerNavigator.Screen
        name={'GBDetail'}
        component={GBDetailNavigator}
        options={{
          gestureEnabled: false,
          swipeEnabled: false,
        }}></MainDrawerNavigator.Screen>
      {/*Home*/}
      <MainDrawerNavigator.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <AntDesign
              name="home"
              size={size}
              color={Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2),
              }}
            />
          ),
          drawerLabel: 'HOME',
          //labelStyle:{fontfamily:sFontName},
          gestureEnabled: true,
          swipeEnabled: true,
        }}></MainDrawerNavigator.Screen>
      {/*SelfChatrel*/}
      <MainDrawerNavigator.Screen
        name={'SelfChatrel'}
        component={SelfChatrelNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="wallet-outline"
              size={size}
              color={Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2),
              }}
            />
          ),
          drawerLabel: 'SELF CHATREL',
          gestureEnabled: true,
          swipeEnabled: true,
        }}></MainDrawerNavigator.Screen>
      {/*FamilyChatrelIntermediate*/}
      <MainDrawerNavigator.Screen
        name={'FamilyChatrelIntermediate'}
        component={FamilyChatrelIntermediateNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <AntDesign
              name="hearto"
              size={size}
              color={Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2),
              }}
            />
          ),
          drawerLabel: 'FAMILY CHATREL',
          gestureEnabled: true,
          swipeEnabled: true,
        }}></MainDrawerNavigator.Screen>
      {/*FamilyChatrel*/}
      <MainDrawerNavigator.Screen
        name={'FamilyChatrel'}
        component={FamilyChatrelNavigator}></MainDrawerNavigator.Screen>
      {/*FriendChatrelIntermediate*/}
      <MainDrawerNavigator.Screen
        name={'FriendChatrelIntermediate'}
        component={FriendChatrelIntermediateNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="leaf-outline"
              size={size}
              color={Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2),
              }}
            />
          ),
          drawerLabel: 'FRIEND CHATREL',
          gestureEnabled: true,
          swipeEnabled: true,
        }}></MainDrawerNavigator.Screen>
      {/*FriendChatrel*/}
      <MainDrawerNavigator.Screen
        name={'FriendChatrel'}
        component={FriendChatrelNavigator}></MainDrawerNavigator.Screen>
      {/*ChatrelHistory*/}
      <MainDrawerNavigator.Screen
        name={'ChatrelHistory'}
        component={ChatrelHistoryNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <Entypo
              name="list"
              size={size}
              color={Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2),
              }}
            />
          ),
          drawerLabel: 'CHATREL HISTORY',
          gestureEnabled: true,
          swipeEnabled: true,
        }}></MainDrawerNavigator.Screen>
      {/*FileDispute*/}
      <MainDrawerNavigator.Screen
        draw
        name={'FileDispute'}
        component={FileDisputeNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <MaterialCommunityIcons
              name="email-alert-outline"
              size={size}
              color={Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2),
              }}
            />
          ),
          drawerLabel: 'FILE DISPUTE',
          gestureEnabled: true,
          swipeEnabled: true,
        }}></MainDrawerNavigator.Screen>
      {/*MyProfile*/}
      <MainDrawerNavigator.Screen
        name={'MyProfile'}
        component={MyProfileNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2),
              }}
            />
          ),
          drawerLabel: 'MY PROFILE',
          gestureEnabled: true,
          swipeEnabled: true,
        }}></MainDrawerNavigator.Screen>
    </MainDrawerNavigator.Navigator>
  );
};

// const MainNavigator = createDrawerNavigator(
// );

//export default createAppContainer(MainDrawerNavigator);
