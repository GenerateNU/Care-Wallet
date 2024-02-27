export enum TypeOfTask {
  MEDICATION_MANAGEMENT = 'Medication Management',
  PHYSICIAN_APPT = 'Physician Appointment',
  PRESCRIPTION_MGMT = 'Prescription Management',
  LABS_OUTPATIENT_SERVICES = 'Labs & Outpatient Services',
  REHAB_HOME_THERAPIES = 'Rehab/Home Therapies',
  TRANSITIONAL_CARE_COORD = 'Transitional Care Coordination',
  FAMILY_CONVERSATIONS = 'Family Conversations',
  TRANSPORTATION = 'Transportation',
  RESPITE_CAREGIVER_SUPPORT = 'Respite and Caregiver Support',
  HOME_SAFETY = 'Home Safety',
  HEALTH_INSURANCE = 'Health Insurance',
  MANAGING_EXPENSES_BILL_PAYMENTS = 'Managing Expenses & Bill Payments',
  LEGAL = 'Legal',
  FINANCIAL = 'Financial',
  OTHER = 'Other'
}

export enum Category {
  ALL = '',
  HEALTH = 'Health & Medication',
  PERSONAL = 'Personal',
  HOME = 'Home & Lifestyle',
  FINANCIAL = 'Financial & Legal'
}

export const categoryToTypeMap: Record<Category, TypeOfTask[]> = {
  [Category.ALL]: [],
  [Category.HEALTH]: [
    TypeOfTask.MEDICATION_MANAGEMENT,
    TypeOfTask.PHYSICIAN_APPT,
    TypeOfTask.PRESCRIPTION_MGMT,
    TypeOfTask.LABS_OUTPATIENT_SERVICES,
    TypeOfTask.REHAB_HOME_THERAPIES,
    TypeOfTask.TRANSITIONAL_CARE_COORD,
    TypeOfTask.HEALTH_INSURANCE
  ],
  [Category.PERSONAL]: [
    TypeOfTask.FAMILY_CONVERSATIONS,
    TypeOfTask.RESPITE_CAREGIVER_SUPPORT
  ],
  [Category.HOME]: [
    TypeOfTask.TRANSPORTATION,
    TypeOfTask.REHAB_HOME_THERAPIES,
    TypeOfTask.TRANSITIONAL_CARE_COORD,
    TypeOfTask.HOME_SAFETY
  ],
  [Category.FINANCIAL]: [
    TypeOfTask.FINANCIAL,
    TypeOfTask.MANAGING_EXPENSES_BILL_PAYMENTS
  ]
};
