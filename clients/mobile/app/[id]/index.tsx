import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Apartment, ApiHandler, formatPrice } from 'shared';
import { useEffect, useState } from 'react';

export default function ApartmentDetails() {
    const { id } = useLocalSearchParams();
    const [apartment, setApartment] = useState<Apartment | undefined>(undefined);

    useEffect(() => {
        ApiHandler.getApartmentDetails(id! as string).then(
            (response) => {
                if (response.status === "success") {
                    setApartment(response.json);
                }
            }
        )
    }, [])

    if (apartment == null) {
        return <></>
    }

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Image
                    source={{
                        uri: ApiHandler.getImageUrl(apartment.image)
                    }}
                    style={styles.image}
                />
                <Text style={styles.title}>
                    {apartment.title}
                </Text>
                <Text style={styles.address}>
                    {apartment.address}
                </Text>
                <Text style={styles.price}>
                    {formatPrice(apartment.price)} EGP
                </Text>
                <Text style={styles.descriptionTitle}>
                    Description
                </Text>
                <Text>
                    {apartment.description}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    subContainer: {
        width: "95%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        color: "black",
        display: "flex",
    },
    image: {
        width: "100%",
        height: 300,
        objectFit: "cover",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold"
    },
    address: {
        fontSize: 17
    },
    price: {
        fontSize: 17,
        marginTop: 10,
        marginBottom: 50,
        fontWeight: "bold"
    },
    descriptionTitle: {
        fontSize: 30,
        fontWeight: "bold"
    }
});
