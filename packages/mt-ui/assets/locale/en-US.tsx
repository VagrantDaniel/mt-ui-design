import { CalendarType } from "@components/ConfigProvider/interface"

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

export default {
    locale: 'es-US',
    Calendar,
}