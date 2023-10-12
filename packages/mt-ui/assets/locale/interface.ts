import { ReactNode } from "react";

export type CalendarType = {
    today: string;
    view: Record<string, any>;
    week: Record<string, any>;
    month: Record<string, any>;
}

export type IssueBoardType = {
    issueLabel: Record<string, string>;
    modalLabel: Record<string, string>;
}

export type ModalType = {
    confirmText: string
    cancelText: string
}

interface ILocale {
    locale: string
    Calendar: CalendarType
    IssueBoard: IssueBoardType
    Modal: ModalType
}

export interface IConfigProviderProps {
    locale: ILocale
    children?: ReactNode
    mode?: 'sun' | 'night'
}