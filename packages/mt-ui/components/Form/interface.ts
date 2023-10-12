import { ReactElement, ReactNode } from "react"

export interface IFormProps {
    children?: ReactNode
    form?: IFormInstance
}

export interface IFormInstance {
    getFieldValue: (field: string) => void
    validate: () => boolean
    resetFields: () => void
    getStore: () => any
    setFieldValue: (field: string, value: unknown) => void
}

export interface IFormItemProps {
    children?: ReactElement
    field: string
    label?: string
}