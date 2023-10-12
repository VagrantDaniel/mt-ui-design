import { ChangeEvent } from "react"

export interface IInputProps {
    value?: string
    placeholder?: string
    status?: boolean
    size?: "small" | "default" | "large"
    allowClear?: boolean
    disabled?: boolean
    onChange?: (value: string, e: ChangeEvent<EventTarget>) => void
    onClear?: () => void
}