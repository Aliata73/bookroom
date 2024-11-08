import localFont from "next/font/local";
import "@/assets/styles/globals.css";
import AuthWrapper from "@/components/AuthWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const iranSans = localFont({
  src: "./fonts/IRANSansWeb.woff",
});

export const metadata = {
  title: "رومان | رزور اتاق",
  description: "رزرو اتاق کنفرانس برای جلسه یا تیم خود",
};

export default function RootLayout({ children }) {
  return (
    <AuthWrapper>
      <html lang="fa-IR" dir="rtl">
        <head>
          <link rel="icon" href="/favicon.png" />
        </head>
        <body className={iranSans.className}>
          <Header />
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 min-h-[80vh]">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthWrapper>
  );
}
