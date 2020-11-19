import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { Card } from 'react-native-elements';
import { sDateFormat } from '../constants/CommonConfig';
import Moment from 'moment';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Resolution from '../constants/ResolutionBreakpoint';

export const FamilyChatrelIntermediateScreen = (props) => {
  const [aFamilyMembers, setaFamilyMembers] = useState([]);
  const oCurrentGBDetails = useSelector(state => state.CurrentGBDetailsReducer.oCurrentGBDetails);
  const getFamilyDetails = () => {
    axios.get(`/ChatrelPayment/GetFamilyDetails/?sGBID=` + oCurrentGBDetails.sGBID)
      .then(resp => {
        if (resp.status === 200) {
          setaFamilyMembers(resp.data);
        }
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.config);
      });
  };

  useEffect(() => {
    getFamilyDetails();
  });
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text>Family Members</Text>
      </View>
        <ScrollView>
          {aFamilyMembers.map((member, index) => {
            return (
              <TouchableOpacity key={index} style={styles.button} onPress={() => { console.log(member) }}>
                <Card>
                  <Card.Title>{member.sName}</Card.Title>
                  <Text style={{ marginBottom: 10 }}>
                    USD : {member.dPending}
                  </Text>
                  <Card.Divider />
                  <Text style={{ marginBottom: 10 }}>
                    Greenbook ID: {member.sGBIDRelation}
                  </Text>
                  <Text style={{ marginBottom: 10 }}>
                    Age :{member.nAge}
                  </Text>
                  <Text style={{ marginBottom: 10 }}>
                    DOB:{Moment(member.dtDOB).format(sDateFormat)}
                  </Text>
                  <Text style={{ marginBottom: 10 }}>
                    Relation: {member.sRelation}
                  </Text>
                </Card>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
    </View>
  );
};

export const FamilyChatrelIntermediateScreenOptions = navData => {
  return {
    headerTitle: 'Family Chatrel',
    headerLeft: () => {
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
        }
  };
};


const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical: Dimensions.get('window').height * Resolution.nHeightScreenMargin
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});