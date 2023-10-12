---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

全年日历。

## en-US

Full Year Calendar.

```js
import { Calendar } from 'mt-ui'

const CalendarComp = () => {
    return (
        <div class="calendar-comp-demo">
          <Calendar 
              year={2023}
              mode='year'
              defaultValue='2023-04-10'
            ></Calendar>
        </div>
    )
}

export default CalendarComp
```