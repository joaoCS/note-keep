"use client"

import { useSession } from "next-auth/react"

export default function ClientComponent() { 
    const session = useSession()

    console.log(session)

    return (
        <>
            {session?.data && (
                <div>
                    <h2>Client component</h2>
                    {JSON.stringify(session)}
                </div>
            )}
            
        </>
    )
}