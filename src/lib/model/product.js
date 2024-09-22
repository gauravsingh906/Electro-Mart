import mongoose from "mongoose";
//create new schema 
const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    company: String,
    color: String,
    category: String
}
)

//here products is model name which is stored in productModel
export const productModel = mongoose.models.products || mongoose.model("products", productSchema)