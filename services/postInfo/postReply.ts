import axiosInstance from "../axiosInstance";

const postReplyAxios = (data: object) => {
    return axiosInstance({
        method: "post",
        url: `/comment/create/reply`,
        headers: {
            "Content-Type": "application/json",
            charset: "utf-8",
        },
        data
    });
}

export default postReplyAxios;
