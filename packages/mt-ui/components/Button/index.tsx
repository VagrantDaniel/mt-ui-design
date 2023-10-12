import { LegacyRef, forwardRef, useRef, } from 'react'
import { IButtonProps } from './interface'
import cs from '@utils'

function Button(buttonProps: IButtonProps, ref: LegacyRef<HTMLButtonElement>) {
    const { size, children, disabled = false, type, long = false, onClick, classNames, } = buttonProps
    const innerButtonRef = useRef()
    const buttonRef = ref || innerButtonRef

    const handleClick: React.MouseEventHandler<HTMLElement> = (event: any) : void => {
        event?.preventDefault()
        onClick && onClick(event)
    }
    
    const className = [
        'cursor-pointer',
        'rounded',
        'w-fit',
        'px-2'
    ]

    if (type === 'default') {
        className.push('bg-slate-200 dark:bg-black')
    }

    if (size === 'small') {
        className.push('text-xs')
    } else if (size === 'large') {
        className.push('text-lg')
    } else {
        className.push('text-base')
    }

    if (long) {
        className.push('w-full', 'h-full')
    } 

    classNames && className.push(classNames)
    // else {
    //     className.push('w-12', 'h-6')
    // }

    return (
        <button 
            // @ts-ignore
            ref={buttonRef}
            className={cs(...className)}
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