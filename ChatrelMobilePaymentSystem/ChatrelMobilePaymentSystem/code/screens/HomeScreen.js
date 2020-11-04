import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';

export const HomeScreen = (props) => {
  return (
    <ScrollView>
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.container}><Text>Quick Actions</Text></View>
        <Card style={styles.card}>
          {/*<Card.Title>Pay for Self</Card.Title>*/}
          {/*<Card.Divider />*/}
          <Card.Image source={require('../assets/CTALogo.png')} />
          <Text>
            Self Payment
            </Text>
        </Card>
        <Card style={styles.card}>
          {/*<Card.Title>Pay for Self</Card.Title>*/}
          {/*<Card.Divider />*/}
          <Card.Image source={require('../assets/CTALogo.png')} />
          <Text>
            Pay for Family
            </Text>
        </Card>
        <Card style={styles.card}>
          {/*<Card.Title>Pay for Self</Card.Title>*/}
          {/*<Card.Divider />*/}
          <Card.Image source={require('../assets/CTALogo.png')} />
          <Text>
            Pay for Friends
            </Text>
        </Card>
        <Card>
        <Card.Image source={require('../assets/Pay.png')} />
          <Text>
            Pendng Amount $197.8
          </Text>
          <Button
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='PAY NOW' 
            onPress={()=>{
              props.navigation.navigate({
                routeName: 'SelfChatrel'
              });
            }}
            />
        </Card>
      </View>
    </View>
    </ScrollView>
  );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Quick Actions',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  card: {
    width: '50%'
  }
});
