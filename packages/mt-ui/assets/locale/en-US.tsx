// @ts-ignore
import { CalendarType, IssueBoardType, ModalType, } from "./interface"

const Calendar: CalendarType = {
    view: {
        month: 'Month',
        year: 'Year',
    },
    today: 'Today',
    week: {
        sunday: 'Sun',
        monday: 'Mon',
        tuesday: 'Tues',
        wednesday: 'Wed',
        thursday: 'Thurs',
        friday: 'Fri',
        saturday: 'Sat',
    },
    month: {
        Jan: 'January',
        Feb: 'February',
        Mar: 'March',
        Apr: 'April',
        May: 'May',
        Jun: 'June',
        Jul: 'July',
        Aug: 'August',
        Sep: 'September',
        Oct: 'October',
        Nov: 'November',
        Dec: 'December',
    }
}

const IssueBoard: IssueBoardType = {
    issueLabel: {
        'todo': 'Todo',
        'inprogress': 'In Progress',
        'done': 'Done',
        'cannelled': 'Cannelled',
    },
    modalLabel: {
        title: 'Issue title',
        description: 'Add description...',
    },
}

const Modal: ModalType = {
    confirmText: 'confirm',
    cancelText: 'cancel',
}

export default {
    locale: 'es-US',
    Calendar,
    IssueBoard,
    Modal,
}