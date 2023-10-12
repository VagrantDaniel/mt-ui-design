const loader = require('./index')
const fs = require('fs')

const CalendarContent = fs.readFileSync(process.cwd() + '/src/Calendar.md', 'utf-8')
loader(CalendarContent)