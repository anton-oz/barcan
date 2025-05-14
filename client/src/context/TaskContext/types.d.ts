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
  tasks?: Task[];
  id?: number;
  update?: AtLeastOne<Task>;
  error?: boolean;
}

export type ValidPayload = AtLeastOne<Payload>;

export interface Action {
  type:
    | typeof SET_TASKS
    | typeof ADD_TASK
    | typeof UPDATE_TASK
    | typeof DELETE_TASK
    | typeof SET_ERROR;
  payload: ValidPayload;
}

export interface State {
  tasks: Task[];
  error: boolean;
}
