"use client";
import Link from "next/link";
import React from "react";
import createSession from "../actions/createSession";
import { useEffect, useActionState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const Login = () => {
  const [state, formAction] = useActionState(createSession, {});
  const {setIsAuthenicated} = useAuth()

  const router = useRouter()
  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success){
      setIsAuthenicated(true)
      toast.success('با موفقیت وارد شدید')
      router.push('/')
    }
  }, [state]);
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
        <form action={formAction}>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            وارد حساب خود شوید
          </h2>

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

          <div className="mb-6">
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

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-slate-900"
            >
              وارد شوید
            </button>

            <p>
              حساب کاربری ندارید؟
              <Link href="/register" className="text-slate-700 mr-2">
                ثبت نام کنید
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
