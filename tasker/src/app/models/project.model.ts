import { CardState } from "./state.model";

export interface Project {
  _id?: string,
  title: string,
  description: string,
  status: CardState,
}
