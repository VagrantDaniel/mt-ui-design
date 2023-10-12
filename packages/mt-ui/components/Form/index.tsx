import { createContext, forwardRef, useImperativeHandle } from "react";
import { IFormInstance, IFormProps } from "./interface";
import useForm from "./useForm";

// @ts-ignore
const NOOP = (...args: any) => {}

export const FormContext = createContext({
    store: {
        getStore: NOOP,
        getFieldValue: NOOP,
        validate: NOOP,
        resetFields: NOOP,
        setFieldValue: NOOP,
    }
})

function Form(formProps: IFormProps, ref: React.Ref<IFormInstance>) {
    const { children, form, } = formProps
    const [formInstance] = useForm(form)

    useImperativeHandle(ref, () => formInstance)

    const contextProps = {
        store: formInstance,
    }

    return (
        <FormContext.Provider value={contextProps}>
            <div className="form-comp">
                { children }
            </div>
        </FormContext.Provider>
    )
}

const ForwardRefForm = forwardRef<IFormInstance, IFormProps>(Form);

export default ForwardRefForm