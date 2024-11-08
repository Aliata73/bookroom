"use server";
import { createAdminClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/dist/server/api-utils";
import checkAuth from "./checkAuth";

async function getMybookings() {

    const sessionCookie = (await cookies()).get('rooman-session')
    if (!sessionCookie){
        redirect('/login')
    }

  try {
    const {databases}  = await createAdminClient()

    // Get User
    const {user} = await checkAuth()
    
    if (!user){
        return {
            error: "ابتدا وارد حساب کاربری خود شوید"
        }
    }
    
    // Fetch User Bookings
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal('user_id', user.id)]
    );

    return bookings;
  } catch (error) {
    console.log("Error: ", error);
    return{
        error: "خطا"
    }
  }
}

export default getMybookings;
