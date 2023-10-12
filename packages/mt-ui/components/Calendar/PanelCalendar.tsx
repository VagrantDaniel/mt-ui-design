import moment from "moment"
import DateCell from "./DateCell"
import { IPanelCalendarProps } from "./interface"
import cs from '@utils'
import { useContext } from "react"
import { ConfigContext } from "../ConfigProvider"

// 卡片日历
function PanelCalendar(panelCalendarProps: IPanelCalendarProps) {
    const { locale } = useContext(ConfigContext)
    const { year, month, selected, mode, className, onCellClick, onCellHover, } = panelCalendarProps

    const getTotalDays = () => {
        const totalDays = 37 // 31 + 上一个月最多有 6 天在下一月
        const range = Array(totalDays)
        let start = 1
        for (let cursor = 0; cursor < totalDays; cursor++, start+=1) {
            range[cursor] = start
        }

        return range
    }

    const renderContents = () => {
        const tdContents: any[] = []

        // 当月第一天
        const firstDay = moment([year, month, 1])
        // 第一天是星期几
        const firstDayOfWeek = firstDay.weekday()

        const days: any[] = []
        const dateCells: any[] = [[], [], [], [], [], []]

        const totalDays = getTotalDays()

        totalDays.forEach(i => {
            const day = moment([year, month, i - firstDayOfWeek])

            days.push(
                <DateCell 
                    key={`day-${i}`}
                    selected={selected}
                    day={day.isValid() ? day : null}
                    onClick={onCellClick}
                    onHover={onCellHover}
                />
            )
        })

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 6; j++) {
                dateCells[j][i] = days[i + j * 7]
            }
        }

        dateCells.map((item, index) => {
            let cells: any = []
            for (let i = 0; i < 7; i++) {
                cells.push(item[i])
            }
            tdContents.push(<div className="flex" key={item + index}>{ cells }</div>)
        })

        return tdContents
    }

    const classNames = cs(
        'panelCalendar',
        
        ...(className || []),
    )

    return (
        <div className={classNames}>
            { mode === 'year' && <div className="text-base font-medium mb-4">{locale?.Calendar.month[moment([year, month, 1]).format('MMM')]}</div> }
            <div className="space-y-4">
                <div>
                    {/* 周一 ~ 周日 */}
                    <div className="text-black/50 text-sm flex justify-center mb-4 dark:text-[#fff]/[0.4]">
                        { Object.values(locale?.Calendar.week || {}).map((day: unknown, index: number) => (<div className={cs(...["h-7", "p-2"])} key={`${day}${index}`}>{day as string}</div>)) }
                    </div>
                    { renderContents() }
                </div>
            </div>
        </div>
    )
}

export default PanelCalendar