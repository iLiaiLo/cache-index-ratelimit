import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

ProductSchema.index({ name: "text" });

const Products = mongoose.model("Products", ProductSchema);

export default Products;
