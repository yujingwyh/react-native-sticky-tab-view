import { StyleSheet, Text } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React from 'react';

interface Props {
  tabOffset: SharedValue<number>;
}

export const Header = (props: Props) => {
  const { tabOffset } = props;
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      tabOffset.value,
      [0, 200],
      [0, -200],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.header, animatedStyle]}>
      <Text style={styles.headerText}>Header</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 2,
    backgroundColor: '#00f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
});
