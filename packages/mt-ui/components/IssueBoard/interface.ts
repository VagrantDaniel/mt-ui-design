import { Dispatch, SetStateAction } from "react"

export interface ITag {
    name: string
}

export interface IContent {
    title: string
    description: string
    tags?: ITag[]
}

export interface ISsue {
    icon: any
    title: string
    content: IContent[]
}

export interface IIssueBoardProps {
    issues: ISsue[]
}

export interface IContentProps {
    icon: any
    header: string
    content: IContent[]
}

export interface IEditorProps {
    title: string
    icon: any
    addOrUpIssue: (title: string, values: IContent) => void
}

export interface IEditorInstance {
    setVisible: (visible: boolean) => void
}