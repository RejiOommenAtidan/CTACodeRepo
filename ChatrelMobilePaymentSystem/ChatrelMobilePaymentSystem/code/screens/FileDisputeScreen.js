import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {storeJWTToken} from '../store/actions/GBDetailsAction';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import {Platform} from 'react-native';
import {Input, Card, Icon, Image} from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import {Button} from 'react-native-elements';
import RNFS from 'react-native-fs';
import Resolution from '../constants/ResolutionBreakpoint';
import Colors from '../constants/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useForm, Controller} from 'react-hook-form';
import {
  errorComponent,
  errorContainer,
  sFontName,
  sFontNameBold,
  oRequiredStyles,
  oActivityIndicatorStyle,
} from '../constants/CommonConfig';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Loader} from '../components/Loader';
import axios from 'axios';
import {RNCamera} from 'react-native-camera';
import Toast from 'react-native-root-toast';
import {CustomHeaderRightButton} from '../components/HeaderRightButton';
import {DocumentPickerUtil} from 'react-native-document-picker';
// import Icon from 'react-native-vector-icons/FontAwesome';

export const FileDisputeScreen = (props) => {
  const nNoOfFilesAllowed = 2;
  const sNoOfFilesAllowed = 'two files';
  const nFileSizeLimitInMB = 5;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [bLoader, setbLoader] = useState(false);
  const {control, handleSubmit, errors} = useForm();
  // const [sDisputeSingleFile, setsDisputeSingleFile] = useState('');
  // const [sFileName, setsFileName] = useState(null);
  // const [sFileType, setsFileType] = useState('');
  // const [sDisputeSubject, setsDisputeSubject] = useState('');
  const [bCameraVisible, setbCameraVisible] = useState(false);
  const [bShowPreview, setbShowPreview] = useState(false);
  const [sPhotoBase64String, setsPhotoBase64String] = useState(false);
  let singleImageObject = {};
  let singleImageArray = [];
  let sImageName = 'CTA Dispute Capture';
  let sImageFileExtension = 'jpg';
  const showCameraView = () => {
    setbCameraVisible(true);
    setaFileResults([]);
  };
  const togglebCameraVisible = () => {
    setbCameraVisible(!bCameraVisible);
  };
  let bContinueLoop = true;
  const [aFileResults, setaFileResults] = useState([]);
  const [sDisputeMessage, setsDisputeMessage] = useState('');
  //For GB ID
  const oGBDetails = useSelector((state) => state.GBDetailsReducer.oGBDetails);
  const [sGBID, setGBID] = React.useState(oGBDetails?.sGBID);

  //For Name
  const oGoogle = useSelector((state) => state.GLoginReducer.oGoogle);
  const [sName, setName] = React.useState(oGoogle?.user?.name);

  const nNumberOfLines = 5;

  const ref = React.createRef();

  const takePicture = async () => {
    if (ref.current) {
      setbShowPreview(false);
      singleImageObject = {};
      const options = {quality: 0.75, base64: true};
      const data = await ref.current.takePictureAsync(options);
      setbCameraVisible(false);
      setbShowPreview(true);
      setsPhotoBase64String(data.uri);
      var sizeInBytes =
        4 * Math.ceil(data.base64.length / 3) * 0.5624896334383812;
      var sizeInKb = sizeInBytes / 1024;
      var sizeInMb = sizeInKb / 1024;
      singleImageObject.sFileExtension = sImageFileExtension;
      singleImageObject.binFileDoc = data.base64;
      singleImageObject.sTitle = sImageName;
      singleImageObject.size = sizeInMb;
      let myTempArray = [];
      myTempArray.push(singleImageObject);
      setaFileResults(myTempArray);
    }
  };

  const handleDispute = () => {
    ////Check for File Length zero or empty condition
    if (
      sDisputeMessage.length === 0 ||
      sDisputeMessage === '' ||
      sDisputeMessage === '' ||
      sDisputeMessage === null
    ) {
      Alert.alert(
        'Attention Required',
        'Please enter a Description.',
        [
          {
            text: 'Ok',
            onPress: () => {
              true;
            },
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      return;
    }

    if (aFileResults.length === 0 || aFileResults === []) {
      Alert.alert(
        'Attention Required',
        'Please select a file',
        [
          {
            text: 'Ok',
            onPress: () => true,
            style: 'default',
          },
        ],
        {cancelable: false},
      );
      return;
    }

    ////Check for File Count

    // if (aFileResults.length > nNoOfFilesAllowed) {
    //   //debugger;
    //   Alert.alert(
    //     'Attention Required',
    //     'Maximum ' + sNoOfFilesAllowed + ' Allowed.',
    //     [
    //       {
    //         text: 'Ok',
    //         onPress: () => {
    //           true;
    //         },
    //         style: 'default',
    //       },
    //     ],
    //     {cancelable: false},
    //   );
    //   return;
    // }

    ////Check for File Size

    // for (var singleFile in aFileResults) {
    //   //debugger;
    //   if (singleFile.size === nNoOfFilesAllowed * 1024 * 1024) {
    //     Alert.alert(
    //       'Attention Required',
    //       'Maximum file size limit: ' + nFileSizeLimitInMB + ' MB.',
    //       [
    //         {
    //           text: 'Ok',
    //           onPress: () => true,
    //           style: 'default',
    //         },
    //       ],
    //       {cancelable: true},
    //     );
    //     return;
    //   }
    // }

    // bContinueLoop = true;
    // aFileResults.every((singleFile, index) => {
    //   //debugger;
    //   if (singleFile.size > nFileSizeLimitInMB * 1024 * 1024) {
    //     bContinueLoop = false;
    //     Alert.alert(
    //       'Attention Required',
    //       'Maximum file size limit: ' + nFileSizeLimitInMB + ' MB.',
    //       [
    //         {
    //           text: 'Ok',
    //           onPress: () => {
    //             true;
    //           },
    //           style: 'default',
    //         },
    //       ],
    //       {cancelable: false},
    //     );
    //     return false;
    //   }
    // });

    if (bContinueLoop) {
      setbLoader(true);
      const submit = {
        sGBID: sGBID,
        sName: sName,
        description: sDisputeMessage,
        aFileResults: aFileResults,
      };
      //console.log('Final Object');
      //console.log(submit);
      // setbLoader(false);

      // Alert.alert(
      //   'Success',
      //   'Object Created.',
      //   [
      //     {
      //       text: 'Ok',
      //       onPress: () => true,
      //       style: 'default',
      //     },
      //   ],
      //   {cancelable: false},
      // );

      axios
        .post(`/ChatrelPayment/SubmitDispute`, submit)
        .then((resp) => {
          if (resp.status === 200) {
            setsDisputeMessage('');
            setaFileResults([]);
            setbCameraVisible(false);
            setbShowPreview(false);
            setbLoader(false);
            const oSession = {
              sJwtToken: resp.data.token,
              bSession: true,
            };
            dispatch(storeJWTToken(oSession));
            Alert.alert(
              'Success',
              'Thanks for uploading. Your details are sent to the CTA Team & they shall get in touch with you soon.',
              [
                {
                  text: 'Ok',
                  onPress: () => true,
                  style: 'default',
                },
              ],
              {cancelable: false},
            );
            Platform.OS === 'ios'
              ? Toast.show(
                  'Thanks for uploading. Your details are sent to the CTA Team & they shall get in touch with you soon.',
                  {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                    // onShow: () => {
                    //     // calls on toast\`s appear animation start
                    // },
                    // onShown: () => {
                    //     // calls on toast\`s appear animation end.
                    // },
                    // onHide: () => {
                    //     // calls on toast\`s hide animation start.
                    // },
                    // onHidden: () => {
                    //     // calls on toast\`s hide animation end.
                    // }
                  },
                )
              : null;
          } else {
            setbLoader(false);
            alert('Something went wrong, please try again later.');
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            // const oSession = {
            //   sJwtToken: '',
            //   bSession: false,
            // };
            // dispatch(storeJWTToken(oSession));
          } else {
            alert('Something went wrong, please try again later.');
          }
        });
    }
  };

  const selectMultipleFile = async () => {
    //Opening Document Picker for selection of multiple file
    setaFileResults([]);
    setbShowPreview(false);
    setbCameraVisible(false);
    bContinueLoop = true;
    try {
      debugger;
      const aResults = await DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
        ],
      });
      ////debugger;
      for (const singleResult of aResults) {
        //console.log('Single result: ' + singleResult);
        //Printing the log related to the file
        //console.log('res : ' + JSON.stringify(singleResult));
        //// console.log('OG URI : ' + singleResult.uri);
        //console.log('Type : ' + singleResult.type);
        //console.log('File Name : ' + singleResult.name);
        //console.log('File Size : ' + singleResult.size);
        const uri = Platform.select({
          android: singleResult.uri,
          ios: decodeURIComponent(singleResult.uri)?.replace?.('file://', ''),
        });
        //console.log('URI Platform Wise: ' + uri);
        RNFS.readFile(uri, 'base64').then((singleFileBase64Result) => {
          //console.log('Base 64 String File Wise: ' + singleFileBase64Result);
          singleResult.binFileDoc = singleFileBase64Result;
          singleResult.sFileExtension = singleResult.name.split('.').pop();
        });
        singleResult.sTitle = singleResult.name;
      }

      if (aResults.length > nNoOfFilesAllowed) {
        bContinueLoop = false;
        Alert.alert(
          'Attention Required',
          'Maximum ' + sNoOfFilesAllowed + ' Allowed.',
          [
            {
              text: 'Ok',
              onPress: () => {
                true;
              },
              style: 'default',
            },
          ],
          {cancelable: false},
        );
        return;
      }

      aResults.every((singleFile, index) => {
        if (singleFile.size > nFileSizeLimitInMB * 1024 * 1024) {
          bContinueLoop = false;
          Alert.alert(
            'Attention Required',
            'Maximum file size limit: ' + nFileSizeLimitInMB + ' MB.',
            [
              {
                text: 'Ok',
                onPress: () => {
                  true;
                },
                style: 'default',
              },
            ],
            {cancelable: false},
          );
          return false;
        }
      });
      if (bContinueLoop) setaFileResults(aResults);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        console.log('Canceled from multiple doc picker');
      } else {
        //For Unknown Error
        console.log('Unknown Error: ' + JSON.stringify(err));
        //throw err;
      }
    }
  };

  // const selectOneFile = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [
  //         DocumentPicker.types.doc,
  //         DocumentPicker.types.docx,
  //         DocumentPicker.types.pdf,
  //         DocumentPicker.types.images,
  //       ],
  //     });

  //     //TODO:
  //     //if file size less than 2mb then accept
  //     //else
  //     //show feedback and set all to start state

  //     const uri = Platform.select({
  //       android: res.uri,
  //       ios: decodeURIComponent(res.uri)?.replace?.('file://', ''),
  //     });

  //     console.log('uri: ' + uri);

  //     RNFS.readFile(uri, 'base64').then((result) => {
  //       //console.log(result)
  //       setsDisputeSingleFile(result);
  //     });
  //     //setsFileType(res.type);

  //     setsFileType(res.name.split('.').pop());
  //     setsFileName(res.name);
  //   } catch (err) {
  //     //Handling any exception (If any)
  //     if (DocumentPicker.isCancel(err)) {
  //       //If user canceled the document selection & set all to start state
  //       console.info('File Not Selected for Uploading');
  //       setsDisputeSingleFile('');
  //       setsFileName(null);
  //       setsFileType('');
  //     } else {
  //       console.info('Unknown Error: ' + JSON.stringify(err));
  //     }
  //   }
  // };

  useEffect(() => {
    if (isFocused) {
      console.log('File Dispute Called');
      setbLoader(false);
      setsDisputeMessage('');
      setaFileResults([]);
      setbShowPreview(false);
      setbCameraVisible(false);
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
        <Loader loading={bLoader} />
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
              render={({onChange, onBlur, value}) => (
                <Input
                  value={sDisputeMessage}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                    setsDisputeMessage(value);
                  }}
                  placeholder="Description"
                  placeholderTextColor={Colors.grey}
                  //autoFocus={true}
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
              rules={{required: true}}
              defaultValue=""
            />
            {errors.name_sDisputeMessage && (
              <View style={{...errorContainer}}>
                <Text style={errorComponent}>Please enter a Description.</Text>
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
                color: Colors.ChatrelInfoBlue,
              }}
              title="UPLOAD DOCUMENT"
              type="outline"
              titleStyle={{
                color: Colors.ChatrelInfoBlue,
                fontFamily: sFontName,
                fontStyle: 'normal',
                fontWeight: 'normal',
              }}
              buttonStyle={{
                borderRadius: 10,
                borderWidth: 1,
                marginVertical: hp(1),
              }}
              onPress={selectMultipleFile}
            />
            {!bCameraVisible && (
              <Button
                iconRight
                icon={{
                  color: Colors.ChatrelInfoBlue,
                  name: 'camera',
                  type: 'feather',
                }}
                title="TAKE PHOTO"
                type="outline"
                titleStyle={{
                  color: Colors.ChatrelInfoBlue,
                  fontFamily: sFontName,
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                }}
                buttonStyle={{
                  borderRadius: 10,
                  borderWidth: 1,
                  marginVertical: hp(1),
                }}
                onPress={showCameraView}
              />
            )}
            {bCameraVisible && (
              <View
                style={{
                  flex: 1,
                  height: hp(50),
                  marginVertical: hp(7.5),
                }}>
                <RNCamera
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    // height: hp(50),
                    // width:200
                    // marginHorizontal:
                    //   Dimensions.get('window').width *
                    //   Resolution.nWidthScreenMargin,
                  }}
                  captureAudio={false}
                  useNativeZoom
                  ref={ref}
                  type={RNCamera.Constants.Type.back}
                  flashMode={RNCamera.Constants.FlashMode.auto}
                  androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                  }}
                  // androidRecordAudioPermissionOptions={{
                  //   title: 'Permission to use audio recording',
                  //   message: 'We need your permission to use your audio',
                  //   buttonPositive: 'Ok',
                  //   buttonNegative: 'Cancel',
                  // }}
                  // onGoogleVisionBarcodesDetected={({ barcodes }) => {
                  //   console.log(barcodes);
                  // }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}>
                    <Icon
                      touchSoundDisabled={false}
                      size={45}
                      name="camera-retro"
                      type="font-awesome"
                      color={Colors.white}
                      onPress={() => takePicture()}
                    />
                  </View>
                  {/* <Text
                    style={{
                      color: Colors.black,
                      fontFamily: sFontName,
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      justifyContent: 'flex-end',
                    }}
                    onPress={takePicture}>
                    CAPTURE
                  </Text> */}
                </RNCamera>
              </View>
            )}
            {bShowPreview && (
              <View
                style={{
                  flex: 1,
                  marginVertical: hp(2.5),
                }}>
                <View style={styles.selectedFileContainer}>
                  <Text style={styles.selectedFileComponent}>
                    Image Preview:
                  </Text>
                </View>
                <Image
                  source={{uri: sPhotoBase64String}}
                  style={{height: hp(50)}}
                />
              </View>
            )}
          </View>
          <View style={styles.noteContainer}>
            <Text style={styles.noteComponent}>
              {' - Maximum ' + sNoOfFilesAllowed + ' Allowed.'}
            </Text>
            <Text style={styles.noteComponent}>
              {' - Maximum file size limit: ' + nFileSizeLimitInMB + ' MB.'}
            </Text>
          </View>
          {(aFileResults !== [] || aFileResults.length !== 0) && (
            <View style={styles.selectedFileContainer}>
              <Text style={styles.selectedFileComponent}>
                Selected {aFileResults.length === 1 ? 'File' : 'Files'}:{' '}
                {aFileResults.map((fileResult, index) => {
                  return (
                    <Text style={styles.selectedFileComponent}>
                      {fileResult.sTitle}
                      {aFileResults.length - 1 === index ? '' : ', '}
                    </Text>
                  );
                })}
              </Text>
            </View>
          )}
          {/*<View style={styles.infoContainer}>
              <Text style={styles.infoComponent}>
                The response to the dispute will be addressed through an email
                sent to your registered email address.
              </Text>
            </View>*/}
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
                color: Colors.white,
                fontStyle: 'normal',
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
};
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
    cardStyle: {backgroundColor: Colors.white, shadowColor: 'transparent'},
  };
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginVertical:
      Dimensions.get('window').height * Resolution.nHeightScreenMargin,
    // marginHorizontal:
    //   Dimensions.get('window').width * Resolution.nWidthScreenMargin,
  },
  headingContainer: {
    marginTop:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint ? 6 : 10,
    marginBottom:
      Dimensions.get('window').height < Resolution.nHeightBreakpoint
        ? 16.8
        : 28,
  },
  headingComponent: {
    color: Colors.blue,
    fontSize:
      Dimensions.get('window').width < Resolution.nWidthBreakpoint ? 14.4 : 24,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  enterSubjectContainer: {
    marginBottom: hp(2),
  },
  enterSubjectComponent: {
    color: Colors.blackText,
    fontSize: wp(3),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  enterMessageLabelContainer: {
    marginBottom: hp(2),
  },
  enterMessagelabelComponent: {
    // minHeight: hp(5),
    // height: 'auto',
    // textAlignVertical: 'top',
    color: Colors.blackText,
    fontSize: wp(3.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'auto',
  },
  messageContainer: {
    // marginBottom:0
  },
  subjectContainer: {},
  attachImageContainer: {
    marginTop: hp(1),
    marginBottom: hp(1),
  },
  attachImageLabelComponent: {
    color: Colors.blackText,
    fontSize: wp(3.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  selectedFileContainer: {
    marginBottom: hp(2),
  },
  selectedFileComponent: {
    color: Colors.blackText,
    fontSize: wp(3.5),
    fontStyle: 'normal',
    fontWeight: Platform.OS === 'android' ? 'normal' : 'bold',
    fontFamily: Platform.OS === 'android' ? sFontNameBold : sFontName,
    textAlign: 'left',
  },
  noteContainer: {
    marginBottom: hp(2),
  },
  noteComponent: {
    color: Colors.shadowColor,
    fontSize: wp(4),
    fontStyle: 'italic',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'left',
  },
  infoContainer: {
    marginBottom: hp(2),
  },
  infoComponent: {
    color: Colors.blackText,
    fontSize: wp(3.5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlign: 'center',
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
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,

    //For Android
    elevation: 15,
    overflow: 'visible',
  },
  enterMessageInputComponent: {
    color: Colors.blackText,
    fontSize: wp(5),
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: sFontName,
    textAlignVertical: 'top',
  },
  titleStyleView: {
    marginBottom: hp(5.5),
    shadowRadius: 15,
    shadowColor: Colors.lightBlueChatrelWebsite,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
  },
  iconStyles: {
    backgroundColor: Colors.websiteLightBlueColor,
    margin: hp(2),
  },
  iconContainerStyles: {
    // backgroundColor:Colors.white,
    alignSelf: 'flex-start',
    borderRadius: 10,
    elevation: 15,
    position: 'absolute',
    top: -55,
    // left:20,
    //Border Stuff
    // borderColor: Colors.black,
    // borderStyle: 'solid',
    // borderWidth: 0.25,

    //For iOS

    //For Android
    // overflow: 'visible',
  },
});
