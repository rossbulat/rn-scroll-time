import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Slider } from './Schedule/Slider';

export default function App () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Select a Time by Scrolling Demo
      </Text>
      <View style={styles.sliderContainer}>
        <Slider
          schedule={{
            "enabled": true,
            "scheduleTimeUtc": 61200,
            "scheduleTimeLocal": 0,
          }}
          handleScheduleTime={() => {
            console.log('handle updated time...');
          }}
        />
      </View>
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
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 20,
    color: 'grey'
  },
  sliderContainer: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    borderColor: '#dfdfdf',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
    paddingVertical: 10,
    overflow: 'hidden',
  },
});
