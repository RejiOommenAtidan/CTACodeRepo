import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
// import {Chatrel} from '../components/Chatrel';
import { Card } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { sDateFormat } from '../constants/CommonConfig';
import Moment from 'moment';

const aFamilyMember = [
  { sName: "Abcd Demo", sRelation: "Mother", dtDOB: "01-01-1972", sGBID: "", nChatrelDue: 250 },
  { sName: "Def Demo", sRelation: "Father", dtDOB: "01-01-1968", sGBID: "", nChatrelDue: 200 },
  { sName: "Ghi Demo", sRelation: "Spouse", dtDOB: "01-01-1996", sGBID: "", nChatrelDue: 225 },
];

export const FamilyChatrelIntermediateScreen = (props) => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text>Family Members</Text>

        <ScrollView>
          {aFamilyMember.map((member, index) => {
            return (
              <View key={index}>
                <TouchableOpacity style={styles.button}>
                  <Card>
                    <Card.Title>{member.sName}</Card.Title>
                    <Text style={{ marginBottom: 10 }}>
                      USD {member.nChatrelDue}
                    </Text>
                    <Card.Divider />
                    <Text style={{ marginBottom: 10 }}>
                      Greenbook ID: {member.sGBID}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Date of Birth :{member.dtDOB}
                    </Text>
                    <Text style={{ marginBottom: 10 }}>
                      Relation: {member.sRelation}
                    </Text>
                  </Card>
                </TouchableOpacity>
              </View>
            )
          })}
        </ScrollView>
      </View>
    </View>
  );
};

FamilyChatrelIntermediateScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Family Chatrel',
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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