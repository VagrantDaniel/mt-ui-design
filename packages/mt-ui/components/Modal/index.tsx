import { Colors } from "@constant";
import Button from "../Button";
import Icon from '../Icon'
import { IModalProps } from "./interface";
import { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../ConfigProvider";

function Modal(modalProps: IModalProps) {
    const { locale } = useContext(ConfigContext)
    const { confirm, cancel, title, visible, children, confirmTitle, cancelTitle } = modalProps

    const [hidden, setHidden] = useState(!visible)

    useEffect(() => {
        setHidden(!visible)
    }, [visible])

    const innerConfirm = () => {
        setHidden(true)
        confirm && confirm()
    }

    const innerCancel = () => {
        setHidden(true)
        cancel && cancel()
    }

    return (
        hidden === false ? 
                <div className="modal-mask dark:bg-[#393942]/[0.75]">
                    <div className="modal flex flex-col rounded-md px-3 bg-white dark:bg-[#242427] dark:text-white">
                        <div className="header flex justify-between text-base pt-3 pb-2 border-b border-[#e4e4e7] dark:border-[#393942]">
                            <div className="title font-normal">{title}</div>
                            <Button onClick={innerCancel}>
                                <Icon classNames="dark:fill-[#fff]" color={Colors['gray']} size="small" name="close" />
                            </Button>
                        </div>
                        <div className="content text-black/[0.67] dark:text-white text-sm my-3">
                            { children }
                        </div>
                        <div className="footer flex justify-end items-center h-12 text-align border-t border-[#e4e4e7] dark:border-[#393942]">
                            <Button classNames='text-sm w-14 h-8 rounded-md border border-[#d4d4d8] text-black bg-[#fafafa] dark:bg-[#393942] dark:border-[#3f3f46] dark:text-white' onClick={innerConfirm}>
                                { cancelTitle || locale.Modal.cancelText }
                            </Button>
                            <Button classNames='ml-3 text-sm w-14 h-8 rounded-md border bg-black text-white dark:bg-white dark:text-black dark:border-[#3f3f46]' onClick={innerConfirm}>
                                { confirmTitle || locale.Modal.confirmText }
                            </Button>
                        </div>
                    </div>
                </div>
             : null
    )
}

export default Modal