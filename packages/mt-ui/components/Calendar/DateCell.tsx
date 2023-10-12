import { IDateCellProps } from "./interface"
import cs from '@utils'

function DateCell(dateCellProps: IDateCellProps) {
    const { onClick, onHover, day, selected, } = dateCellProps

    const classNames = cs(
        'text-center',
        'cursor-pointer',
        'flex-1',
        
    )
    const innerClassNames = cs(
        'date-cell',
        'w-7', 
        'h-7', 
        'leading-7',
        'm-auto',
        day?.isSame(selected?.format('YYYY-MM-DD')) ? "day-is-selected" : '',
    )

    return (
        <div onClick={onClick?.bind(null, day)} onMouseEnter={onHover} className={classNames}>
            <div className={innerClassNames}>
                <span className="date-content text-sm">{ day?.date() }</span>
            </div>
        </div>
    )
}

export default DateCell