 "use server";

import { createAdminClient, createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/dist/server/api-utils";
import { revalidatePath } from "next/cache";
import checkAuth from "./checkAuth";

async function cancelBooking(bookingId) {

    const sessionCookie = (await cookies()).get('rooman-session')
    if (!sessionCookie){
        redirect('/login')
    }

  try {
    const {databases}  = await createAdminClient()

    // Get User's Id
    const {user} = await checkAuth()
    
    if (!user){
        return {
            error: "لطفا وارد حساب کاربری خود شوید"
        }
    }
    // Get the database
    const booking = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    );

    if (booking.user_id !== user.id){
        return {
            error: "شما برای کنسل  این اتاق احراز هویت نشده اید"
        }
    }

    await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId
    )

    revalidatePath('/bookings', 'layout')

    

    return{
        success: true
    }
  } catch (error) {
    console.log("Error: ", error);
    return {
        error: "با خطا مواجه شد"
    }
  }
}

export default cancelBooking;
