import { ConfigContext } from "../ConfigProvider"
import { useContext } from "react"
import { ISsue } from "./interface"
import Icon from '../Icon'

const useDefaultValues = () => {
    const { locale } = useContext(ConfigContext)

    const DefaultIssues: ISsue[] = [{
        title: locale.IssueBoard.issueLabel.todo,
        icon: <Icon color="#34d399" size="small" name="todo" />,
        content: [
            {
                title: '#216',
                description: 'Add an option to opt out `$rt` (resolve transition) when using `$tm`',
                tags: [
                    {
                        name: 'Type: Dependency',
                    },
                    {
                        name: 'Status: Review Needed',
                    },
                    {
                        name: 'Type: Dependency',
                    },
                    {
                        name: 'Status: Review Needed',
                    }
                ]
            },
            {
                title: '#216',
                description: 'chore(deps): update dependency vitepress to v1.0.0-rc.20',
            },
            {
                title: '#216',
                description: 'chore(deps): update dependency vitepress to v1.0.0-rc.20',
            },
        ],
        
    }, {
        title: locale.IssueBoard.issueLabel.inprogress,
        icon: <Icon color="#facc15" size="small" name="inprogress" />,
        content: []
    }, {
        title: locale.IssueBoard.issueLabel.done,
        icon: <Icon color="#818cf8" size="small" name="done" />,
        content: []
    }, {
        title: locale.IssueBoard.issueLabel.cannelled,
        icon: <Icon color="#a1a1aa" size="small" name="cancel" />,
        content: []
    }]

    return DefaultIssues
}

export default useDefaultValues
