import axios from "axios";

export const useAxios = () => {
  const baseURL = "http://localhost:5000";
  const { userData } = storeToRefs(useUserStore());

  return axios.create({
    baseURL,
    headers: {
      Authorization: userData.value.accessToken
        ? `Bearer ${userData.value.accessToken}`
        : undefined,
    },
    withCredentials: true,
  });
};
