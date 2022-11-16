import './App.css';
import {Flow} from "./Flow/Flow";
import {ProcessesChart} from "./ProcessesChart/ProcessesChart";
import "./index.css"

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

function App() {
    return (
        <div>
            <div>
                <ProcessesChart processes={exampleProcesses}/>
            </div>
            <div style={{ height: 500, marginTop: "3em"}}>
                <Flow/>
            </div>
        </div>
    );
}

export default App;
