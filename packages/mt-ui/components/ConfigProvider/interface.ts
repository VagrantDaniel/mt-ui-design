import { ReactNode } from "react";

export type CalendarType = {
    today: string;
    view: Record<string, any>;
    week: Record<string, any>;
    month: Record<string, any>;
};

interface ILocale {
    locale: string
    Calendar: CalendarType;
}

export interface IConfigProviderProps {
    locale?: ILocale
    children?: ReactNode
}