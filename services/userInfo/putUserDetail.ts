import axiosInstance from "../axiosInstance";

const putUserDetailAxios = (id: number) => {
    return axiosInstance({
        method: "put",
        url: `/member/update/{id}`,
        headers: {
            "Content-Type": "application/json",
            charset: "utf-8",
          },
    })
}

export default putUserDetailAxios;