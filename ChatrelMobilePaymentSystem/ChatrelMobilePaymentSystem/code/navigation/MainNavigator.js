import React from 'react';
import { Alert, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { ChatrelHistoryScreen, ChatrelHistoryScreenOptions } from '../screens/ChatrelHistoryScreen';
import { FileDisputeScreen, FileDisputeScreenOptions } from '../screens/FileDisputeScreen';
import { MyProfileScreen, MyProfileScreenOptions } from '../screens/MyProfileScreen';
import { GBDetailScreen,GBDetailScreenOptions } from '../screens/GBDetailScreen';
import HomeScreen, { HomeScreenOptions } from '../screens/HomeScreen';
import { SelfChatrelScreen, SelfChatrelScreenOptions } from '../screens/SelfChatrel';
import { FriendChatrelIntermediateScreen, FriendChatrelIntermediateScreenOptions } from '../screens/FriendChatrelIntermediate';
import { FriendChatrelScreen, FriendChatrelScreenOptions } from '../screens/FriendChatrelScreen';
import { FamilyChatrelScreen, FamilyChatrelScreenOptions } from '../screens/FamilyChatrel';
import { FamilyChatrelIntermediateScreen, FamilyChatrelIntermediateScreenOptions } from '../screens/FamilyChatrelIntermediateScreen';
import { LoginScreen,LoginScreenOptions } from '../screens/LoginScreen';
import Colors from '../constants/Colors';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { GLogout } from '../components/GLogout';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : Colors.primary
  },
  headerTitleStyle: {
    fontFamily: 'Kanit-Regular'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : 'white',
  headerPressColorAndroid: Colors.white,
  animationTypeForReplace: "pop",
  animationEnabled: true,
  cardShadowEnabled: true
};

const LoginStackNavigator = createStackNavigator();

const LoginNavigator = () => {
  return (
    <LoginStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <LoginStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={LoginScreenOptions}
      >
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
        options={HomeScreenOptions}
      >
      </HomeStackNavigator.Screen>
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
        options={GBDetailScreenOptions}
      >
      </GBDetailStackNavigator.Screen>
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
        options={SelfChatrelScreenOptions}
      >
      </SelfChatrelStackNavigator.Screen>
    </SelfChatrelStackNavigator.Navigator>
  );
};

const FamilyChatrelIntermediateStackNavigator = createStackNavigator();

const FamilyChatrelIntermediateNavigator = () => {
  return (
    <FamilyChatrelIntermediateStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <FamilyChatrelIntermediateStackNavigator.Screen
        name="FamilyChatrelIntermediate"
        component={FamilyChatrelIntermediateScreen}
        options={FamilyChatrelIntermediateScreenOptions}
      >
      </FamilyChatrelIntermediateStackNavigator.Screen>
    </FamilyChatrelIntermediateStackNavigator.Navigator>
  );
};

const FamilyChatrelStackNavigator = createStackNavigator();

const FamilyChatrelNavigator = () => {
  return (
    <FamilyChatrelStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <FamilyChatrelStackNavigator.Screen
        name="FamilyChatrel"
        component={FamilyChatrelScreen}
        options={FamilyChatrelScreenOptions}
      >
      </FamilyChatrelStackNavigator.Screen>
    </FamilyChatrelStackNavigator.Navigator>
  );
};

const FriendChatrelIntermediateStackNavigator = createStackNavigator();

const FriendChatrelIntermediateNavigator = () => {
  return (
    <FriendChatrelIntermediateStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <FriendChatrelIntermediateStackNavigator.Screen
        name="FriendChatrelIntermediate"
        component={FriendChatrelIntermediateScreen}
        options={FriendChatrelIntermediateScreenOptions}
      >
      </FriendChatrelIntermediateStackNavigator.Screen>
    </FriendChatrelIntermediateStackNavigator.Navigator>
  );
};

const FriendChatrelStackNavigator = createStackNavigator();

const FriendChatrelNavigator = () => {
  return (
    <FriendChatrelStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <FriendChatrelStackNavigator.Screen
        name="FriendChatrel"
        component={FriendChatrelScreen}
        options={FriendChatrelScreenOptions}
      >
      </FriendChatrelStackNavigator.Screen>
    </FriendChatrelStackNavigator.Navigator>
  );
};

const ChatrelHistoryStackNavigator = createStackNavigator();

const ChatrelHistoryNavigator = () => {
  return (
    <ChatrelHistoryStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <ChatrelHistoryStackNavigator.Screen
        name="ChatrelHistory"
        component={ChatrelHistoryScreen}
        options={ChatrelHistoryScreenOptions}
      >
      </ChatrelHistoryStackNavigator.Screen>
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
        options={MyProfileScreenOptions}
      >
      </MyProfileStackNavigator.Screen>
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
        options={FileDisputeScreenOptions}
      >
      </FileDisputeStackNavigator.Screen>
    </FileDisputeStackNavigator.Navigator>
  );
};

const MainDrawerNavigator = createDrawerNavigator();

export const MainNavigator = () => {
  return (
    <MainDrawerNavigator.Navigator
      initialRouteName={"Login"}
      drawerPosition={"left"}
      drawerType={"front"}
      hideStatusBar={false}
      statusBarAnimation={"slide"}
      keyboardDismissMode={"on-drag"}
      lazy={true}
      openByDefault={false}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontFamily: 'Kanit-Regular'
        }
      }}
      drawerContent={props => {
        const filteredProps = {
          ...props,
          state: {
            ...props.state,
            routeNames: props.state.routeNames.filter(
              routeName =>
                routeName !== 'Login' &&
                routeName !== 'GBDetail' &&
                routeName !== 'FamilyChatrel' &&
                routeName !== 'FriendChatrel'
            ),
            routes: props.state.routes.filter(
              route =>
                route.name !== 'Login' &&
                route.name !== 'GBDetail' &&
                route.name !== 'FamilyChatrel' &&
                route.name !== 'FriendChatrel'
            ),
          },
        };
        return (
          <DrawerContentScrollView {...filteredProps}>
            <DrawerItemList {...filteredProps} />
          </DrawerContentScrollView>
        );
      }}
    >
      {/*Login*/}
      <MainDrawerNavigator.Screen
        name={"Login"}
        component={LoginNavigator}
        options={{
          //Make it false after dev ends
          gestureEnabled: true,
          swipeEnabled: true
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*GBDetails*/}
      <MainDrawerNavigator.Screen
        name={"GBDetail"}
        component={GBDetailNavigator}
        options={{
          gestureEnabled: false,
          swipeEnabled: false
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*Home*/}
      <MainDrawerNavigator.Screen
        name={"Home"}
        component={HomeNavigator}
        options={{
          drawerLabel: 'Home',
          gestureEnabled: true,
          swipeEnabled: true
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*SelfChatrel*/}
      <MainDrawerNavigator.Screen
        name={"SelfChatrel"}
        component={SelfChatrelNavigator}
        options={{
          drawerLabel: 'Self Chatrel',
          gestureEnabled: true,
          swipeEnabled: true
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*FamilyChatrelIntermediate*/}
      <MainDrawerNavigator.Screen
        name={"FamilyChatrelIntermediate"}
        component={FamilyChatrelIntermediateNavigator}
        options={{
          drawerLabel: 'Family Chatrel',
          gestureEnabled: true,
          swipeEnabled: true
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*FamilyChatrel*/}
      <MainDrawerNavigator.Screen
        name={"FamilyChatrel"}
        component={FamilyChatrelNavigator}
      >
      </MainDrawerNavigator.Screen>
      {/*FriendChatrelIntermediate*/}
      <MainDrawerNavigator.Screen
        name={"FriendChatrelIntermediate"}
        component={FriendChatrelIntermediateNavigator}
        options={{
          drawerLabel: 'Friend Chatrel',
          gestureEnabled: true,
          swipeEnabled: true
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*FriendChatrel*/}
      <MainDrawerNavigator.Screen
        name={"FriendChatrel"}
        component={FriendChatrelNavigator}
      >
      </MainDrawerNavigator.Screen>
      {/*ChatrelHistory*/}
      <MainDrawerNavigator.Screen
        name={"ChatrelHistory"}
        component={ChatrelHistoryNavigator}
        options={{
          drawerLabel: 'Chatrel History',
          gestureEnabled: true,
          swipeEnabled: true
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*MyProfile*/}
      <MainDrawerNavigator.Screen
        name={"MyProfile"}
        component={MyProfileNavigator}
        options={{
          drawerLabel: 'My Profile',
          gestureEnabled: true,
          swipeEnabled: true
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*FileDispute*/}
      <MainDrawerNavigator.Screen
        name={"FileDispute"}
        component={FileDisputeNavigator}
        options={{
          drawerLabel: 'File Dispute',
          gestureEnabled: true,
          swipeEnabled: true
        }}
      >
      </MainDrawerNavigator.Screen>
    </MainDrawerNavigator.Navigator>
  );
};

// const MainNavigator = createDrawerNavigator(
// );

//export default createAppContainer(MainDrawerNavigator);