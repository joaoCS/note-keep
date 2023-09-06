"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

import { useState } from "react"

interface IUser {
    name: string
    email: string
    password: string
}

export function CreateAccount() {
    const [data, setData] = useState<IUser>({
        name: "",
        email: "",
        password: "",
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()

    async function handleSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        
        setIsLoading(true)

        const request = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const response = await request.json()

        console.log("USER REGISTER FORM", response)

        if(!request.ok) {

        }
        else {
            console.log(response)
            router.push("/api/auth/signin")
        }

        setData({
            name: "",
            email: "",
            password: ""
        })

        setIsLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    return (
        <form onSubmit={handleSubmit}>

            <Card className="w-[500px]">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Crie sua conta</CardTitle>
                    <CardDescription>Digite seu email</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-1">
                    <div className="grid gap-1">
                        <Button variant="outline" type="button">
                            <Icons.gitHub className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Ou continue com
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-1 my-3">
                        <Label htmlFor="name">Seu nome</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Seu nome"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid gap-1 my-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@exemplo.com"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid gap-1 my-3">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Criar conta</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
