import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../redux/slicers/authSlicer";
import { authApi } from "../ApiFetch/authApiFetch";

const useInitAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await authApi.me();
        "app jsx", result.data.data;
        if (result.success) {
          dispatch(loginSuccess(result.data));
        }
      } catch (error) {
        dispatch(logout());
      }
    };
    fetchUser();
  }, [dispatch]);
};

export default useInitAuth;
