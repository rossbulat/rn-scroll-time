import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 8,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  add: {
    position: 'absolute',
    right: 10,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  description: {
    lineHeight: 20,
    textAlign: 'left',
  },
  scrollViewContainer: {
    width: '100%',
    marginTop: 20,
  },
  scrollview: {
    height: 50,
    width: '100%',
    display: 'flex',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  scrollViewMiddle: {
    position: 'absolute',
    top: '0%',
    left: '50%',
    height: '120%',
    borderLeftWidth: 2,
    zIndex: 1,
  },
  subtitle: {
    marginTop: 35,
    height: 125,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    width: '100%',
  },
  content: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  footer: {
    width: '100%',
    height: 50,
    flex: 0,
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footerItem: {
    flexGrow: 1,
  },
  learnMoreTitle: {
    lineHeight: 23,
    paddingVertical: 4,
    paddingHorizontal: 5,
    textAlign: 'center',
    maxWidth: 325,
    fontWeight: '600',
  },
  learnMore: {
    lineHeight: 20,
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 5,
    textAlign: 'center',
    maxWidth: 300,
  },
});

export default styles;