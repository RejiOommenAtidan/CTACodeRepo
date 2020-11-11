import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';

export const MyProfileScreen = (props) => {
    const oUserHardcodedMyProfile = {
        sGBID: "7654321",
        sName: "ABCD DEFG",
        nAge: 22,
        sAuthorityRegion: "Thimpu"
    };
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text>
                    GBID: {oUserHardcodedMyProfile.sGBID}
                </Text>
            </View>
            <View style={styles.container}>
                <Text>
                    Name: {oUserHardcodedMyProfile.sName}
                </Text>
            </View>
            <View style={styles.container}>
                <Text>
                    Age: {oUserHardcodedMyProfile.nAge}
                </Text>
            </View>
            <View style={styles.container}>
                <Text>
                    Authority Region: {oUserHardcodedMyProfile.sAuthorityRegion}
                </Text>
            </View>
        </View>
    );
};

MyProfileScreen.navigationOptions = navData => {
    return {
        headerTitle: 'My Profile',
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
