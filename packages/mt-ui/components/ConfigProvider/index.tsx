import { createContext, useEffect } from 'react'
import zhCN from '../../assets/locale/zh-CN'
import { IConfigProviderProps } from '../../assets/locale/interface';

const defaultProps = {
    locale: zhCN,
}

let configProviderProps = {}

export const ConfigContext = createContext<IConfigProviderProps>({
    ...defaultProps,
});

function ConfigProvider(props: IConfigProviderProps) {
    const { locale, children, mode, } = props

    const config: IConfigProviderProps = {
        locale,
    }

    useEffect(() => {
        configProviderProps = {
            ...configProviderProps,
            locale,
            mode,
        }
    }, [locale])

    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}

export default ConfigProvider