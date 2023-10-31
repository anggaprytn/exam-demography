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
});
