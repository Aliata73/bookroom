"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBuilding } from "react-icons/fa";
import destroySession from "@/app/actions/destroySession";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";


const Header = () => {
  const router = useRouter();

const {isAuthenicated, setIsAuthenicated } = useAuth()

  
  const handleLogout = async () => {
    const { success, error } = await destroySession();
    if (success) {
      setIsAuthenicated(false)
      router.push("/login");
    } else {
      toast.error(error);
    }
  };
  return (
    <>
      <header className="bg-[#865d36] text-[#1d1813]">
        <nav className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex h-16  items-center justify-between">
            <div className="flex items-center space-x-3 gap-3 ">
              <Link href="/">
                <Image
                  src={logo}
                  width={40}
                  alt="logo"
                  className="rounded-md"
                />
              </Link>

              <div className="hidden md:block">
                <div className="mr-4 sm:mr-10 flex items-center space-x-3 gap-3">
                  <Link
                    href="/"
                    className="px-2 py-1 hover:bg-[#93785B] hover:text-[#] transition-all duration-300 rounded-md "
                  >
                    اتاق ها
                  </Link>
                  {/* <!-- Logged In Only --> */}
                  {isAuthenicated && (
                    <>
                    <Link
                    href="/bookings"
                    className="px-2 py-1 hover:bg-[#93785B] hover:text-[#] transition-all duration-300 rounded-md "
                  >
                    رزروهای من
                  </Link>
                  <Link
                    href="/rooms/add"
                    className="px-2 py-1 hover:bg-[#93785B] hover:text-[#] transition-all duration-300 rounded-md "
                  >
                    افزودن اتاق
                  </Link>
                    </>
                  )}
                  
                </div>
              </div>
            </div>
            {/* left side */}
            <div className="flex items-center gap-1 sm:gap-3 ">
              {!isAuthenicated && (

                <>
                <Link
                href="/login"
                className="px-2 text-sm sm:text-md py-1 hover:bg-[#93785B] hover:text-[#] transition-all duration-300 rounded-md "
              >
                وارد شوید
                <FaSignInAlt className="inline mr-2" />
              </Link>
              <Link
                href="/register"
                className="px-2 text-sm sm:text-md py-1 hover:bg-[#93785B] hover:text-[#] transition-all duration-300 rounded-md "
              >
                ثبت نام کنید
                <FaUser className="inline mr-2" />
              </Link>
                </>
              )}
              
              {isAuthenicated && (
                <>
                <Link
                href="/rooms/my"
                className="px-2 text-sm sm:text-md py-1 hover:bg-[#93785B] hover:text-[#] transition-all duration-300 rounded-md "
              >
                اتاق های من
                <FaBuilding className="inline mr-2" />
              </Link>

              <button
                onClick={handleLogout}
                className=" px-2 text-sm sm:text-md py-1 hover:bg-[#93785B] hover:text-[#] transition-all duration-300 rounded-md "
              >
                خروج
                <FaSignOutAlt className="inline mr-2 " />
              </button>
                </>
              )}
              
            </div>
          </div>
        </nav>
        {/* Mobile only */}
        <div className="md:hidden">
          <nav className="space-y-1 px-2 pb-3 pt-2 sm:px-3 flex flex-col ">
            <Link
              href="/rooms/add"
              className="px-2 text-sm sm:text-md py-1 hover:bg-[#93785B] hover:text-[#] transition-all duration-300 rounded-md "
            >
              اتاق ها
            </Link>
            <hr className="border-[#]" />
            {/* <!-- Logged In Only --> */}
            {isAuthenicated && (
              <>
              <Link
              href="/bookings"
              className="px-2 text-sm sm:text-md py-1 hover:bg-[#93785B] hover:text-[#] transition-all duration-300 rounded-md "
            >
              رزروهای من
            </Link>
            <hr className="border-[#]" />

            <Link
              href="/rooms/add"
              className="px-2 text-sm sm:text-md py-1 hover:bg-[#93785B] hover:text-[#] transition-all duration-300 rounded-md "
            >
              افزودن اتاق
            </Link>
              </>
            )}
            
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
