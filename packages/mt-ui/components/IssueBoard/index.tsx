import { useCallback, useRef, useState } from "react";
import { DragDropContext, Droppable, DropResult, } from 'react-beautiful-dnd'
import { IContent, IEditorInstance, IIssueBoardProps, ISsue } from "./interface";
import Icon from '../Icon'
import Content from './components/content'
import Editor from './components/editor'
import Button from '../Button'
import cs from '@utils'
import useDefaultValues from "./const";

function IssueBoard(issueBoardProps: IIssueBoardProps) {
    const DefaultIssues = useDefaultValues()
    const { issues = [] } = issueBoardProps

    const [curIssues, setCurIssues] = useState<ISsue[]>(issues.length ? issues : DefaultIssues)
    const [prevIndex, setPrevIndex] = useState<number>()
    const editorRef = useRef<IEditorInstance>(null)
        
    const openIssueModal = (index: number) => {
        setPrevIndex(index)
        editorRef.current?.setVisible(true)
    }

    const addOrUpIssue = (title: string, issue: IContent) => {
        const curSourceIndex = curIssues.findIndex(issue => issue.title === title)
        if (curSourceIndex !== -1) {
            const newCurIssues = [...curIssues]
            const curContent = newCurIssues[curSourceIndex].content
            curContent.push(issue)

            setCurIssues(newCurIssues)
        }
    }

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result

        if (!destination) return
        
        if (source.droppableId === destination.droppableId) {
            const curIndex = curIssues.findIndex(issue => issue.title === source.droppableId)
            if(curIndex !== -1) {
                // 在同一个 content 移动
                const curContent = curIssues[curIndex].content

                const sourceContent = curContent[source.index]
                curContent.splice(source.index, 1)
                curContent.splice(destination.index, 0, sourceContent)
                const newCurIssues = [...curIssues]
                newCurIssues[curIndex].content = curContent

                setCurIssues(newCurIssues)
            }
        } else {
            // 在不同 content 移动
            const curSourceIndex = curIssues.findIndex(issue => issue.title === source.droppableId)
            const curDestinationIndex = curIssues.findIndex(issue => issue.title === destination.droppableId)

            if (curSourceIndex !== -1 && curDestinationIndex !== -1) {
                const newCurIssues = [...curIssues]
                
                const curContent = curIssues[curSourceIndex].content
                const curIssue = curContent[source.index]
                
                newCurIssues[curSourceIndex].content.splice(source.index, 1)

                const finalContent = curIssues[curDestinationIndex].content
                finalContent.splice(destination.index, 0, curIssue)

                setCurIssues(newCurIssues)
            }
        }
    }

    const renderIssueList = useCallback(() => {
        const className = (props: any) => {
            const defaultClassName = [
                'inline-flex',
                'flex-col',
                'm-0.5',
                'mx-1.5',
                'dark:text-white',
                'w-80',
            ]

            if (props.isDraggingOver) {
                defaultClassName.push('bg-[#f4f4f5]/[0.8] dark:bg-[#27272a]/[0.8]')
            }

            return cs(defaultClassName)
        }

        const headerClassName = cs(
            "header",
            "flex",
            "justify-between",
            "py-2",
            'border-b',
            'dark:border-[#27272a]'
        )

        const contentClassName = cs(
            "flex",
        )

        return (
            <DragDropContext onDragEnd={onDragEnd}>
                {
                    curIssues.map(({ title, icon, content }, cursor) => (
                        <Droppable droppableId={title} key={title}>
                            {(provided , snapshot) => (
                                <div className={className({
                                    isDraggingOver: snapshot.isDraggingOver,
                                })} key={title} 
                                ref={provided.innerRef} 
                                {...provided.droppableProps}>
                                    <div className={headerClassName}>
                                        <div className="left flex items-center">
                                            <div className="icon">{ icon }</div>
                                            <div className="pl-1 title text-sm">{ title }</div>
                                            <div className="pl-2 number text-xs text-slate-400">{ Object.keys(content).length }</div>
                                        </div>
                                        <div className="right">
                                            <Button size="small" long onClick={() => openIssueModal(cursor)}>
                                                <Icon classNames="dark:fill-[#ffffff]" color="#000" size="small" name="plus" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={contentClassName}>
                                        <Content content={content} icon={icon} header={title}></Content>
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))
                } 
            </DragDropContext>
        )
    }, [curIssues])

    const className = cs(
        'issue-board',
        'flex',
        "flex-row",
        "justify-start",
        "border",
        "bg-white",
        "dark:bg-black",
        "h-fit",
        "w-fit",
        "dark:border-[#27272a]",
        "pb-1",
        "rounded-md"
    )

    return (
        <div className={className}>
            { renderIssueList() }
            <Editor 
                ref={editorRef} 
                title={prevIndex !== undefined ? curIssues[prevIndex].title : ''} 
                icon={prevIndex !== undefined ? curIssues[prevIndex].icon : ''} 
                addOrUpIssue={addOrUpIssue}
            />
        </div>
    )
}

export default IssueBoard