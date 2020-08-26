//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';

// import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Input, Button, Text } from 'react-native-elements';



export default function App() {
  const [payment, setPayment] = useState(
    {
      dateOfBirth: '',
      employementYears: '',
      extraDonation: '',
      greenbookID: '',
      name: '',
      numberOfYears: '',
      tibetianAssociation: '',
      totalDue: '',
      yearOfLastPayment: ''
    }
  );
  useEffect(() => {
    const response = fetch('http://localhost:52013/api/GreenbookPayments/GetPayment/paymentID=2')
      .then(response => response.json())
      .then((json) => {
        // setPayment(prevState=>({...prevState,json}))
        setPayment({ 
          dateOfBirth : json.dateOfBirth,
          employementYears: json.employementYears,
          extraDonation: json.extraDonation,
          greenbookID: json.greenbookID,
          name: json.name,
          numberOfYears: json.numberOfYears,
          tibetianAssociation: json.tibetianAssociation,
          totalDue: json.totalDue,
          yearOfLastPayment: json.yearOfLastPayment
        })
        // console.log(json)
        // console.log(payment)
      })
      .catch((error) => console.error(error))
      .finally(() => { });
  },[]);
  useEffect(() => {
    console.log(payment.greenbookID)
  },[payment.greenbookID]);
  return (
    <ScrollView>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'CTA DEMO', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        
          <View style={{ alignItems: 'center'}}>
            <Text h1 >Payment</Text>
            <Input
              placeholder='Enter GreenBook Number'
              leftIcon={{ type: 'font-awesome', name: 'id-card' }}
              label='GreenBook Number'
              value={payment.greenbookID.toString()}
              onChangeText={value=>setPayment({...payment,greenbookID:value})}
            />
            <Input
              placeholder='Date of Birth'
              leftIcon={{ type: 'font-awesome', name: 'calendar' }}
              label='Date of Birth'
              value={payment.dateOfBirth.toString()}
              onChangeText={value=>setPayment({...payment,dateOfBirth:value})}
            />
            <Input
              placeholder='Enter your Name'
              leftIcon={{ type: 'font-awesome', name: 'user' }}
              label='Name'
              value={payment.name.toString()}
              onChangeText={value=>setPayment({...payment,name:value})}
            />
            <Input
              placeholder='Enter Tibetian Association'
              leftIcon={{ type: 'font-awesome', name: 'map-marker' }}
              label='Tibetian Association'
              value={payment.tibetianAssociation.toString()}
              onChangeText={value=>setPayment({...payment,tibetianAssociation:value})}
            />
            <Input
              placeholder='Enter the year of last payment'
              leftIcon={{ type: 'font-awesome', name: 'calendar' }}
              label='Year of last payment'
              value={payment.yearOfLastPayment.toString()}
              onChangeText={value=>setPayment({...payment,yearOfLastPayment:value})}
            />
            <Input
              placeholder='Enter the number of years'
              leftIcon={{ type: 'font-awesome', name: 'calendar' }}
              label='Number of years you want to pay for '
              value={payment.numberOfYears.toString()}
              onChangeText={value=>setPayment({...payment,numberOfYears:value})}
            />
            <Input
              placeholder='Enter your employement years'
              leftIcon={{ type: 'font-awesome', name: 'briefcase' }}
              label='How many years you were employed'
              value={payment.employementYears.toString()}
              onChangeText={value=>setPayment({...payment,employementYears:value})}
            />
            <Input
              placeholder='Total Due Amount'
              leftIcon={{ type: 'font-awesome', name: 'user' }}
              label='Total Due'
              value={payment.totalDue.toString()}
              onChangeText={value=>setPayment({...payment,totalDue:value})}
            />
            <Input
              placeholder='Enter Extra donation'
              leftIcon={{ type: 'font-awesome', name: 'user' }}
              label='Extra Donation'
              value={payment.extraDonation.toString()}
              onChangeText={value=>setPayment({...payment,extraDonation:value})}
            />
              <Button title="Pay" type="outline"  />
          </View>
        </ScrollView>
  );
}


