import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import themeStyles from './todo.theme.style';
import styles from './todo.module.scss';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      todos: [{
        id: 1,
        text: 'Buy Milk',
        checked: false,
        completed: false
      }]
    };
  }

  onTodoChecked = (checkedTodo) => {
    // Create new todo list with checked todo.
    const newTodos = [...this.state.todos]
      .map((todo) => {
        const newTodo = Object.assign({}, todo);
        if (checkedTodo === todo) {
          newTodo.checked = !newTodo.checked;
        }
        return newTodo;
      });
    // Update state.
    this.setState({
      todos: newTodos
    });
  }

  onCheckAll = (checked) => {
    const newTodos = [...this.state.todos]
      .map((todo) => {
        const newTodo = Object.assign({}, todo);
        newTodo.checked = checked;
        return newTodo;
      });
    // Update state.
    this.setState({
      todos: newTodos
    });
  }

  onCompleteAll = (completed) => {
    const newTodos = [...this.state.todos]
      .map((todo) => {
        const newTodo = Object.assign({}, todo);
        if (todo.checked) {
          newTodo.completed = completed;
        }
        return newTodo;
      });
    // Update state.
    this.setState({
      todos: newTodos
    });
  }

  onDeleteAll = () => {
    const newTodos = [...this.state.todos]
      .filter(todo => !todo.checked);
    // Update state.
    this.setState({
      todos: newTodos
    });
  }

  onInputChange = (event) => {
    this.setState({
      newTodo: event.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const todo = {
      id: Date.now(),
      text: this.state.newTodo,
      checked: false,
      completed: false
    };
    this.setState({
      newTodo: '',
      todos: [...this.state.todos, todo]
    });
  }

  showButtons = () => this.state.todos.find(todo => todo.checked) !== undefined;

  render() {
    return (
      <Grid
        spacing={0}
        container
        direction="row"
        alignItems="center"
        justify="center"
      >
        <div>
          <Card className={styles['portal-todo']}>
            <CardContent className={classNames(styles['portal-todo__header'], this.props.classes.headerTheme)}>
              <h2>My daily list</h2>
              <div className={styles['portal-todo__header-demo-mountain']} />
              <div className={styles['portal-todo__header-demo-mountain']} />
              <div className={styles['portal-todo__header-demo-cloud']} />
              <div className={styles['portal-todo__header-demo-sun']} />
            </CardContent>
            <CardContent>
              <List>
                {this.state.todos.map(todo => (
                  <ListItem
                    key={todo.id}
                    onClick={() => this.onTodoChecked(todo)}
                    button
                  >
                    <Checkbox
                      tabIndex={-1}
                      disableRipple
                      checked={todo.checked}
                      onChange={() => this.onTodoChecked(todo)}
                    />
                    <ListItemText
                      style={{ textDecoration: todo.completed ? 'line-through' : '' }}
                      primary={todo.text}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <form onSubmit={this.onSubmit} noValidate autoComplete="off" className={styles['portal-text-centered']}>
            <Button type="button" onClick={() => this.onCheckAll(true)}>Select all</Button>
            <Button type="button" onClick={() => this.onCheckAll(false)}>Deselect all</Button>
            <TextField
              id="name"
              label="Name"
              value={this.state.newTodo}
              margin="normal"
              onChange={this.onInputChange}
            />
            <Button
              type="submit"
              disabled={this.state.newTodo === ''}
            >
              Add item
            </Button>
          </form>
          <div style={{ display: this.showButtons() ? 'block' : 'none' }} className={styles['portal-text-centered']}>
            <Button type="button" onClick={() => this.onCompleteAll(true)}>Complete Selected</Button>
            <Button type="button" onClick={() => this.onCompleteAll(false)}>Uncomplete Selected</Button>
            <Button type="button" onClick={() => this.onDeleteAll()}>Delete Selected</Button>
          </div>
        </div>
      </Grid>
    );
  }
}

Todo.propTypes = {
  classes: PropTypes.shape({
    headerTheme: PropTypes.string
  }).isRequired
};

export default withStyles(themeStyles)(Todo);

