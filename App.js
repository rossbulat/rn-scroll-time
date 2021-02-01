import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Slider } from './Schedule/Slider';

export default function App () {
  return (
    <View style={styles.container}>
      <Slider
        schedule={
          { "enabled": true, "scheduleTime": 61200, "scheduleTimeLocal": 0 }
        }
        handleScheduleTime={() => {
          console.log('handle updated time...');
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
