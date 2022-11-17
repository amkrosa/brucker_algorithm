import "./styles.css"

const ChartCell = (props) => {
    const style = {
        backgroundColor: `rgba(${props.color}, 0.4)`,
    };

    return (
        <td style={style}>{props.taskId}</td>
    )
}

const ChartRow = (props) => {
    return (
        <tr>
            <td>{props.processId}</td>
            {props.tasksArray.map(task => {
                return (<ChartCell taskId={task.id} color={task.color}/>)
            })}
        </tr>
    )
}

const mapProcessesRows = (processes) => {
    let rows = []
    for (const [key, value] of Object.entries(processes)) {
        rows.push(<ChartRow processId={key} tasksArray={value}/>)
    }
    return rows
}


export const ProcessesChart = (props) => {

    return (
        <table style={{margin: "3em"}}>
            <tbody>
                {mapProcessesRows(props.processes)}
            </tbody>
        </table>
    )
}