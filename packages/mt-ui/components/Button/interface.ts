export interface IButtonProps {
    type?: string
    size?: 'small' | 'default' | 'large'
    // 宽度自适应
    long?: boolean
    disabled?: boolean
    children: any
    onClick?: (e: Event) => void
}
