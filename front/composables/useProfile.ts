import type { AxiosInstance } from "axios";

import type { UserData } from "~/types";

const MAX_IMAGE_SIZE = 5242880; // 5MB

export const useProfile = () => {
  const axios = useAxios();
  const router = useRouter();

  function updateAvatar(event: any, t: any) {
    const target = event.target;
    const file = target.files[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        // eslint-disable-next-line no-alert
        alert(t("Profile.Profile.image_size_too_big"));
        target.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = async () => {
        const formData = new FormData();
        formData.append("image", file);

        try {
          await axios.patch(`/users/avatar`, formData);
          router.go();
        } catch (error) {
          console.error(error);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const updateProfile = async (
    api: AxiosInstance,
    userId: string,
    userInfo: UserData,
  ) => {
    await api.patch("/users/" + userId, userInfo);
  };

  return {
    updateAvatar,
    updateProfile,
  };
};
