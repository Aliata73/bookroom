"use server";

import { createAdminClient, createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/dist/server/api-utils";
import { revalidatePath } from "next/cache";

async function deleteRoom(roomId) {
  const sessionCookie = (await cookies()).get("rooman-session");
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { databases } = await createAdminClient();
    const { account } = await createSessionClient(sessionCookie.value);

    // Get User's Id
    const user = await account.get();

    const userId = user.$id;
    // Fetch User Rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal("user_id", userId)]
    );

    // Find room to delete
    const roomToDelete = rooms.find((room) => room.$id === roomId);

    // Delete Room
    if (roomToDelete) {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
        roomToDelete.$id
      );
      

      // Revalidate my rooms and all room
      revalidatePath('/rooms/my', 'layout')
      revalidatePath('/', 'layout')

      return {
        success: true
      }
    }else{
        return{
            error: "اتاق یافت نشد"
        }
    }

  } catch (error) {
    console.log("Error: ", error);
  }
}

export default deleteRoom;

