import { weekDays } from './constants';

// TODO: Can this be expanded upon to show every month of the year like apple calendar ???
export function generateMatrix(currentDate: Date) {
  let matrix: (number | string)[][] = [];

  // Create header of days
  matrix[0] = weekDays;

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();

  // first day of the month
  let firstDay = new Date(year, month, 1).getDay();

  // number of days in a month
  let maxDays = new Date(year, month + 1, 0).getDate();

  let counter = 1;
  for (let row = 1; row < 7; row++) {
    matrix[row] = [];
    for (let col = 0; col < 7; col++) {
      matrix[row][col] = -1;

      if (row == 1 && col >= firstDay) {
        // in first row the date should start from the from day of the week
        matrix[row][col] = counter++;
      } else if (row > 1 && counter <= maxDays) {
        matrix[row][col] = counter++;
      }
    }
  }

  return matrix;
}

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
