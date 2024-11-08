"use client";
import Link from "next/link";
import { useEffect, useActionState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import createUser from "../actions/createUser";

const Register = () => {
  const [state, formAction] = useActionState(createUser, {});
  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("ثبت نام با موفقیت انجام شد. لطفا وارد حساب خود شوید");
      router.push("/login");
    }
  }, [state]);
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
        <form action={formAction}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            ثبت نام کنید
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              نام
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              ایمیل
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              گذرواژه
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 font-bold mb-2"
            >
              تایید گذرواژه
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="border rounded w-full py-2 px-3"
              required
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-slate-900"
            >
              ثبت نام
            </button>

            <p>
              حساب کاربری دارید؟
              <Link href="/login" className="text-slate-700 mr-2">
                وارد شوید
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
