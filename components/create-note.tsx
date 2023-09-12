"use client"

import { useState, useEffect } from "react"

import { useSession } from "next-auth/react";

export default function CreateNote() {
    interface IData {
        title: string;
        body: string;
        email: string | null | undefined;
    }


    const session = useSession()


    console.log(session)
    console.log(session?.data?.user?.email)

    const [data, setData] = useState<IData>({
        title: "",
        body: "",
        email: session?.data?.user?.email,
    })

    useEffect(() => {
        setData((prev) => {
            return {
                ...prev,
                email: session?.data?.user?.email,
            }
        })
    }, [session?.data?.user?.email])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setData((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault()

        if (session.status === "unauthenticated")
            throw new Error("Usuário não autenticado!")

        // setData((prev) => {
        //     return {
        //         ...prev,
        //         email: session?.data?.user?.email,
        //     }
        // })

        if (data.title.length > 0) {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })

            console.log(response)

            setData({ ...data, title: "", body: "", })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {JSON.stringify(data)}
            <label htmlFor="title">Título: </label>
            <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
            />
            <label htmlFor="body">Conteudo: </label>
            <input type="text" name="body" id="body" onChange={handleChange} />
            <button type="submit" disabled={data.title.length === 0}>
                Salvar nota
            </button>
        </form>
    )
}
