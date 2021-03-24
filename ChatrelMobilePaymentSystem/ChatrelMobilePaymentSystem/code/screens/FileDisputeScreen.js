import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  Keyboard,
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
  sAttentionRequired,
  sFileDisputeSubmitSuccessMessage,
  sSomethingWentWrongPleaseTryAgainLater,
} from '../constants/CommonConfig';
import {useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Loader} from '../components/Loader';
import axios from 'axios';
import {RNCamera} from 'react-native-camera';

export const FileDisputeScreen = (props) => {
  const nNoOfFilesAllowed = 2;
  const sNoOfFilesAllowed = 'two files';
  const nFileSizeLimitInMB = 5;
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [bLoader, setbLoader] = useState(false);
  const {control, handleSubmit, errors} = useForm();
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
      setTimeout(() => {
        Alert.alert(
          sAttentionRequired,
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
      }, 1000);
      return;
    }

    if (aFileResults.length === 0 || aFileResults === []) {
      Alert.alert(
        sAttentionRequired,
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

    if (bContinueLoop) {
      setbLoader(true);
      const submit = {
        description: sDisputeMessage,
        aFileResults: aFileResults,
      };

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
            setTimeout(() => {
              Alert.alert(
                'Success',
                sFileDisputeSubmitSuccessMessage,
                [
                  {
                    text: 'Ok',
                    onPress: () => true,
                    style: 'default',
                  },
                ],
                {cancelable: false},
              );
            }, 1000);
          } else {
            setbLoader(false);
            setTimeout(() => {
              Alert.alert(
                sAttentionRequired,
                sSomethingWentWrongPleaseTryAgainLater,
                [
                  {
                    text: 'Ok',
                    onPress: () => true,
                    style: 'cancel',
                  },
                ],
                {cancelable: true},
              );
            }, 1000);
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
            setTimeout(() => {
              Alert.alert(
                sAttentionRequired,
                sSomethingWentWrongPleaseTryAgainLater,
                [
                  {
                    text: 'Ok',
                    onPress: () => true,
                    style: 'cancel',
                  },
                ],
                {cancelable: true},
              );
            }, 1000);
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
      const aResults = await DocumentPicker.pickMultiple({
        type: [
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
        ],
      });
      for (const singleResult of aResults) {
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
          sAttentionRequired,
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
            sAttentionRequired,
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

  const pingPong = () => {
    axios
      .get(`/ChatrelPayment/Ping`)
      .then((resp) => {
        if (resp.status === 200) {
          const oSession = {
            sJwtToken: resp.data.token,
            bSession: true,
          };
          dispatch(storeJWTToken(oSession));
        }
      })
      .catch((error) => {
        console.log('Error ', error.response);
        console.log(error.config);
      })
      .then((release) => {
        //console.log(release); => udefined
      });
  };

  useEffect(() => {
    if (isFocused) {
      console.log('File Dispute Called');
      setbLoader(false);
      setsDisputeMessage('');
      setaFileResults([]);
      setbShowPreview(false);
      setbCameraVisible(false);
      pingPong();
    }
  }, [isFocused]);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.mainContainer}>
        <Loader loading={bLoader} />
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
                  blurOnSubmit={true}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                  }}
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
          <View style={styles.submitDisputeContainer}>
            <Button
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
