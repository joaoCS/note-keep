import { Metadata } from "next"

import { cn } from "@/lib/utils"

import { CreateAccount } from "@/components/create-account"

export const metadata: Metadata = {
    title: "Autenticação",
    description: "Forneça seus dados para autenticação",
}

function Container({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "flex items-center justify-center [&>div]:w-full",
                className
            )}
            {...props}
        />
    )
}

export default function Register() {
    return (
        <>
            <div className="w-full flex justify-center items-center">
                <div className="flex items-center justify-center rounded-lg p-8">
                    <div className="flex items-center">
                        <Container>
                            <CreateAccount />
                        </Container>
                    </div>
                </div>
            </div>
        </>
    )
}
