import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import { Apartment, ApiHandler, formatPrice } from 'shared';
import { truncateString } from '@/utils';

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
                    {truncateString(apartmentDetails.title!, 20)}
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
        fontSize: 20
    },
    price: {
        fontSize: 17,
        fontWeight: "bold"
    }
});
