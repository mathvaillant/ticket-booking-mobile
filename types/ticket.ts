import { ApiResponse } from "./api";
import { Event } from "./event";

export type TicketResponse = ApiResponse<Ticket>;
export type TicketListResponse = ApiResponse<Ticket[]>;

export type Ticket = {
  id: number;
  eventId: number;
  userId: number;
  event: Event;
  entered: boolean;
  createdAt: string;
  updatedAt: string;
}
