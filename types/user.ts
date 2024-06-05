import { ApiResponse } from "./api";

export type AuthResponse = ApiResponse<{ token: string; user: User }>;

export type User = {
  id: number;
	email: string;
  role: "manager" | "attendee";
	createdAt: string;
	updatedAt: string;
}
