import Link from "next/link";
import React from "react";
import CancelBookingButton from "./CancelBookingButton";

const BookedRoomCard = ({ booking }) => {
  const { room_id: room } = booking;

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Format Year, Month, and Day in Persian (Iran) Calendar
    const dateOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Tehran",
      calendar: "persian",
    };
    const formattedDate = new Intl.DateTimeFormat("fa-IR", dateOptions).format(
      date
    );

    // Format time in Iran Time (Asia/Tehran) - 12 Hour
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Tehran",
    };
    const time = new Intl.DateTimeFormat("en-US", timeOptions).format(date);

    // Final formatted string
    return `${formattedDate} ${time}`;
  };
  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <h4 className="text-lg font-semibold">{room.name}</h4>
        <p className="text-sm text-gray-600">
          <strong>تاریخ ورود:</strong> {formatDate(booking.check_in)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>تاریخ خروج:</strong> {formatDate(booking.check_out)}
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
          href={ `/rooms/${room.$id}`}
          className="bg-[#5C2018] text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-[#4d1a14]"
        >
          نمایش اتاق
        </Link>
        <CancelBookingButton bookingId={booking.$id} />
      </div>
    </div>
  );
};

export default BookedRoomCard;
