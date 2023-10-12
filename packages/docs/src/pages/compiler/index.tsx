import React, { useEffect, useLayoutEffect, useState, createElement, } from "react"
import ReactDOM from 'react-dom/client'

import { ICompilerProps } from "./interface"
import Editor from "./editor"

function Compiler(compilerProps: ICompilerProps) {
    const { code, } = compilerProps
    const [curCode, setCurCode] = useState(code)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setCurCode(code)
    }, [code])

    useLayoutEffect(() => {
        setMounted(true)
    })

    return (
        <div className="compiler flex justify-between">
            <div id="preview">
            </div>
            {
                // mounted === true ? <Editor defaultValue={curCode} /> : null
            }
        </div>
    )
}

export default Compiler