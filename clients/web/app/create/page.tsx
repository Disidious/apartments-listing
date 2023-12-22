"use client"

import { useRouter } from 'next/navigation';

import { useState } from 'react'

import styles from './page.module.css'
import { ApiHandler } from 'shared'

export default function ApartmentCreate() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const createApartment = (apartmentData: FormData) => {
        setLoading(true);
        ApiHandler.createApartment(apartmentData).then(
            (response) => {
                if (response.status === "success") {
                    router.push(`/${response.json.id}`)
                }
            }
        )
    }

    return (
        <form action={createApartment}>
            <label>
                Title
            </label>
            <input name="title" required />

            <label>
                Address
            </label>
            <input name="address" required />

            <label>
                Price
            </label>
            <input name="price" type="number" required />

            <label>
                Description
            </label>
            <input name="description" required />

            <button disabled={loading} type="submit">
                Create
            </button>
        </form>
    )
}
