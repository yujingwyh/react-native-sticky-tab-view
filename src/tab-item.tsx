import { StyleSheet, Text, View } from 'react-native';
import Animated, { SharedValue, useAnimatedScrollHandler, } from 'react-native-reanimated';

interface Props {
  isActive: boolean;
  tab: {
    label: string;
    value: string;
  };
  tabOffset: SharedValue<number>;
}

export const TabItem = (props: Props) => {
  const { isActive, tabOffset } = props;
  const data = Array.from({ length: 100 }, (_, i) => `item-${i}`);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (isActive) {
        tabOffset.value = event.contentOffset.y;
      }
    },
  });

  return (
    <Animated.FlatList
      style={styles.flatList}
      data={data}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    ></Animated.FlatList>
  );
};

const styles = StyleSheet.create({
  flatList: {
    paddingTop: 250,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: 20,
    color: '#000',
  },
});
