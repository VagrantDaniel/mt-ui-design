import {  Ref, forwardRef, useContext, useImperativeHandle, useState } from 'react'
import { IEditorInstance, IEditorProps } from '../interface'
import Modal from '../../Modal'
import Input from '../../Input'
import TextArea from '../../TextArea'
import Form from '../../Form'
import FormItem from '../../Form/FormItem'
import useForm from '../../Form/useForm'
import { ConfigContext } from '../../ConfigProvider'

function Editor(editorProps: IEditorProps, ref: Ref<IEditorInstance>) {
    const { locale } = useContext(ConfigContext)
    const [visible, setVisible] = useState<boolean>(false)
    const [form] = useForm()
    
    const { title, icon, addOrUpIssue, } = editorProps

    useImperativeHandle(ref, () => ({
        setVisible,
        confirm,
        form,

    }))

    const confirm = () => {
        form.validate()
        const values = form.getStore()
        form.resetFields()
        
        addOrUpIssue(title, values)
        setVisible(false)
    }
    
    return (
        <Modal title={<div className='flex items-center'>
            <div className='pr-1'>{icon}</div>
            {title}
        </div>} visible={visible} cancel={() => setVisible(false)} confirm={confirm}>
            <Form form={form}>
                <div className='flex mb-2 w-full'>
                    <FormItem field="title">
                        <Input placeholder={locale.IssueBoard.modalLabel.title} size="large" />
                    </FormItem>
                </div>
                <div className=''>
                    <FormItem field="description">
                        <TextArea placeholder={locale.IssueBoard.modalLabel.description} row={7} />
                    </FormItem>
                </div>
            </Form>
        </Modal>
    )
}

const ForwardRefEditor = forwardRef<IEditorInstance, IEditorProps>(Editor);

export default ForwardRefEditor