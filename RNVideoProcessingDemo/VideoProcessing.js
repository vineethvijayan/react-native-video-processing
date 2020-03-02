import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNProgressHud from 'progress-hud';
import ImagePicker from 'react-native-image-picker';
import {ProcessingManager} from 'react-native-video-processing';
import {Player} from './Player';
import {videoPreviewSize} from './utils';

const trimVideo = async video => {
  const info = await ProcessingManager.getVideoInfo(video.uri);
  const previewSize = videoPreviewSize(info.size);
  const trim = await ProcessingManager.trim(video.uri, {
    startTime: 0,
    endTime: 10,
    quality: `${previewSize.width}x${previewSize.height}`,
  });

  return {
    ...video,
    uri: trim,
  };
};

const trimVideos = async files => {
  return Promise.all(files.map(trimVideo));
};

export const VideoProcessing = () => {
  const [media, setMedia] = useState([]);
  const [compressMedia, setCompressMedia] = useState([]);
  const onPressImportMedia = () => {
    ImagePicker.launchImageLibrary({mediaType: 'video'}, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setMedia([...media, response]);
      }
    });
  };

  const onPressCompressMedia = async () => {
    RNProgressHud.showWithStatus('Processing Video');
    const videos = await trimVideos(media);
    setCompressMedia(videos);
    RNProgressHud.dismiss();
  };

  const renderItem = ({item}) => <Player video={item} />;
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contaniner}>
        <TouchableOpacity
          onPress={onPressImportMedia}
          style={styles.importButton}>
          <Text>Import Media</Text>
        </TouchableOpacity>
        <FlatList
          data={media}
          horizontal
          renderItem={renderItem}
          keyExtractor={(_, index) => String(index)}
          style={{height: 250}}
        />
        <TouchableOpacity
          onPress={onPressCompressMedia}
          disabled={!media.length}
          style={styles.importButton}>
          <Text>Compress Media</Text>
        </TouchableOpacity>
        <FlatList
          data={compressMedia}
          horizontal
          renderItem={renderItem}
          keyExtractor={(_, index) => String(index)}
          style={{height: 250}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  contaniner: {},
  importButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    height: 250,
    backgroundColor: 'blue',
    flex: 1,
  },
});
