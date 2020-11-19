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

export const FileDisputeScreen = (props) => {
  const [sDisputeSingleFile, setsDisputeSingleFile] = useState("");
  const [sFileName, setsFileName] = useState("");
  const [sFileType, setsFileType] = useState("");
  const [sDispute, setsDispute] = useState("");

  const handleDispute = () => {
    console.log({
      sDisputeSingleFile,
      sDispute,
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
        alert('Canceled from single doc picker');
        setsDisputeSingleFile("");
        setsFileName("");
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
    <View style={styles.main}>
      <View style={styles.container}>
        {/*<View style={styles.container}><Text>File a Dispute</Text></View>*/}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={selectOneFile}>
          {/*Single file selection button*/}
          <Text style={{ marginRight: 10 }}>
            Click here to pick one file
          </Text>
          {/*<Image
            source={{
              uri: 'https://img.icons8.com/offices/40/000000/attach.png',
            }}
            style={styles.imageIconStyle}
          />*/}
        </TouchableOpacity>
        <Input
          value={sDispute}
          placeholder="Comment"
          leftIcon={{ type: 'font-awesome', name: 'comment' }}
          onChangeText={value => setsDispute(value)}
          label="Description"
          placeholder="Description Please"
          autoFocus={false}
          autoCapitalize={"sentences"}
          autoCompleteType={"off"}
          autoCorrect={false}
          clearButtonMode={"while-editing"}
          keyboardType={"default"}
          keyboardAppearance={"default"}
          disableFullscreenUI={true}
          //maxLength={7}
          multiline={true}
          numberOfLines={7}
        />
        <Button
          title="Upload"
          type="outline"
          onPress={handleDispute}
        />
      </View>
    </View>
  );
};

export const FileDisputeScreenOptions = navData => {
  return {
    headerTitle: 'File Dispute',
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
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
    padding: 5,
  }
});