'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        color: '',
        company: '',
        category: ''
    });

    async function addProduct(event) {
        event.preventDefault();

        try {
            let result = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            result = await result.json();

            if (result.success) {
                alert('New product added');
                setFormData({
                    name: '',
                    price: '',
                    color: '',
                    company: '',
                    category: ''
                });
                router.push("/products");
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the product');
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
        <div className="min-h-screen flex items-center justify-center  bg-gradient-to-r from-green-200 via-teal-200 to-green-400 p-8">
            <div className="w-full max-w-md bg-white p-8 rounded-lg mt-12 shadow-lg transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:bg-gray-50">
                <h1 className="text-3xl font-extrabold text-gray-900 text-center  mb-6">Add a Product</h1>
                <form onSubmit={addProduct} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-transparent transition duration-300"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-transparent transition duration-300"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-transparent transition duration-300"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-transparent transition duration-300"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-transparent transition duration-300"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-green-500 transition-all duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
