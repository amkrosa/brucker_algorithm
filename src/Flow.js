import { useCallback } from 'react';
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

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge({...params, markerEnd:  {type: 'arrowclosed', color: 'black'}}, eds)),
        [setEdges]);

    return (
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
    );
}