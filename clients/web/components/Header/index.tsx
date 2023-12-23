"use client"
import Link from 'next/link';
import styles from './styles.module.css'

export default function Header() {
    return (
        <div className={styles.container}>
            <Link href="/">Home</Link>
            <Link href="/create">Create Apartment</Link>
        </div>
    )
}
