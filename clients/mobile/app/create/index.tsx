import { router } from 'expo-router';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ApiHandler } from 'shared';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';

export default function ApartmentDetails() {
    const { control, handleSubmit } = useForm();

    const [errors, setErrors] = useState<any>({});
    const [image, setImage] = useState<string | null>(null);

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
        const name = image?.split('/').pop() ?? ""
        if (name.length > 15) {
            return name.substring(0, 15) + "..."
        }

        return name
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

        const fileName = image.split('/').pop()
        const fileType = fileName?.split('.').pop()
        data.image = {
            uri: image,
            name: image.split('/').pop(),
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

    const renderInput = (name: string, title: string, numeric: boolean = false) => {
        return (
            <View style={styles.inputContainer}>
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
                            style={styles.input}
                            placeholder={title}
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
        <View style={styles.container}>
            <View style={styles.inputs}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>
                        {"Image"}
                    </Text>
                    <View style={styles.fileInput}>
                        <Text
                            style={styles.fileName}
                        >
                            {getFileName()}
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
                {renderInput("description", "Description")}
            </View>
            <Text style={styles.error}>
                {errors.response}
            </Text>
            <TouchableOpacity
                onPress={handleSubmit(onSubmit, onError)}
                style={styles.submitBtn}
            >
                <Text style={styles.submitBtnText}>
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    inputs: {
        width: "95%"
    },
    inputContainer: {
        marginBottom: 10
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
        borderWidth: 2,
        borderRadius: 10,
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
        marginBottom: 5
    },
    input: {
        fontSize: 17,
        borderBottomWidth: 1
    },
    error: {
        color: "red"
    }
});
