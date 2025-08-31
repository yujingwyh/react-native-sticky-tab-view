import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useState } from 'react';

interface Props {
  tab: {
    label: string;
    value: string;
  };
}

export const TabItem = (props: Props) => {
  const [data, setData] = useState(
    Array.from({ length: 20 }, (_, i) => `item-${i}`),
  );
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      const moreData = Array.from(
        { length: 10 },
        (_, i) => `item-${page * 10 + i}`,
      );
      setData([...data, ...moreData]);
      setPage(page + 1);
      setLoading(false);
    }, 1500);
  };

  return (
    <View style={{
      paddingTop:300,
      height:700,
      zIndex: 100000,
    }}>
      <Animated.FlatList
        data={data}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="small"
              color="#4CAF50"
              style={styles.indicator}
            />
          ) : null
        }
      ></Animated.FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText:{
    fontSize: 20,
    color: '#000',
  },
  indicator: {
    margin: 16,
  },
});
