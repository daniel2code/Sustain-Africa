import { useDispatch } from "react-redux";
import { message } from "antd";
import { instance } from "./../utils/API";
import { setDealsList } from "./../redux/data/data.actions";

export default function useDeals() {
  const dispatch = useDispatch();

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
  return { fetchDealsDefault };
}
