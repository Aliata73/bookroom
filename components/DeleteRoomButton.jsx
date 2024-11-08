'use client'
import { FaTrash } from "react-icons/fa6"
import { toast } from "react-toastify"
import deleteRoom from "@/app/actions/deleteRoom"

const DeleteRoomButton = ({roomId}) => {

    const handleDelete = async() => {
        const confirmed = window.confirm("مطمئن هستید که میخواهید این اتاق را حذف کنید؟")

        if (confirmed){
            try {
                const response = await deleteRoom(roomId)
                toast.success("اتاق حذف شد")
            } catch (error) {
                console.log('Failed to delete: ', error);
                toast.error('حذف اتاق با خطا مواجه شد')
                
            }
        }
    }
  return (
    <button
          onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
          >
           <FaTrash className="inline ml-1" /> حذف کردن
          </button>
  )
}

export default DeleteRoomButton