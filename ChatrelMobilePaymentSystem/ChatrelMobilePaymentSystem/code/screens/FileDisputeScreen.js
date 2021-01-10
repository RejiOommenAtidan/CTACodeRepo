import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { Input } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import { Button } from 'react-native-elements';
import RNFS from 'react-native-fs';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import { CustomHeaderRightButton } from '../components/HeaderRightButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
// import Icon from 'react-native-vector-icons/FontAwesome';

export const FileDisputeScreen = (props) => {
  const [sDisputeSingleFile, setsDisputeSingleFile] = useState("");
  const [sFileName, setsFileName] = useState(null);
  const [sFileType, setsFileType] = useState("");
  const [sDisputeSubject, setsDisputeSubject] = useState("");
  const [sDisputeMessage, setsDisputeMessage] = useState("");

  const handleDispute = () => {
    console.log({
      sDisputeSingleFile,
      sDisputeSubject,
      sDisputeMessage,
      sFileName,
      sFileType
    }
    );
  };

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.doc,
        DocumentPicker.types.docx,
        DocumentPicker.types.pdf,
        DocumentPicker.types.images]
      });

      //TODO:
      //if file size less than 2mb then accept 
      //else 
      //show feedback and set all to start state

      const uri = Platform.select({
        android: res.uri,
        ios: decodeURIComponent(res.uri)?.replace?.('file://', ''),
      });

      RNFS.readFile(uri, "base64").then(result => {
        setsDisputeSingleFile(result);
      })
      //setsFileType(res.type);
      setsFileType(res.name.split('.').pop());
      setsFileName(res.name);

    }
    catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection & set all to start state
        alert('File Not Selected for Uploading');
        setsDisputeSingleFile("");
        setsFileName(null);
        setsFileType("");
      }
      else {
        alert('Unknown Error: ' + JSON.stringify(err));
      }
    }
  };

  // const selectMultipleFile = async () => {
  //   //Opening Document Picker for selection of multiple file
  //   try {
  //     const results = await DocumentPicker.pickMultiple({
  //       type: [DocumentPicker.types.images],
  //       //There can me more options as well find above
  //     });
  //     for (const res of results) {
  //       //Printing the log realted to the file
  //       console.log('res : ' + JSON.stringify(res));
  //       console.log('URI : ' + res.uri);
  //       console.log('Type : ' + res.type);
  //       console.log('File Name : ' + res.name);
  //       console.log('File Size : ' + res.size);
  //     }
  //     //Setting the state to show multiple file attributes
  //     setsDisputeMultipleFiles(results);
  //   } catch (err) {
  //     //Handling any exception (If any)
  //     if (DocumentPicker.isCancel(err)) {
  //       //If user canceled the document selection
  //       alert('Canceled from multiple doc picker');
  //     } else {
  //       //For Unknown Error
  //       alert('Unknown Error: ' + JSON.stringify(err));
  //       throw err;
  //     }
  //   }
  // };

  return (
    <View style={styles.mainContainer}>
      {/*<View style={styles.headingContainer}>
        <Text style={styles.headingComponent}>Submit a Dispute</Text>
  </View>*/}
      <View style={styles.enterSubjectContainer}>
        <Text style={styles.enterSubjectComponent}>ENTER SUBJECT</Text>
      </View>
      <View style={styles.subjectContainer}>
        <Input
          value={sDisputeSubject}
          placeholder="Subject"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={value => setsDisputeSubject(value)}
          //label="Subject"
          placeholder="Subject"
          autoFocus={false}
          autoCapitalize={"sentences"}
          autoCompleteType={"off"}
          autoCorrect={false}
          clearButtonMode={"while-editing"}
          keyboardType={"default"}
          keyboardAppearance={"default"}
          disableFullscreenUI={true}
        />
      </View>
      <View style={styles.enterMessageContainer}>
        <Text style={styles.enterMessageComponent}>ENTER MESSAGE</Text>
      </View>
      <View style={styles.messageContainer}>
        <Input
          value={sDisputeMessage}
          placeholder="Comment"
          leftIcon={{ type: 'font-awesome', name: 'comment' }}
          onChangeText={value => setsDisputeMessage(value)}
          //label="Description"
          placeholder="Message"
          autoFocus={false}
          autoCapitalize={"sentences"}
          autoCompleteType={"off"}
          autoCorrect={false}
          clearButtonMode={"while-editing"}
          keyboardType={"default"}
          keyboardAppearance={"default"}
          disableFullscreenUI={true}
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <View style={styles.attachImageContainer}>
        <Text style={styles.attachImageComponent}>ATTACH IMAGE</Text>
      </View>
      <View style={styles.fileUploadContainer}>
        <Button
          iconRight
          icon={{
            type: 'font-awesome',
            name: 'paperclip',
            color: Colors.blue,
          }}
          title="UPLOAD IMAGE"
          type="outline"
          titleStyle={{
            color: Colors.blue,
            fontFamily: 'Kanit-Regular'
          }}
          buttonStyle={{
            borderRadius: 10,
            borderWidth: 1,
            marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3 : 5
          }}
          onPress={selectOneFile}
        //style={styles.buttonStyle}
        />
      </View>
      {sFileName !== null && <View style={styles.selectedFileContainer}>
        <Text style={styles.selectedFileComponent}>Selected File: {sFileName}</Text>
      </View>}
      <View style={styles.infoContainer}>
        <Text style={styles.infoComponent}>
          The response to the dispute will be addressed through an email sent{"\n"} to your registered email address.
        </Text>
      </View>
      <View style={styles.submitDisputeContainer}>
        <Button
          iconRight
          icon={{
            type: 'font-awesome',
            name: 'arrow-right',
            color: Colors.white,
          }}
          title="SUBMIT DISPUTE"
          type="outline"
          onPress={handleDispute}
          titleStyle={{
            color: Colors.white,
            fontFamily: 'Kanit-Regular'
          }}
          buttonStyle={{
            backgroundColor: Colors.buttonYellow,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.buttonYellow,
          }}
        />
      </View>
    </View>
  );
};

export const FileDisputeScreenOptions = navData => {
  return {
    headerTitle: "Submit a Dispute",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? "menu" : "ios-menu-outline"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: CustomHeaderRightButton
  }
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical: Dimensions.get('window').height * Resolution.nHeightScreenMargin
  },
  headingContainer: {
    width: wp(55),
    height: hp(4),
    marginTop: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 16.8 : 28
  },
  headingComponent: {
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
  enterSubjectContainer: {
    width: wp(22),
    height: hp(2),
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6.6 : 11
  },
  enterSubjectComponent: {
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
  enterMessageContainer: {
    width: wp(22),
    height: hp(2),
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 8
  },
  enterMessageComponent: {
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
  messageContainer: {},
  subjectContainer: {},
  attachImageContainer: {
    width: wp(22),
    height: hp(2),
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6
  },
  attachImageComponent: {
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
  selectedFileContainer: {
    width: wp(80),
    height: hp(3.75),
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 3.6 : 6
  },
  selectedFileComponent: {
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
  infoContainer: {
    width: wp(80),
    height: hp(5),
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10
  },
  infoComponent: {
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
  fileUploadContainer: {
    width: wp(45),
    height: hp(7.5),
    marginBottom: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 16.8 : 28
  },
  submitDisputeContainer: {
    marginTop: Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 18 : 30,
  }
  // buttonStyle: {
  //   flexDirection: 'row',
  //   backgroundColor: '#DDDDDD',
  //   padding: 5,
  // }
});