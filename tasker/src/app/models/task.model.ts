import { CardState } from "./state.model";
import { Project } from "./project.model";

export interface Task {
  _id?: string,
  title: string,
  description: string,
  status: CardState,
  projectId: string;
}

export interface TaskerDialogData {
  mode: 'create' | 'edit';
  title: string;
  data?: Task |Project;
  projectId?: string;
  status?: CardState;
}
