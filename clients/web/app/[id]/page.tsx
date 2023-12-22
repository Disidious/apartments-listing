"use client"

import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react'

import styles from './page.module.css'
import { ApiHandler, Apartment } from 'shared'

export default function ApartmentDetails() {
    const params = useParams();
    const [apartmentDetails, setApartmentDetails] = useState<Apartment | undefined>(undefined);

    useEffect(() => {
        ApiHandler.getApartmentDetails(params["id"] as string).then((response) => {
            if (response.status === 'success') {
                setApartmentDetails(response.json)
            }

            return
        });
    }, [])

    if (apartmentDetails == null) {
        return <></>
    }

    return (
        <div>
            <h1>
                {apartmentDetails.title}
            </h1>
            <h2>
                {apartmentDetails.address}
            </h2>
            <h3>
                {apartmentDetails.price}
            </h3>
            <p>
                {apartmentDetails.description}
            </p>
        </div>
    )
}
