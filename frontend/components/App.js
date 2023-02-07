import React from 'react';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
  }

  inputChange = e => {
    const { value } = e.target
    this.setState({ ...this.state, todoNameInput: value });
  }

  resetForm = () => {
    this.setState({ ...this.state, todoNameInput: '' });
  }

  setAxiosResponseError = err => {
    this.setState({ ...this.state, error: err.response.data.message });
  }
  
  onToDoFormSubmit = e => {
    e.preventDefault();
    this.postNewTodo();
  }

  fetchAllTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data });
      })
      .catch(this.setAxiosResponseError);
  }

  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm();
      })
      .catch(this.setAxiosResponseError);
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.map(item => {
            if (item.id !== id) return item;
            return res.data.data;
          })
        })
      })
      .catch(this.setAxiosResponseError);
  }

  componentDidMount() {
    this.fetchAllTodos()
  }

  render() {
    return (
      <>
        <div id='error'>Error: {this.state.error}</div>
        <div id='todos'>
          <h2>Todo:</h2>
          {
            this.state.todos.map(item => {
              return <div onClick={this.toggleCompleted(item.id)} key={item.id}>{item.name} {item.completed ? ' ✓' : ''}</div>
            })
          }
        </div>
        <form id="todoForm" onSubmit={this.onToDoFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.inputChange} type='text' placeholder='Type todo'></input>
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form>
      </>
    )
  }
}
