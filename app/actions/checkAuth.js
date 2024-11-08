'use server'
import { createSessionClient } from "@/config/appwrite"
import { cookies } from "next/headers"

async function checkAuth() {
    const sessionCookie = (await cookies()).get('rooman-session')
    
    if (!sessionCookie){
        return{
            isAuthenicated: false
        }
    }

    try {
        const { account } = await createSessionClient(sessionCookie.value)
        const user = await account.get()

        return {
            isAuthenicated: true,
            user: {
                id: user.$id,
                name: user.name,
                email: user.email 
            }
        }
    } catch (error) {
        return{
            isAuthenicated: false
        }
    }
}

export default checkAuth