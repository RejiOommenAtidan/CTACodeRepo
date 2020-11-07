import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { GLogin } from '../components/GLogin';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

export const LoginScreen = (props) => {

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Image
          source={require('../assets/CTALogo.png')}
          style={{ width: 200, height: 175, marginTop: 50 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.container}>
          <View style={styles.container}>
            <Text>
              Welcome to Chatrel
                </Text>
            <Text>
              Your go-to resource for supporting<Text> the Tibetan Government</Text>
            </Text>
          </View>
          <GLogin props={props}></GLogin>
        </View>
      </View>
    </View>
  );
};


// LoginScreen.navigationOptions = navData => {
//   return {
//     headerTitle: 'Login',
//     headerLeft: (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Menu"
//           iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//     )
//   };
// };


const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});