import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

import { Button } from '@material-ui/core';

const Box = ({ connectDragSource }) =>
  connectDragSource(
    <div>
      <Button size="large" className="btn-warning">
        Drag me
      </Button>
    </div>
  );
export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag: () => ({})
  },
  (connect) => ({
    connectDragSource: connect.dragSource()
  })
)(Box);
