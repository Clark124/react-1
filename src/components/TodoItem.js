import React, { Component } from 'react';
import '../css/TodoItem.css'
import { Button } from 'react-bootstrap'
export default class TodoItem extends Component {
    render() {
        // return <div>{this.props.todo.title}</div>
        return (
            <div className="TodoItem">
                <input type="checkbox" checked={this.props.todo.status === 'completed'}
                    onChange={this.toggle.bind(this)} />
                <span className="title" ref="todo">{this.props.todo.title}</span>
                <span className="time">{this.friendlyDate(this.props.todo.currentTime)}</span>
                <Button bsStyle="warning" bsSize="xsmall" onClick={this.delete.bind(this)}>删除</Button>
            </div>
        )
    }

    friendlyDate(time) {
        var now = new Date().getTime();
        var result = (now - time) / 1000;
        if (result < 60) {
            return "刚刚"
        } else if (result < 3600 && result > 60) {
            return parseInt((result / 60), 10) + "分钟前"
        } else if (result > 3600 && result < (3600 * 24)) {
            return parseInt((result / 3600), 10) + "小时前"
        } else if (result > (3600 * 24) && result < (3600 * 24 * 30)) {
            return parseInt((result / 3600 / 24), 10) + "天前"
        } else if (result > (3600 * 24 * 30) && result < (3600 * 24 * 30 * 12)) {
            return parseInt((result / 3600 / 24 / 30), 10) + "个月前"
        } else {
            return parseInt((result / 3600 / 24 / 30 / 12), 10) + "年前"
        }
    }


    toggle(e) {
        if (!this.refs.todo.style.textDecoration) {
            this.refs.todo.style.textDecoration = 'line-through'
        } else {
            this.refs.todo.style.textDecoration = ''
        }

        this.props.onToggle(e, this.props.todo)
    }

    delete(e) {
        this.props.onDelete(e, this.props.todo)
    }
}