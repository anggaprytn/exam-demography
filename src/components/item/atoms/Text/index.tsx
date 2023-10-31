import { RFValue as fs } from 'react-native-responsive-fontsize';
import React from 'react';
import { Animated, Dimensions, StyleSheet, TextStyle } from 'react-native';
import { defaultColors } from '@/themes';

type PropsText = {
  children: any;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
  size?: number;
  type: 'regular' | 'light' | 'bold' | 'medium' | 'semibold';
  align?: 'left' | 'center' | 'right' | 'justify';
  [key: string]: any;
};

const Text: React.FC<PropsText> = props => {
  const TextStyles: any[] = [
    props.type === 'regular' && styles.regular,
    props.type === 'light' && styles.light,
    props.type === 'bold' && styles.bold,
    props.type === 'medium' && styles.medium,
    props.type === 'semibold' && styles.semibold,
  ];

  const textColor: object = {
    color: props.color ? props.color : defaultColors.text,
  };

  const { height } = Dimensions.get('window');
  const sizeText: object = {
    fontSize: props.size ? fs(props.size, height) : fs(12, height),
  };

  return (
    <Animated.Text
      {...props}
      minimumFontScale={12}
      maxFontSizeMultiplier={1}
      allowFontScaling={false}
      numberOfLines={props.numberOfLines}
      ellipsizeMode="tail"
      style={[
        styles.default,
        TextStyles,
        textColor,
        sizeText,
        props.style,
        { textAlign: props.align },
      ]}>
      {props.children}
    </Animated.Text>
  );
};

export default React.memo(Text);

const styles = StyleSheet.create({
  default: {},
  light: {
    fontFamily: 'TTCommons-Light',
  },
  semibold: {
    fontFamily: 'TTCommons-SemiBold',
  },
  regular: {
    fontFamily: 'TTCommons-Regular',
  },
  bold: {
    fontFamily: 'TTCommons-Bold',
  },
  medium: {
    fontFamily: 'TTCommons-Medium',
  },
});
