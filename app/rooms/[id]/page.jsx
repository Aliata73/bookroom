import BookingForm from "@/components/BookingForm";
import Heading from "@/components/Heading";
import getSingleRoom from "@/app/actions/getSingleRoom";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

const RoomPage = async ({ params }) => {
  const { id } = await params;
  const room = await getSingleRoom(id);
  if (!room) {
    return <Heading title="اتاقی برای نمایش وجود ندارد" />;
  }
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

  const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${room.image}/view?project=${projectId}`;
  const imageSrc = room.image ? imageUrl : "/images/no-image.jpg";

  return (
    <>
      <Heading title={room.name} />
      <div className="bg-white shadow rounded-lg p-6 mt-3">
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaChevronRight className="ml-1.5 inline" />
          <span className="ml-2">بازگشت به اتاق ها</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <Image
            src={imageSrc}
            alt={room.name}
            width={400}
            height={100}
            className="w-full sm:w-1/3 h-64 object-cover rounded-lg ml-3"
          />

          <div className="mt-4 sm:mt-0 sm:flex-1">
            <p className="text-gray-600 mb-4">{room.description}</p>

            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-gray-800">اندازه اتاق: </span>{" "}
                {room.sqft} متر مربع
              </li>
              <li>
                <span className="font-semibold text-gray-800">
                  زمانبندی رزرو اتاق: {" "}
                </span>
                {room.availability}
              </li>
              <li>
                <span className="font-semibold text-gray-800">قیمت اتاق: </span>
                {room.price_per_hour} تومان
              </li>
              <li>
                <span className="font-semibold text-gray-800">آدرس: </span>{" "}
               
                {room.address}
              </li>
              <li className="font-medium text-slate-600">
                <span className="font-semibold text-gray-800">امکانات و تجهیزات: </span>
                {room.amenities} 
              </li>
            </ul>
          </div>
        </div>

        <BookingForm room={room} />
      </div>
    </>
  );
};

export default RoomPage;
