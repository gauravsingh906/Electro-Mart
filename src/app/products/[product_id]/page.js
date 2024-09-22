'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
    const id = params.product_id;
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        color: '',
        company: '',
        category: ''
    });
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        async function fetchProduct() {
            try {
                let response = await fetch(`/api/products/${id}`);
                let data = await response.json();
                setFormData(data.result || {}); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        }

        fetchProduct();
    }, [id]);

    async function updateProduct(event) {
        event.preventDefault();

        try {
            let result = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            result = await result.json();

            if (result.success) {
                alert('Product Updated');
                router.push('/products');
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the product');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="min-h-screen flex items-center   justify-center bg-gradient-to-r from-pink-100 via-purple-200 to-blue-300 p-8">
            {loading ? (
                <div className="flex justify-center items-center">
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
                    <p className="ml-3 text-lg font-semibold text-gray-700">Loading product details...</p>
                </div>
            ) : (
                <div className="w-full max-w-lg bg-white p-10 mt-12 rounded-xl shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Edit Product</h1>
                    <form onSubmit={updateProduct} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                            />
                        </div>

                        {/* Price Field */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">Price ($)</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                            />
                        </div>

                        {/* Color Field */}
                        <div>
                            <label htmlFor="color" className="block text-sm font-semibold text-gray-700 mb-1">Color</label>
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                            />
                        </div>

                        {/* Company Field */}
                        <div>
                            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                            />
                        </div>

                        {/* Category Field */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            >
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
