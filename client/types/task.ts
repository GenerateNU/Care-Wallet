export interface Task {
  task_id: number;
  task_title: string;
  group_id: number;
  created_by: string;
  start_date: string | null;
  end_date?: string | null;
  quick_task: boolean;
  notes: string;
  repeating: boolean;
  repeating_interval?: string | null;
  repeating_end_date?: string | null;
  task_status: string;
  task_type: string;
  task_info?: string | null;
  label: string;
  assigned_to: string;
  [key: string]: string | number | boolean | null | undefined; // Index signature for string indexing
}
