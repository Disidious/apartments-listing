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
        <div className={styles.container}>
            <img
                className={styles.image}
                src={`${process.env.NEXT_PUBLIC_API_URL}/${apartmentDetails.image}`}
            />
            <h1>
                {apartmentDetails.title}
            </h1>
            <h3>
                {apartmentDetails.address}
            </h3>
            <h2>
                {apartmentDetails.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} EGP
            </h2>
            <h1>
                Description
            </h1>
            <p>
                {apartmentDetails.description}
            </p>
        </div>
    )
}
