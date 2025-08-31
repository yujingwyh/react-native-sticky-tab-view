import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {
  activeIndex: number;
  onTabChange: (activeIndex: number) => void;
  tabOffset: SharedValue<number>;
}

export const tabItems = [
  { label: 'One', value: 'One' },
  { label: 'Two', value: 'Two' },
];

export const TabBar = (props: Props) => {
  const { activeIndex, onTabChange, tabOffset } = props;
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
    <Animated.View style={[styles.tabBar, animatedStyle]}>
      {tabItems.map((tab, index) => (
        <TouchableOpacity
          key={tab.value}
          style={[styles.tab, activeIndex === index && styles.activeTab]}
          onPress={() => onTabChange(index)}
        >
          <Text
            style={[styles.tabText, activeIndex === index && styles.activeText]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    backgroundColor: '#fff',
    top: 200,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 3,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
