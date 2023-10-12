import { useCallback, } from "react";
import { Draggable, } from 'react-beautiful-dnd'
import { IContentProps, ITag } from "../interface";
import cs from '@utils'
import { Colors } from '@constant'

function Content(contentProps: IContentProps) {
    const { content, icon, header,} = contentProps

    const className = cs(
        'content',
        'max-w-xs',
        'w-full',
    )

    const renderTags = (tags: ITag[] | undefined) => {

        if (!tags || !tags.length) return

        return tags.map(({ name }, cursor) => (
            <div className="flex justify-start items-center mr-3 mb-1" key={`${name}${cursor}`}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: Colors[Object.keys(Colors)[cursor]] }}></div>
                <div className="text-xs pl-1 whitespace-nowrap">{ name }</div>
            </div>
        ))
    }

    const renderContentList = useCallback(() => {
        
        const className = (props: any) => {
            const defaultClassName = [
                'mt-3', 
                'border', 
                'rounded-md', 
                'border-0', 
                'p-2', 
                'text-slate-600', 
                'dark:text-white',
                'bg-[#f4f4f5]',
                `dark:bg-[#27272a]`,
                'w-full',
            ]

            if (props.isDragging) {
                defaultClassName.push('bg-[#f4f4f5]/[0.5] dark:bg-[#27272a]/[0.5]')
            }

            return cs(defaultClassName)
        }

        return (
            <div>
                {
                    content.map(({
                        title,
                        description,
                        tags,
                    }, cursor) => (
                        <Draggable draggableId={header + title + description + cursor} index={cursor} key={header + title + description + cursor}>
                            {(provided2, snapshot2) => (
                                <div className={className({ isDragging: snapshot2.isDragging })} {...provided2.dragHandleProps} {...provided2.draggableProps} ref={provided2.innerRef}>
                                    <div className="flex p-1 items-center">
                                        { icon }
                                        <span className="text-sm pl-1">{title}</span>
                                    </div>
                                    <p className="text-sm overflow-ellipsis font-medium mb-2">{ description }</p>
                                    <div className="tags flex flex-wrap">
                                        { renderTags(tags) }
                                    </div>
                                </div>
                            )}
                        </Draggable>
                    ))
                }
            </div>
        )
    }, [content])

    return (
        <div className={className}>
            { renderContentList() }
        </div>
    )
}

export default Content