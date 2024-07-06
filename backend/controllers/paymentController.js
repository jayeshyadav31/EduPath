import Payment from "../Models/paymentModel.js";
import ApiError from '../utils/ApiError.js';

const savePayment = async (req, res) => {
    try {
        const userId = req.user._id;
        const courseId = req.params.id;
        console.log(courseId);
        const { payment_id, amount, status } = req.body;

        const new_payment = new Payment({
            user_id: userId,
            course_id: courseId,
            payment_id: payment_id,
            status: status,
            amount: amount
        });

        await new_payment.save();
        return res.status(200).json({ message: "Payment saved successfully", payment: new_payment });
    } catch (error) {
        console.error(`Error in saving payment: ${error.message}`);
        throw new ApiError(500, "Error in saving payment details");
    }
};

const getPaymentDetails = async (req, res) => {
    try {
        const payment_id = req.params.id;
        console.log(req.params.id);
        const payment = await Payment.findById(payment_id);

        if (!payment) {
            throw new ApiError(404, "No payment found");
        }

        return res.status(200).json(payment);
    } catch (error) {
        console.error(`Error in fetching payment details: ${error.message}`);
        throw new ApiError(500, "Error in fetching payment details");
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        return res.status(200).json(payments);
    } catch (error) {
        console.error(`Error in fetching all payments: ${error.message}`);
        throw new ApiError(500, "Error in fetching all payments");
    }
};

const getAllPaymentsByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const payments = await Payment.find({ user_id: userId });
        return res.status(200).json(payments);
    } catch (error) {
        console.error(`Error in fetching payments for user: ${error.message}`);
        throw new ApiError(500, "Error in fetching payments for user");
    }
};

export { savePayment, getPaymentDetails, getAllPayments, getAllPaymentsByUser };
