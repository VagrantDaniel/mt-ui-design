import { useState } from "react";
import Button from '../Button'
import Icon from '../Icon'
import { IModeProps } from "./interface";
import '../../assets/index.scss';

// @ts-ignore
function Mode(modeProps: IModeProps) {
    const { mode = 'sun', onChange } = modeProps
    const [curMode, setCurMode] = useState(mode)

    const changeMode = () => {
        const _mode = curMode === 'sun' ? 'night' : 'sun'
        setCurMode(_mode)
        if (curMode === 'sun' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        onChange && onChange(_mode)
    }

    return (
        <div className="mode-comp bg-white dark:bg-black w-fit h-fit">
            <Button onClick={changeMode}>
                <Icon name={curMode} color="#0ea5e9" size="large" />
            </Button>
        </div>
    )
}

export default Mode