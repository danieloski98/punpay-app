import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Camera, CameraType, ImageType, FlashMode, CameraCapturedPicture } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons'
import CustomText from '../../General/Text';

const CameraScreen = ({ action }: { action: (data: CameraCapturedPicture) => void;}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [useFlash, setUseFlash] = React.useState(false);
    const camera = React.useRef<Camera>(null);
    const [photoUri, setPhotoUri] = useState(null);
    const HEIGHT = useWindowDimensions().height;
  
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const takePicture = async () => {
      if (camera) {
        const photo = await camera.current.takePictureAsync({
            imageType: ImageType.png,
            base64: false,
            fastMode: useFlash,
            scale: 1,
            quality: 0,
            skipProcessing: false,
            exif: false,
        });
        action(photo)
      }

    };
  
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera.</Text>;
    }
  
    return (
      <View style={{ flex: 1, height: (HEIGHT / 100) * 85, borderRadius: 20, overflow: 'hidden' }}>
        <Camera
          style={{ flex: 1 }}
          type={CameraType.back}
          ref={camera}
        >
          <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', paddingBottom: 20, alignItems: 'flex-end' }}>
            <TouchableOpacity style={{ borderWidth: 2, borderColor: 'white', width: 50, height: 50, borderRadius: 25, padding: 5, overflow: 'hidden' }} onPress={takePicture}>
                <View style={{ width: '100%', height: '100%', borderRadius: 30, backgroundColor: 'red' }}></View>
            </TouchableOpacity>
          </View>
        </Camera>
        {photoUri && <Image source={{ uri: photoUri }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  };
  
  export default CameraScreen;