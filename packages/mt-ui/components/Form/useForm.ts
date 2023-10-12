import { useRef } from "react";
import Store from './store'
import { IFormInstance } from "./interface";

export function getFormInstance(): IFormInstance {
    const store = new Store()

    return {
        getFieldValue: store.getFieldValue,
        validate: store.validate,
        resetFields: store.resetFields,
        getStore: store.getStore,
        setFieldValue: store.setFieldValue,
    }
}

export default function useForm(form?: IFormInstance): [IFormInstance] {
    const formRef = useRef<IFormInstance>()

    if (!formRef.current) {
        if (form) {
            formRef.current = form
        } else {
            formRef.current = getFormInstance()
        }
    }

    return [formRef.current]
}