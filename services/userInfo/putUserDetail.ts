import axiosInstance from "../axiosInstance";

const putUserDetailAxios = (id: number, nickname: string, password: string) => {
    return axiosInstance({
        method: "put",
        url: `/member/update/${id}`,
        headers: {
            "Content-Type": "application/json",
            charset: "utf-8",
        },
        data: {
            nickname: nickname,
            password: password,
        },
    });
}

export default putUserDetailAxios;