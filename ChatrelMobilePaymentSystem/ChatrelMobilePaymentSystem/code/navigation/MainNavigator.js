import React from 'react';
import { Alert, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ChatrelHistoryScreen } from '../screens/ChatrelHistoryScreen';
import { FileDisputeScreen } from '../screens/FileDisputeScreen';
import { MyProfileScreen } from '../screens/MyProfileScreen';
import { GBDetailScreen } from '../screens/GBDetailScreen';
import HomeScreen from '../screens/HomeScreen';
import { SelfChatrelScreen, SelfChatrelScreenOptions } from '../screens/SelfChatrel';
import { FriendChatrelIntermediateScreen } from '../screens/FriendChatrelIntermediate';
import { FriendChatrelScreen } from '../screens/FriendChatrelScreen';
import { FamilyChatrelScreen } from '../screens/FamilyChatrel';
import { FamilyChatrelIntermediateScreen } from '../screens/FamilyChatrelIntermediateScreen';
import { LoginScreen } from '../screens/LoginScreen';
import Colors from '../constants/Colors';
import { GLogout } from '../components/GLogout';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'Kanit-Regular'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerPressColorAndroid: Colors.white
};

const LoginStackNavigator = createStackNavigator();

const LoginNavigator = () => {
  return (
    <LoginStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <LoginStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{
          animationTypeForReplace: "pop",
          headerBackTitleVisible: false,
          headerShown: false,
          headerLeft: null,
          headrRight: null,
          animationEnabled: true,
          gestureEnabled: false,
          cardStyle: { backgroundColor: Colors.greenBG },
          cardShadowEnabled: true
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
        options={{
          headerTitle: 'Quick Actions',
          headerTitleStyle: { color: Colors.blue },
          headerTransparent: true,
          headerLeft: (navData) => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight: (navData) => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
                onPress={() => {
                  Alert.alert("Hello")
                }}
              />
            </HeaderButtons>
          ),
        }}
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
          ...SelfChatrelScreenOptions,
          cardStyle: { backgroundColor: Colors.ChatrelScreensBGColor },

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
        options={{
          cardStyle: { backgroundColor: Colors.blueCardColor },
        }}
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
      //options={
      //{
      //   drawerLabel: 'File Dispute',
      //   title: "File Dispute",
      //   gestureEnabled: true,
      //   headerTitle: "File a Dispute",
      //   swipeEnabled: true,
      //   headerTitleAlign: "center",
      //   headerLeft:(navData)=>(
      //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //       <Item
      //         title="Menu"
      //         iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
      //         onPress={() => {
      //           navData.navigation.toggleDrawer();
      //         }}
      //       />
      //     </HeaderButtons>
      //   ),
      //   headerRight: () => (
      //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
      //       <Item
      //         title="Menu"
      //         iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
      //         onPress={() => {
      //           navData.navigation.navigate('');
      //         }}
      //       />
      //     </HeaderButtons>
      //   )
      // }
      //}
      >
      </FileDisputeStackNavigator.Screen>
    </FileDisputeStackNavigator.Navigator>
  );
};

const MainDrawerNavigator = createDrawerNavigator();

export const MainNavigator = () => {
  return (
    <MainDrawerNavigator.Navigator
      initialRouteName={"FriendChatrelIntermediate"}
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
          //drawerLabel: 'Login',

        }}
      >
      </MainDrawerNavigator.Screen>
      {/*GBDetails*/}
      <MainDrawerNavigator.Screen
        name={"GBDetail"}
        component={GBDetailNavigator}
        options={{
          gestureEnabled: false,
          swipeEnabled: false,
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
          // drawerLabel: 'File Dispute',
          // title: "File Dispute",
          // gestureEnabled: true,
          // headerTitle: "File a Dispute",
          // swipeEnabled: true,
          // headerTitleAlign: "center"
        }}
      >
      </MainDrawerNavigator.Screen>
    </MainDrawerNavigator.Navigator>
  );
};

// const MainNavigator = createDrawerNavigator(
// );

//export default createAppContainer(MainDrawerNavigator);