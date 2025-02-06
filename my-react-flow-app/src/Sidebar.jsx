import React from 'react';
import { useDnD } from './DnDContext';
 
export default () => {
  const [_, setType] = useDnD();
 
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'name & email')} draggable>
        name & email
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'phone')} draggable>
        phone
      </div>
    </aside>
  );
};