'use client'

import cancelBooking from "@/app/actions/cancelBooking"
import { toast } from "react-toastify"

const CancelBookingButton = ({bookingId}) => {

    const handleCancel = async() => {
        if (!confirm("مطمئن هستید کی میخواهید رزروتان را کنسل کنید؟")){
            return
        }

        try {
            const result = await cancelBooking(bookingId)
            if (result.success){
                   toast.success("رزرو شما با موفقیت کنسل شد") 
                }
        } catch (error) {
            console.log("Error: ", error);
            return {
                error: "خطا"
            }
        }
    }
  return (
    <button
    onClick={handleCancel}
    className="bg-red-700 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-[#BC4639]"
  >
    کنسل کردن
  </button>
  )
}

export default CancelBookingButton