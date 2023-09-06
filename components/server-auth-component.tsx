import { getCurrentUser } from "@/lib/session"

export default async function ServerComponent() {
    const user = await getCurrentUser()

    return (
        <>
            {user !== undefined && (
                <div>
                    <h2>Server component</h2>
                    {JSON.stringify(user)}
                </div>
            )}
        </>
    )
}
