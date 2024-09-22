import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Store",
  description: "Manage and explore a variety of products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="flex flex-col min-h-screen">
          {/* Floating Transparent Navbar */}
          <header className="bg-inherit
            fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className=" backdrop-blur-md rounded-full px-8 py-2 shadow-lg">
              <nav className="flex space-x-8 justify-center items-center">
                <Link
                  href="/"
                  className="text-gray-900 font-semibold hover:underline hover:text-gray-600 transition"
                >
                  Home
                </Link>
                <Link
                  href="/addproduct"
                  className="text-gray-900 font-semibold hover:underline hover:text-gray-600 transition"
                >
                  Add Product
                </Link>
                <Link
                  href="/products"
                  className="text-gray-900 font-semibold hover:underline hover:text-gray-600 transition"
                >
                  View Products
                </Link>
              </nav>
            </div>
          </header>

         
          <main className="flex-grow  ">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
