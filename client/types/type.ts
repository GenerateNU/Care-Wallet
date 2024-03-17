export enum TypeOfTask {
  MEDICATION = 'Medication Management',
  APPOINTMENT = 'Physician Appointment',
  GROOMING = 'Grooming',
  CONVERSATIONS = 'Family Conversations',
  ERRANDS = 'Groceries, Shopping, & Errands',
  BILLS = 'Pay Bills',
  DIET = 'Diet & Nutrition',
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

export const categoryToTypeMap: Record<Category, TypeOfTask[]> = {
  [Category.ALL]: [],
  [Category.HEALTH]: [
    TypeOfTask.MEDICATION,
    TypeOfTask.APPOINTMENT,
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
