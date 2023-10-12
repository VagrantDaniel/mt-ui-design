import 'virtual:svg-icons-register'
import { IIconProps } from './interface';
import cs from '@utils'

const SizeTypes = {
    'small': [
        'w-4',
        'h-4',
    ],
    'default': [
        'w-5',
        'h-5',
    ],
    'large': [
        'w-6',
        'h-6',
    ]
}

export default function Icon(iconProps: IIconProps) {   
    const { name, color = '#fff', size = 'default', classNames } = iconProps

    const symbolId = `#icon-${name}`

    const className = cs(
        ...SizeTypes[size],
        classNames,
    )

    return (
        <svg className={className} fill={color}>
            <use href={symbolId} fill="inherit" />
        </svg>
    )
}