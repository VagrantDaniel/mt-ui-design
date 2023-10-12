import { ChangeEvent, useRef, useState } from "react";
import { IInputProps } from "./interface";
import Icon from '../Icon'
import cs from '@utils'
import { Colors } from "@constant";

function Input(inputProps: IInputProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const { value = '', placeholder, onChange, size = 'default', allowClear = true, disabled = false, onClear, } = inputProps
    const [innerValue, setInnerValue] = useState(value)

    const inputAttrCN = [
        'text-left',
        'border-0',
        'outline-0',
        'h-full',
        'text-black',
        'dark:text-white',
        'bg-transparent',
        'transition-all',
        'hover:border-transparent',
        'hover:bg-transparent',
    ]

    const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const newValue = e.target.value
        setInnerValue(newValue)
        onChange && onChange(newValue, e)
    }

    if (size === 'small') {
        inputAttrCN.push('text-sm h-4')
    } else if (size === 'default') {
        inputAttrCN.push('text-base h-5')
    } else if (size === 'large') {
        inputAttrCN.push('text-lg h-6')
    }

    const handleClear = (e: ChangeEvent<EventTarget>) => {
        if (inputRef.current && inputRef.current.focus) {
            inputRef.current.focus()
        }
        setInnerValue('')
        onChange && onChange('', e)
        onClear && onClear()
    }

    return (
        <div className="input-comp w-full flex justify-between">
            <input 
                autoFocus
                readOnly={disabled}
                ref={inputRef}
                type="text" 
                required 
                placeholder={placeholder} 
                value={innerValue}
                className={cs(inputAttrCN)}
                onChange={valueChangeHandler} />
            {
                allowClear && innerValue && (
                    <span className="hover:cursor-pointer" onClick={e => {
                        e.stopPropagation()
                        handleClear(e)
                    }}>
                        <Icon classNames="dark:fill-[#fff]" name="close" color={Colors['gray']} />
                    </span>
                )
            }
        </div>
    )
}

export default Input