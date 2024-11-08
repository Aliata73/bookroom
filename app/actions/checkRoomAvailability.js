"use server";

import { createAdminClient, createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { redirect } from "next/dist/server/api-utils";
import { DateTime } from "luxon";

// Convert a date string to a Luxon DateTime object in UTC
function toUTCDateTime(dateString){
    return DateTime.fromISO(dateString, {zone: 'utc'}).toUTC()
}

// Check for overlapping data ranges
function dateRangesOverlapping(checkInA, checkOutA, checkInB, checkOutB){
    return checkInA < checkOutB && checkOutA > checkInB
}

async function checkRoomAvailability(roomId, checkIn, checkOut) {

    const sessionCookie = (await cookies()).get('rooman-session')
    if (!sessionCookie){
        redirect('/login')
    }

  try {
    const {databases}  = await createAdminClient()

    const checkInDateTime = toUTCDateTime(checkIn)
    const checkOutDateTime = toUTCDateTime(checkOut)

    // Fetch all booking for a given room
    const { documents: bookings } = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
        [Query.equal('room_id', roomId)]
      );

    //  Loop over bookings and check for overlaps
    for (const booking of bookings){
        const bookingCheckInDateTime = toUTCDateTime(booking.check_in)
        const bookingCheckOutDateTime = toUTCDateTime(booking.check_out)

        if (dateRangesOverlapping(
            checkInDateTime,checkOutDateTime,
            bookingCheckInDateTime, bookingCheckOutDateTime
        )){
            return false
        }
    }
    // No overlap found
    return true
    
  } catch (error) {
    console.log("Error: ", error);
    return {
        error: "چک کردن دسترسی اتاق با خطا مواجه شد"
    }
  }
}

export default checkRoomAvailability;
