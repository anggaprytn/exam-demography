import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const statusBarHeight = getStatusBarHeight();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    height: 45 + 16 + statusBarHeight,
    width: wp(100),
    paddingTop: statusBarHeight,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
  },
  mr8: { marginRight: 8 },
});
