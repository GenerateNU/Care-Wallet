export interface Task {
  task_id: number;
  group_id: number;
  created_by: string;
  start_date: string;
  end_date: string;
  notes: string;
  task_status: string;
  task_type: string;
}
