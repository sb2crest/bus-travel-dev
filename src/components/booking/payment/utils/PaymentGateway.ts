export default async function displayRazorpay(bookingId: string, mobile: string, amount: number) {
 
  let requestBody = {
    bookingId: bookingId,
    mobile: mobile,
    amount: amount
  }

  const data = await fetch("http://localhost:8085/createPayment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(requestBody), 
  }).then((t) => t.json());

  console.log(data);

  const options = {
    key: 'rzp_test_nHgaZ8pP0SqyOm',
    currency: data.currency,
    amount: amount,
    name: "Pay Now",
    description: "Wallet Transaction",
    image: "http://localhost:8100/src/assets/images/Logo.png",
    order_id: data.id,
    handler: function (response: any) {
      alert("PAYMENT ID ::" + response.razorpay_payment_id);
      alert("ORDER ID :: " + response.razorpay_order_id);
    },
    prefill: {
      name: "Vijay Krisna",
      email: "vkg.arya@gmail.com",
      contact: mobile,
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
