import { useEffect, useState, useCallback } from "react";
import ReactFlow, {
	Controls,
	MiniMap,
	Background,
	useNodesState,
	useEdgesState,
	addEdge,
	MarkerType,
} from "reactflow";
import dagre from 'dagre';
import "reactflow/dist/style.css";

import { getTasks } from "~/features/tasks/api/get-tasks";
import type { Task } from "~/features/tasks/types";
import type { Node, Edge } from "reactflow";

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
 
const nodeWidth = 172;
const nodeHeight = 48;
 
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });
 
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
 
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
 
  dagre.layout(dagreGraph);
 
  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
 
    return newNode;
  });
 
  return { nodes: newNodes, edges };
};

const TaskGraph = () => {
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);

	useEffect(() => {
		const fetchTasksAndBuildGraph = async () => {
			const tasks = await getTasks();

			const initialNodes: Node[] = tasks.map((task: Task) => ({
				id: task.id.toString(),
				data: { label: task.title, status: task.status },
				style: task.status === 'done' ? { backgroundColor: '#d3d3d3' } : {},
			}));

			const initialEdges: Edge[] = [];
			tasks.forEach((task: Task) => {
				if (task.dependencies) {
					task.dependencies.forEach((depId: number) => {
						initialEdges.push({
							id: `e${depId}-${task.id}`,
							source: depId.toString(),
							target: task.id.toString(),
							animated: false,
							label: task.estimated_effort ? `${task.estimated_effort}人日` : "",
							markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
						});
					});
				}
			});

			const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges, 'TB');

			setNodes(layoutedNodes);
			setEdges(layoutedEdges);
		};

		fetchTasksAndBuildGraph();
	}, [setNodes, setEdges]);

	const onConnect = useCallback(
		(params: any) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	);

	return (
		<div style={{ height: "80vh" }}>
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				fitView
			>
				<Controls />
				<MiniMap />
				<Background />
			</ReactFlow>
		</div>
	);
};

export default TaskGraph;
