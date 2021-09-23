import { useDispatch } from "react-redux";
import { message } from "antd";
import { useHistory } from "react-router-dom";

import { instance, bearerInstance } from "./../utils/API";
import { setDealsList } from "./../redux/data/data.actions";
import useProfile from "./useProfile";

export default function useDeals() {
  const dispatch = useDispatch();
  const { getProfileInfo, setProfileToNull } = useProfile();
  const history = useHistory();

  const fetchDealsDefault = async (
    page = 1,
    newest = 1,
    low2high = 0,
    high2low = 0,
    location = "",
    source = "all",
    destination = "all",
    loadMore = null
  ) => {
    instance
      .get(
        `/deals?page=${page}&newest=${newest}&low2high=${low2high}&high2low=${high2low}&location=${location}&source=${source}&destination=${destination}`
      )
      .then(function (response) {
        dispatch(setDealsList(response?.data));
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          message.error(error?.response?.data?.message);
        }
      });
  };

  const deleteDeal = async (dealId) => {
    setProfileToNull();
    const data = new FormData();
    data.append("deal_id", dealId);

    bearerInstance
      .post(`/delete_deal`, data)
      .then(function (response) {
        message.success(response?.data?.message);
        history.push("/profile");
        getProfileInfo();
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          message.error(error?.response?.data?.message);
        }
      });
  };

  return { fetchDealsDefault, deleteDeal };
}
