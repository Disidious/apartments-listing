import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Slot, router } from 'expo-router';

import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { ApiHandler } from 'shared'

ApiHandler.url = process.env.EXPO_PUBLIC_API_URL!

export default function Layout() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                width: "100%",
                paddingHorizontal: 20,
                paddingVertical: 5
            }}>
                <TouchableOpacity
                    style={[styles.btn]}
                    onPress={() => {
                        if (router.canGoBack()) {
                            router.back()
                        }
                    }}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <Slot />
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                padding: 20
            }}>
                <TouchableOpacity style={[styles.btn]} onPress={() => {
                    router.push("/")
                }}>
                    <Entypo name="home" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn]} onPress={() => {
                    router.push("/create")
                }}>
                    <Entypo name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>
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
    btn: {
        width: 50,
        height: 50,
        backgroundColor: "#5c55b8",
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    disabled: {
        opacity: 0.5,
        backgroundColor: "grey"
    }
});
