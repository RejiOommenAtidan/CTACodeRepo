import React from 'react';
import { Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from './HeaderButton';
import { GoogleSignin } from '@react-native-community/google-signin';
import { useDispatch } from 'react-redux';
import { removeGoogleCreds } from '../store/actions/GLoginAction';
import { removeCurrentGBDetails } from '../store/actions/CurrentGBDetailsAction';
import { removeGBDetails } from '../store/actions/GBDetailsAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const CustomHeaderRightButton = (props) => {
    let keysToRemove = ['oUserInfo', 'oGBInfo'];
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const removeCompleteDetails = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await AsyncStorage.multiRemove(keysToRemove, (err) => {
                dispatch(removeGoogleCreds);
                dispatch(removeGBDetails);
                dispatch(removeCurrentGBDetails);
                navigation.navigate("Login");
            });
        }
        catch (error) {
            console.error(error);
        }
    };
    const handleLogoutButtonPress = () => {
        Alert.alert("Logout", "Are you Sure you want to Logout ?",
            [
                {
                    text: 'No',
                    onPress: () => true,
                    style: 'cancel'
                },
                { text: 'Yes', onPress: () => removeCompleteDetails() }
            ],
            { cancelable: false }
        );
    };
    return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? "logout" : "logout"}
                onPress={handleLogoutButtonPress}
            />
        </HeaderButtons>
    );
};