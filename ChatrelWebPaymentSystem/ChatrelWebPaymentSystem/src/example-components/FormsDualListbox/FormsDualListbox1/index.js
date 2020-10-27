import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Fab,
  Checkbox,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core';

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function LivePreviewExample() {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([0, 1, 2, 3]);
  const [right, setRight] = useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card className="card-box p-0 m-3">
      <CardHeader
        className="px-3 py-2"
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
      />
      <Divider />
      <List className="p-2" dense component="div" role="list">
        {items.map((value) => {
          const labelId = 'transfer-list-all-item';

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              className="pl-2"
              onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                className="pl-0"
                id={labelId}
                primary={'List item'}
              />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <>
      <div className="py-3">
        <Grid container spacing={4} justify="center" alignItems="center">
          <Grid item>{customList('Choices', left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Fab
                className="my-1"
                color="primary"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right">
                <FontAwesomeIcon
                  icon={['fas', 'chevron-right']}
                  className="font-size-lg"
                />
              </Fab>
              <Fab
                className="my-1"
                color="primary"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left">
                <FontAwesomeIcon
                  icon={['fas', 'chevron-left']}
                  className="font-size-lg"
                />
              </Fab>
            </Grid>
          </Grid>
          <Grid item>{customList('Chosen', right)}</Grid>
        </Grid>
      </div>
    </>
  );
}
