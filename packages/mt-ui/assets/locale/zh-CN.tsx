import { CalendarType } from "../../components/ConfigProvider/interface"

const Calendar: CalendarType = {
    view: {
        month: '月',
        year: '年',
    },
    today: '今天',
    week: {
        sunday: '日',
        monday: '一',
        tuesday: '二',
        wednesday: '三',
        thursday: '四',
        friday: '五',
        saturday: '六',
    },
    month: {
        Jan: '一月',
        Feb: '二月',
        Mar: '三月',
        Apr: '四月',
        May: '五月',
        Jun: '六月',
        Jul: '七月',
        Aug: '八月',
        Sep: '九月',
        Oct: '十月',
        Nov: '十一月',
        Dec: '十二月',
    },
}

export default {
    locale: 'zh-CN',
    Calendar,
}