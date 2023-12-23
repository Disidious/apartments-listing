import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ApiHandler } from 'shared'

ApiHandler.url = process.env.EXPO_PUBLIC_API_URL!

export default function App() {
  useEffect(() => {
    ApiHandler.getApartmentsList().then(
      (response) => {
        console.log(response.json)
      }
    )
  }, [])
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
