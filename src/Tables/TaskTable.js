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
                </tr>
            </thead>
            <tbody>
                {props.tasks.map(task => {
                    return (
                        <tr>
                            <td style={backgroundColor(task.color)}>{task.id}</td>
                            <td>{task.d}</td>
                            <td>{task.dStar}</td>
                            <td>{task.l}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}