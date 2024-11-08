'use client'
import Heading from "@/components/Heading";
import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createRoom from "@/app/actions/createRoom";

const AddRooms = () => {

  const [state, formAction ] = useActionState(createRoom, {})
  const router = useRouter()

  useEffect(()=> {
    if (state.error) console.log(state.error);
    if(state.success){
      toast.success('اتاق افزوده شد')
      router.push('/')
    }
    
  }, [state])
  return (
    <>
      <Heading title="افزودن اتاق" />

      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <form action={formAction}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              عنوان
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border rounded w-full py-2 px-3"
              placeholder="عنوانی برای اتاق وارد کنید"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              توضیحات
            </label>
            <textarea
              id="description"
              name="description"
              className="border rounded w-full h-24 py-2 px-3"
              placeholder="در مورد اتاق توضیحاتی وارد کنید"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="sqft" className="block text-gray-700 font-bold mb-2">
              اندازه اتاق / متر مربع
            </label>
            <input
              type="number"
              id="sqft"
              name="sqft"
              className="border rounded w-full py-2 px-3"
              placeholder="اندازه اتاق بر حسب متر مربع را وارد کنید"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="capacity"
              className="block text-gray-700 font-bold mb-2"
            >
              ظرفیت
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              className="border rounded w-full py-2 px-3"
              placeholder="حداکثر میزان ظرفیت اتاق را وارد کنید"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price_per_hour"
              className="block text-gray-700 font-bold mb-2"
            >
              قیمت 
            </label>
            <input
              type="number"
              id="price_per_hour"
              name="price_per_hour"
              className="border rounded w-full py-2 px-3"
              placeholder="قیمت اتاق برای هر ساعت را وارد کنید"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
              آدرس
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="border rounded w-full py-2 px-3"
              placeholder="آدرس کامل را وارد کنید"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-bold mb-2"
            >
              نشانی اتاق
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="border rounded w-full py-2 px-3"
              placeholder="نشانی اتاق (طبقه، شماره)"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="availability"
              className="block text-gray-700 font-bold mb-2"
            >
              زمان در دسترس بودن
            </label>
            <input
              type="text"
              id="availability"
              name="availability"
              className="border rounded w-full py-2 px-3"
              placeholder="زمان و تاریخ دسترس بودن اتاق را وارد کنید"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="amenities"
              className="block text-gray-700 font-bold mb-2"
            >
              امکانات و تجهیزات اتاق
            </label>
            <input
              type="text"
              id="amenities"
              name="amenities"
              className="border rounded w-full py-2 px-3"
              placeholder="امکانات و تجهیزات اتاق را وارد کنید"
              required
            />
          </div>

          {/* <!-- Image Upload --> */}
          <div className="mb-8">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
              تصویر اتاق
            </label>

            <input
              type="file"
              id="image"
              name="image"
              className="border rounded w-full py-2 px-3"
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-slate-900"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRooms;
