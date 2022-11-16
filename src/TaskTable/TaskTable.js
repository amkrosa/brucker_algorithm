export const TaskTable = (tasks) => {
    return (
        <table>
            <thead>
                <tr>
                    <td>id</td>
                    <td>d</td>
                    <td>d*</td>
                    <td>L</td>
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => {
                    return (
                        <tr>
                            <td>{task.id}</td>
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