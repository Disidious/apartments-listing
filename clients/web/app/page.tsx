"use client"

import { useEffect, useState } from 'react'

import { ApiHandler, Apartment } from 'shared'
import { ApartmentCard } from 'components';
import styles from './page.module.css'

export default function Home() {
  const [apartments, setApartments] = useState<Partial<Apartment>[]>([]);

  useEffect(() => {
    ApiHandler.getApartmentsList().then((response) => {
      if (response.status === 'success') {
        setApartments(response.json)
      }

      return
    });
  }, [])

  return (
    <div className={styles.container}>
      {
        apartments.map((apartment) => (
          <ApartmentCard key={apartment.id} apartment={apartment} />
        ))
      }
    </div>
  )
}