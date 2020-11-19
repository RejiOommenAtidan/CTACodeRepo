import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ChatrelHistoryScreen } from '../screens/ChatrelHistoryScreen';
import { FileDisputeScreen } from '../screens/FileDisputeScreen';
import { MyProfileScreen } from '../screens/MyProfileScreen';
import { GBDetailScreen } from '../screens/GBDetailScreen';
import HomeScreen, {HomeScreenOptions} from '../screens/HomeScreen';
import { SelfChatrelScreen } from '../screens/SelfChatrel';
import { FriendChatrelIntermediateScreen } from '../screens/FriendChatrelIntermediate';
import { FriendChatrelScreen } from '../screens/FriendChatrelScreen';
import { FamilyChatrelScreen } from '../screens/FamilyChatrel';
import { FamilyChatrelIntermediateScreen } from '../screens/FamilyChatrelIntermediateScreen';
import { LoginScreen } from '../screens/LoginScreen';
import Colors from '../constants/Colors';
import { GLogout } from '../components/GLogout';
// import HeaderButton from '../components/HeaderButton';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

const LoginStackNavigator = createStackNavigator();

const LoginNavigator = () => {
  return (
    <LoginStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <LoginStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown:false,          
          animationEnabled:true,
          gestureEnabled:true,
          cardStyle: { backgroundColor: Colors.greenBG },
          cardShadowEnabled:true
        }}
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
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent', shadowColor: 'transparent' }
          // transparentCard: true,
          // transitionConfig: () => ({
          //   containerStyle: {
          //     backgroundColor: 'transparent',
          //   },
          // })
        }}
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
        options={{
          cardStyle: { backgroundColor: Colors.ChatrelScreensBGColor }
        }}
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
      //options={}
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
        options={{
          cardStyle: { backgroundColor: Colors.ChatrelScreensBGColor }
        }}
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
      //options={}
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
        options={{
          cardStyle: { backgroundColor: Colors.ChatrelScreensBGColor }
        }}
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
      //options={}
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
      //options={}
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
      //options={}
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
      //drawerContent={} 
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontFamily: 'open-sans-bold'
        }
      }}
    >
      {/*Login*/}
      <MainDrawerNavigator.Screen
        name={"Login"}
        component={LoginNavigator}
        options={{
          drawerLabel: 'Login'
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*GBDetails*/}
      <MainDrawerNavigator.Screen
        name={"GBDetail"}
        component={GBDetailNavigator}
        options={{
          drawerLabel: 'GB Details',
          header: null,
          headerLeft: null,
          headerRight: null
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*Home*/}
      <MainDrawerNavigator.Screen
        name={"Home"}
        component={HomeNavigator}
        options={{
          drawerLabel: 'Quick Actions'
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*SelfChatrel*/}
      <MainDrawerNavigator.Screen
        name={"SelfChatrel"}
        component={SelfChatrelNavigator}
        options={{
          drawerLabel: 'Self Chatrel'
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*FamilyChatrelIntermediate*/}
      <MainDrawerNavigator.Screen
        name={"FamilyChatrelIntermediate"}
        component={FamilyChatrelIntermediateNavigator}
        options={{
          drawerLabel: 'Family Chatrel'
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*FamilyChatrel*/}
      <MainDrawerNavigator.Screen
        name={"FamilyChatrel"}
        component={FamilyChatrelNavigator}
        options={{
          drawerLabel: 'Family Chatrel'
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*FriendChatrelIntermediate*/}
      <MainDrawerNavigator.Screen
        name={"FriendChatrelIntermediate"}
        component={FriendChatrelIntermediateNavigator}
        options={{
          drawerLabel: 'Friend Chatrel'
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*FriendChatrel*/}
      <MainDrawerNavigator.Screen
        name={"FriendChatrel"}
        component={FriendChatrelNavigator}
        options={{
          drawerLabel: 'Friend Chatrel'
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*ChatrelHistory*/}
      <MainDrawerNavigator.Screen
        name={"ChatrelHistory"}
        component={ChatrelHistoryNavigator}
        options={{
          drawerLabel: 'Chatrel History'
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*MyProfile*/}
      <MainDrawerNavigator.Screen
        name={"MyProfile"}
        component={MyProfileNavigator}
        options={{
          drawerLabel: 'My Profile'
        }}
      >
      </MainDrawerNavigator.Screen>
      {/*FileDispute*/}
      <MainDrawerNavigator.Screen
        name={"FileDispute"}
        component={FileDisputeNavigator}
        options={{
          drawerLabel: 'File Dispute'
        }}
      >
      </MainDrawerNavigator.Screen>
    </MainDrawerNavigator.Navigator>
  );
};

// const MainNavigator = createDrawerNavigator(
// );

//export default createAppContainer(MainDrawerNavigator);