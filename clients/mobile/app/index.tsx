import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

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
        <ScrollView style={styles.scrollContainer}>
            {
                apartments.map((apartment) => (
                    <ApartmentCard key={apartment.id} apartment={apartment} />
                ))
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        width: "95%",
        height: "100%",
        display: "flex",
    }
});
