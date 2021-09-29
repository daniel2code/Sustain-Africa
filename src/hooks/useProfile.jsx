import { useDispatch } from "react-redux";
import { message } from "antd";
import { bearerInstance } from "./../utils/API";
import { setProfile, setHasError } from "./../redux/data/data.actions";

export default function useProfile() {
  const dispatch = useDispatch();

  const getProfileInfo = async () => {
    bearerInstance
      .get("/profile")
      .then(function (response) {
        dispatch(setProfile(response?.data));
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          message.error(error?.response?.data?.message);
        } else {
          dispatch(setHasError(true));
        }
      });
  };

  const setProfileToNull = () => {
    dispatch(setProfile(null));
  };
  return { getProfileInfo, setProfileToNull };
}
