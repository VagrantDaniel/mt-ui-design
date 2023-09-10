import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, Calendar } from './components'
import zhCN from '@assets/locale/zh-CN'
import enUS from '@assets/locale/en-US'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <div className='flex justify-around'>
        <Calendar 
          year={2023}
          mode='year'
          defaultValue='2023-04-01'
        />
        <Calendar 
          year={2023}
          mode='month'
          defaultValue='2023-04-01'
        />
      </div>
    </ConfigProvider>

    <ConfigProvider locale={enUS}>
      <div className='flex justify-around'>
        <Calendar 
          year={2023}
          mode='year'
          defaultValue='2023-04-01'
        />
        <Calendar 
          year={2023}
          mode='month'
          defaultValue='2023-04-01'
        />
      </div>
    </ConfigProvider>
  </React.StrictMode>,
)
