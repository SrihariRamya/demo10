/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  useColorScheme,
  FlatList,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1)
  const [mainData, setMainData] = useState([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getOnlineData = () => {
    try {
      fetch(
        `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Accept': 'application/json'
        }
      }
      ).then((res) => res.json()).then((json) => {
        setData(json);
      })
    } catch (e) {
      console.log("Catch is called", e, '<<>>');
    }
  }

  const AfterAPICall = () => {
    if (data.length > 0) {
      let temporaryData = mainData;
      for (let i = 0; i < data.length; i++) {
        temporaryData = [...temporaryData, data[i]]
      }
      console.log("temporaryData value", temporaryData, temporaryData.length, '<<<>>')
      setMainData(temporaryData)
    }
  }
  console.log("mainData outside", mainData, mainData.length, '<<>>')

  useEffect(() => {
    getOnlineData();
  }, [page])

  useEffect(() => {
    AfterAPICall();
  }, [data])

  return (
    <SafeAreaView style={backgroundStyle}>
      <FlatList
        data={mainData}
        onEndReachedThreshold={0.5}
        onEndReached={() => setPage(page + 1)}

        renderItem={({ item, index }) => {
          return (
            <View id={index} style={styles.mainListView}>
              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  source={{ uri: item.image_url }}
                />
              </View>
              <View style={styles.detailView}>
                <Text style={styles.nameTxt}>{item.name}</Text>
                <Text>Record No: {index + 1}</Text>
                <Text numberOfLines={3}>{item.description}</Text>
              </View>
            </View>
          )
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainListView: { borderBottomWidth: 1, flexDirection: 'row', paddingTop: 8, paddingBottom: 8 },
  imageView: { width: '25%' },
  image: { height: 80, width: 80, justifyContent: 'center', alignSelf: 'center' },
  detailView: { paddingLeft: 8, width: '75%', paddingRight: 12 },
  nameTxt: { fontWeight: 'bold' },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
