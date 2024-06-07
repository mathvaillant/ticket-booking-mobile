import { Platform } from "react-native";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const url = Platform.OS === "android" ? "http://10.0.2.2:8081" : "http://127.0.0.1:8081";
const url = "https://f920-2001-8a0-fa2b-2a01-6190-629b-d915-fc77.ngrok-free.app"

const Api: AxiosInstance = axios.create({ baseURL: url + "/api" });

Api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem("token");

  if (token) config.headers.set("Authorization", `Bearer ${token}`);

  return config;
});

Api.interceptors.response.use(
  async (res: AxiosResponse) => res.data,
  async (err: AxiosError) => Promise.reject(err)
);

export { Api };
