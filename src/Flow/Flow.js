import {useCallback, useState} from 'react';
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
import {randomInt} from "../util";
import {Button, ExpandableButton} from "../Button/Button";
import "./styles.css"
import {Input} from "../Input/Input";


const nodes = [
    {id: 'T1', d: 1},
];

const createNode = (id, d, x, y) => {
    return {id, position: {x, y}, data: {d: d, label: `${id}, d=${d}`}}
}

const initialNodes = [
    createNode("T1", 5, 0, 0),
    createNode("T2", 7, 0, 100),
];

const initialEdges = [{id: 'e1-2', source: 'T1', target: 'T2', markerEnd: {type: 'arrowclosed', color: 'black'}}];
const calculatedNodes = [];

export function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [dInput, setDInput] = useState("");
    const [counter, setCounter] = useState(initialNodes.length + 1);

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

    const addNode = () => setNodes([...nodes, createNode(getNextTaskNumber(), dInput, randomInt(500), randomInt(500))])

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
                <h1 style={{textAlign: "center"}}>Create node</h1>
                <Input value={dInput} onChange={handleDInput}/>
                <div className="button-container">
                   {/*<ExpandableButton onClick={addNode} onChange={handleDInput} value={dInput} text={"Create"} expandText={"Create node"}/>*/}
                <Button onClick={addNode} text={"Create"}/>
                <Button onClick={() => algorithm(nodes, edges)} text={"Calculate"}/>
                </div>
            </div>
        </div>
    );
}