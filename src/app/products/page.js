'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true); // Set loading to true when fetching starts
        try {
            let response = await fetch('/api/products', { cache: 'no-cache' });
            let data = await response.json();
            setProducts(data.result || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false); // Set loading to false when fetching ends
        }
    }

    async function deleteProduct(id) {
        try {
            let result = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            result = await result.json();

            if (result.success) {
                alert('Product Deleted');
                await fetchProducts();
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the product');
        }
    }

    return (
        <div className="p-6 min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-300">
            <h1 className="text-4xl text-center font-extrabold text-gray-900 sm:mt-12 mt-16 mb-10">Product List</h1>

            {loading ? ( // Display loading spinner/message when loading is true
                <div className="flex justify-center items-center min-h-[300px]">
                    <svg
                        className="animate-spin h-10 w-10 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        ></path>
                    </svg>
                    <p className="ml-3 text-lg font-semibold text-gray-700">Loading products...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white p-6 rounded-lg shadow-lg hover:bg-purple-50 hover:shadow-2xl transform hover:scale-105 transition-all duration-500 ease-in-out border border-indigo-100 hover:border-purple-200"
                        >
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{product.name}</h2>
                            <p className="text-gray-700 mb-2">
                                <strong>Price:</strong> ${product.price}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Color:</strong> {product.color}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Company:</strong> {product.company}
                            </p>
                            <p className="text-gray-700 mb-6">
                                <strong>Category:</strong> {product.category}
                            </p>
                            <div className="flex justify-between">
                                <Link href={`/products/${product._id}`}>
                                    <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline transition-all duration-300">
                                        Update
                                    </button>
                                </Link>
                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
