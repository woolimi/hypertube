export const useProfile = () => {
  const axios = useAxios();
  const router = useRouter();

  function updateAvatar(event: any) {
    const file = event.target.files[0];
    if (file) {
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

  interface UserInfo {
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }
  async function updateProfile(userId: string, userInfo: UserInfo) {
    console.log(userInfo);
    return axios.patch("/users/" + userId, userInfo);
  }
  return {
    updateAvatar,
    updateProfile,
  };
};
