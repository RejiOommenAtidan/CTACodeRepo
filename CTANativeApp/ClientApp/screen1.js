//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,  View ,ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Header,Input, Button, ThemeProvider ,Text } from 'react-native-elements';
export default function App() {
  return (
      <MyApp/>
    );
}
const MyApp = () => {
  return (
    <View>
        <ThemeProvider>
    <Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'CTA DEMO', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/>
    <ScrollView>
    <View style={{alignItems: 'center'}}>
  
    
    

                <Text h1 >Payment</Text>
                
                <Input
                placeholder='Enter GreenBook Number'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                label='GreenBook Number'
                value="81391831831"
                />
               <Input
                placeholder='Date of Birth'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                label='Date of Birth'
                value="2020-08-25"
                />
                <Input
                placeholder='Enter your Name'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                label='Name'
                value='aayush'
                />
                <Input
                placeholder='Enter the year of last payment'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                label='Year of last payment'
                value='2018'
                />
                <Input
                placeholder='Enter the number of years'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                label='Number of years you want to pay for '
                value='2'
                />
                <Input
                placeholder='Enter your employement years'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                label='How many years you were employed'
                value='2'
                />
                <Input
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                label='Total Due'
                value='2000'
                />
                <Input
                placeholder='Enter Extra donation'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                label='Extra Donation'
                value='500'
                />
                <Input
                
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                label='Total Due'
                value='2500'
                />
                <View>
      <Button title="Pay" type="outline"  />
      </View>
    

    </View>
    </ScrollView>
    </ThemeProvider>
    </View>
  );
};

