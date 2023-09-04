import { NextAuthOptions } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "./db"

import { Github } from "lucide-react"

import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db as any),
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "joao@mail.com",
                },
                password: { label: "Senha", type: "password" },
                username: {
                    label: "Nome",
                    type: "text",
                    placeholder: "João",
                },
            },
            async authorize(credentials, req): Promise<any> {
                console.log("Authorize method", credentials)

                if (!credentials?.email || !credentials.password)
                    throw new Error("Dados de login necessários")

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                })

                if (!user || !user.hashedPassword)
                    throw new Error(
                        "Usuário não cadastrado através de credenciais!"
                    )

                const matchPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if (!matchPassword) throw new Error("Senha incorreta!")

                return user
            },
        }),
    ],

    secret: process.env.SECRET,
    debug: process.env.NODE_ENV === "development",
    // pages: {
    //     signIn: "/login"
    // }
}
