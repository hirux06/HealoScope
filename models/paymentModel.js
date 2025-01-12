import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
