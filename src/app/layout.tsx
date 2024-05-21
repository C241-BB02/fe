import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import BBNavbar from "./components/navigation/navbar";

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
        <div className="w-screen">
          <BBNavbar/>
        </div>
        {children}
      </body>
    </html>
  );
}
