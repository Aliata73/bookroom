"use server";
import { createAdminClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { redirect } from "next/dist/server/api-utils";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";
import checkRoomAvailability from "./checkRoomAvailability";

async function bookRoom(previousState, formData) {
  const sessionCookie = (await cookies()).get("rooman-session");
  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { databases } = await createAdminClient();

    // Get User's Id
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: "برای رزرو اتاق ابتدا باید وارد حساب کاربری خود شوید",
      };
    }

    // Extract date and time from the formData
    const checkInDate = formData.get("check_in_date");
    const checkInTime = formData.get("check_in_time");
    const checkOutDate = formData.get("check_out_date");
    const checkOutTime = formData.get("check_out_time");
    const roomId = formData.get('room_id')

    // Combine time and date to ISO 8601 format
    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;

    // Check if room is available
    const isAvailable = await checkRoomAvailability(roomId, checkInDateTime, checkOutDateTime)

    if (!isAvailable){
      return {
        error: "این اتاق برای تاریخ و ساعتی که انتخاب کردید قبلا رزرو شده است. لطفا زمان دیگری را انتخاب کنید"
      }
    }

    // Booking Data
    const bookingData = {
      check_in: checkInDateTime,
      check_out: checkOutDateTime,
      user_id: user.id,
      room_id: roomId,
    };

    // Create Booking
    const newBooking = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      ID.unique(),
      bookingData
    );

    // Revalidate path
    revalidatePath('/bookings', 'layout')

    return {
        success: true
    }
  } catch (error) {
    console.log("Error: ", error);
    return {
      error: "رزرو اتاق با خطا مواجه شد",
    };
  }
}

export default bookRoom;
