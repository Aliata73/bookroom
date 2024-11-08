import Heading from "@/components/Heading"
import getMybookings from "../actions/getMyBookings"
import BookedRoomCard from "@/components/BookedRoomCard"

const Bookings = async () => {
  const bookings = await getMybookings()
  return (
    <>
      <Heading title="رزور های من" />
      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => <BookedRoomCard key={booking.$id} booking={booking} />)
      ) : (
        <p className="text-gray-700 mt-4"></p>
      ) }
    </>
  )
}

export default Bookings