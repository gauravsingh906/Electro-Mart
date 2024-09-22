import mongoose from "mongoose";
import { productModel } from "@/lib/model/product";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../lib/db";

// Handle GET request to retrieve all products
export async function GET(req, res) {
    let data = [];

    try {
        // Connect to the MongoDB database
        await mongoose.connect(connectionStr);

        // Retrieve all products from the database
        data = await productModel.find();
    } catch (err) {
        // Handle errors and set the response data to indicate failure
        data = { success: false };
    } finally {
        // Disconnect from the MongoDB database
        await mongoose.disconnect();
    }

    // Return the products or an error response
    return NextResponse.json({ result: data });
}

// Handle POST request to create a new product
export async function POST(req) {
    const payload = await req.json();

    try {
        // Connect to the MongoDB database
        await mongoose.connect(connectionStr);

        // Validate that all required fields are provided
        if (!payload.name || !payload.color || !payload.category || !payload.company || !payload.price) {
            return NextResponse.json({ success: false, result: "Required field is missing" });
        }

        // Create a new product instance
        let product = new productModel(payload);

        // Save the new product to the database
        const result = await product.save();

        // Return the created product and success status
        return NextResponse.json({ result, success: true });
    } catch (err) {
        // Handle errors and return an error response
        return NextResponse.json({ result: err.message, success: false });
    } finally {
        // Disconnect from the MongoDB database
        await mongoose.disconnect();
    }
}
