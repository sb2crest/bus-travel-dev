import React, { MouseEventHandler, useEffect, useState } from "react";
import "./Checkout.scss";
import dummyImage from "../../assets/images/dummy.webp";

interface CheckoutProps {
  fromDate: Date;
  toDate: Date;
  bookingId: string;
  phoneNumber: string;
  secondStepProp: (step: boolean) => void;
  thirdStepProp: (step: boolean) => void;
  lastStepProp: (step: boolean) => void;
  TotalAmount: number;
  AdvanceAmount: number;
  RemainingAmount: number;
  Sleepertype: string;
  ACtype: string;
}

const Checkout: React.FC<CheckoutProps> = ({
  fromDate,
  toDate,
  bookingId,
  phoneNumber,
  ACtype,
  Sleepertype,
  secondStepProp,
  thirdStepProp,
  lastStepProp,
  TotalAmount,
  AdvanceAmount,
  RemainingAmount,
}) => {
  const [isapproval, setIsApproval] = useState(false);

  /* Second Step */
  const handleSecondStep = () => {
    secondStepProp(true);
  };

  /* Third Step */
  const handleThirdStep = () => {
    thirdStepProp(true);
  };

  /* Last Step */
  const handleLastStep = () => {
    lastStepProp(true);
  };

  const loadScript = (src: any) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  async function displayRazorpay(
    bookingId: string,
    mobile: string,
    amount: number
  ) {
    let requestBody = {
      bookingId: bookingId,
      mobile: mobile,
      amount: AdvanceAmount,
    };

    let baseUrl =
      "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    // let baseUrl = "http://localhost:8085/";

    try {
      const response = await fetch(`${baseUrl}createPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      const options = {
        key: "rzp_test_nHgaZ8pP0SqyOm",
        currency: data.currency,
        amount: amount * 100,
        name: "Pay Now",
        description: "Wallet Transaction",
        image: "http://localhost:8100/src/assets/images/Logo.png",
        order_id: data.razorPayOrderId,
        handler: async function (response: any) {
          alert("PAYMENT ID ::" + response.razorpay_payment_id);
          alert("ORDER ID :: " + response.razorpay_order_id);
          alert("Signature:: " + response.razorpay_signature);
          console.log(response);

          try {
            const postData = {
              razorPayPaymentId: response.razorpay_payment_id,
              razorPayOrderId: response.razorpay_order_id,
              razorPaySignature: response.razorpay_signature,
            };

            const postResponse = await fetch(`${baseUrl}verifySignature`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postData),
            }).then((t) => t.json());

            console.log(postResponse);

            if (postResponse.statusCode === 200) {
              // Handle success
              console.log("response from razor pay:" + postResponse);
              handleThirdStep();
              handleLastStep();
              setIsApproval(true);
            } else {
              // Handle error
              console.error("Unable to validate Signature");
            }
          } catch (error) {
            console.error("An error occurred during the POST API call:", error);
          }
        },
        prefill: {
          name: bookingId,
          email: mobile,
          contact: mobile,
        },
      };

      const rzp1 = new (window as any).Razorpay(options);

      rzp1.on("payment.failed", function (response: any) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();

      // const razorpayContainer = document.getElementsByClassName('razorpay-container') as HTMLElement;
      // if (razorpayContainer) {
      //   razorpayContainer.style.height = '100px'; // Set the desired height here
      // }
    } catch (error) {
      console.error(
        "An error occurred during the fetch or JSON parsing:",
        error
      );
    }
  }

  const razorpay: MouseEventHandler<HTMLButtonElement> = async (event) => {
    const amount = AdvanceAmount;
    handleSecondStep();
    await displayRazorpay(bookingId, phoneNumber, amount);
    console.log("Request Body:" + bookingId + "," + phoneNumber + "," + amount);
  };
  return (
    <>
      {isapproval ? (
        ""
      ) : (
        <div className="checkout_container">
          <div className="checkout_container_section">
            <div className="checkout_container_section_booking_summary">
              <p className="title">Booking Summary</p>
              <p className="line"></p>
              <div className="vehicle_info">
                <div className="vehicle_info_left">
                  <img
                    src={dummyImage}
                    alt="vehicle-image"
                    className="bus-image"
                  />
                  <p>Nandu Bus &nbsp;</p>
                  <p>
                    {ACtype} / {Sleepertype}
                  </p>
                </div>
                <div className="vehicle_info_right">
                  {" "}
                  <p className="start-date">
                    Start Date
                    <br />
                    <span className="date">
                      {fromDate.toLocaleDateString()}
                    </span>
                  </p>
                  <i className="fa-solid fa-arrows-left-right-to-line arrow-mark"></i>
                  <p className="end-date">
                    To Date
                    <br />
                    <span className="date">{toDate.toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
            </div>
              <div className="checkout_container_section_payment_summary">
                <p className="title">Payment Summary</p>
                <p className="line"></p>
                <div className="total-amount">
                  <p className="left">Total Amount</p>
                  <p className="right">{TotalAmount}</p>
                </div>
                <div className="advance-amount">
                  <p className="left">Advance Amount </p>
                  <p className="right">{AdvanceAmount}</p>
                </div>
                <p className="line"></p>
                <div className="remaining-amount">
                  <p className="left">Remaining Amount &nbsp;=</p>
                  <p className="right">{RemainingAmount}</p>
                </div>
                <div className="proceed-to-payment">
                  <button onClick={razorpay}>Proceed to pay</button>
                </div>
              </div>
            </div>
          </div>
      )}
    </>
  );
};

export default Checkout;
