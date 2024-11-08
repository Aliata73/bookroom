'use server'
import { createAdminClient } from "@/config/appwrite"
import { ID } from "node-appwrite"

async function createUser(previousState, formData) {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirm-password')

    if (!name || !email || !password ){
        return {
            error: "لطفا تمامی فیلدهارو پر کنید"
        }
    }
    if (password.length < 8 ) {
        return {
            error: "حداقل طول گذرواژه باید ۸ کاراکتر باشد"
        }
    }
    if (password !== confirmPassword){
        return {
            error: "گذرواژه همخوانی ندارد"
        }
    }

    // Get account instance
    const {account } = await createAdminClient()

    try {
        // create user
        await account.create(ID.unique(), email, password, name)
        return{
            success: true
        }
    } catch (error) {
        console.log('Register Error, ', error);
        return {
            error: "ثبت نام شما با خطا مواجه شد"
        }
    }
}

export default createUser