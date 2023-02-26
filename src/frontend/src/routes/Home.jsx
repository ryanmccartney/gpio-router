import React, { useCallback } from "react";
import ReactFlow, { useNodesState, useEdgesState, Controls, updateEdge, addEdge } from "reactflow";
import GpioNode from "./../components/GpioNode";
import "reactflow/dist/style.css";

const { io } = require("socket.io-client");
const socket = io("/", { transports: ["websocket", "polling"], rememberUpgrade: true });

socket.on("connect", () => {
    console.log(socket.id);
});

const initialNodes = [
    {
        id: "1",
        type: "input",
        data: { inputs: 8, outputs: 8, name: "Central GPIO" },
        type: "gpioNode",
        position: { x: 100, y: 0 },
    },
    {
        id: "2",
        data: { inputs: 4, outputs: 4, name: "Feild GPIO 1" },
        type: "gpioNode",
        position: { x: 400, y: 0 },
    },
    {
        id: "3",
        data: { inputs: 4, outputs: 4, name: "Feild GPIO 2" },
        type: "gpioNode",
        position: { x: 400, y: 100 },
    },
    {
        id: "4",
        data: { inputs: 4, outputs: 4, name: "Feild GPIO 3" },
        type: "gpioNode",
        position: { x: 400, y: 200 },
    },
];

const initialEdges = [
    { id: "1:1-2:1", key: "1:1-2:1", source: "1", sourceHandle: "1", target: "2", targetHandle: "1" },
    { id: "1:2-2:2", key: "1:2-2:2", source: "1", sourceHandle: "2", target: "2", targetHandle: "2" },
    { id: "1:3-2:3", key: "1:3-2:3", source: "1", sourceHandle: "3", target: "2", targetHandle: "3" },
    { id: "1:4-2:4", key: "1:4-2:4", source: "1", sourceHandle: "4", target: "2", targetHandle: "4" },
    { id: "1:1-3:1", key: "1:1-3:1", source: "1", sourceHandle: "1", target: "3", targetHandle: "1" },
];

const nodeTypes = { gpioNode: GpioNode };

const Home = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    // gets called after end of edge gets dragged to another source or target
    const onEdgeUpdate = useCallback(
        (oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)),
        []
    );
    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            snapToGrid
            onEdgeUpdate={onEdgeUpdate}
            onConnect={onConnect}
            fitView
            attributionPosition="bottom-right"
        >
            <Controls />
        </ReactFlow>
    );
};

export default Home;
