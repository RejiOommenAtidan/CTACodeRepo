import { Platform } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';

import { ChatrelHistoryScreen } from '../screens/ChatrelHistoryScreen';
import { FileDisputeScreen } from '../screens/FileDisputeScreen';
import { GBDetailScreen } from '../screens/GBDetailScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ChatrelPaymentScreen } from '../screens/ChatrelPayment';
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

const ChatrelPaymentNavigator = createStackNavigator(
  {
    ChatrelPayment: ChatrelPaymentScreen
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
        drawerLabel: 'Home'
      }
    },
    GBDetail: {
      screen:GBDetailNavigator,
      navigationOptions: {
        drawerLabel: 'GB Details'
      }
    },
    ChatrelPayment: {
      screen: ChatrelPaymentNavigator,
      navigationOptions: {
        drawerLabel: 'Chatrel Payment'
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
    initialRouteName: "GBDetail",
    // drawerPosition: "right",
    hideStatusBar:true,
    statusBarAnimation:true,
    contentOptions: {
      activeTintColor: Colors.primary,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
);

export default createAppContainer(MainNavigator);