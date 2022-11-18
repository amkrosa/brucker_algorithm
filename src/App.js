import './App.css';
import {Flow} from "./Flow/Flow";
import {ProcessesChart} from "./Tables/ProcessesChart";
import "./index.css"
import {TaskTable} from "./Tables/TaskTable";
import {useState} from "react";

function App() {
    const [processesChart, setProcessesChart] = useState({"P1": [], "P2": []})
    const [tasks, setTasks] = useState({lmax: null, table: []})

    return (
        <div className="main">
            <div style={{ height: 500}}>
                <Flow tasks={tasks} setTasks={setTasks} processesChart={processesChart} setProcessesChart={setProcessesChart}/>
            </div>
            <div className="tables">
                <ProcessesChart processes={processesChart}/>
                <TaskTable tasks={tasks}/>
            </div>
        </div>
    );
}

export default App;
