import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Icon}
      iconSize={23}
      //color={Platform.OS === 'android' ? Colors.white : Colors.white}
      color={Colors.white}
    />
  );
};

export default CustomHeaderButton;
