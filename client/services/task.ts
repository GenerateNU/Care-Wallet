import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { TaskLabel } from '../types/label';
import { Task } from '../types/task';
import { api_url } from './api-links';

type TaskQueryParams = {
  taskID?: string;
  groupID?: number;
  createdBy?: string;
  taskStatus?: string;
  taskType?: string;
  startDate?: string;
  endDate?: string;
  quickTask?: boolean;
};
const getTask = async (taskID: string): Promise<Task> => {
  if (!parseInt(taskID)) return {} as Task;
  const { data } = await axios.get(`${api_url}/tasks/${taskID}`);
  return data;
};

const getTaskByAssigned = async (userId: string): Promise<Task[]> => {
  const { data } = await axios.get(
    `${api_url}/tasks/assigned?userIDs=${userId}`
  );

  return data;
};

const getFilteredTasks = async (
  queryParams: TaskQueryParams
): Promise<Task[]> => {
  if (!queryParams) [];
  if (!queryParams.groupID) [];
  const { data } = await axios.get(`${api_url}/tasks/filtered`, {
    params: queryParams
  });

  return data;
};

const getTaskLabels = async (taskID: string): Promise<TaskLabel[]> => {
  if (!parseInt(taskID)) return [] as TaskLabel[];
  const { data } = await axios.get(`${api_url}/tasks/${taskID}/labels`);
  return data;
};

const addNewTask = async (newTask: Task): Promise<Task> => {
  const response = await axios.post(`${api_url}/tasks`, newTask);
  return response.data;
};

const editTask = async (taskID: string, updatedTask: Task): Promise<Task> => {
  const response = await axios.put(`${api_url}/tasks/${taskID}`, updatedTask);
  return response.data;
};

export const useFilteredTasks = (queryParams: TaskQueryParams) => {
  const { data: tasks, isLoading: tasksIsLoading } = useQuery<Task[]>({
    queryKey: ['filteredTaskList'],
    queryFn: () => getFilteredTasks(queryParams),
    refetchInterval: 20000
  });
  return {
    tasks,
    tasksIsLoading
  };
};

export const useTaskByAssigned = (userId: string) => {
  const { data: taskByUser, isLoading: taskByUserIsLoading } = useQuery<Task[]>(
    {
      queryKey: ['tasks', userId],
      queryFn: () => getTaskByAssigned(userId)
    }
  );

  return { taskByUser, taskByUserIsLoading };
};

export const useTaskByStatus = (taskId: string) => {
  const {
    data: task,
    status: newStatus,
    refetch
  } = useQuery<Task>({
    queryKey: ['taskStatus', taskId],
    queryFn: () => getTask(taskId)
  });

  const taskStatus = task ? task.task_status : null;

  const setTaskStatus = async (newTaskStatus: string) => {
    const updatedTask = { ...task, task_status: newTaskStatus };
    await editTask(taskId, updatedTask);
    // Refetch the task data to reflect the updated status
    refetch();
  };

  return { taskStatus, newStatus, setTaskStatus };
};

export const useTaskById = (taskId: string) => {
  const { data: task, isLoading: taskIsLoading } = useQuery<Task>({
    queryKey: ['task', taskId],
    queryFn: () => getTask(taskId)
  });

  const { data: taskLabels, isLoading: taskLabelsIsLoading } = useQuery<
    TaskLabel[]
  >({
    queryKey: ['taskLabels', taskId],
    queryFn: () => getTaskLabels(taskId)
  });

  return {
    task,
    taskIsLoading,
    taskLabels,
    taskLabelsIsLoading
  };
};

export const addNewTaskMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: addTaskMutation } = useMutation({
    mutationFn: (newTask: Task) => addNewTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filteredTaskList'] });
    },
    onError: (err) => {
      console.error('ERROR: Failed to Add Task. Code:', err);
    }
  });

  return addTaskMutation;
};

export const editTaskMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: editTaskMutation } = useMutation({
    mutationFn: ({
      taskId,
      updatedTask
    }: {
      taskId: string;
      updatedTask: Task;
    }) => editTask(taskId, updatedTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filteredTaskList'] });
      queryClient.invalidateQueries({ queryKey: ['taskStatus'] });
    },
    onError: (err) => {
      console.error('ERROR: Failed to Edit Task. Code:', err);
    }
  });

  return editTaskMutation;
};
