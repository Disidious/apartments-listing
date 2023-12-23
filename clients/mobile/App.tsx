import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ApiHandler, Apartment } from 'shared'
import { ApartmentCard } from 'components';

ApiHandler.url = process.env.EXPO_PUBLIC_API_URL!

export default function App() {
  const [apartments, setApartments] = useState<Partial<Apartment>[]>([]);

  useEffect(() => {
    ApiHandler.getApartmentsList().then(
      (response) => {
        if (response.status === "success") {
          setApartments(response.json);
        }
      }
    )
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {
          apartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  scrollContainer: {
    width: "95%",
    height: "100%",
    display: "flex",
  }
});
