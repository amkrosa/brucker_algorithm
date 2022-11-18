import "./styles.css"

export const TaskTable = (props) => {
    const backgroundColor = (color) => {
        return {
            backgroundColor: `rgba(${color}, 0.4)`,
        }
    };

    return (
        <table style={{margin: "3em"}}>
            <thead>
                <tr>
                    <td>id</td>
                    <td>d</td>
                    <td>d*</td>
                    <td>L</td>
                    <td>Lmax</td>
                </tr>
            </thead>
            <tbody>
                {props.tasks.table.map((task, i) => {
                    return (
                        <tr>
                            <td style={backgroundColor(task.color)}>{task.id}</td>
                            <td>{task.d}</td>
                            <td>{task.dStar}</td>
                            <td>{task.l}</td>
                            {i === 0 ? <td rowSpan={props.tasks.table.length}>{props.tasks.lmax}</td> : null}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}