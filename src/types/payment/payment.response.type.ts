export default interface IPaymentResponse {
    status: string,
    message: string,
    razorpayPaymentId: string,
    paymentDate: string
}