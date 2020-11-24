import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform, Dimensions } from 'react-native';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../../code/constants/Colors';

export const MyProfileScreen = (props) => {
    const oUserHardcodedMyProfile = {
        sGBID: "7654321",
        sName: "ABCD DEFG",
        nAge: 22,
        dtDOB: "01-01-2001",
        sEmailAddress: "a.b@gmail.com",
        sAuthorityRegion: "Thimpu"
    };
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerComponent}>
                    My Profile
                </Text>
            </View>
            {/*FULL NAME*/}
            <View style={styles.nameLabelContainer}>
                <Text style={styles.nameLabelComponent}>
                    FULL NAME
                </Text>
            </View>
            <View style={styles.nameValueContainer}>
                <Text style={styles.nameValueComponent}>
                    {oUserHardcodedMyProfile.sName}
                </Text>
            </View>
            {/*GBID*/}
            <View style={styles.gbidLabelContainer}>
                <Text style={styles.gbidLabelComponent}>
                    GREENBOOK ID
                </Text>
            </View>
            <View style={styles.gbidValueContainer}>
                <Text style={styles.gbidValueComponent}>
                    {oUserHardcodedMyProfile.sGBID}
                </Text>
            </View>
            {/*DOB*/}
            <View style={styles.dtDOBLabelContainer}>
                <Text style={styles.dtDOBLabelComponent}>
                    DATE OF BIRTH
                </Text>
            </View>
            <View style={styles.dtDOBValueContainer}>
                <Text style={styles.dtDOBValueComponent}>
                    {oUserHardcodedMyProfile.dtDOB}
                </Text>
            </View>
            {/*AGE*/}
            <View style={styles.ageLabelContainer}>
                <Text style={styles.ageLabelComponent}>
                    AGE
                </Text>
            </View>
            <View style={styles.ageValueContainer}>
                <Text style={styles.ageValueComponent}>
                    {oUserHardcodedMyProfile.nAge}
                </Text>
            </View>
            {/*AUTHREGION*/}
            <View style={styles.sAuthRegionLabelContainer}>
                <Text style={styles.sAuthRegionLabelComponent}>
                    AUTHORITY REGION
                </Text>
            </View>
            <View style={styles.sAuthRegionValueContainer}>
                <Text style={styles.sAuthRegionValueComponent}>
                    {oUserHardcodedMyProfile.sAuthorityRegion}
                </Text>
            </View>
            {/*EMAIL ADDRESS*/}
            <View style={styles.emailIDLabelContainer}>
                <Text style={styles.emailIDLabelComponent}>
                    EMAIL ADDRESS
                </Text>
            </View>
            <View style={styles.emailIDValueContainer}>
                <Text style={styles.emailIDValueComponent}>
                    {oUserHardcodedMyProfile.sEmailAddress}
                </Text>
            </View>
        </View>
    );
};

export const MyProfileScreenOptions = navData => {
    return {
        headerTitle: 'My Profile',
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
    mainContainer: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        marginHorizontal: Dimensions.get('window').width * Resolution.nWidthScreenMargin,
        marginVertical: Dimensions.get('window').height * Resolution.nHeightScreenMargin
    },
    headerContainer: {
        width: Dimensions.get('window').width * 0.32,
        height: Dimensions.get('window').height * 0.04,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 18 : 30
    },
    headerComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 14.4 : 24,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blue,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    },

    nameLabelContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.02,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
    },
    nameLabelComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackText,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    },
    nameValueContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.03,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 16.2 : 27
    },
    nameValueComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackTextAPI,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    },

    gbidLabelContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.02,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
    },
    gbidLabelComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackText,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    },
    gbidValueContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.03,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 16.2 : 27
    },
    gbidvalueComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackTextAPI,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    },

    ageLabelContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.02,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
    },
    ageLabelComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackText,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    },
    ageValueContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.03,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 16.2 : 27
    },
    ageValueComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackTextAPI,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    },

    dtDOBLabelContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.02,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
    },
    dtDOBLabelComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackText,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    },
    dtDOBValueContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.03,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 16.2 : 27
    },
    dtDOBValueComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackTextAPI,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    },

    emailIDLabelContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.02,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
    },
    emailIDLabelComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackText,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    },
    emailIDValueContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.03,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 16.2 : 27
    },
    emailIDValueComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackTextAPI,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    },

    sAuthRegionLabelContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.02,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 1.2 : 2
    },
    sAuthRegionLabelComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 6 : 10,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackText,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    },
    sAuthRegionValueContainer: {
        width: Dimensions.get('window').width * 0.75,
        height: Dimensions.get('window').height * 0.03,
        marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 16.2 : 27
    },
    sAuthRegionValueComponent: {
        width: '100%',
        height: '100%',
        textAlign: "left",
        fontSize: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 9.6 : 16,
        fontStyle: "normal",
        fontWeight: "normal",
        color: Colors.blackTextAPI,
        //lineHeight: Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 21 : 35,
        //letterSpacing: Resolution.nLetterSpacing,
        fontFamily: 'Kanit-Regular'
    }
});
