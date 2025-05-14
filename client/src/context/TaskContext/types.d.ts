export interface Task {
  id: number;
  title: string;
  content: string;
  status: string;
}

export type AtLeastOne<T> = {
  [K in keyof T]: Required<Pick<T, K>> & Partial<Omit<T, K>>;
}[keyof T];

interface Payload {
  task?: Task;
  tasks?: Task[];
  id?: number;
  update: AtLeastOne<Task>;
}

export type ValidPayload = AtLeastOne<Payload>;

export interface Action {
  type:
    | typeof SET_TASKS
    | typeof ADD_TASK
    | typeof UPDATE_TASK
    | typeof DELETE_TASK;
  payload: ValidPayload;
}

export interface State {
  tasks: Task[];
}
