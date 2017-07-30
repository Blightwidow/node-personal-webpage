import { Response, ViewModel } from "./";

export interface Presenter {
  handle(message: Request): ViewModel;
}
