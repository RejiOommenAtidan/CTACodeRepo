import React, { useState, useImperativeHandle } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

function getStyle(backgroundColor) {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '8rem',
    minWidth: '8rem',
    color: 'white',
    backgroundColor,
    padding: '2rem',
    borderRadius: '0.5rem',
    paddingTop: '1rem',
    margin: '1rem',
    textAlign: 'center',
    float: 'left',
    fontSize: '1rem'
  };
}

const Dustbin = React.forwardRef(
  ({ greedy, isOver, isOverCurrent, connectDropTarget, children }, ref) => {
    const [hasDropped, setHasDropped] = useState(false);
    const [hasDroppedOnChild, setHasDroppedOnChild] = useState(false);
    useImperativeHandle(
      ref,
      () => ({
        onDrop: (onChild) => {
          setHasDroppedOnChild(onChild);
          setHasDropped(true);
        }
      }),
      []
    );
    const text = greedy ? 'greedy' : 'not greedy';
    let backgroundColor = 'rgba(60, 68, 177, 0.35)';
    if (isOverCurrent || (isOver && greedy)) {
      backgroundColor = '#1bc943';
    }
    return connectDropTarget(
      <div style={getStyle(backgroundColor)}>
        {text}
        <br />
        {hasDropped && <span>dropped {hasDroppedOnChild && ' on child'}</span>}
        <div>{children}</div>
      </div>
    );
  }
);
export default DropTarget(
  ItemTypes.BOX,
  {
    drop(props, monitor, component) {
      if (!component) {
        return;
      }
      const hasDroppedOnChild = monitor.didDrop();
      if (hasDroppedOnChild && !props.greedy) {
        return;
      }
      component.onDrop(hasDroppedOnChild);
    }
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true })
  })
)(Dustbin);
