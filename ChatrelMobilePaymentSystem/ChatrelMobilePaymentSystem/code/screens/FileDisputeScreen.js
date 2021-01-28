import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { Platform } from 'react-native';
import { Input, Card, Icon } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import { Button } from 'react-native-elements';
import RNFS from 'react-native-fs';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useForm, Controller } from 'react-hook-form';
import {
  errorComponent,
  errorContainer,
  sFontName,
  sFontNameBold,
  oActivityIndicatorStyle,
  oRequiredStyles,
} from '../constants/CommonConfig';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {Loader} from '../components/Loader';
import axios from 'axios';
import { CustomHeaderRightButton } from '../components/HeaderRightButton';
// import Icon from 'react-native-vector-icons/FontAwesome';

export const FileDisputeScreen = (props) => {
  const isFocused = useIsFocused();
  const [bLoader, setbLoader] = useState(false);
  const { control, handleSubmit, errors } = useForm();
  const [sDisputeSingleFile, setsDisputeSingleFile] = useState('');
  const [sFileName, setsFileName] = useState(null);
  const [sFileType, setsFileType] = useState('');
  // const [sDisputeSubject, setsDisputeSubject] = useState('');
  const [sDisputeMessage, setsDisputeMessage] = useState('');
  //For GB ID
  const oGBDetails = useSelector((state) => state.GBDetailsReducer.oGBDetails);
  const [sGBID, setGBID] = React.useState(oGBDetails.sGBID);

  //For Name
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const [sName, setName] = React.useState(oGoogle.user.name);

  const nNumberOfLines = 9;

  const handleDispute = () => {
    if (sDisputeSingleFile === '') {
      Alert.alert(
        'Attention required',
        'Please select a file',
        [
          {
            text: 'Ok',
            onPress: () => true,
            style: 'default',
          },
        ],
        { cancelable: true },
      );
      return;
    }

    setbLoader(true);

    const submit = {
      sGBID: sGBID,
      sName: sName,
      description: sDisputeMessage,
      sTitle: sFileName,
      file: sDisputeSingleFile,
      sFileExtension: sFileType,
    };

    // console.log(submit);

    // axios
    //   .post(`/ChatrelPayment/SubmitDispute`, submit)
    //   .then((resp) => {
    //     if (resp.status === 200) {
    //       setbLoader(false);
    //       alert('Dispute filed successfully');
    //     } else {
    //       setbLoader(false);
    //       alert('Failure filing dispute');
    //     }
    //   })
    //   .catch((error) => {
    //     setbLoader(false);
    //     alert('Something went wrong, please try again later');
    //     //alert(error.message)
    //     console.log(error);
    //   });
  };

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
        ],
      });

      //TODO:
      //if file size less than 2mb then accept
      //else
      //show feedback and set all to start state

      const uri = Platform.select({
        android: res.uri,
        ios: decodeURIComponent(res.uri)?.replace?.('file://', ''),
      });

      RNFS.readFile(uri, 'base64').then((result) => {
        setsDisputeSingleFile(result);
      });
      //setsFileType(res.type);
      setsFileType(res.name.split('.').pop());
      setsFileName(res.name);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection & set all to start state
        console.info('File Not Selected for Uploading');
        setsDisputeSingleFile('');
        setsFileName(null);
        setsFileType('');
      } else {
        console.info('Unknown Error: ' + JSON.stringify(err));
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

  useEffect(() => {
    if (isFocused) {
      setbLoader(false);
      console.log('File Dispute Called');
    }
  }, [isFocused]);

  // if (bLoader) {
  //   return (
  //     bLoader && (
  //       <ActivityIndicator
  //         size={Platform.OS === 'ios' ? 0 : 'large'}
  //         color={Colors.spinnerColor}
  //         animating={true}
  //         //hidesWhenStopped={true}
  //         style={oActivityIndicatorStyle}
  //       />
  //     )
  //   )
  // }
  //if (!bLoader) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.mainContainer}>
        <Loader
          loading={bLoader} />
          {/*<View style={styles.headingContainer}>
          <Text style={styles.headingComponent}>Submit a Dispute</Text>
    </View>*/}
          {/* <View style={styles.enterSubjectContainer}>
          <Text style={styles.enterSubjectComponent}>ENTER SUBJECT</Text>
        </View>
        <View style={styles.subjectContainer}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                value={sDisputeSubject}
                placeholder="Subject"
                leftIcon={{type: 'font-awesome', name: 'envelope'}}
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                  setsDisputeSubject(value);
                }}
                placeholder="Subject"
                autoFocus={false}
                autoCapitalize={'sentences'}
                autoCompleteType={'off'}
                autoCorrect={false}
                clearButtonMode={'while-editing'}
                keyboardType={'default'}
                keyboardAppearance={'default'}
                disableFullscreenUI={true}
              />
            )}
            name="name_sDisputeSubject"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.name_sDisputeSubject && (
            <View style={errorContainer}>
              <Text style={errorComponent}>This is field required.</Text>
            </View>
          )}
        </View> */}
          <Card
            title={
              <View style={styles.titleStyleView}>
                <Icon
                  color={Colors.white}
                  iconStyle={styles.iconStyles}
                  iconProps={{}}
                  //underlayColor={Colors.websiteLightBlueColor}
                  backgroundColor={Colors.websiteLightBlueColor}
                  size={40}
                  type="font-awesome-5"
                  name="file-invoice-dollar"
                  containerStyle={styles.iconContainerStyles}
                />
              </View>
            }
            titleStyle={{}}
            containerStyle={styles.cardContainerStyle}>
            <View style={styles.enterMessageLabelContainer}>
              <Text>
                <Text style={styles.enterMessagelabelComponent}>
                  ENTER DESCRIPTION
                </Text>
                <Text style={oRequiredStyles}>*</Text>
              </Text>
            </View>
            <View style={styles.messageContainer}>
              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <Input
                    value={sDisputeMessage}
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(value);
                      setsDisputeMessage(value);
                    }}
                    placeholder="Description"
                    placeholderTextColor={Colors.grey}
                    autoFocus={false}
                    autoCapitalize={'none'}
                    autoCompleteType={'off'}
                    autoCorrect={false}
                    clearButtonMode={'while-editing'}
                    keyboardType={'default'}
                    keyboardAppearance={'default'}
                    disableFullscreenUI={true}
                    multiline={true}
                    numberOfLines={Platform.OS === 'ios' ? null : nNumberOfLines}
                    minHeight={
                      Platform.OS === 'ios' && nNumberOfLines
                        ? 20 * nNumberOfLines
                        : null
                    }
                    style={styles.enterMessageInputComponent}
                    inputContainerStyle={{}}
                    containerStyle={{
                      paddingHorizontal: 0,
                      // marginBottom:0
                      // marginBotto:0,
                      // paddingBottom:0
                      // marginRight:0,
                      // margin: 0,
                      // padding: 0,
                    }}
                  />
                )}
                name="name_sDisputeMessage"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.name_sDisputeMessage && (
                <View style={{ ...errorContainer }}>
                  <Text style={errorComponent}>Please enter a description</Text>
                </View>
              )}
            </View>
            <View style={styles.attachImageContainer}>
              <Text>
                <Text style={styles.attachImageLabelComponent}>
                  ATTACH DOCUMENT
                </Text>
                <Text style={oRequiredStyles}>*</Text>
              </Text>
            </View>
            <View style={styles.fileUploadContainer}>
              <Button
                iconRight
                icon={{
                  type: 'font-awesome',
                  name: 'paperclip',
                  color: Colors.blue,
                }}
                title="UPLOAD DOCUMENT"
                type="outline"
                titleStyle={{
                  color: Colors.blue,
                  fontFamily: sFontName,
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                }}
                buttonStyle={{
                  borderRadius: 10,
                  borderWidth: 1,
                  marginVertical: hp(1),
                }}
                onPress={selectOneFile}
              />
            </View>
            {sFileName !== null && (
              <View style={styles.selectedFileContainer}>
                <Text style={styles.selectedFileComponent}>
                  Selected File: {sFileName}
                </Text>
              </View>
            )}
            {/* <View style={styles.infoContainer}>
              <Text style={styles.infoComponent}>
                The response to the dispute will be addressed through an email
                sent to your registered email address.
              </Text>
            </View> */}
            <View style={styles.submitDisputeContainer}>
              <Button
                // iconRight
                // icon={{
                //   type: 'font-awesome',
                //   name: 'arrow-right',
                //   color: Colors.white,
                // }}
                title="SUBMIT FILE DISPUTE"
                type="outline"
                onPress={handleSubmit(handleDispute)}
                titleStyle={{
                  fontStyle: 'normal',
                  color: Colors.white,
                  fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
                  fontFamily:
                    Platform.OS === 'android' ? sFontNameBold : sFontName,
                }}
                buttonStyle={{
                  backgroundColor: Colors.buttonYellow,
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: Colors.buttonYellow,
                  marginBottom: hp(0.5),
                }}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    );
  }
//};

export const FileDisputeScreenOptions = (navData) => {
  return {
    headerTitle: 'FILE DISPUTE',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          //iconName={Platform.OS === 'android' ? 'menu' : 'md-menu'}
          iconName={'menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    // headerRight: CustomHeaderRightButton,
    cardStyle: { backgroundColor: Colors.white, shadowColor: 'transparent' },
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // marginHorizontal:
    //   Dimensions.get('window').width * Resolution.nWidthScreenMargin,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
  },
  headingContainer: {
    // width: wp(55),
    // height: hp(4),
    marginTop:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.8
        : 28,
  },
  headingComponent: {
    // width: '100%',
    // height: '100%',
    textAlign: 'left',
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 14.4 : 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blue,
    fontFamily: sFontName,
  },
  enterSubjectContainer: {
    // width: wp(22),
    // height: hp(2),
    marginBottom: hp(2),
  },
  enterSubjectComponent: {
    // width: '100%',
    // height: '100%',
    textAlign: 'left',
    fontSize: wp(3),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    fontFamily: sFontName,
  },
  enterMessageLabelContainer: {
    // width: wp(22),
    // height: hp(2),
    marginBottom: hp(2),
  },
  enterMessagelabelComponent: {
    // width: '100%',
    // minHeight: hp(5),
    // height: 'auto',
    // textAlignVertical: 'top',
    // height: '100%',
    textAlign: 'auto',
    fontSize: wp(3.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    fontFamily: sFontName,
  },
  messageContainer: {
    // marginBottom:0
  },
  subjectContainer: {},
  attachImageContainer: {
    // width: wp(22),
    // height: hp(2),
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  attachImageLabelComponent: {
    // width: '100%',
    // height: '100%',
    textAlign: 'left',
    fontSize: wp(3.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    fontFamily: sFontName,
  },
  selectedFileContainer: {
    // width: wp(80),
    // height: hp(3.75),
    marginBottom: hp(1),
  },
  selectedFileComponent: {
    // width: '100%',
    // height: '100%',
    textAlign: 'left',
    fontSize: wp(3.25),
    fontStyle: 'normal',
    color: Colors.blackText,
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
  },
  infoContainer: {
    // width: wp(80),
    // height: hp(5),
    marginBottom: hp(2),
  },
  infoComponent: {
    // width: '100%',
    // height: '100%',
    textAlign: 'center',
    fontSize: wp(3.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    fontFamily: sFontName,
  },
  fileUploadContainer: {
    marginBottom: hp(2),
  },
  submitDisputeContainer: {
    marginTop: hp(2),
  },

  cardContainerStyle: {
    width: wp(92.5),
    backgroundColor: Colors.white,
    marginTop: hp(5),
    //Border Stuff
    borderRadius: 15,
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS
    shadowRadius: 15,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,

    //For Android
    elevation: 15,
    overflow: 'visible',
  },
  enterMessageInputComponent: {
    textAlignVertical: 'top',
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: Colors.blackText,
    fontFamily: sFontName,
  },
  titleStyleView: {
    marginBottom: hp(5.5),
    shadowRadius: 15,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
  },
  iconStyles: {
    backgroundColor: Colors.websiteLightBlueColor,
    margin: hp(2),
  },
  iconContainerStyles: {
    // backgroundColor:Colors.white,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: -55,
    // left:20,
    //Border Stuff
    borderRadius: 10,
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS

    //For Android
    elevation: 15,
    // overflow: 'visible',
  },
});
