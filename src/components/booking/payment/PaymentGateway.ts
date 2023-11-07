export default async function displayRazorpay(
  bookingId: string,
  mobile: string,
  amount: number
) {
  let requestBody = {
    bookingId: bookingId,
    mobile: mobile,
    amount: amount,
  };

  //TODO:: environment specific URL
  //let baseUrl: "http://localhost:8085/";
  let baseUrl =
    "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";

  const data = await fetch(`${baseUrl}createPayment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).then((t) => t.json());

  console.log(data);
  console.log(requestBody);

  const options = {
    key: "rzp_test_nHgaZ8pP0SqyOm",
    currency: data.currency,
    amount: amount,
    name: "Pay Now",
    description: "Wallet Transaction",
    image: "http://localhost:8100/src/assets/images/Logo.png",
    order_id: data.razorPayOrderId,
    handler: async function (response: any) {
      alert("PAYMENT ID ::" + response.razorpay_payment_id);
      alert("ORDER ID :: " + response.razorpay_order_id);
      alert("Signature:: " + response.razorpay_signature);
      // console.log(response)
      // Make a POST API call here
      try {
        const postData = {
          razorPayPaymentId: response.razorpay_payment_id,
          razorPayOrderId: response.razorpay_order_id,
          razorPaySignature: response.razorpay_signature,
          // Add any other data you need to send
        };

        const postResponse = await fetch(`${baseUrl}verifySignature`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }).then((t) => t.json());
        console.log(postResponse);
        if (postResponse.statusCode===200) {
          // Handle success
          // console.log(`status code is ${postResponse.status}`)
          console.log(postResponse);
        } else {
          // Handle error
          console.error("Unable to validate Signature");
        }
      } catch (error) {
        console.error(
          "An error occurred while making the POST API call",
          error
        );
      }
    },
    prefill: {
      name: bookingId,
      email: mobile,
      contact: mobile,
    },
  };
  // const rzp1 = new Razorpay(options);
  const rzp1 = new (window as any).Razorpay(options);
  rzp1.on(
    "payment.failed",
    function (response: {
      error: {
        code: any;
        description: any;
        source: any;
        step: any;
        reason: any;
        metadata: { order_id: any; payment_id: any };
      };
    }) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    }
  );
  // const paymentObject = new window.Razorpay(options);
  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.open();
}
