import './App.css';
import {Flow} from "./Flow/Flow";
import {ProcessesChart} from "./Tables/ProcessesChart";
import "./index.css"
import {TaskTable} from "./Tables/TaskTable";

const exampleProcesses = {
    "P1": [
        {
            "id": "T1",
            "color": "50,50,50"
        },
        {
            "id": "T2",
            "color": "50,150,50"
        },
        {
            "id": "T3",
            "color": "190,50,50"
        },
    ],
    "P2": [
        {
            "id": "T4",
            "color": "50,50,130"
        },
        {
            "id": "T5",
            "color": "100,50,100"
        },
    ]
}

const exampleTasks = [
    {
        "id": "T1",
        "d": 4,
        "dStar": -2,
        "l": -7,
        "color": "50,50,50"
    },
    {
        "id": "T2",
        "d": 2,
        "dStar": -5,
        "l": -5,
        "color": "50,150,50"
    },
    {
        "id": "T3",
        "d": 4,
        "dStar": 4,
        "l": -5,
        "color": "190,50,50"
    },
    {
        "id": "T4",
        "d": 4,
        "dStar": -2,
        "l": -5,
        "color": "50,50,130"
    },
    {
        "id": "T5",
        "d": 4,
        "dStar": -2,
        "l": -5,
        "color": "100,50,100"
    }
]

function App() {
    return (
        <div>
            <div>
                <ProcessesChart processes={exampleProcesses}/>
                <TaskTable tasks={exampleTasks}/>
            </div>
            <div style={{ height: 500, marginTop: "3em"}}>
                <Flow/>
            </div>
        </div>
    );
}

export default App;
