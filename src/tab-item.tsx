import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  scrollTo,
  SharedValue,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useLayoutEffect } from 'react';

interface Props {
  isActive: boolean;
  tab: {
    label: string;
    value: string;
  };
  tabCurrentY: SharedValue<number>;
}

const data = Array.from({ length: 100 }, (_, i) => `item-${i}`);
const maxOffsetY = 200;

export const TabItem = (props: Props) => {
  const { tabCurrentY } = props;
  const flatListRef = useAnimatedRef<Animated.FlatList>();
  const isActive = useSharedValue(props.isActive);

  const tabStartY = useSharedValue(0);
  const scrollLastY = useSharedValue(0);
  const scrollEndY = useSharedValue(0);
  const scrollCurrentY = useSharedValue(0);

  const isProgrammaticScroll = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onBeginDrag(event) {
      if (!isProgrammaticScroll.value) {
        tabStartY.value = tabCurrentY.value;
        scrollLastY.value = event.contentOffset.y;
      }
    },
    onScroll(event) {
      if (!isProgrammaticScroll.value) {
        scrollCurrentY.value = event.contentOffset.y;
      }
    },
    onMomentumEnd(event) {
      isProgrammaticScroll.value = false;
      scrollEndY.value = event.contentOffset.y;
    },
  });

  useAnimatedReaction(
    () => ({
      scrollCurrentYValue: scrollCurrentY.value,
    }),
    current => {
      if (isActive.value) {
        if (current.scrollCurrentYValue > scrollLastY.value) {
          tabCurrentY.value = Math.min(
            tabCurrentY.value + current.scrollCurrentYValue - scrollLastY.value,
            maxOffsetY,
          );
        }
        if (current.scrollCurrentYValue < scrollLastY.value) {
          if (current.scrollCurrentYValue < maxOffsetY) {
            tabCurrentY.value = current.scrollCurrentYValue;
          }
        }

        scrollLastY.value = scrollCurrentY.value;
      }
    },
  );

  useAnimatedReaction(
    () => ({
      tabCurrentYValue: tabCurrentY.value,
    }),
    current => {
      if (!isActive.value) {
        const diff = current.tabCurrentYValue - tabStartY.value;
        isProgrammaticScroll.value = true;
        scrollTo(flatListRef, 0, scrollEndY.value + diff, false);
      }
    },
  );

  useLayoutEffect(() => {
    isActive.value = props.isActive;
    isProgrammaticScroll.value = false;
  }, [props.isActive]);

  return (
    <Animated.FlatList
      ref={flatListRef}
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
