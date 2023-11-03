import { defaultColors } from '@/themes';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { hexToRGBA } from '@/utils/helpers';

const statusBarHeight = getStatusBarHeight();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.screenBackground,
  },
  scrollView: {
    flex: 1,
    backgroundColor: defaultColors.screenBackground,
    marginTop: statusBarHeight,
  },
  h16: { height: 16 },
  tagline: { width: wp(100), paddingHorizontal: 16, marginTop: 16 },
  search: {
    width: wp(100) - 32,
    backgroundColor: '#EFE7F6',
    height: 55,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 55 / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mh16: { marginHorizontal: 16 },
  card: {
    width: wp(50) - 32,
    paddingTop: 16 + 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCard: {
    marginLeft: 12,
    width: wp(50) - 40 - 32 - 12,
  },
  containerCard: {
    elevation: 2,
    backgroundColor: defaultColors.white,
    width: wp(100) - 32,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 10,
    overflow: 'hidden',
    paddingBottom: 16 + 8,
  },
  containerText: {
    width: wp(100),
    paddingHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardList: {
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
  flag: {
    height: 68,
    width: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  containerName: {
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
  mt1: { marginTop: -1 },
  seeall: {
    backgroundColor: hexToRGBA(defaultColors.primary, 0.05),
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 1,
  },
});
