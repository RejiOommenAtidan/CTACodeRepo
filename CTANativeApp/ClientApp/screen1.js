//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';

// import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Input, Button, Text } from 'react-native-elements';
// import AppEdit from './screen2'


export default function App() {
  const [payment, setPayment] = useState(
    {
      dateOfBirth: '',
      employementYears: 0,
      extraDonation: 0,
      greenbookID: 0,
      name: '',
      numberOfYears: 0,
      tibetianAssociation: '',
      totalDue: 0,
      yearOfLastPayment: 0
    }
  );
  const editPayment = () => {
    console.log(payment);
    fetch('http://localhost:52013/api/GreenbookPayments/EditPayment/paymentID=2', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payment)
    })
    .then(response=>response.json())
    .then((json)=>
    {
      console.log(json);
      setPayment({
        dateOfBirth: json.dateOfBirth,
        employementYears: json.employementYears,
        extraDonation: json.extraDonation,
        greenbookID: json.greenbookID,
        name: json.name,
        numberOfYears: json.numberOfYears,
        tibetianAssociation: json.tibetianAssociation,
        totalDue: json.totalDue,
        yearOfLastPayment: json.yearOfLastPayment
      });
    })
    .catch((error) => console.error(error))
    .finally(() => { });
  };
  useEffect(() => {
    const response = fetch('http://localhost:52013/api/GreenbookPayments/GetPayment/paymentID=2')
      .then(response => response.json())
      .then((json) => {
        // setPayment(prevState=>({...prevState,json}))
        setPayment({
          dateOfBirth: json.dateOfBirth,
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
  }, []);
  return (
    <ScrollView>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff', collapsable: true }}
        centerComponent={{ text: 'CTA DEMO', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />

      <View style={{ alignItems: 'center' }}>
        <Text h1 >Payment</Text>
        <Input
          placeholder='Enter GreenBook Number'
          leftIcon={{ type: 'font-awesome', name: 'id-card' }}
          label='GreenBook Number'
          editable={false}
          keyboardType='numeric'
          value={payment.greenbookID}
          onChangeText={value => setPayment({ ...payment, greenbookID: parseInt(value) })}
        />
        <Input
          placeholder='Date of Birth'
          leftIcon={{ type: 'font-awesome', name: 'calendar' }}
          label='Date of Birth'
          value={payment.dateOfBirth.toString()}
          onChangeText={value => setPayment({ ...payment, dateOfBirth: value })}
        />
        <Input
          placeholder='Enter your Name'
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          label='Name'
          value={payment.name.toString()}
          onChangeText={value => setPayment({ ...payment, name: value })}
        />
        <Input
          placeholder='Enter Tibetian Association'
          leftIcon={{ type: 'font-awesome', name: 'map-marker' }}
          label='Tibetian Association'
          value={payment.tibetianAssociation.toString()}
          onChangeText={value => setPayment({ ...payment, tibetianAssociation: value })}
        />
        <Input
          placeholder='Enter the year of last payment'
          leftIcon={{ type: 'font-awesome', name: 'calendar' }}
          label='Year of last payment'
          keyboardType='numeric'
          value={payment.yearOfLastPayment}
          onChangeText={value => setPayment({ ...payment, yearOfLastPayment: parseInt(value) })}
        />
        <Input
          placeholder='Enter the number of years'
          leftIcon={{ type: 'font-awesome', name: 'calendar' }}
          label='Number of years you want to pay for '
          value={payment.numberOfYears}
          keyboardType='numeric'
          onChangeText={value => setPayment({ ...payment, numberOfYears: parseInt(value) })}
        />
        <Input
          placeholder='Enter your employement years'
          leftIcon={{ type: 'font-awesome', name: 'briefcase' }}
          label='How many years you were employed'
          keyboardType='numeric'
          value={payment.employementYears}
          onChangeText={value => setPayment({ ...payment, employementYears: parseInt(value) })}
        />
        <Input
          placeholder='Total Due Amount'
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          label='Total Due'
          keyboardType='numeric'
          value={payment.totalDue}
          onChangeText={value => setPayment({ ...payment, totalDue: parseInt(value) })}
        />
        <Input
          placeholder='Enter Extra donation'
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          label='Extra Donation'
          keyboardType='numeric'
          value={payment.extraDonation}
          onChangeText={value => setPayment({ ...payment, extraDonation: parseInt(value) })}
        />
        <Button title="Pay" type="outline" onPress={editPayment} />
      </View>
    </ScrollView>
  );
}


