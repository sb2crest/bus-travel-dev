export default async function displayRazorpay() {
  const data = await fetch("http://localhost:8000/razorpay", {
    method: "POST",
  }).then((t) => t.json());

  console.log(data);

  const options = {
    key: 'rzp_test_I3bD1mfILhLGTE', //process.env.RAZORPAY_KEY_ID,
    currency: data.currency,
    amount: data.amount,
    name: "Pay Now",
    description: "Wallet Transaction",
    // image: "http://localhost:8000/logo.png",
    image: "http://localhost:8100/src/assets/images/Logo.png",
    order_id: data.id,
    handler: function (response:any) {
      alert("PAYMENT ID ::" + response.razorpay_payment_id);
      alert("ORDER ID :: " + response.razorpay_order_id);
    },
    prefill: {
      name: "Vijay Krisna",
      email: "vkg.arya@gmail.com",
      contact: "9999999999",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
