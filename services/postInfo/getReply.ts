import axiosInstance from "../axiosInstance";

const getReplyAxios = (commentId: number) => {
    return axiosInstance({
        method: "get",
        url: `/comment/search/reply`,
        headers: {
            "Content-Type": "application/json",
            charset: "utf-8",
        },
        params: {
            "parent-comment-id": commentId,
        },
    });
}

export default getReplyAxios;
