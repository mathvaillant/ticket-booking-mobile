import { Api } from "./api";
import { Ticket, TicketResponse } from "@/types/ticket";
import { ApiResponse } from "@/types/api";

async function createOne(eventId: number): Promise<TicketResponse> {
  return Api.post("/ticket", { eventId });
}

async function getOne(id: number): Promise<ApiResponse<{ticket: Ticket, qrcode: string}>> {
  return Api.get(`/ticket/${id}`);
}

async function getAll(): Promise<ApiResponse<Ticket[]>> {
  return Api.get("/ticket");
}

async function validateOne(ticketId: number, ownerId: number): Promise<ApiResponse<Ticket>> {
  return Api.post("/ticket/validate/", { ticketId, ownerId });
}

const ticketService = {
  createOne,
  getOne,
  getAll,
  validateOne,
};

export { ticketService };
