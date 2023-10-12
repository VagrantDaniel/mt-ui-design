`````
组件 / 组合

# 日历 Calendar

日历组件。
`````

%%Content%%

## API

### Calendar

|参数名|描述|类型|默认值|  
|---|---|---|---| 
|year|年份|number|`moment().year()`|
|month|月份|number|`moment().month()`|
|defaultValue|默认选中的日期|`YYYY-MM-DD`|-|
|mode|提供年日历和月日历两种模式|`year` \| `month`|`year`|
|onChange|日期变化的回调|(day: Moment) => void|`-`|