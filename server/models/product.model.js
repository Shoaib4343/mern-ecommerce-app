import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ PERFORMANCE INDEXES - Add these for filtering
productSchema.index({ price: 1 });           // For price sorting
productSchema.index({ category: 1 });        // For category filtering
productSchema.index({ createdAt: -1 });      // For newest sorting
productSchema.index({ quantity: 1 });        // For stock filtering

// ✅ Text index for search functionality
productSchema.index({ 
  name: 'text', 
  description: 'text' 
}, {
  weights: {
    name: 10,        // Name is more important
    description: 5   // Description is less important
  }
});

// ✅ Compound indexes for common query patterns
productSchema.index({ category: 1, price: 1 });      // Category + price filter
productSchema.index({ category: 1, createdAt: -1 }); // Category + newest

export default mongoose.model("Product", productSchema);