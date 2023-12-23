import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ApiHandler } from 'shared'
import { Slot, router } from 'expo-router';

ApiHandler.url = process.env.EXPO_PUBLIC_API_URL!

export default function Layout() {
    return (
        <SafeAreaView style={styles.container}>
            <Slot />
            <TouchableOpacity style={styles.addBtn} onPress={() => {
                router.push("/create")
            }}>
                <Text style={styles.plusSign}>
                    +
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        position: "relative"
    },
    addBtn: {
        position: "absolute",
        width: 50,
        height: 50,
        backgroundColor: "#5c55b8",
        bottom: 15,
        right: 15,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    plusSign: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
    }
});
