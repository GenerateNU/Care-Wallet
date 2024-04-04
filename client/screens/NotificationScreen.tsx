import { useEffect } from 'react';

import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useFilteredTasks } from '../services/task';

//import { Task } from '../types/task';

export default function NotificationScreen() {
  const { group } = useCareWalletContext();
  const { tasks } = useFilteredTasks({ groupID: group.groupID });
  // const [dueSoonTasks, setDueSoonTasks] = useState<Task[]>([]);
  // const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);
  // const [createdTodayTasks, setCreatedTodayTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (tasks) {
      // Filter tasks that are due within the next 5 days
      const currentDate = new Date();
      const fiveDaysLater = new Date(currentDate);
      fiveDaysLater.setDate(currentDate.getDate() + 5);

      const dueSoon = tasks.filter(
        (task) => task.end_date && new Date(task.end_date) <= fiveDaysLater
      );

      // Filter tasks that are overdue
      const overdue = tasks.filter(
        (task) => task.end_date && new Date(task.end_date) < currentDate
      );

      // Filter tasks that were created today
      const today = currentDate.toISOString().split('T')[0];
      const createdToday = tasks.filter(
        (task) => task.created_date && task.created_date.startsWith(today)
      );

      // Sort tasks by end date
      dueSoon.sort(
        (a, b) =>
          new Date(a.end_date!).getTime() - new Date(b.end_date!).getTime()
      );
      overdue.sort(
        (a, b) =>
          new Date(a.end_date!).getTime() - new Date(b.end_date!).getTime()
      );
      createdToday.sort(
        (a, b) =>
          new Date(a.created_date!).getTime() -
          new Date(b.created_date!).getTime()
      );

      console.log('Tasks Due Soon:', dueSoon);
      console.log('Overdue Tasks:', overdue);
      console.log('Tasks Created Today:', createdToday);

      setDueSoonTasks(dueSoon);
      setOverdueTasks(overdue);
      setCreatedTodayTasks(createdToday);
    }
  }, [tasks]);
}
