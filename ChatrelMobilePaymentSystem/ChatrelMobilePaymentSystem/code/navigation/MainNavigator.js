import { Platform } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';

// import CustomHeaderButton from '../components/HeaderButton';
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
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  // cardStyle: {
  //   backgroundColor: '#168b44'
  // },
};

const LoginNavigator = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    //headerBackTitleVisible:false,
    // cardShadowEnabled:true,
    // headerTransitionPreset:"fade-in-place",
    // headerMode: "none",
    // navigationOptions: (navigation) => ({
    //   header: null,
    //   headerLeft: null,
    //   headerRight: null,
    //   // drawerIcon: CustomHeaderButton
    // }),
    // transparentCard:true,
    // mode:"modal",
    // headerLayoutPreset:"center",
    // cardShadowEnabled:"",
    // cardOverlayEnabled:true,
    // headerMode: "screen",
    // defaultNavigationOptions: defaultStackNavOptions,

    cardStyle: { backgroundColor: Colors.greenBG }
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
    defaultNavigationOptions: defaultStackNavOptions,
    headerMode: 'none',
    cardStyle: { backgroundColor: 'transparent', shadowColor: 'transparent' },
    transparentCard: true,
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'transparent',
      },
    })
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
        drawerLabel: 'Login',
        header: null,
        headerLeft: null,
        headerRight: null,
      }
    },
    GBDetail: {
      screen: GBDetailNavigator,
      navigationOptions: {
        drawerLabel: 'GB Details',
        header: null,
        headerLeft: null,
        headerRight: null,
      }
    },
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerLabel: 'Quick Actions'
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
    initialRouteName: "Home",
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