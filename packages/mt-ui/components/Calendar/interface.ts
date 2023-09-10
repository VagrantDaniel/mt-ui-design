import { Moment } from "moment"

export interface IDateCellProps {
    key: string
    day: Moment | null,
    selected?: Moment,
    onClick?: (day: Moment | null) => void
    onHover?: () => void
}

export interface ICalendarProps {
    year?: number
    month?: number
    defaultValue?: string
    mode?: 'year' | 'month'
    // 日期变化触发的回调
    onChange?: (day: Moment) => void
}

export interface IPanelCalendarProps {
    year: number
    month: number
    mode: 'year' | 'month'
    selected?: Moment
    onCellClick?: (day: Moment | null) => void
    onCellHover?: () => void
    className?: string[]
}