import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 animate-gradient-x p-8">
      <div className="text-center">
        {/* Logo */}
        <div className="animate-bounce mb-6">
          <Image
            src="/next.svg" // Update with your logo path
            alt="Product Store Logo"
            width={120}
            height={120}
          />
        </div>
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
          Welcome to <span className="text-purple-700">Product Store</span>
        </h1>
        <p className="text-xl mb-8 text-gray-700">
          Discover and manage your favorite products with ease.
        </p>

        {/* Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/addproduct" >
            <button className="bg-gradient-to-r mb-5 from-purple-600 to-purple-800 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition duration-500 transform hover:scale-110 hover:rotate-1 hover:shadow-2xl">
              Add New Product
            </button>
          </Link>
          <Link href="/products">
            <button className="sm:ml-4 ml-0 bg-gradient-to-r from-pink-600 to-orange-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-pink-700 transition duration-500 transform hover:scale-110 hover:rotate-1 hover:shadow-2xl">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
