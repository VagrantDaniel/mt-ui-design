`````
# Calendar


`````

```js
import React from 'react'
import { Calendar } from 'mt-ui'

function CalendarComp() {
    return (
        <div class="calendar-comp-demo">
          <Calendar 
              year={2023}
              mode='year'
              defaultValue='2023-04-01'
            ></Calendar>
        </div>
    )
}

export default CalendarComp
```

## API

### Calendar

|Property|Description|Type|DefaultValue|  
|---|---|---|---| 
|year|Year to initialize display.|number|`moment().year()`|
|month|Month to initialize display.|number|`moment().month()`|
|defaultValue|Date selected by default.|`YYYY-MM-DD`|-|
|mode|Provides two modes: annual calendar and monthly calendar.|`year` \| `month`|`year`|
|onChange|callback when date change.|(day: Moment) => void|`-`|