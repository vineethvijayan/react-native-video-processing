import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {VideoPlayer} from 'react-native-video-processing';
import {bytesToSize} from './utils';

export const Player = ({video}) => {
  return (
    <View style={styles.container}>
      <View style={styles.player}>
        <VideoPlayer
          play={true}
          replay={false}
          source={video.uri}
          playerWidth={200}
          playerHeight={200}
          style={{backgroundColor: 'black'}}
          resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
        />
      </View>
      <Text>{video.fileName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    alignItems: 'center',
  },
  player: {
    width: 200,
    height: 200,
  },
  info: {},
});
