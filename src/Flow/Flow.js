import {useCallback, useEffect, useState} from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';
// 👇 you need to import the reactflow styles
import 'reactflow/dist/style.css';
import {algorithm} from "../algorithm";
import {randomColor, randomInt} from "../util";
import {Button, ExpandableButton} from "../Button/Button";
import "./styles.css"
import {Input} from "../Input/Input";
import {CalculateModal} from "../Modal/CalculateModal";
import {AddNodeModal} from "../Modal/AddNodeModal";
import {DeleteButton} from "../Button/DeleteButton";

export function Flow(props) {
    const createNode = (id, d, x, y, color) => {
        return {
            id,
            position: {x, y},
            data: {
                d: d, color: color, label: (
                    <><DeleteButton onClick={() => deleteNodeById(id)}/>
                        {id}, d={d}
                    </>
                )
            },
            style: {background: `rgba(${color}, 0.5)`}
        }
    }

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [dInput, setDInput] = useState("");
    const [counter, setCounter] = useState(1);
    const [algorithmResult, setAlgorithmResult] = useState({})
    const [processesNumber, setProcessesNumber] = useState(2)

    const deleteNodeById = (id) => {
        setNodes((nds) => nds.filter((node) => node.id !== id))
    }

    const handleChangeProcessesNumber = (e) => {
        let processesChart = {}
        for (let i = 0; i < processesNumber; i++) processesChart[`P${i+1}`] = []
        props.setProcessesChart(processesChart)
        setProcessesNumber(e.target.value)
    }

    const handleCalculate = (result) => {
        const resultTable = result.table
        let processesChart = {}
        let tasks = []
        for (let i = 0; i < processesNumber; i++) processesChart[`P${i+1}`] = []

        for (let i = 0; i < resultTable.length; i++) {
            for (let j = 0; j < resultTable[i].length; j++) {
                const current = resultTable[i][j]
                processesChart[`P${current.p}`][i] = {id: current.id, color: current.color}
                tasks.push({
                    id: current.id,
                    d: current.d,
                    dStar: current.dStar,
                    l: current.l,
                    color: current.color
                })
            }
        }
        props.setTasks(tasks)
        props.setProcessesChart(processesChart)
    }

    const handleDInput = (e) => {
        setDInput(e.target.value)
    }

    const getNextTaskNumber = () => {
        setCounter(counter + 1)
        return `T${counter}`
    }

    const onConnect = useCallback((params) => setEdges((eds) => addEdge({
            ...params,
            markerEnd: {type: 'arrowclosed', color: 'black'}
        }, eds)),
        [setEdges]);

    const addNode = () => {
        const node = createNode(getNextTaskNumber(), dInput, randomInt(500), randomInt(500), randomColor())
        props.setTasks([...props.tasks, {id: node.id, d: node.data.d, color: node.data.color}])
        setNodes([...nodes, node])
    }

    return (
        <div>
            <div style={{height: 500}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                >
                    <MiniMap/>
                    <Controls/>
                    <Background/>
                </ReactFlow>
            </div>
            <div className="action-container">
                <h1 style={{textAlign: "center"}}>Actions</h1>
                <div className="button-container">
                    <CalculateModal calculate={algorithm} handleCalculate={handleCalculate} nodes={nodes} edges={edges}
                                    changeProcessesNumber={handleChangeProcessesNumber} processesNumber={processesNumber}/>
                    <AddNodeModal addNode={addNode} dInput={dInput} handleDInput={handleDInput}/>
                    {/*<Button onClick={addNode} text={"Create"}/>*/}
                    {/*<Button onClick={() => algorithm(nodes, edges, 3)} text={"Calculate"}/>*/}
                </div>
            </div>
        </div>
    );
}