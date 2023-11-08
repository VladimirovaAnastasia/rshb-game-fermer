import { StateSchema } from 'app/providers/StoreProvider';

export const getTasksData = (state: StateSchema) => state.tasks.data.tasks;
