import { ReactComponentElement } from "react"

export interface IEditorProps {
    defaultValue: string
    onChange?: (editorValue: string) => void
}

export interface ICompilerProps {
    code: string
}