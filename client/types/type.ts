export enum TypeOfTask {
  MEDICATION = 'Medication Management',
  APPOINTMENTS = 'Physician Appointments',
  GROOMING = 'Grooming',
  CONVERSATIONS = 'Family Conversations',
  ERRANDS = 'Shopping & Errands',
  BILLS = 'Pay Bills',
  DIET = 'Diet',
  ACTIVITIES = 'Activities',
  INSURANCE = 'Health Insurance',
  OTHER = 'Other'
}

export enum Category {
  ALL = '',
  HEALTH = 'Health & Medical',
  PERSONAL = 'Personal',
  HOME = 'Home & Lifestyle',
  FINANCIAL = 'Financial & Legal',
  OTHER = 'Other'
}

export const TypeToCategoryMap: Record<string, Category> = {
  med_mgmt: Category.HEALTH,
  dr_appt: Category.HEALTH,
  financial: Category.FINANCIAL,
  other: Category.OTHER
};

export const CategoryToTypeMap: Record<Category, TypeOfTask[]> = {
  [Category.ALL]: [],
  [Category.HEALTH]: [
    TypeOfTask.MEDICATION,
    TypeOfTask.APPOINTMENTS,
    TypeOfTask.GROOMING,
    TypeOfTask.DIET
  ],
  [Category.PERSONAL]: [
    TypeOfTask.GROOMING,
    TypeOfTask.CONVERSATIONS,
    TypeOfTask.ERRANDS,
    TypeOfTask.BILLS
  ],
  [Category.HOME]: [TypeOfTask.DIET, TypeOfTask.ACTIVITIES],
  [Category.FINANCIAL]: [TypeOfTask.BILLS, TypeOfTask.INSURANCE],
  [Category.OTHER]: [TypeOfTask.OTHER]
};

export const TaskTypeDescriptions: Record<string, string> = {
  med_mgmt: 'Medication Management',
  dr_appt: 'Doctor Appointment',
  financial: 'Financial Task',
  other: 'Other Task'
};
