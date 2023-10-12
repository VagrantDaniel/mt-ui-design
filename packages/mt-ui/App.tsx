import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, Calendar, IssueBoard, Icon, Button, Mode, } from './components'
// @ts-ignore
import zhCN from '@assets/locale/zh-CN'
// @ts-ignore
// import enUS from '@assets/locale/en-US'


function App() {

  return (
    <div>
      {/* Calendar Component */}
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

      {/* <ConfigProvider locale={enUS}>
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
      </ConfigProvider> */}

      <Mode />
      {/* IssueBoard Component */}
      {/* <ConfigProvider locale={enUS}> */}
        <IssueBoard  />
      {/* </ConfigProvider> */}

    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(App())
