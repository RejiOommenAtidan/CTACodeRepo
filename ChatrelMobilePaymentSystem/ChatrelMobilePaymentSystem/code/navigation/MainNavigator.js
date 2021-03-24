import React from 'react';
import {Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
import {LoginScreen, LoginScreenOptions} from '../screens/LoginScreen';
import Colors from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {sFontName} from '../constants/CommonConfig';
import {CustomSidebarMenu} from '../components/CustomSidebar';
import {ContactUsScreen, ContactUsScreenOptions} from '../screens/ContactUs';

const defaultStackNavOptions = {
  headerMode: 'screen',
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
        options={LoginScreenOptions}></LoginStackNavigator.Screen>
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

const ContactUsStackNavigator = createStackNavigator();

const ContactUsNavigator = () => {
  return (
    <ContactUsStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <ContactUsStackNavigator.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={ContactUsScreenOptions}></ContactUsStackNavigator.Screen>
    </ContactUsStackNavigator.Navigator>
  );
};

const MainDrawerNavigator = createDrawerNavigator();

export const MainNavigator = () => {
  return (
    <MainDrawerNavigator.Navigator
      drawerStyle={{
        backgroundColor: Colors.white,
        width: wp(70),
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
                routeName !== 'FriendChatrel',
            ),
            routes: props.state.routes.filter(
              (route) =>
                route.name !== 'Login' &&
                route.name !== 'GBDetail' &&
                route.name !== 'FriendChatrel',
            ),
          },
        };
        return <CustomSidebarMenu {...filteredProps} />;
      }}
      drawerContentOptions={{
        itemStyle: {
          backgroundColor: Colors.white,
          marginBottom: hp(1),
          marginHorizontal: 0,
          justifyContent: 'flex-start',
        },
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.black,
        labelStyle: {
          alignSelf: 'flex-start',
          fontFamily: sFontName,
          fontSize: wp(3.75),
          fontStyle: 'normal',
          fontWeight: 'normal',
        },
      }}>
      {/*Home*/}
      <MainDrawerNavigator.Screen
        name={'Home'}
        component={HomeNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <AntDesign
              name="home"
              size={size}
              color={focused ? Colors.primary : Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2.5),
              }}
            />
          ),
          drawerLabel: 'HOME',
          gestureEnabled: true,
          swipeEnabled: true,
          unmountOnBlur: true,
        }}></MainDrawerNavigator.Screen>
      {/*Self Chatrel*/}
      <MainDrawerNavigator.Screen
        name={'SelfChatrel'}
        component={SelfChatrelNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="wallet-outline"
              size={size}
              color={focused ? Colors.primary : Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2.5),
              }}
            />
          ),
          drawerLabel: 'SELF CHATREL',
          gestureEnabled: true,
          swipeEnabled: true,
          unmountOnBlur: true,
        }}></MainDrawerNavigator.Screen>
      {/*Friend Chatrel Intermediate*/}
      <MainDrawerNavigator.Screen
        name={'FriendChatrelIntermediate'}
        component={FriendChatrelIntermediateNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="leaf-outline"
              size={size}
              color={focused ? Colors.primary : Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2.5),
              }}
            />
          ),
          drawerLabel: 'FRIENDS & FAMILY',
          gestureEnabled: true,
          swipeEnabled: true,
          unmountOnBlur: true,
        }}></MainDrawerNavigator.Screen>
      {/*Chatrel History*/}
      <MainDrawerNavigator.Screen
        name={'ChatrelHistory'}
        component={ChatrelHistoryNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <Entypo
              name="list"
              size={size}
              color={focused ? Colors.primary : Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2.5),
              }}
            />
          ),
          drawerLabel: 'CHATREL HISTORY',
          gestureEnabled: true,
          swipeEnabled: true,
          unmountOnBlur: true,
        }}></MainDrawerNavigator.Screen>
      {/*File Dispute*/}
      <MainDrawerNavigator.Screen
        name={'FileDispute'}
        component={FileDisputeNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <MaterialCommunityIcons
              name="email-alert-outline"
              size={size}
              color={focused ? Colors.primary : Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2.5),
              }}
            />
          ),
          drawerLabel: 'FILE DISPUTE',
          gestureEnabled: true,
          swipeEnabled: true,
          unmountOnBlur: true,
        }}></MainDrawerNavigator.Screen>
      {/*My Profile*/}
      <MainDrawerNavigator.Screen
        name={'MyProfile'}
        component={MyProfileNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name="person-outline"
              size={size}
              color={focused ? Colors.primary : Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2.5),
              }}
            />
          ),
          drawerLabel: 'MY PROFILE',
          gestureEnabled: true,
          swipeEnabled: true,
          unmountOnBlur: true,
        }}></MainDrawerNavigator.Screen>
      {/*Contact Us*/}
      <MainDrawerNavigator.Screen
        name={'ContactUs'}
        component={ContactUsNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <SimpleLineIcons
              name="envelope-letter"
              size={size}
              color={focused ? Colors.primary : Colors.black}
              style={{
                justifyContent: 'flex-start',
                marginLeft: wp(2.5),
              }}
            />
          ),
          drawerLabel: 'CONTACT US',
          gestureEnabled: true,
          swipeEnabled: true,
          unmountOnBlur: true,
        }}></MainDrawerNavigator.Screen>
      {/*Non-Sidebar Screens*/}
      {/*Login*/}
      <MainDrawerNavigator.Screen
        name={'Login'}
        component={LoginNavigator}
        options={{
          gestureEnabled: false,
          swipeEnabled: false,
          unmountOnBlur: true,
        }}></MainDrawerNavigator.Screen>
      {/*GB Details*/}
      <MainDrawerNavigator.Screen
        name={'GBDetail'}
        component={GBDetailNavigator}
        options={{
          gestureEnabled: false,
          swipeEnabled: false,
          unmountOnBlur: true,
        }}></MainDrawerNavigator.Screen>
      <MainDrawerNavigator.Screen
        name={'FriendChatrel'}
        component={FriendChatrelNavigator}
        options={{
          gestureEnabled: true,
          swipeEnabled: true,
          unmountOnBlur: true,
        }}></MainDrawerNavigator.Screen>
    </MainDrawerNavigator.Navigator>
  );
};
