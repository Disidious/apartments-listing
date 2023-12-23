"use client"

import Link from "next/link";
import styles from "./styles.module.css"
import { CSSProperties, ReactNode } from "react"
import { Apartment, ApiHandler } from "shared"

type Props = {
    apartment: Partial<Apartment>;
}

export default function ApartmentCard({
    apartment
}: Props) {
    const href = `/${apartment.id}`

    return (
        <Link href={href} className={styles.container}>
            <img
                src={process.env.NEXT_PUBLIC_API_URL + "/" + (apartment.image ?? "")}
                className={styles.image}
            />
            <div className={styles.content}>
                <h1 className={styles.header}>
                    {apartment.title}
                </h1>
                <h2 className={styles.subHeader}>
                    {apartment.price!.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} EGP
                </h2>
            </div>
        </Link>
    )
}
