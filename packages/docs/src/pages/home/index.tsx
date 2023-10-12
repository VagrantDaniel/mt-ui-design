import React, { useState } from "react"
import { Menu } from '@arco-design/web-react'
import { Routes, useNavigate, Route, } from 'react-router-dom'

import "@arco-design/web-react/dist/css/arco.css";
import { Mode } from 'mt-ui'
import routes, { IRoute } from "../../config/routes.config"

const MenuItem = Menu.Item
const MenuItemGroup = Menu.ItemGroup
const SubMenu = Menu.SubMenu

function Home() {
    const navigate = useNavigate()
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const [mode, setMode] = useState<'sun' | 'night'>('sun')

    const onClickMenuItem = (path: string) => {
        setSelectedKeys([path])

        const pathArr = path.split('/');
        const children = routes.find(item => item.name === pathArr[1])?.children
        const items = children?.find(item => item.name === pathArr[2])?.items
        const comp = items?.find(item => item.name === pathArr[3])?.component

        if (comp?.preload) {
            comp.preload().then(() => {
                navigate(path)
            })
        }
    }

    const changeMode = (_mode: string) => {
        setMode(_mode as 'sun' | 'night')
    }

    const generateRoutes = (routes: IRoute[]) => {
        return routes.map(route => <SubMenu selectable key={route.name} title={route.name}>
            {
                route.children?.map(route2 => 
                    <MenuItemGroup key={route2.name} title={route2.name}>{
                        route2.items?.map(item => (
                            <MenuItem key={`/${route.name}/${route2.name}/${item.name}`}>
                                <a href={`/${route.name}/${route2.name}/${item.name}`} tabIndex={-1} 
                                onClick={e => {  e.preventDefault() }}
                                >
                                    {item.name}
                                </a>
                            </MenuItem>
                        ))
                    }</MenuItemGroup>
                )
            }
        </SubMenu>)
    }

    return (
        <div id="home">
            <div className='navbar w-full h-14 flex justify-between items-center bg-white dark:bg-black px-5 border-b dark:border-[#27272a]'>
                <div className="left">
                    <div className="text-2xl font-bold dark:text-white">MT-UI</div>
                </div>
                <div className="right">
                    <div className="search"></div>
                    <Mode mode={mode} onChange={changeMode} />
                </div>
            </div>
            <div className="flex w-full h-screen">
                <div className="menu w-78 h-full border-r bg-white dark:bg-black dark:border-[#27272a]">
                    <Menu className={mode === 'night' ? 'theme-dark' : ''} autoScrollIntoView autoOpen selectedKeys={selectedKeys} onClickMenuItem={onClickMenuItem}>
                       { generateRoutes(routes) }
                    </Menu>
                </div>
                <div className="content w-full overflow-y-scroll px-10 pb-24 flex justify-center dark:bg-black dark:text-white">
                    <Routes>
                        {routes.map(group => {
                            if (group.children) {
                                const children = group.children
                                return children.map(child => {
                                    if (child.items) {
                                        return child.items.map(item => {
                                            const M = item.component
                                            const path = `/${group.name}/${child.name}/${item.name}`
                                            return <Route key={path} path={path} element={
                                                <div className={mode === 'night' ? 'theme-dark' : ''}>
                                                    <M />
                                                </div>
                                            } />
                                        })
                                    }
                                })
                            }
                        })}
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Home
