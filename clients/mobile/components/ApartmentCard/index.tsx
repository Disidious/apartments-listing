import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Apartment, ApiHandler, formatPrice } from 'shared';
import { router } from 'expo-router';

type Props = {
    apartment: Partial<Apartment>;
}

export default function ApartmentCard({
    apartment: apartmentDetails
}: Props) {
    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            router.push(`/${apartmentDetails.id}`)
        }}>
            <Image
                source={{
                    uri: ApiHandler.getImageUrl(apartmentDetails.image!)
                }}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.header}>
                    {apartmentDetails.title}
                </Text>
                <Text style={styles.price}>
                    {formatPrice(apartmentDetails.price!)} EGP
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "lightgrey",
        color: "black",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        marginBottom: 10
    },
    image: {
        width: "30%",
        height: "100%",
        objectFit: "cover",
    },
    content: {
        width: "70%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        gap: 15,
        marginLeft: 5,
    },
    header: {
        fontSize: 25
    },
    price: {
        fontSize: 17,
        fontWeight: "bold"
    }
});
