import { StyleSheet, Text, View } from 'react-native';
import PagerView, { PagerViewProps } from 'react-native-pager-view';
import { TabBar, tabItems } from './tab-bar.tsx';
import React, { useRef, useState } from 'react';
import Animated from 'react-native-reanimated';
import { TabItem } from './tab-item.tsx';

export const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pagerViewRef = useRef<PagerView>(null);

  const onTabChange = (index: number) => {
    setActiveIndex(index);
    pagerViewRef.current?.setPage(index);
  };
  const onPageSelected: PagerViewProps['onPageSelected'] = event => {
    setActiveIndex(event.nativeEvent.position);
  };

  return (
    <React.Fragment>
      <Animated.View style={styles.header}>
        <Text style={styles.headerText}>Header</Text>
      </Animated.View>
      <TabBar activeIndex={activeIndex} onTabChange={onTabChange} />
      <PagerView
        ref={pagerViewRef}
        style={styles.pagerView}
        initialPage={activeIndex}
        onPageSelected={onPageSelected}
      >
        {tabItems.map(tab => (
          <View key={tab.value}>
            <TabItem tab={tab} />
          </View>
        ))}
      </PagerView>
    </React.Fragment>
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
  pagerView: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    height: '100%',
  },
});
