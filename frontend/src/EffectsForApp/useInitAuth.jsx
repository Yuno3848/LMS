import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout, setLoading } from "../redux/slicers/authSlicer";
import { authApi } from "../ApiFetch/authApiFetch";

const useInitAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));

      try {
        const result = await authApi.me();
        console.log("app jsx", result.data.data);

        if (result.success) {
          dispatch(loginSuccess(result.data));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Auth init error:", error);
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useInitAuth;
