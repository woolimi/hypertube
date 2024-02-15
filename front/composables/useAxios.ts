import axios from "axios";

export const useAxios = () => {
  const baseURL = "http://localhost:5000";
  const { accessToken } = storeToRefs(useUserStore());

  return axios.create({
    baseURL,
    headers: {
      Authorization: accessToken.value
        ? `Bearer ${accessToken.value}`
        : undefined,
    },
    // withCredentials: true,
  });
};
