export enum TypeOfTask {
  MEDICATION = 'Medication Management',
  APPOINTMENT = 'Physician Appointment',
  // LABS = 'Labs & Outpatient Services',
  // REHAB = 'Rehab & Home Therapies',
  // TRANSITIONAL = 'Transitional Care',
  GROOMING = 'Grooming',
  CONVERSATIONS = 'Family Conversations',
  // TRANSPORTATION = 'Transportation',
  // RESPITE = 'Respite',
  ERRANDS = 'Groceries, Shopping, & Errands',
  BILLS = 'Pay Bills',
  // PRESCRIPTION = 'Prescription Management',
  // SAFETY = 'Home Safety',
  DIET = 'Diet & Nutrition',
  ACTIVITIES = 'Activities',
  INSURANCE = 'Health Insurance',
  // FINANCIAL = 'Financial',
  // LEGAL = 'Legal',
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
    // TypeOfTask.LABS,
    // TypeOfTask.REHAB,
    // TypeOfTask.TRANSITIONAL,
    TypeOfTask.GROOMING,
    // TypeOfTask.PRESCRIPTION,
    TypeOfTask.DIET
  ],
  [Category.PERSONAL]: [
    TypeOfTask.GROOMING,
    TypeOfTask.CONVERSATIONS,
    // TypeOfTask.TRANSPORTATION,
    // TypeOfTask.RESPITE,
    TypeOfTask.ERRANDS,
    // TypeOfTask.SAFETY,
    TypeOfTask.BILLS
  ],
  [Category.HOME]: [
    // TypeOfTask.REHAB,
    // TypeOfTask.SAFETY,
    TypeOfTask.DIET,
    TypeOfTask.ACTIVITIES
  ],
  [Category.FINANCIAL]: [
    TypeOfTask.BILLS,
    TypeOfTask.INSURANCE
    // TypeOfTask.FINANCIAL,
    // TypeOfTask.LEGAL
  ],
  [Category.OTHER]: [TypeOfTask.OTHER]
};
