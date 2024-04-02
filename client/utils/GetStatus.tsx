export function GetStatus(status: string) {
  switch (status) {
    case 'INCOMPLETE': {
      return {
        status: 'Incomplete',
        color: 'bg-carewallet-coral'
      };
    }
    case 'INPROGRESS': {
      return {
        status: 'In Progress',
        color: 'bg-carewallet-yellow'
      };
    }
    case 'COMPLETE': {
      return {
        status: 'Done',
        color: 'bg-carewallet-green'
      };
    }
    case 'OVERDUE': {
      return {
        status: 'Past Due',
        color: 'bg-carewallet-orange'
      };
    }
    case 'TODO': {
      return {
        status: 'To Do',
        color: undefined
      };
    }
  }
}
