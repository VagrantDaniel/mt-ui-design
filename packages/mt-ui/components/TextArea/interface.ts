import { ChangeEvent } from "react"

export interface ITextAreaProps {
    placeholder?: string
    disabled?: boolean
    value?: string
    row?: number
    maxLength?: number
    showWordLimit?: boolean
    onChange?: (value: string, e: ChangeEvent<HTMLTextAreaElement>) => void
}