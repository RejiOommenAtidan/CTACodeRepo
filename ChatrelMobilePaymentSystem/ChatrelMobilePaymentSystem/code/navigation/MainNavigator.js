import { Platform } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';

import { ChatrelHistoryScreen } from '../screens/ChatrelHistoryScreen';
import { FileDisputeScreen } from '../screens/FileDisputeScreen';
import { GBDetailScreen } from '../screens/GBDetailScreen';
import HomeScreen from '../screens/HomeScreen';
import { SelfChatrelScreen } from '../screens/SelfChatrel';
import { FriendChatrelIntermediateScreen } from '../screens/FriendChatrelIntermediate';
import { FriendChatrelScreen } from '../screens/FriendChatrelScreen';
import { FamilyChatrelScreen } from '../screens/FamilyChatrel';
import { FamilyChatrelIntermediateScreen } from '../screens/FamilyChatrelIntermediateScreen';
import { LoginScreen } from '../screens/LoginScreen';
import Colors from '../constants/Colors';

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

const LoginNavigator = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const GBDetailNavigator = createStackNavigator(
  {
    GBDetail: GBDetailScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const SelfChatrelNavigator = createStackNavigator(
  {
    SelfChatrel: SelfChatrelScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FamilyChatrelNavigator = createStackNavigator(
  {
    FamilyChatrel: FamilyChatrelScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FamilyChatrelIntermediateNavigator = createStackNavigator(
  {
    FamilyChatrelIntermediate: FamilyChatrelIntermediateScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FriendChatrelIntermediateNavigator = createStackNavigator(
  {
    FriendChatrelIntermediate: FriendChatrelIntermediateScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FriendChatrelNavigator = createStackNavigator(
  {
    FriendChatrel: FriendChatrelScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const ChatrelHistoryNavigator = createStackNavigator(
  {
    ChatrelHistory: ChatrelHistoryScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const FileDisputeNavigator = createStackNavigator(
  {
    FileDispute: FileDisputeScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
);

const MainNavigator = createDrawerNavigator(
  {
    Login: {
      screen: LoginNavigator,
      navigationOptions: {
        drawerLabel: 'Login'
      }
    },
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerLabel: 'Quick Actions'
      }
    },
    GBDetail: {
      screen:GBDetailNavigator,
      navigationOptions: {
        drawerLabel: 'GB Details'
      }
    },
    SelfChatrel: {
      screen: SelfChatrelNavigator,
      navigationOptions: {
        drawerLabel: 'Self Chatrel'
      }
    },
    FamilyChatrelIntermediate: {
      screen: FamilyChatrelIntermediateNavigator,
      navigationOptions: {
        drawerLabel: 'Family Chatrel'
      }
    },
    FamilyChatrel: {
      screen: FamilyChatrelNavigator,
      navigationOptions: {
        drawerLabel: 'Family Chatrel'
      }
    },
    FriendChatrelIntermediate: {
      screen: FriendChatrelIntermediateNavigator,
      navigationOptions: {
        drawerLabel: 'Friend Chatrel'
      }
    },
    FriendChatrel: {
      screen: FriendChatrelNavigator,
      navigationOptions: {
        drawerLabel: 'Friend Chatrel',
      }
    },
    ChatrelHistory: {
      screen: ChatrelHistoryNavigator,
      navigationOptions: {
        drawerLabel: 'Chatrel History'
      }
    },
    FileDispute: {
      screen: FileDisputeNavigator,
      navigationOptions: {
        drawerLabel: 'File Dispute'
      }
    }
  },
  {
    initialRouteName: "Login",
    // drawerPosition: "right",
    //hideStatusBar:true,
    statusBarAnimation: true,
    contentOptions: {
      activeTintColor: Colors.primary,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
);

export default createAppContainer(MainNavigator);