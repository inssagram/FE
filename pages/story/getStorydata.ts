import axiosInstance from "@/services/axiosInstance"

export const getStorydata = () => {
    return axiosInstance({
        method: "get",
        url: "/story/search-childstory/member",
        headers: {
            "Content-Type": "application/json",
            charset: "utf-8",
        },
        params: {
            "member-id": 3,
        }
    })
}

export default getStorydata