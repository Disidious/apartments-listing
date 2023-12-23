import { router } from 'expo-router';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ApiHandler } from 'shared';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { truncateString } from '@/utils';
import { ScrollView } from 'react-native-gesture-handler';

export default function ApartmentDetails() {
    const { control, handleSubmit } = useForm();

    const [errors, setErrors] = useState<any>({});
    const [image, setImage] = useState<string | null>(null);

    // Responsible for asking permission and accessing the camera roll
    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            selectionLimit: 1
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const getFileName = () => {
        return image?.split('/').pop() ?? ""
    }

    const onSubmit = (data: any) => {
        if (image == null) {
            setErrors({
                "image": "Required"
            })
            return
        }
        setErrors({})

        let convertedPrice = ""
        let dotFound = false

        // Get rid of all non numeric characters and break if there are two dots
        for (const char of data.price) {
            if (char === "." && dotFound) {
                break
            }

            if (!Number.isNaN(+char) || (char === "." && !dotFound)) {
                convertedPrice += char

                if (char === ".") {
                    dotFound = true
                }
            }
        }

        data.price = +convertedPrice

        // Contruct file form data body for the backend endpoint
        const fileName = getFileName()
        const fileType = fileName?.split('.').pop()
        data.image = {
            uri: image,
            name: fileName,
            type: `image/${fileType}`
        }

        const formData = new FormData()
        for (const field in data) {
            formData.append(field, data[field]);
        }

        ApiHandler.createApartment(formData).then(
            (response) => {
                if (response.status === "success") {
                    router.push(`/${response.json.id}`)
                    return
                }

                setErrors({
                    "response": response.error
                });
            }
        )
    };

    const onError = (error: any, e: any) => {
        if (image == null) {
            error["image"] = { "message": "Required" }
        }
        setErrors(error)
    }

    const renderInput = (
        name: string,
        title: string,
        numeric: boolean = false,
        multiline: boolean = false
    ) => {
        return (
            <View>
                <Text style={styles.inputTitle}>
                    {title}
                </Text>
                <Controller
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            {...field}
                            keyboardType={numeric ? 'numeric' : undefined}
                            onChangeText={field.onChange}
                            style={
                                {
                                    ...styles.input,
                                    height: multiline ? 80 : "auto"
                                }
                            }
                            placeholder={title}
                            multiline={multiline}
                            numberOfLines={multiline ? 3 : 1}
                            scrollEnabled={multiline}
                        />
                    )}
                    name={name}
                    rules={{ required: 'Required' }}
                />
                <Text style={styles.error}>
                    {errors[name]?.message}
                </Text>
            </View>
        )
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <ScrollView style={styles.scrollView}>
                <View>
                    <View>
                        <Text style={styles.inputTitle}>
                            {"Image"}
                        </Text>
                        <View style={styles.fileInput}>
                            <Text
                                style={styles.fileName}
                            >
                                {truncateString(getFileName(), 20)}
                            </Text>
                            <TouchableOpacity
                                onPress={pickImage}
                                style={styles.uploadBtn}
                            >
                                <Text style={styles.uploadBtnText}>
                                    Choose Image
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.error}>
                            {errors["image"]?.message}
                        </Text>
                    </View>
                    {renderInput("title", "Title")}
                    {renderInput("address", "Address")}
                    {renderInput("price", "Price", true)}
                    {renderInput("description", "Description", false, true)}
                </View>
                <Text style={styles.error}>
                    {errors.response}
                </Text>
                <TouchableOpacity
                    onPress={handleSubmit(onSubmit, onError)}
                    style={styles.submitBtn}
                >
                    <Text style={styles.submitBtnText}>
                        Create
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    scrollView: {
        width: "95%",
        marginTop: 20
    },
    fileInput: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    fileName: {
        fontSize: 17,
    },
    uploadBtn: {
        borderWidth: 1,
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderColor: "#5c55b8"
    },
    uploadBtnText: {
        fontSize: 17
    },
    submitBtn: {
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 40,
        backgroundColor: "#5c55b8"
    },
    submitBtnText: {
        color: "white",
        fontSize: 17
    },
    inputTitle: {
        fontSize: 20,
    },
    input: {
        fontSize: 17,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "lightgrey",
        padding: 5
    },
    error: {
        color: "red"
    }
});
