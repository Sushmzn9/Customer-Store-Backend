import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "active",
    },
    cart: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          unique: true,
        },
        title: {
          type: String,
        },
        slug: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
        orderQty: {
          type: Number,
          required: true,
        },
        orderSize: {
          type: String,
          default: false,
        },

        salesPrice: {
          type: Number,
        },

        description: {
          type: String,
        },
        thumbnail: {
          type: String,
          required: true,
        },
      },
    ],
    // payment: {
    //   totalAmount: {
    //     type: Number,
    //     required: true,
    //   },
    //   method: {
    //     type: String,
    //     required: true,
    //   },
    //   isPaid: {
    //     type: Boolean,
    //     required: true,
    //   },
    // },
    form: {
      _id: {
        type: mongoose.Types.ObjectId,
      },
      fName: {
        type: String,
        required: true,
      },

      lName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: false,
      },

      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
        default: "",
      },
    },
    orderNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("orders", orderSchema); //Users
