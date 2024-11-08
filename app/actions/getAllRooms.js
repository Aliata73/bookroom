"use server";

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

async function getAllRooms() {
  try {
    const { databases } = await createAdminClient();

    // Fetch Rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
    );

    // Revalidate the cache for this path
  
    return rooms;
  } catch (error) {
    console.log("Error: ", error);
    // redirect('/')
  }
}

export default getAllRooms;
