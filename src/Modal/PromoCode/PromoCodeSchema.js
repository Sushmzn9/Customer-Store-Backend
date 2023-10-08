import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true, // Ensure promo codes are unique
  },
  discountAmount: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  usageLimit: {
    type: Number,
    default: null, // Unlimited usage by default, set a number for a limit
  },
  usageCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("PromoCode", promoCodeSchema);
