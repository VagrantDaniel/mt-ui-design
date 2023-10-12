import React, { useState } from 'react';
// import CodeBlockWrapper from './templates/CodeBlockWrapper';
// import CodeCell from './templates/CodeCell';
// import CellDemo from './templates/CellDemo';
// import CellDescription from './templates/CellDescription';
import { Calendar } from 'mt-ui';

const Demo0 = React.memo(() => {
const CalendarComp = () => {
  return /*#__PURE__*/React.createElement("div", {
    class: "calendar-comp-demo"
  }, /*#__PURE__*/React.createElement(Calendar, {
    year: 2023,
    mode: "year",
    defaultValue: "2023-04-01"
  }));
};
// export default CalendarComp;;
  return __export;
});;
class Component extends React.Component {
  render() {
    return React.createElement('span', {
      className: 'mtui-components-wrapper',
      style: this.props.style
    }, React.createElement(Demo0, {
      key: 0
    }));
  }
}
export default function (props) {
  return  <span style={props.style}>
            <div>
              <Component />
            </div>
            <span>
              <h2 id="api">API</h2>
              <h3 id="calendar">Calendar</h3>
              <table>
                <thead>
                  <tr>
                    <th>参数名</th>
                    <th>描述</th>
                    <th>类型</th>
                    <th>默认值</th>
                  </tr>
                </thead>
                <tbody><tr>
                    <td>year</td>
                    <td>年份</td>
                    <td>number</td>
                    <td><code>moment().year()</code></td>
                  </tr>
                  <tr>
                    <td>month</td>
                    <td>月份</td>
                    <td>number</td>
                    <td><code>moment().month()</code></td>
                  </tr>
                  <tr>
                    <td>defaultValue</td>
                    <td>默认选中的日期</td>
                    <td><code>YYYY-MM-DD</code></td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>mode</td>
                    <td>提供年日历和月日历两种模式</td>
                    <td><code>year</code> | <code>month</code></td>
                    <td><code>year</code></td>
                  </tr>
                  <tr>
                    <td>onChange</td>
                    <td>日期变化的回调</td>
                    <td>(day: Moment) =&gt; void</td>
                    <td><code>-</code></td>
                  </tr>
                </tbody></table>
            </span>
          </span>;
}