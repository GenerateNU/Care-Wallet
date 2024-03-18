export interface Task {
  task_id: number;
  task_title: string;
  group_id: number;
  created_by: string;
  created_date: string;
  start_date: string;
  end_date: string;
  notes: string;
  repeating: boolean;
  repeating_interval: string;
  repeating_end_date: Date;
  task_status: string;
  task_type: string;
  task_info: JSON;
}
