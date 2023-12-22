"use client"

import Link from 'next/link';
import styles from './page.module.css'
import { useEffect, useState } from 'react'

import { ApiHandler, Apartment } from 'shared'

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
    <div>
      <table className={styles.apartmentsTable}>
        <tbody>
          <tr>
            <th>
              Title
            </th>
            <th>
              Price
            </th>
          </tr>
          {
            apartments.map((apartment) => {
              const href = `/${apartment.id}`
              return (
                <tr key={apartment.id}>
                  <td>
                    <Link href={href}>{apartment.title}</Link>
                  </td>
                  <td>
                    {apartment.price}
                  </td>
                </tr>
              )
            }
            )
          }
        </tbody>
      </table>
    </div>
  )
}
