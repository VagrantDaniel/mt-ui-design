import { createContext, useEffect } from 'react'
import { IConfigProviderProps } from './interface';
import zhCN from '../../assets/locale/default'

const defaultProps = {
    locale: zhCN,
}

let configProviderProps = {}

export const ConfigContext = createContext<IConfigProviderProps>({
    ...defaultProps,
});

function ConfigProvider(props: IConfigProviderProps) {
    const { locale, children, } = props

    const config: IConfigProviderProps = {
        locale,
    }

    useEffect(() => {
        configProviderProps = {
            ...configProviderProps,
            locale,
        }
    }, [locale])

    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}

export default ConfigProvider