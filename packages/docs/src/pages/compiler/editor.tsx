import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import type * as monaco from 'monaco-editor'
import { IEditorProps } from "./interface"
import { useDebounce } from "../../utils"

function Editor(editorProps: IEditorProps) {
    const { defaultValue, onChange, } = editorProps
    const editor = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState(0)
    let resizeObserverListener: ResizeObserver

    function paintEditor(
        instance: monaco.editor.IStandaloneCodeEditor
    ): monaco.editor.IStandaloneCodeEditor {
        const lineCount = instance.getModel()?.getLineCount()

        if (lineCount) {
            setHeight(lineCount * 18)
        }

        instance.layout()

        return instance
    }

    useLayoutEffect(() => {
        import(/* webpackPrefetch: true */'monaco-editor/esm/vs/editor/editor.api').then(m => {
            console.log('editor', editor.current)
            m.editor
                .defineTheme(
                    'custom-light',
                    {
                        base: 'vs',
                        inherit: true,
                        rules: [],
                        colors: {
                          'editor.background': '#F7F8FC',
                        },
                      },
                )
            
            if (editor.current) {
                const instance = m.editor.create(
                    editor.current,
                    {
                        value: defaultValue,
                        language: 'html',
                        tabSize: 2,
                        scrollBeyondLastLine: false,
                        lineNumbers: 'off',
                        theme: 'custom-light',
                        folding: true,
                        scrollbar: {
                            alwaysConsumeMouseWheel: false,
                        },
                    }
                )

                resizeObserverListener = new ResizeObserver(
                    useDebounce(() => instance.layout())
                )
    
                resizeObserverListener.observe(editor.current!)
    
                paintEditor(instance)
                    .onDidChangeModelContent(
                        useDebounce(
                            () => onChange?.(paintEditor(instance).getValue()),
                            {
                                delay: 600,
                            }
                        )
                    )
            }
        })
            
        return () => {
            resizeObserverListener.unobserve(editor.current!)
        }
    }, [])

    return (
        <div ref={editor} className="editor w-full" style={{ "height": `${height}px`, minHeight: '100%' }} />
    )
}

export default Editor