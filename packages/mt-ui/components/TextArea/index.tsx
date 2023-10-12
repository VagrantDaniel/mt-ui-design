import { ChangeEvent, useMemo, useRef, useState } from "react";
import { ITextAreaProps } from "./interface";
import cs from '@utils'


function TextAreaComp(textAreaProps: ITextAreaProps) {

    const textareaRef = useRef(null)
    const { row = 5, maxLength = 200, placeholder, disabled = false, value, onChange, showWordLimit = true, } = textAreaProps
    const [displayedValue, setDisplayedValue] = useState(value)
    const valueLength = displayedValue ? displayedValue.length : 0

    const className = [
        'w-full',
        'outline-0',
        'text-base',
        'dark:text-white',
        'dark:bg-[#242427]'
    ]

    const lengthError = useMemo(() => {
        if (!maxLength) return valueLength > maxLength
        return false
    }, [valueLength, maxLength])

    const valueChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => { 
        const newValue = e.target.value
        setDisplayedValue(newValue)
        onChange && onChange(newValue, e)
    }

    const wordLimitCN = cs(
        'absolute',
        'right-3',
        'bottom-0',
        'text-sm',
        'text-[#E4E4E7]',
       
        lengthError && 'text-[#FF0000]'
    )

    return (
        <div className="textarea-comp relative">
            <textarea 
                autoFocus
                ref={textareaRef}
                value={displayedValue}
                maxLength={maxLength}
                className={cs(className)}
                rows={row}
                placeholder={placeholder}
                disabled={disabled}
                onChange={valueChangeHandler}
            />
            {
                showWordLimit && maxLength && (
                    <span className={wordLimitCN}>
                        {valueLength}/{maxLength}
                    </span>
                )
            }
        </div>
    )
}

export default TextAreaComp