import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { defaultColors } from '@/themes';

const statusBarHeight = getStatusBarHeight();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  back: {
    elevation: 5,
    height: 55,
    borderRadius: 10,
    width: 55,
    backgroundColor: defaultColors.white,
    position: 'absolute',
    top: statusBarHeight + 16,
    left: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  r2: { right: 2 },
  card: {
    width: wp(100) - 32,
    height: 68 + 24,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 16,
    left: 16,
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 8 + 4,
    paddingVertical: 8 + 4,
  },
  img: {
    height: 68,
    width: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  statesInfo: {
    height: 100 - 32,
    width: wp(100) - 32 - 100 - 16 - 32,
    marginLeft: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  mr4: { marginRight: 4 },
  population: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
});
