/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import AppWrapper from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppWrapper);
// LogBox.ignoreLogs(['Warning: ...']);
console.disableYellowBox = true;
