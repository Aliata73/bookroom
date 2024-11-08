import Heading from "@/components/Heading"
import getMyRooms from "@/app/actions/getMyRooms"
import MyRoomCard from "@/components/MyRoomCard"

const MyRoomsPage = async() => {

    const rooms = await getMyRooms()
  return (
    <>
        <Heading title="اتاق های من" />
        {rooms && rooms.length > 0 ? (
            rooms.map((room) => <MyRoomCard key={room.$id} room={room} />)
        ) : (
            <p>شما اتاقی اضافه نکرده اید</p>
        ) }
    </>
  )
}

export default MyRoomsPage