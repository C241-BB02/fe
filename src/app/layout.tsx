import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import BBNavbar from "./components/navigation/navbar";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlurredBasket",
  description: "One click away from great products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <AuthProvider>
          <div className="min-h-screen">
            <div className="w-screen">
              <BBNavbar/>
            </div>
            <Toaster position="bottom-left" />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
