import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartApiFetch } from "../ApiFetch/cartApiFetch";
import { addCourse, clearCart } from "../redux/slicers/cartSlicer";

const useInitCart = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;

    const fetchShowCart = async () => {
      try {
        const response = await cartApiFetch.showCart();
        console.log("response show cart :", response?.data?.data?.courses);
        if (response?.data?.data) {
          dispatch(addCourse(response?.data?.data?.courses));
        } else {
          dispatch(clearCart());
        }
      } catch (error) {
        dispatch(clearCart());
      }
    };
    fetchShowCart();
  }, [dispatch, user]);
};

export default useInitCart;
