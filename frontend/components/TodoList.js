import React from 'react'

import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    return (
      <div id='todos'>
          <h2>Todo:</h2>
          {
            this.props.todos.reduce((acc, item) => {
              if (this.props.displayCompleted || !item.completed) return acc.concat(
                <Todo
                  key={item.id}
                  toggleCompleted={this.props.toggleCompleted}
                  todo={item}
                />
              )
              return acc;
            }, [])
          }
        </div>
    )
  }
}
