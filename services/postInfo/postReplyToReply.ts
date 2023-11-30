import axiosInstance from "../axiosInstance";

const postReplyToReplyAxios = (data: object) => {
    return axiosInstance({
        method: "post",
        url: `/comment/create/replytoreply`,
        headers: {
            "Content-Type": "application/json",
            charset: "utf-8",
        },
        data
    });
}

export default postReplyToReplyAxios;
