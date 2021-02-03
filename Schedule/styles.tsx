import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  time: {
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    color: '#555',
  },
  selector: {
    position: 'absolute',
    bottom: '-20%',
    left: '50%',
    height: '130%',
    borderLeftWidth: 2,
    zIndex: 1,
    borderLeftColor: 'black'
  },
  indicator: {
    borderRightColor: 'grey',
    borderRightWidth: 1
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