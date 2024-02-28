export interface Task {
  task_id: number;
  group_id: number;
  created_by: string;
  created_date: string;
  start_date?: string | null;
  end_date?: string | null;
  notes?: string | null;
  repeating: boolean;
  repeating_interval?: string | null;
  repeating_end_date?: string | null;
  task_status: string;
  task_type: string;
  task_info?: string | null;
}
