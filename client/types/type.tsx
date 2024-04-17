import React from 'react';

import FinancialLegal from '../assets/calendar/financial&legal.svg';
import HealthMedical from '../assets/calendar/health&medical.svg';
import HomeLifestyle from '../assets/calendar/home&lifestyle.svg';
import Personal from '../assets/calendar/personal.svg';

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
  dr_appt: 'Physician Appointment',
  diet: 'Diet',
  grmg: 'Grooming',
  fml_convos: 'Family Conversations',
  shpping: 'Shopping & Errands',
  activities: 'Activities',
  hlth_ins: 'Health Insurance',
  financial: 'Pay Bills',
  other: 'Other'
};

export const TaskTypeToBackendTypeMap: Record<string, string> = {
  'Medication Management': 'med_mgmt',
  'Physician Appointments': 'dr_appt',
  Grooming: 'grmg',
  'Family Conversations': 'fml_convos',
  'Shopping & Errands': 'shpping',
  'Pay Bills': 'financial',
  Diet: 'diet',
  Activities: 'activities',
  'Health Insurance': 'hlth_ins',
  Other: 'other'
};

export const CategoryIconsMap: Record<string, JSX.Element> = {
  'Financial & Legal': <FinancialLegal />,
  'Health & Medical': <HealthMedical />,
  'Home & Lifestyle': <HomeLifestyle />,
  Personal: <Personal />
};
