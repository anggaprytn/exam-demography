// PressableComponent.tsx
import React, { useState } from 'react';
import {
  Animated,
  Pressable as PressableRN,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface PressableComponentProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(PressableRN);

const Pressable: React.FC<PressableComponentProps> = ({
  children,
  style,
  ...rest
}) => {
  const state = useState(new Animated.Value(1))[0];

  const inAnimate = (): void => {
    Animated.spring(state, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const outAnimate = (): void => {
    Animated.spring(state, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle: Object = {
    transform: [{ scale: state }],
  };

  return (
    <AnimatedPressable
      {...rest}
      onPressIn={inAnimate}
      onPressOut={outAnimate}
      style={[style, animatedStyle]}>
      {children}
    </AnimatedPressable>
  );
};

export default Pressable;
