import React from "react";
import { ShoppingCart, Trash2, Tag, ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { cartApiFetch } from "../../ApiFetch/cartApiFetch";
import { clearCart, removeCourse } from "../../redux/slicers/cartSlicer";
import toast from "react-hot-toast";
import { useState } from "react";
import transactionApiFetch from "../../ApiFetch/transactionApiFetch";
import { addEnrolledCourse } from "../../redux/slicers/enrollmentSlicer";
import useInitEnrolledCourses from "../../EffectsForApp/useInitEnrolledCourses";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const [coupon, setCoupon] = useState("");

  const dispatch = useDispatch();

  const subTotal = cart.reduce((acc, item) => acc + item.price.final, 0);

  let courseIds = [];

  cart.forEach((item) => courseIds.push(item._id));

  const handleCartDelete = async (courseId) => {
    try {
      const response = await cartApiFetch.removeFromCart(courseId);

      if (response?.success) {
        dispatch(removeCourse(courseId));
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.error || "Failed to remove course from cart");
      }
      console.log(response);
    } catch (error) {
      toast.error(error.message || "something went wrong");
    }
  };

  const handlePayment = async (subTotal, courseIds) => {
    if (courseIds.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const response = await transactionApiFetch.createOrder(
        subTotal,
        courseIds
      );

      console.log("response create order :", response);

      if (response?.success) {
        toast.success("Order created successfully!");

        console.log("response payment :", response);
        const raw = response?.data?.data?.rawResponse;
        const transactionId = response?.data?.data._id;

        const courseIds_response = response?.data?.data?.courseId;
        console.log("courseIds_response :", courseIds_response);
        // TODO: Redirect to payment gateway or next step
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
          amount: raw.amount, // Amount is in currency subunits.
          currency: raw.currency,
          name: "Study Brew", //your business name
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: raw.id, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: function (response) {
            console.log("response inside handler :", response);
            handleVerifyPayment(
              response,
              coupon,
              courseIds_response,
              transactionId
            );
          },
          prefill: {
            //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            name: user?.data?.username, //your customer's name
            email: user?.data?.email,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        // window.location.href = response.data.paymentUrl;
      } else {
        console.log("error else :", response);
        toast.error(response?.error || "Failed to create order");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(error.message || "Something went wrong with your order");
    }
  };

  const handleVerifyPayment = async (
    response,
    coupon,
    courseIds_response,
    transactionId
  ) => {
    try {
      const res = await transactionApiFetch.verifyPayment({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        coupon,
        courseIds: courseIds_response,
        transactionId,
      });
      console.log("verify payment response data :", res);
      if (res?.success) {
        console.log("res res res res res :", res);
        toast.success("Verified Payment");
        dispatch(addEnrolledCourse(res?.data?.data?.enrollment?.courseIds));
        dispatch(clearCart());

        try {
          const res = await cartApiFetch.removeUserCart();
          if (res?.success) {
            console.log("remove user cart response :", res);
            toast.success("Cart removed!");
          } else {
            toast.error("Failed to remove cart!");
          }
        } catch (error) {
          toast.error("Something went wrong!");
        }
      } else {
        toast.error(res?.error || "Failed to verify payment");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(
        error.message || "Something went wrong with payment verification"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffaf2] via-[#fff5e6] to-[#f5e6d3] py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#b08968] to-[#8c5e3c] rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="text-white w-6 h-6" />
            </div>
            <h1 className="text-4xl font-black text-[#6b4226]">
              Shopping Cart
            </h1>
          </div>
          <p className="text-[#8c5e3c] ml-15 font-medium">
            {cart.length} courses in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-[#e0c9a6]/20 border border-[#e0c9a6]/30 p-6 hover:shadow-xl hover:shadow-[#e0c9a6]/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Course Image */}
                  <div className="flex-shrink-0">
                    <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shadow-md">
                      <img
                        src={item.thumbnail.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-[#6b4226] mb-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#8c5e3c]">
                          by {item.instructor}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCartDelete(item._id)}
                        className="p-2 text-[#8c5e3c] hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex justify-between items-end">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-[#8c5e3c] line-through">
                            ₹{item.price.base}
                          </span>
                          <span className="text-2xl font-black text-[#6b4226]">
                            ₹{item.price.final}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon Section */}
            <div className="bg-gradient-to-r from-[#e0c9a6]/30 to-[#d4b996]/30 backdrop-blur-sm rounded-2xl shadow-md border border-[#e0c9a6]/50 p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-5 h-5 text-[#8c5e3c]" />
                <h3 className="text-lg font-bold text-[#6b4226]">
                  Have a coupon?
                </h3>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  className="flex-grow px-4 py-3 bg-white border-2 border-[#e0c9a6] rounded-xl text-[#6b4226] placeholder-[#b08968] focus:outline-none focus:border-[#8c5e3c] transition-colors duration-300"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#8c5e3c]/30 transition-all duration-300">
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-[#e0c9a6]/30 border border-[#e0c9a6]/50 p-6">
                <h2 className="text-2xl font-black text-[#6b4226] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#6b4226]">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold">₹{subTotal}</span>
                  </div>
                  <div className="flex justify-between text-[#6b4226]">
                    <span className="font-medium">Discount</span>
                    <span className="font-bold text-green-600">-₹60.00</span>
                  </div>
                  <div className="flex justify-between text-[#6b4226]">
                    <span className="font-medium">Tax</span>
                    <span className="font-bold">₹0.00</span>
                  </div>

                  <div className="border-t-2 border-[#e0c9a6] pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-[#6b4226]">
                        Total
                      </span>
                      <span className="text-3xl font-black text-[#6b4226]">
                        ₹{subTotal}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handlePayment(subTotal, courseIds)}
                  className="w-full py-4 bg-gradient-to-r from-[#b08968] via-[#8c5e3c] to-[#6b4226] text-white font-black text-lg rounded-xl shadow-lg shadow-[#8c5e3c]/30 hover:shadow-xl hover:shadow-[#8c5e3c]/40 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <div className="mt-6 p-4 bg-gradient-to-r from-[#e0c9a6]/20 to-[#d4b996]/20 rounded-xl">
                  <p className="text-sm text-[#6b4226] text-center">
                    <span className="font-bold">💡 Pro Tip:</span> Complete your
                    purchase within 24 hours to lock in these prices!
                  </p>
                </div>

                {/* Benefits */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#b08968] to-[#8c5e3c] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-sm text-[#6b4226]">
                      30-day money-back guarantee
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#b08968] to-[#8c5e3c] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-sm text-[#6b4226]">
                      Lifetime access to courses
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#b08968] to-[#8c5e3c] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-sm text-[#6b4226]">
                      Certificate of completion
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty Cart State (hidden when items exist) */}
        <div className="hidden">
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-[#e0c9a6] to-[#d4b996] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <ShoppingCart className="w-16 h-16 text-[#6b4226]" />
            </div>
            <h2 className="text-3xl font-black text-[#6b4226] mb-3">
              Your cart is empty
            </h2>
            <p className="text-[#8c5e3c] mb-8">
              Start brewing your learning journey by adding some courses!
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
