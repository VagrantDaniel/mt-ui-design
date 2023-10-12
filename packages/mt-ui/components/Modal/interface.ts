import { ReactNode } from "react"

export interface IModalProps {
    visible: boolean
    children?: ReactNode
    title: string | ReactNode
    confirmTitle?: string
    cancelTitle?: string
    confirm?: () => void
    cancel?: () => void
}