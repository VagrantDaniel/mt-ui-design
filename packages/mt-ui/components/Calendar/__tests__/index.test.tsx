
import React from 'react';
import moment from 'moment'
import { fireEvent } from '@testing-library/dom';
import { Calendar } from '../..'
import {render} from '../../../test-utils'

jest.mock('moment', () => ({
    default: jest.requireActual('moment')
  }))

describe('Calendar', () => {
    it("test onChange callback when change date", () => {
        // @ts-ignore
        const onChangeCb = jest.fn()

        const component = render(
            <Calendar
                onChange={onChangeCb}
                defaultValue="2023-09-10"
            />
        )
        fireEvent.click(component.find('.panelCalendar .date-cell').item(1))
        expect(onChangeCb.mock.calls[0][0].isSame(moment('2023-01-02'))).toBe(true)
    })
})