import { useContext, useState } from 'react'
import moment, { Moment } from 'moment'
import { ICalendarProps, } from './interface';
import { ConfigContext } from '../ConfigProvider';
import PanelCalendar from './PanelCalendar';
import { Button } from '../index'
import cs from '@utils'
import '../../assets/index.scss';

// 全日历
function Calendar(calendarProps: ICalendarProps) {
    const { locale } = useContext(ConfigContext)
    const { year = moment().year(), month = moment().month(), defaultValue, mode = 'year', onChange } = calendarProps
    const [curYear, setCurYear] = useState(year)
    const [curMonth, setCurMonth] = useState(month)
    const [selected, setSelected] = useState<Moment>(moment(defaultValue))

    const toPrevYear = () => {
        if (mode === 'year') {
            setCurYear(curYear - 1)
        } else if (mode === 'month') {
            if (curMonth === 0) {
                setCurYear(curYear - 1)
                setCurMonth(11)
            } else {
                setCurMonth(curMonth - 1)
            }
        }
    }

    const toNextYear = () => {
        if (mode === 'year') {
            setCurYear(curYear + 1)
        } else if (mode === 'month') {
            if (curMonth === 11) {
                setCurYear(curYear + 1)
                setCurMonth(0)
            } else {
                setCurMonth(curMonth + 1)
            }
        }
    }

    const toNow = () => {
        setCurYear(moment().year())
        setCurMonth(moment().month())
        setSelected(moment())
    }

    const renderTodayButton = (long = false, type = "") => (
        <Button size="small" onClick={toNow} long={long} type={type}>
            {locale?.Calendar.today}
        </Button>
    )

    const renderHeader = () => {
        const className = cs(
            "header", 
            "border-b", 
            "h-14", 
            "flex", 
            "justify-between",
            "dark:border-[#27272a]",
        )

        const controlsClassName = [
            "controls", "flex", "flex-nowrap", "items-center", "justify-around" 
        ]
        if (mode === 'year') {
            controlsClassName.push('w-72')
        } else if (mode === 'month') {
            controlsClassName.push('w-60')
        }

        return (
            <div className={className}>
                <div className={cs(controlsClassName)}>
                    <div className='cursor-pointer' onClick={toPrevYear}>&laquo;</div>
                    <div className={ mode === 'year' ? 'text-xl' : 'text-lg' }>
                        { mode === 'year' ? `${curYear} ${locale?.Calendar.view.year}` : 
                            `${curYear} ${locale?.Calendar.view.year} ${curMonth + 1} ${locale?.Calendar.view.month}` } 
                    </div>
                    <div className='cursor-pointer' onClick={toNextYear}>&raquo;</div>
                    { mode === 'year' && renderTodayButton(false, 'default') }
                </div>
            </div>
        )
    }

    const onCellClick = (day: Moment | null) => {
        if (!day) return

        setSelected(day)
        onChange && onChange(day)
    }

    const renderMonthPanel = () => {
        const className = [
            'px-4', 
            'pt-4',
        ]

        return (
            <div className='grid'>
                <PanelCalendar 
                    key={curYear}
                    month={curMonth}
                    year={curYear}
                    className={className}
                    onCellClick={onCellClick}
                    selected={selected}
                    mode={mode}
                />
                <div className="h-10 text-align border-t dark:border-[#27272a]">
                    { renderTodayButton(true) }
                </div>
            </div>
        )
    }

    const renderYearPanel = () => {
        const monthsContent = []
        for (let i = 0; i < 12; i++) {
            const className = [
                'px-5', 
                'py-7',
                'dark:border-[#27272a]'
            ]
            if (i < 8) {
                className.push('border-b')
            }
            if (![3, 7, 11].includes(i)) {
                className.push('border-r')
            }
            monthsContent.push(
                <PanelCalendar 
                    key={curYear + i}
                    month={i}
                    year={curYear}
                    mode={mode}
                    className={className}
                    onCellClick={onCellClick}
                    selected={selected}
                />
            )
        }

        return monthsContent
    }

    return (
        <div className="calendar rounded border dark:bg-black dark:border-[#27272a] dark:text-white grid max-w-fit h-min">
            { renderHeader() }
            { mode === 'month' && renderMonthPanel() }
            { mode === 'year' && 
                <div className="bg-white grid gap-0 p-2 dark:bg-black" style={{ gridTemplateColumns: 'repeat(4, minmax(0, min-content))' }}>
                    { renderYearPanel() }
                </div>
            }
        </div>
    )
}

export default Calendar
