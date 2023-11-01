import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { defaultColors } from '@/themes';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.screenBackground,
  },
  card: {
    height: 68 + 24,
    width: wp(100) - 32,
    paddingHorizontal: 8 + 4,
    paddingVertical: 8 + 4,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 2,
  },
  img: {
    height: 68,
    width: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  infoState: {
    height: 100 - 32,
    width: wp(100) - 32 - 100 - 16 - 32,
    marginLeft: 16,
    borderRadius: 8,
    justifyContent: 'center',
  },
  population: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  mr4: { marginRight: 4 },
  h16: { height: 16 },
  r2: { right: 2 },
  back: {
    height: 55,
    width: 55,
    backgroundColor: defaultColors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  content: {
    flex: 1,
    marginTop: statusBarHeight,
  },
  header: {
    paddingVertical: 16,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  searchBar: { width: wp(100) - 32 - 55 - 8 },
});
