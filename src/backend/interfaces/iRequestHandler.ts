import { Request, Response } from "./";

export interface RequestHandler {
  handle(message: Request): Response;
}
