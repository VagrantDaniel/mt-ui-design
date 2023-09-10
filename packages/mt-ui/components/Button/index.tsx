import { LegacyRef, forwardRef, useRef, } from 'react'
import { IButtonProps } from './interface'
import cs from '@utils'

function Button(buttonProps: IButtonProps, ref: LegacyRef<HTMLButtonElement>) {
    const { size, children, disabled = false, type, long = false, onClick, } = buttonProps
    const innerButtonRef = useRef()
    const buttonRef = ref || innerButtonRef

    const handleClick: React.MouseEventHandler<HTMLElement> = (event: any) : void => {
        event?.preventDefault()
        onClick && onClick(event)
    }
    
    const classNames = [
        'cursor-pointer',
        'rounded',
    ]

    if (type === 'default') {
        classNames.push('bg-slate-200')
    }

    if (size === 'small') {
        classNames.push('text-xs')
    } else if (size === 'large') {
        classNames.push('text-lg')
    } else {
        classNames.push('text-base')
    }

    if (long) {
        classNames.push('w-full', 'h-full')
    } else {
        classNames.push('w-12', 'h-6')
    }

    return (
        <button 
            // @ts-ignore
            ref={buttonRef}
            className={cs(...classNames)}
            disabled={disabled}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

// @ts-ignore
const ForwardRefButton = forwardRef<unknown, IButtonProps>(Button);

export default ForwardRefButton