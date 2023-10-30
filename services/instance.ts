// import axios from "axios";

// const client = axios.create({
//   baseURL: "http://3.36.239.69:8080",
//   withCredentials: true,
// });

// const setAuthorizationHeader = (): void => {
//   const accessToken: string | null = sessionStorage.getItem("token");

//   if (accessToken) {
//     // 토큰을 sessionStorage에 저장
//     sessionStorage.setItem("token", accessToken);

//     // Authorization 헤더에 토큰 설정
//     client.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//   } else {
//     // 토큰이 없으면 sessionStorage에서 제거하고 Authorization 헤더에서도 삭제
//     sessionStorage.removeItem("token");
//     delete client.defaults.headers.common["Authorization"];
//   }
// };

// // 요청하기 전에 Authorization 헤더를 설정하는 요청 인터셉터
// client.interceptors.request.use(
//   (config) => {
//     setAuthorizationHeader();
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 전역적으로 응답을 처리하기 위한 응답 인터셉터(필요한 경우)
// client.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const getApi = (path: string, config?: Client): Promise<any> => {
//   return client.get(path, config);
// };

// export const postApi = (
//   path: string,
//   data: any,
//   config?: Client
// ): Promise<any> => {
//   return client.post(path, data, config);
// };

// export const patchApi = (
//   path: string,
//   data: any,
//   config?: Client
// ): Promise<any> => {
//   return client.patch(path, data, config);
// };

// export const putApi = (
//   path: string,
//   data: any,
//   config?: Client
// ): Promise<any> => {
//   return client.put(path, data, config);
// };

// export const deleteApi = (path: string, config?: Client): Promise<any> => {
//   return client.delete(path, config);
// };

// export default client;
