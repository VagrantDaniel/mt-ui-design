export interface IRoute {
    name: string
    icon?: string
    children?: IRoute[]
    items?: {
        name: string
        component?: any
    }[]
}

import { load } from '../utils'

const routes: IRoute[] = [
   {
        name: 'components',
        children: [
            {
                name: 'general',
                icon: '',
                items: [],
            },
            {
                name: 'special',
                icon: '',
                items: [{
                    name: 'Calendar',
                    // @ts-ignore
                    component: load(() => import('../../../mt-ui/components/Calendar/README.zh-CN.md')),
                 }, {
                    name: 'IssueBoard',
                    // @ts-ignore
                    component: load(() => import('../../../mt-ui/components/IssueBoard/README.zh-CN.md')),
                }]
            }
        ]
   } 
]

export default routes
