"use server";

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

async function getSingleRoom(id) {
  try {
    const { databases } = await createAdminClient();

    // Fetch Rooms
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      id
    );

    // Revalidate the cache for this path
  
    return room;
  } catch (error) {
    console.log("Error: ", error);
    // redirect('/')
  }
}

export default getSingleRoom;