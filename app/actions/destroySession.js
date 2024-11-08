'use server'
import { createSessionClient } from "@/config/appwrite"
import { cookies } from "next/headers"

async function destroySession() {

    // Retrieving the session cookie
    const sessionCookie = (await cookies()).get('rooman-session')
    
    if (!sessionCookie){
        return {
            error: "هیچ نشست فعالی پیدا نشد"
        }
    }
    try {
        const { account } = await createSessionClient(sessionCookie.value)

        // Deleter current session
        await account.deleteSession('current')

        // Clear session cookie
        ;(await cookies()).delete('rooman-session')

        return {
            success: true
        }
    
    } catch (error) {
        
        return {
            error: "مشکلی در خروج از حساب کابری پیش آمده"
        }
        
    }
    
    
}

export default destroySession