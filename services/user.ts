import { AuthResponse } from "@/types/user";
import { Api } from "./api";

async function login(email: string, password: string): Promise<AuthResponse> {
  return Api.post("/auth/login", { email, password });
}

async function register(email: string, password: string): Promise<AuthResponse> {
  return Api.post("/auth/register", { email, password });
}

const userService = {
  login,
  register,
};

export { userService };
