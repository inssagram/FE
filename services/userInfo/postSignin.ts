import axiosInstance from "../axiosInstance";

const postSigninAxios = (email: string, password: string): Promise<any> => {
  const UserData = {
    email,
    password,
  };
  return axiosInstance({
    method: "post",
    url: `/signin`,
    headers: {
      "Content-Type": "application/json",
      charset: "utf-8",
    },
    data: UserData,
  });
};

export default postSigninAxios;
