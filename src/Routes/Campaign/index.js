// import React from 'react';
// import Tree from 'react-d3-tree';
// import Navbar from '../../components/Navbar';

// // This is a simplified example of an org chart with a depth of 2.
// // Note how deeper levels are defined recursively via the `children` property.
// const orgChart = {
//     name: 'CTO',
//     children: [
//         {
//             name: 'Manager',
//             attributes: {
//                 department: 'Production',
//                 department: <p className='text-xl'>"Production"</p>,
//             },
//             children: [
//                 {
//                     name: 'Foreman',
//                     attributes: {
//                         department: 'Fabrication',
//                     },
//                     children: [
//                         {
//                             name: 'Worker',
//                             children: [
//                                 {
//                                     name: "Abhishek",
//                                     attributes: {
//                                         department: "web"
//                                     }
//                                 }
//                             ]
//                         },
//                     ],
//                 },
//                 {
//                     name: 'Foreman',
//                     attributes: {
//                         department: 'Assembly',
//                     },
//                     children: [
//                         {
//                             name: 'Worker',
//                         },
//                     ],
//                 },
//             ],
//         },
//     ],
// };

// export function Campaign() {
//     return (
//         <>
//             <div>
//                 <Navbar />
//             </div>
//             {/* // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`. */}
//             <div id="treeWrapper" className='border bg-red-200' style={{ width: '100em', height: '30em' }}>
//                 <Tree
//                     data={orgChart}
//                     orientation="vertical"
//                 />
//             </div>
//         </>
//     );
// }

import React, {useCallback} from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";

import {nodes as initialNodes, edges as initialEdges} from "./InitialElement";
import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";
import "./OverView.css";

const nodeTypes = {
  custom: CustomNode,
};

const minimapStyle = {
  height: 120,
};

const onInit = (reactFlowInstance) =>
  console.log("flow loaded:", reactFlowInstance);

export const Campaign = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  const edgesWithUpdatedTypes = edges.map((edge) => {
    if (edge.sourceHandle) {
      const edgeType = nodes.find((node) => node.type === "custom").data
        .selects[edge.sourceHandle];
      edge.type = edgeType;
    }

    return edge;
  });

  return (
    <ReactFlow
      nodes={nodes}
      edges={edgesWithUpdatedTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};
