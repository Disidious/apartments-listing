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
                    style={[styles.btn, styles.backBtn]}
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

            <TouchableOpacity style={[styles.addBtn, styles.btn]} onPress={() => {
                router.push("/create")
            }}>
                <Entypo name="plus" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.homeBtn, styles.btn]} onPress={() => {
                router.push("/")
            }}>
                <Entypo name="home" size={24} color="white" />
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
    btn: {
        position: "absolute",
        width: 50,
        height: 50,
        backgroundColor: "#5c55b8",
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    addBtn: {
        bottom: 20,
        right: 20,
    },
    backBtn: {
        position: 'relative',
    },
    homeBtn: {
        bottom: 20,
        left: 20,
    },
    disabled: {
        opacity: 0.5,
        backgroundColor: "grey"
    }
});
