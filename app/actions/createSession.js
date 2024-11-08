'use server'
import { createAdminClient } from "@/config/appwrite"
import { cookies } from "next/headers"

async function createSession(previousState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password){
        return {
            error: "لطفا تمامی فیلد هارو پر کنید"
        }
    }

    // Get account instance
    const { account } = await createAdminClient()
    // Generate session

    try {
        const session = await account.createEmailPasswordSession(email, password)

    // Create cookie
    ;(await cookies()).set('rooman-session', session.secret, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: new Date(session.expire),
        path: '/'
    })


    return {
        success: true,
    }
    } catch (error) {
        console.log("Authenication Error: ", error);
        return {
            error: "اطلاعات وارد شده صحیح نمی باشد"
        }
        
    }
    
    
}

export default createSession