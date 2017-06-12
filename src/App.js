import React, { Component } from 'react';
import './css/App.css';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import 'normalize.css';
import './css/reset.css';
import './lib/bootstrap/css/bootstrap.min.css'
import { Panel, Button, ListGroupItem, ListGroup } from 'react-bootstrap'
import UserDialog from './components/UserDialog'
import { getCurrentUser, signOut, TodoModel } from './js/leancloud'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      todoList: [],
    }
    let user = getCurrentUser()
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }

  componentWillMount() {
    // this.fetchTodos()
  }
  render() {
    let todos = this.state.todoList
      .filter((item) => !item.deleted)
      .map((item, index) => {
        return (
          <ListGroupItem key={index}>
            <TodoItem todo={item} onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)} />
          </ListGroupItem>
        )
      })
    let title = (
      <h1>{this.state.user.username || "我"}的待办
          {this.state.user.id ? <Button bsStyle="success" bsSize="small" onClick={this.signOut.bind(this)}>登出</Button> : null}
      </h1>
    )
    let panelsInstance = (
      <div className="panel">
        <Panel header={title} bsStyle="success">
          <div className="inputWrapper">
            <TodoInput content={this.state.newTodo}
              onChange={this.changeTitle.bind(this)}
              onSubmit={this.addTodo.bind(this)} />
          </div>
          <ListGroup>
            {todos}
          </ListGroup>
        </Panel>
      </div>
    );

    return (
      <div className="App">
        {this.state.user.id ?
          panelsInstance :
          <UserDialog
            onSignUp={this.onSignUpOrOnSignIn.bind(this)}
            onSignIn={this.onSignUpOrOnSignIn.bind(this)} />}
      </div>
    )
  }

  signOut() {
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }

  onSignUpOrOnSignIn(user) {
    TodoModel.getByUser(user, (todos) => {
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.user = user;
      stateCopy.todoList = todos
      this.setState(stateCopy)
    })
  }

  componentDidUpdate() {
    // this.fetchTodos()
  }

  delete(event, todo) {
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }

  toggle(e, todo) {
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    todo.todoStyle.textDecoration = todo.todoStyle.textDecoration === 'line-through' ? 'none' : 'line-through'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status = oldStatus
      this.setState(this.state)
    })
  }

  changeTitle(e) {
    this.setState({
      newTodo: e.target.value,
      todoList: this.state.todoList
    })

  }

  addTodo(event) {
    let newTodo = {
      title: event.target.value,
      status: '',
      deleted: false,
      currentTime: new Date().getTime(),
      todoStyle:{'textDecoration':'none'}
    }
    TodoModel.create(newTodo, (res) => {
      newTodo.id = res.id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    }, (error) => {
      console.log(error)
    })
  }

  // friendlyDate(time) {
  //   var now = new Date().getTime();
  //   var result = (now - time) / 1000;
  //   if (result < 60) {
  //     return "刚刚"
  //   } else if (result < 3600 && result > 60) {
  //     return parseInt((result / 60), 10) + "分钟前"
  //   } else if (result > 3600 && result < (3600 * 24)) {
  //     return parseInt((result / 3600), 10) + "小时前"
  //   } else if (result > (3600 * 24) && result < (3600 * 24 * 30)) {
  //     return parseInt((result / 3600 / 24), 10) + "天前"
  //   } else if (result > (3600 * 24 * 30) && result < (3600 * 24 * 30 * 12)) {
  //     return parseInt((result / 3600 / 24 / 30), 10) + "个月前"
  //   } else {
  //     return parseInt((result / 3600 / 24 / 30 / 12), 10) + "年前"
  //   }
  // }
}

export default App;
