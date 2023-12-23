"use client"

import { ReactNode } from "react"
import { ApiHandler } from "shared"

type Props = {
    children: JSX.Element | JSX.Element[] | ReactNode
}

ApiHandler.url = process.env.NEXT_PUBLIC_API_URL!

export default function MainContainer({
    children
}: Props) {
    return (
        <div>
            {children}
        </div>
    )
}
