import React, { useContext } from "react";
import { ReactElement, cloneElement, forwardRef } from "react";
import { IFormItemProps } from "./interface";
import { FormContext } from './index'

function FormItem(formItemProps: IFormItemProps) {
    const { children, field, label, } = formItemProps
    const { store } = useContext(FormContext)
    
    const handleTrigger = (value: unknown) => {
        store.validate()
        
        store.setFieldValue(field, value)
    }

    const cloneElementWithProps = () => {
        if (React.Children.count(children) === 1) {
            const value = store.getFieldValue(field)

            return (
                cloneElement(children as ReactElement, {
                    value,
                    onChange: handleTrigger,
                })
            )
        }
    }

    return (
        <div className="form-item w-full">
            { cloneElementWithProps() }
        </div>
    )
}

export default FormItem