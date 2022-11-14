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
import {algorithm} from "./algorithm";

const nodes = [
    { id: 'T1', d: 1},
];

const createNode = (id, d, x, y) => {
    return { id, position: { x, y }, data: {d: d, label: `${id}, d=${d}` } }
}

const initialNodes = [
    createNode("t1", 5, 0, 0),
    createNode("t2", 7, 0, 100),
];

const initialEdges = [{ id: 'e1-2', source: 'T1', target: 'T2', markerEnd: {type: 'arrowclosed', color: 'black'} }];
const calculatedNodes = [];

export function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [dInput, setDInput] = useState("");
    const [counter, setCounter] = useState(initialNodes.length+1);

    const handleDInput = (e) => {
        setDInput(e.target.value)
    }

    const getNextTaskNumber = () => {
        setCounter(counter+1)
        return `T${counter}`
    }

    const onConnect = useCallback((params) => setEdges((eds) => addEdge({...params, markerEnd:  {type: 'arrowclosed', color: 'black'}}, eds)),
        [setEdges]);

    const addNode = () => setNodes([...nodes, createNode(getNextTaskNumber(), dInput, 0, 0)])

    return (
        <div>
            <div style={{ height: 800 }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
            <input value={dInput} onChange={handleDInput} />
            <button onClick={addNode}>stwórz</button>
            <button onClick={() => algorithm(nodes, edges)}>policz</button>
        </div>
    );
}