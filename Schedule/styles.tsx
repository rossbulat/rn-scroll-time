import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  padding: {
    marginHorizontal: 20
  },
  container: {
    width: '100%',
    marginTop: 20,
  },
  middle: {
    position: 'absolute',
    top: '0%',
    left: '50%',
    height: '120%',
    borderLeftWidth: 2,
    zIndex: 1,
  },
  scrollview: {
    height: 50,
    width: '100%',
    display: 'flex',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  }
});

export default styles;