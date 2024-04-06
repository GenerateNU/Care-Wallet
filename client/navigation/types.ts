import { NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type AppStackParamList = {
  Main: undefined;
  Home: undefined;
  Login: undefined;
  Profile: undefined;
  PatientView: undefined;
  ProfileScreens: undefined;
  Landing: undefined;
  Calendar: undefined;
  Notifications: undefined;
  TaskType: undefined;
  TaskDisplay: { id: number };
  TaskList: undefined;
  CalendarContainer: { screen: string; params: { screen: string } } | undefined;
  CalendarTopNav: undefined;
  TaskCreation: { taskType: string };
};

export type AppStackNavigation = NavigationProp<AppStackParamList>;

export const AppStack = createNativeStackNavigator<AppStackParamList>();
