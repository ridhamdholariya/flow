import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  addEdge,
  Controls,
  useReactFlow,
  Background,
} from '@xyflow/react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import { DnDProvider, useDnD } from './DnDContext';
import { addNode, updateNode, setNodes } from './store/slices/nodesSlice';
import { addEdge as addEdgeRedux, setEdges } from './store/slices/edgesSlice';

import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'default',
    data: { label: 'name & email' },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {
  const reactFlowWrapper = useRef(null);
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes.nodes);
  const edges = useSelector((state) => state.edges);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const formRef = useRef(null);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    console.log('nodes:', nodes);
    console.log('edges:', edges);
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params) => dispatch(addEdgeRedux(params)),
    [dispatch]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      dispatch(addNode(newNode));
    },
    [dispatch, screenToFlowPosition, type]
  );

  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node);
      setFormData({ name: '', email: '', phone: '' });
    },
    []
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedNode) {
      dispatch(
        updateNode({
          ...selectedNode,
          data: {
            ...selectedNode.data,
            label: selectedNode.type === 'default'
              ? `${formData.name} (${formData.email})`
              : formData.phone,
          },
        })
      );
      setSelectedNode(null);
    }
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setSelectedNode(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DnDProvider>
      <div className="dndflow" style={{ height: '100vh', width: '100%' }}>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={(nds) => dispatch(setNodes(nds))}
            onEdgesChange={(eds) => dispatch(setEdges(eds))}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            fitView
            style={{ backgroundColor: '#F7F9FB' }}
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <Sidebar />
        {selectedNode && (
          <div className="node-form" ref={formRef}>
            <h3>Edit Node</h3>
            <form onSubmit={handleSubmit}>
              {selectedNode.type === 'default' && (
                <>
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </label>
                </>
              )}
              {selectedNode.type === 'phone' && (
                <label>
                  Phone:
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </label>
              )}
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </DnDProvider>
  );
};

export default App;
