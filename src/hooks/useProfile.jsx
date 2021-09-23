import { useDispatch } from "react-redux";
import { message } from "antd";
import { bearerInstance } from "./../utils/API";
import { setProfile } from "./../redux/data/data.actions";

export default function useProfile() {
  const dispatch = useDispatch();

  const getProfileInfo = async () => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    };

    bearerInstance
      .get("/profile", axiosConfig)
      .then(function (response) {
        dispatch(setProfile(response?.data));
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          message.error(error?.response?.data?.message);
        }
      });
  };
  return { getProfileInfo };
}
