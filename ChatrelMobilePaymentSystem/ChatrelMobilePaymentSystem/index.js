/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import AppWrapper from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppWrapper);
