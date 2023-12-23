"use client"

import { useRouter } from 'next/navigation';

import { useState } from 'react'

import styles from './page.module.css'
import { ApiHandler } from 'shared'

export default function ApartmentCreate() {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [error, setError] = useState(undefined);

    const router = useRouter();

    const createApartment = (apartmentData: FormData) => {
        if (image == null) {
            return;
        }

        setLoading(true);

        apartmentData.append("image", URL.createObjectURL(image))
        ApiHandler.createApartment(apartmentData).then(
            (response) => {
                setLoading(false);
                if (response.status === "success") {
                    router.push(`/${response.json.id}`)
                } else {
                    setError(response.error)
                }
            }
        )
    }

    const renderInput = (name: string, title: string, numeric: boolean = false) => (
        <>
            <label>
                {title}
            </label>
            <input className={styles.textInput} name={name} type={numeric ? "number" : "text"} required />
        </>
    )

    return (
        <div className={styles.container}>
            <form action={createApartment} className={styles.form}>
                <label>
                    Image
                </label>
                <input
                    name="image"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={(event) => {
                        if (event.target.files != null) {
                            setImage(event.target.files[0])
                        }
                    }}
                    className={styles.imageInput}
                    required
                />

                {renderInput("title", "Title")}
                {renderInput("address", "Address")}
                {renderInput("price", "Price", true)}
                <label>
                    Description
                </label>
                <textarea className={styles.textInput} name={"description"} required />

                <button disabled={loading} type="submit">
                    Create
                </button>
                <p className={styles.error}>
                    {error}
                </p>
            </form>
        </div>
    )
}
