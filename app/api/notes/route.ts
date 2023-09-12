import { NextRequest, NextResponse } from "next/server"

import { db as prisma } from "@/lib/db"

export async function POST(request: NextRequest) {
    const data = await request.json()

    console.log("Este console.log", data)

    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    })

    if (user) {
        console.log(user)

        const note = await prisma.note.create({
            data: {
                title: data.title,
                body: data.body,    
                userId: user.id,
            },
        })

        console.log(note)

        return NextResponse.json("Nota criada com sucesso!", { status: 200 })
    }
    

    return NextResponse.json("Usuário não encontrado!", { status: 500 })

}
