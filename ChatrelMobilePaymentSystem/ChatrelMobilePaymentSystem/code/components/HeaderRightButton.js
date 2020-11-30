import React from 'react';
import { Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from './HeaderButton';

export const CustomHeaderRightButton = props => {
    const handleLogoutButtonPress = () => {
        Alert.alert("Logout", "Are you Sure you want to Logout ?",
            [
                {
                    text: 'No',
                    onPress: () => true,
                    style: 'cancel'
                },
                { text: 'Yes', onPress: () => console.log('Yes Pressed') }
            ],
            { cancelable: false }
        )
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