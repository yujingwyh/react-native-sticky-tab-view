import { StyleSheet, View } from 'react-native';
import PagerView, { PagerViewProps } from 'react-native-pager-view';
import { TabBar, tabItems } from './tab-bar.tsx';
import React, { useRef, useState } from 'react';
import { TabItem } from './tab-item.tsx';
import { Header } from './header.tsx';
import { useSharedValue } from 'react-native-reanimated';

export const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pagerViewRef = useRef<PagerView>(null);
  const tabCurrentY = useSharedValue(0);
  const tabStartY = useSharedValue(0);

  const onTabChange = (index: number) => {
    setActiveIndex(index);
    pagerViewRef.current?.setPage(index);
  };
  const onPageSelected: PagerViewProps['onPageSelected'] = event => {
    setActiveIndex(event.nativeEvent.position);
  };

  return (
    <React.Fragment>
      <Header tabCurrentY={tabCurrentY}></Header>
      <TabBar
        tabCurrentY={tabCurrentY}
        activeIndex={activeIndex}
        onTabChange={onTabChange}
      />
      <PagerView
        ref={pagerViewRef}
        style={styles.pagerView}
        initialPage={activeIndex}
        onPageSelected={onPageSelected}
      >
        {tabItems.map((tab, index) => (
          <View key={tab.value}>
            <TabItem
              tabCurrentY={tabCurrentY}
              tabStartY={tabStartY}
              tab={tab}
              isActive={activeIndex === index}
            />
          </View>
        ))}
      </PagerView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
    height: '100%',
  },
});
