import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { productModel } from "@/lib/model/product";

// Handle GET request to fetch a product by ID
export async function GET(req, { params }) {
    const productId = { _id: params.product_id };
    let data = [];

    try {
        // Connect to the MongoDB database
        await mongoose.connect(connectionStr);

        // Retrieve the product by ID from the database
        data = await productModel.findById(productId);

        // Check if the product was found
        if (!data) {
            return NextResponse.json({ result: "Product not found", success: false });
        }
    } catch (err) {
        // Handle errors and return an error response
        data = { success: false, result: err.message };
    }

    // Disconnect from the MongoDB database
    await mongoose.disconnect();

    // Return the product data or error response
    return NextResponse.json({ result: data, success: true });
}

// Handle PUT request to update a product
export async function PUT(req, { params }) {
    const id = { _id: params.product_id };
    const payload = await req.json();

    try {
        // Connect to the MongoDB database
        await mongoose.connect(connectionStr);

        // Check if all required fields are provided
        if (!payload.name || !payload.color || !payload.category || !payload.company || !payload.price) {
            return NextResponse.json({ result: "Required field is not filled", success: false });
        }

        // Update the product with the provided data
        const result = await productModel.findOneAndUpdate(id, payload, { new: true });

        // Check if the product was found and updated
        if (!result) {
            return NextResponse.json({ result: "Product not found", success: false });
        }

        // Return the updated product data
        return NextResponse.json({ result, success: true });
    } catch (err) {
        // Handle errors and return an error response
        return NextResponse.json({ result: err.message, success: false });
    } finally {
        // Disconnect from the MongoDB database
        await mongoose.disconnect();
    }
}

// Handle DELETE request to remove a product
export async function DELETE(req, { params }) {
    const productId = { _id: params.product_id };
    let data = [];

    try {
        // Connect to the MongoDB database
        await mongoose.connect(connectionStr);

        // Delete the product from the database
        const result = await productModel.deleteOne(productId);

        // Check if the product was found and deleted
        if (result.deletedCount === 0) {
            return NextResponse.json({ result: "Product not found", success: false });
        }

        // Return success message
        data = { success: true, result: "Product deleted successfully" };
    } catch (err) {
        // Handle errors and return an error response
        data = { success: false, result: err.message };
    } finally {
        // Disconnect from the MongoDB database
        await mongoose.disconnect();
    }

    // Return the result of the delete operation
    return NextResponse.json(data);
}
