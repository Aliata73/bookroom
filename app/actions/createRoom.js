'use server'
import { createAdminClient } from "@/config/appwrite"
import checkAuth from "./checkAuth"
import { ID } from "node-appwrite"
import { revalidatePath } from "next/cache"


async function createRoom(previousState, formData) {
    // Get databases instance
    const { databases, storage } = await createAdminClient()

    try {
        // Get the user
        const { user } = await checkAuth()

        if (!user){
            return {
                error: 'برای افزودن اتاق ابتدا وارد حساب خود شوید'
            }
        }

        // uploading image
        let imageID;

        const image = formData.get('image')

        if (image && image.size > 0 && image.name !== 'undefined'){
           try {
            // upload
            const response = await storage.createFile('rooms', ID.unique(), image)
            imageID = response.$id
           } catch (error) {
            console.log("Error uploading image", error);
            return{
                error: "آپلود تصویر با خطا مواجه شد"
            }
            
           } 
        }else{
            console.log("No image file provided or invalid image file");
            
        }
        // Create room
        const newRoom = await databases.createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
            ID.unique(),
            {
                user_id: user.id,
                name: formData.get('name'),
                description: formData.get('description'),
                sqft: formData.get('sqft'),
                capacity: formData.get('capacity'),
                address: formData.get('address'),
                location: formData.get('location'),
                availability: formData.get('availability'),
                price_per_hour: formData.get('price_per_hour'),
                amenities: formData.get('amenities'),
                image: imageID,
            }
        )
        revalidatePath('/', 'layout')

        return {
            success: true
        }
    } catch (error) {
        console.log(error);
        const errorMessage = error.response.message || 'خطایی رخ داده است'
        return {
            error: errorMessage
        }
               
    }
}

export default createRoom